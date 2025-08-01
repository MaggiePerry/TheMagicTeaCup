/**
 * Game Scene
 * Main gameplay scene for finding objects
 */

import { HiddenObject } from "../objects/HiddenObject.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.hiddenObjects = [];
    this.foundObjects = [];
    this.gameTimer = null;
    this.timeRemaining = 0;
    this.isPaused = false;
    this.currentLevel = null;
  }

  create() {
    this.initializeLevel();
    this.createUI();
    this.createHiddenObjects();
    this.startTimer();
    this.setupInput();
  }

  /**
   * Initialize the current level
   */
  initializeLevel() {
    if (this.game.levelManager) {
      this.currentLevel = this.game.levelManager.getCurrentLevel();
      if (this.currentLevel) {
        this.timeRemaining = this.currentLevel.timeLimit || 120;
        console.log(`GameScene: Loaded level ${this.currentLevel.name}`);
      } else {
        console.error("GameScene: No level data available");
        this.scene.start("MenuScene");
        return;
      }
    } else {
      console.error("GameScene: LevelManager not available");
      this.scene.start("MenuScene");
      return;
    }
  }

  /**
   * Create UI elements
   */
  createUI() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create UI panel
    this.uiPanel = this.add
      .graphics()
      .fillStyle(0x4a90e2, 0.9)
      .fillRect(0, 0, width, 60)
      .lineStyle(2, 0xffffff, 1)
      .strokeRect(0, 0, width, 60);

    // Level info
    this.levelText = this.add.text(10, 10, `Level: ${this.currentLevel.name}`, {
      fontSize: "16px",
      fill: "#ffffff",
      fontFamily: "Arial",
      fontStyle: "bold",
    });

    // Timer
    this.timerText = this.add
      .text(width / 2, 10, this.formatTime(this.timeRemaining), {
        fontSize: "18px",
        fill: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Objects counter
    this.objectsText = this.add
      .text(
        width - 10,
        10,
        `Objects: ${this.foundObjects.length}/${this.currentLevel.objects.length}`,
        {
          fontSize: "16px",
          fill: "#ffffff",
          fontFamily: "Arial",
          fontStyle: "bold",
        }
      )
      .setOrigin(1, 0);

    // Pause button
    this.pauseButton = this.createButton(width - 100, 30, "Pause", () =>
      this.togglePause()
    );
  }

  /**
   * Create hidden objects
   */
  createHiddenObjects() {
    this.hiddenObjects = [];

    this.currentLevel.objects.forEach((objData) => {
      const hiddenObject = new HiddenObject(this, objData);
      this.hiddenObjects.push(hiddenObject);
    });
  }

  /**
   * Start the game timer
   */
  startTimer() {
    this.gameTimer = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
  }

  /**
   * Update timer
   */
  updateTimer() {
    if (!this.isPaused) {
      this.timeRemaining--;
      this.timerText.setText(this.formatTime(this.timeRemaining));

      // Check for time up
      if (this.timeRemaining <= 0) {
        this.gameOver();
      }

      // Warning when time is low
      if (this.timeRemaining <= 10) {
        this.timerText.setColor("#ff0000");
      }
    }
  }

  /**
   * Format time as mm:ss
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted time string
   */
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  /**
   * Setup input handling
   */
  setupInput() {
    // Handle clicks on hidden objects
    this.input.on("pointerdown", (pointer) => {
      if (this.isPaused) return;

      this.hiddenObjects.forEach((obj) => {
        if (
          obj.isVisible &&
          !obj.isFound &&
          obj.contains(pointer.x, pointer.y)
        ) {
          this.foundObject(obj);
        }
      });
    });

    // Handle keyboard input
    this.input.keyboard.on("keydown-ESC", () => {
      this.togglePause();
    });

    this.input.keyboard.on("keydown-R", () => {
      this.restartLevel();
    });
  }

  /**
   * Handle object found
   * @param {HiddenObject} object - The found object
   */
  foundObject(object) {
    if (object.isFound) return;

    object.found();
    this.foundObjects.push(object);

    // Update UI
    this.objectsText.setText(
      `Objects: ${this.foundObjects.length}/${this.currentLevel.objects.length}`
    );

    // Play success sound
    if (this.game.sound && this.game.sound.get("success")) {
      this.game.sound.play("success");
    }

    // Show found message
    this.showFoundMessage(object);

    // Check if level is complete
    if (this.foundObjects.length >= this.currentLevel.requiredObjects) {
      this.levelComplete();
    }
  }

  /**
   * Show found object message
   * @param {HiddenObject} object - The found object
   */
  showFoundMessage(object) {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create message
    const message = this.add
      .text(width / 2, height / 2, `Found: ${object.name}!`, {
        fontSize: "24px",
        fill: "#00ff00",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Animate message
    this.tweens.add({
      targets: message,
      y: height / 2 - 50,
      alpha: 0,
      duration: 2000,
      ease: "Power2",
      onComplete: () => {
        message.destroy();
      },
    });
  }

  /**
   * Level complete
   */
  levelComplete() {
    // Stop timer
    if (this.gameTimer) {
      this.gameTimer.destroy();
    }

    // Mark level as completed
    if (this.game.levelManager) {
      this.game.levelManager.completeCurrentLevel();
    }

    // Calculate score
    const timeBonus = Math.floor(this.timeRemaining * 10);
    const perfectBonus =
      this.foundObjects.length === this.currentLevel.objects.length ? 100 : 0;
    const totalScore = timeBonus + perfectBonus;

    console.log(`GameScene: Level complete! Score: ${totalScore}`);

    // Transition to level complete scene
    this.scene.start("LevelCompleteScene", {
      level: this.currentLevel,
      timeRemaining: this.timeRemaining,
      score: totalScore,
      perfect: this.foundObjects.length === this.currentLevel.objects.length,
    });
  }

  /**
   * Game over
   */
  gameOver() {
    // Stop timer
    if (this.gameTimer) {
      this.gameTimer.destroy();
    }

    console.log("GameScene: Game over - time up");

    // Show game over message
    this.showGameOverMessage();
  }

  /**
   * Show game over message
   */
  showGameOverMessage() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create overlay
    const overlay = this.add
      .graphics()
      .fillStyle(0x000000, 0.8)
      .fillRect(0, 0, width, height);

    // Create message box
    const messageBox = this.add
      .graphics()
      .fillStyle(0xff4444, 1)
      .fillRoundedRect(width / 2 - 200, height / 2 - 100, 400, 200, 10)
      .lineStyle(2, 0xffffff, 1)
      .strokeRoundedRect(width / 2 - 200, height / 2 - 100, 400, 200, 10);

    // Create message text
    const messageText = this.add
      .text(width / 2, height / 2 - 30, "Time's Up!\nGame Over", {
        fontSize: "24px",
        fill: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    // Create buttons
    const tryAgainButton = this.createButton(
      width / 2 - 80,
      height / 2 + 30,
      "Try Again",
      () => this.restartLevel()
    );

    const menuButton = this.createButton(
      width / 2 + 80,
      height / 2 + 30,
      "Menu",
      () => this.scene.start("MenuScene")
    );

    // Add to scene
    this.add.existing(tryAgainButton);
    this.add.existing(menuButton);
  }

  /**
   * Toggle pause state
   */
  togglePause() {
    this.isPaused = !this.isPaused;

    if (this.isPaused) {
      this.pauseButton.setText("Resume");
      // TODO: Show pause overlay
    } else {
      this.pauseButton.setText("Pause");
      // TODO: Hide pause overlay
    }
  }

  /**
   * Restart current level
   */
  restartLevel() {
    this.scene.restart();
  }

  /**
   * Create a button
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {string} text - Button text
   * @param {Function} callback - Click callback
   * @returns {Phaser.GameObjects.Container} Button container
   */
  createButton(x, y, text, callback) {
    const button = this.add.container(x, y);

    // Button background
    const bg = this.add
      .graphics()
      .fillStyle(0x4a90e2, 1)
      .fillRoundedRect(-50, -20, 100, 40, 5)
      .lineStyle(2, 0xffffff, 1)
      .strokeRoundedRect(-50, -20, 100, 40, 5);

    // Button text
    const textObj = this.add
      .text(0, 0, text, {
        fontSize: "14px",
        fill: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    button.add([bg, textObj]);

    // Make interactive
    button.setSize(100, 40);
    button.setInteractive();

    // Click effect
    button.on("pointerdown", () => {
      if (this.game.sound && this.game.sound.get("click")) {
        this.game.sound.play("click");
      }
      callback();
    });

    return button;
  }

  update() {
    // Update hidden objects
    this.hiddenObjects.forEach((obj) => {
      if (obj.update) {
        obj.update();
      }
    });
  }
}
