/**
 * Level Complete Scene
 * Shows level completion results and progression options
 */

export class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super({ key: "LevelCompleteScene" });
    this.levelData = null;
    this.timeRemaining = 0;
    this.score = 0;
    this.perfect = false;
  }

  init(data) {
    this.levelData = data.level;
    this.timeRemaining = data.timeRemaining;
    this.score = data.score;
    this.perfect = data.perfect;
  }

  create() {
    this.createBackground();
    this.createCompletionMessage();
    this.createScoreDisplay();
    this.createButtons();

    // Play completion sound
    if (this.game.sound && this.game.sound.get("level-complete")) {
      this.game.sound.play("level-complete");
    }
  }

  /**
   * Create background
   */
  createBackground() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create gradient background
    this.add
      .graphics()
      .fillGradientStyle(0x4a90e2, 0x4a90e2, 0x5ba0f2, 0x5ba0f2, 1)
      .fillRect(0, 0, width, height);

    // Add celebration particles
    this.createCelebrationParticles();
  }

  /**
   * Create celebration particles
   */
  createCelebrationParticles() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create particle emitter
    const particles = this.add.particles("placeholder");

    const emitter = particles.createEmitter({
      x: { min: 0, max: width },
      y: -50,
      speedY: { min: 100, max: 200 },
      speedX: { min: -50, max: 50 },
      scale: { start: 0.5, end: 0 },
      alpha: { start: 1, end: 0 },
      lifespan: 3000,
      frequency: 100,
    });

    // Stop emitter after 5 seconds
    this.time.delayedCall(5000, () => {
      emitter.stop();
    });
  }

  /**
   * Create completion message
   */
  createCompletionMessage() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Main title
    this.add
      .text(width / 2, height * 0.2, "Level Complete!", {
        fontSize: "48px",
        fill: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Congratulations message
    this.add
      .text(width / 2, height * 0.2 + 60, "Congratulations!", {
        fontSize: "24px",
        fill: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "italic",
      })
      .setOrigin(0.5);

    // Perfect score message
    if (this.perfect) {
      this.add
        .text(width / 2, height * 0.2 + 100, "Perfect Score!", {
          fontSize: "20px",
          fill: "#ffff00",
          fontFamily: "Arial",
          fontStyle: "bold",
        })
        .setOrigin(0.5);
    }
  }

  /**
   * Create score display
   */
  createScoreDisplay() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create score panel
    const scorePanel = this.add
      .graphics()
      .fillStyle(0xffffff, 0.2)
      .fillRoundedRect(width / 2 - 150, height * 0.4, 300, 120, 10)
      .lineStyle(2, 0xffffff, 1)
      .strokeRoundedRect(width / 2 - 150, height * 0.4, 300, 120, 10);

    // Time bonus
    const timeBonus = Math.floor(this.timeRemaining * 10);
    this.add
      .text(width / 2, height * 0.4 + 20, `Time Bonus: +${timeBonus}`, {
        fontSize: "18px",
        fill: "#00ff00",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Perfect bonus
    if (this.perfect) {
      this.add
        .text(width / 2, height * 0.4 + 50, "Perfect Bonus: +100", {
          fontSize: "18px",
          fill: "#ffff00",
          fontFamily: "Arial",
          fontStyle: "bold",
        })
        .setOrigin(0.5);
    }

    // Total score
    this.add
      .text(width / 2, height * 0.4 + 80, `Total Score: ${this.score}`, {
        fontSize: "24px",
        fill: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
  }

  /**
   * Create buttons
   */
  createButtons() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const buttonY = height * 0.7;
    const buttonSpacing = 120;

    // Next Level button
    const nextLevelButton = this.createButton(
      width / 2 - buttonSpacing,
      buttonY,
      "Next Level",
      () => this.nextLevel()
    );

    // Replay button
    const replayButton = this.createButton(width / 2, buttonY, "Replay", () =>
      this.replayLevel()
    );

    // Menu button
    const menuButton = this.createButton(
      width / 2 + buttonSpacing,
      buttonY,
      "Menu",
      () => this.goToMenu()
    );

    this.buttons = [nextLevelButton, replayButton, menuButton];
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
      .fillRoundedRect(-80, -25, 160, 50, 10)
      .lineStyle(2, 0xffffff, 1)
      .strokeRoundedRect(-80, -25, 160, 50, 10);

    // Button text
    const textObj = this.add
      .text(0, 0, text, {
        fontSize: "16px",
        fill: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    button.add([bg, textObj]);

    // Make interactive
    button.setSize(160, 50);
    button.setInteractive();

    // Hover effects
    button.on("pointerover", () => {
      bg.clear()
        .fillStyle(0x5ba0f2, 1)
        .fillRoundedRect(-80, -25, 160, 50, 10)
        .lineStyle(2, 0xffffff, 1)
        .strokeRoundedRect(-80, -25, 160, 50, 10);
    });

    button.on("pointerout", () => {
      bg.clear()
        .fillStyle(0x4a90e2, 1)
        .fillRoundedRect(-80, -25, 160, 50, 10)
        .lineStyle(2, 0xffffff, 1)
        .strokeRoundedRect(-80, -25, 160, 50, 10);
    });

    // Click effect
    button.on("pointerdown", () => {
      bg.clear()
        .fillStyle(0x3a80d2, 1)
        .fillRoundedRect(-80, -25, 160, 50, 10)
        .lineStyle(2, 0xffffff, 1)
        .strokeRoundedRect(-80, -25, 160, 50, 10);
    });

    button.on("pointerup", () => {
      bg.clear()
        .fillStyle(0x5ba0f2, 1)
        .fillRoundedRect(-80, -25, 160, 50, 10)
        .lineStyle(2, 0xffffff, 1)
        .strokeRoundedRect(-80, -25, 160, 50, 10);

      // Play click sound
      if (this.game.sound && this.game.sound.get("click")) {
        this.game.sound.play("click");
      }

      callback();
    });

    return button;
  }

  /**
   * Go to next level
   */
  nextLevel() {
    if (this.game.levelManager) {
      const hasNext = this.game.levelManager.nextLevel();
      if (hasNext) {
        console.log("LevelCompleteScene: Starting next level");
        this.scene.start("GameScene");
      } else {
        console.log("LevelCompleteScene: No more levels, going to menu");
        this.scene.start("MenuScene");
      }
    } else {
      console.error("LevelCompleteScene: LevelManager not available");
      this.scene.start("MenuScene");
    }
  }

  /**
   * Replay current level
   */
  replayLevel() {
    console.log("LevelCompleteScene: Replaying level");
    this.scene.start("GameScene");
  }

  /**
   * Go to main menu
   */
  goToMenu() {
    console.log("LevelCompleteScene: Going to menu");
    this.scene.start("MenuScene");
  }
}
