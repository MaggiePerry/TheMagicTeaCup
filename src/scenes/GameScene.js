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
    this.currentLevel = null;
  }

  create() {
    this.createBackground();
    this.createUI();
    this.initializeLevel();
    this.createHiddenObjects();
    this.setupInput();
  }

  /**
   * Create background
   */
  createBackground() {
    // Add background image if available
    if (this.textures.exists("background")) {
      this.add.image(400, 300, "background").setDisplaySize(800, 600);
    } else {
      // Fallback background
      this.cameras.main.setBackgroundColor("#87CEEB");
    }
  }

  /**
   * Initialize the current level
   */
  initializeLevel() {
    if (this.game.levelManager) {
      // Wait for level manager to be initialized
      if (!this.game.levelManager.isInitialized) {
        this.game.levelManager
          .initialize()
          .then(() => {
            this.initializeLevel();
          })
          .catch((error) => {
            console.error(
              "GameScene: Failed to initialize LevelManager:",
              error
            );
            this.scene.start("MenuScene");
          });
        return;
      }

      this.currentLevel = this.game.levelManager.getCurrentLevel();
      if (this.currentLevel) {
        // Update UI with level data
        this.updateUIWithLevelData();
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
   * Update UI with level data
   */
  updateUIWithLevelData() {
    if (
      this.currentLevel &&
      this.levelText &&
      this.objectsText &&
      this.currentLevel.objects
    ) {
      this.levelText.setText(`Level: ${this.currentLevel.name}`);
      this.objectsText.setText(
        `Objects: ${this.foundObjects.length}/${this.currentLevel.objects.length}`
      );

      // Update progress bar
      this.updateProgressBar();

      // Create hidden objects if they haven't been created yet
      this.createHiddenObjectsFromLevel();
    }
  }

  /**
   * Update objects counter
   */
  updateObjectsCounter() {
    if (this.objectsText && this.currentLevel && this.currentLevel.objects) {
      const text = `Objects: ${this.foundObjects.length}/${this.currentLevel.objects.length}`;
      this.objectsText.setText(text);

      // Update progress bar
      this.updateProgressBar();
    }
  }

  /**
   * Create UI elements
   */
  createUI() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create UI panel background
    this.uiPanel = this.add
      .graphics()
      .fillStyle(0x4a90e2, 0.9)
      .fillRect(0, 0, width, 60)
      .lineStyle(2, 0xffffff, 1)
      .strokeRect(0, 0, width, 60);

    // Level info
    const levelName = this.currentLevel ? this.currentLevel.name : "Loading...";
    this.levelText = this.add.text(10, 10, `Level: ${levelName}`, {
      fontSize: "16px",
      fill: "#ffffff",
      fontFamily: "Arial",
      fontStyle: "bold",
    });

    // Objects counter
    const objectCount =
      this.currentLevel && this.currentLevel.objects
        ? this.currentLevel.objects.length
        : 0;
    this.objectsText = this.add.text(
      width - 200,
      10,
      `Objects: ${this.foundObjects.length}/${objectCount}`,
      {
        fontSize: "16px",
        fill: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "bold",
      }
    );

    // Progress bar
    this.progressBar = this.add.graphics();
    this.updateProgressBar();

    // Menu button
    this.menuButton = this.createButton(width - 100, 30, "Menu", () =>
      this.scene.start("MenuScene")
    );

    // Hint button
    this.hintButton = this.createButton(width - 200, 30, "Hint", () =>
      this.showRandomHint()
    );
  }

  /**
   * Create hidden objects
   */
  createHiddenObjects() {
    this.hiddenObjects = [];

    if (this.currentLevel && this.currentLevel.objects) {
      this.currentLevel.objects.forEach((objData) => {
        const hiddenObject = new HiddenObject(this, objData);
        this.hiddenObjects.push(hiddenObject);
      });
    }
  }

  /**
   * Create hidden objects when level data is available
   */
  createHiddenObjectsFromLevel() {
    if (
      this.currentLevel &&
      this.currentLevel.objects &&
      this.hiddenObjects.length === 0
    ) {
      this.currentLevel.objects.forEach((objData) => {
        const hiddenObject = new HiddenObject(this, objData);
        this.hiddenObjects.push(hiddenObject);
      });
    }
  }

  /**
   * Setup input handling
   */
  setupInput() {
    // Handle clicks on hidden objects
    this.input.on("pointerdown", (pointer) => {
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
    this.updateObjectsCounter();

    // Play success sound
    console.log("GameScene: Attempting to play success sound...");
    if (this.sound) {
      // Check if the sound exists in the cache
      // if (this.sound.exists("success")) {
      //   this.sound.play("success");
      //   console.log("GameScene: Success sound played");
      // } else {
      //   console.warn("GameScene: Success sound not found in cache");
      //   // Try to play anyway - Phaser might handle it gracefully
      //   try {
      //     this.sound.play("success");
      //     console.log("GameScene: Direct play attempt completed");
      //   } catch (error) {
      //     console.error("GameScene: Error playing sound:", error);
      //   }
      // }
    } else {
      console.warn("GameScene: Scene sound system not available");
    }

    // Show found message
    this.showFoundMessage(object);

    // Check if level is complete
    if (this.currentLevel && this.currentLevel.requiredObjects) {
      if (this.foundObjects.length >= this.currentLevel.requiredObjects) {
        this.levelComplete();
      }
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
    // Mark level as completed
    if (this.game.levelManager) {
      this.game.levelManager.completeCurrentLevel();
    } else {
      console.error("GameScene: LevelManager not available");
    }

    // Transition to level complete scene
    this.scene.start("LevelCompleteScene", {
      level: this.currentLevel,
    });
  }

  /**
   * Game over
   */
  gameOver() {
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
   * Restart current level
   */
  restartLevel() {
    this.scene.restart();
  }

  /**
   * Show a random hint for an unfound object
   */
  showRandomHint() {
    const unfoundObjects = this.hiddenObjects.filter((obj) => !obj.isFound);
    if (unfoundObjects.length > 0) {
      const randomObject =
        unfoundObjects[Math.floor(Math.random() * unfoundObjects.length)];
      randomObject.showHint();
    }
  }

  /**
   * Update progress bar
   */
  updateProgressBar() {
    if (!this.progressBar || !this.currentLevel || !this.currentLevel.objects) {
      return;
    }

    const width = this.cameras.main.width;
    const progress =
      this.foundObjects.length / this.currentLevel.objects.length;

    // Clear previous progress bar
    this.progressBar.clear();

    // Background bar
    this.progressBar.fillStyle(0x333333, 0.5).fillRect(10, 40, width - 20, 10);

    // Progress bar
    this.progressBar
      .fillStyle(0x00ff00, 1)
      .fillRect(10, 40, (width - 20) * progress, 10);
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

    // Hover effects
    button.on("pointerover", () => {
      bg.clear().fillStyle(0x5aa0f2, 1).fillRoundedRect(-50, -20, 100, 40, 5);
    });

    button.on("pointerout", () => {
      bg.clear().fillStyle(0x4a90e2, 1).fillRoundedRect(-50, -20, 100, 40, 5);
    });

    // Click effect
    button.on("pointerdown", () => {
      if (this.game.sound && this.game.sound.exists("click")) {
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
