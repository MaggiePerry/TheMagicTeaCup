/**
 * Menu Scene
 * Main menu interface with navigation options
 */

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
    this.buttons = [];
  }

  create() {
    this.createBackground();
    this.createTitle();
    this.createMenuButtons();
    this.createFooter();

    // Initialize level manager if not already done
    if (this.game.levelManager && !this.game.levelManager.isInitialized) {
      this.game.levelManager.initialize();
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
      .fillGradientStyle(0x667eea, 0x667eea, 0x764ba2, 0x764ba2, 1)
      .fillRect(0, 0, width, height);

    // Add some decorative elements
    this.add
      .graphics()
      .fillStyle(0xffffff, 0.1)
      .fillCircle(width * 0.2, height * 0.3, 50)
      .fillCircle(width * 0.8, height * 0.7, 30);
  }

  /**
   * Create title
   */
  createTitle() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Main title
    this.add
      .text(width / 2, height * 0.2, "Lost Little Things", {
        fontSize: "48px",
        fill: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Subtitle
    this.add
      .text(width / 2, height * 0.2 + 60, "Find the Object Game", {
        fontSize: "20px",
        fill: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "italic",
      })
      .setOrigin(0.5);
  }

  /**
   * Create menu buttons
   */
  createMenuButtons() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const buttonY = height * 0.5;
    const buttonSpacing = 80;

    // Play button
    const playButton = this.createButton(width / 2, buttonY, "Play Game", () =>
      this.startGame()
    );

    // Level Select button
    const levelSelectButton = this.createButton(
      width / 2,
      buttonY + buttonSpacing,
      "Level Select",
      () => this.showLevelSelect()
    );

    // Settings button
    const settingsButton = this.createButton(
      width / 2,
      buttonY + buttonSpacing * 2,
      "Settings",
      () => this.showSettings()
    );

    // How to Play button
    const howToPlayButton = this.createButton(
      width / 2,
      buttonY + buttonSpacing * 3,
      "How to Play",
      () => this.showHowToPlay()
    );

    this.buttons = [
      playButton,
      levelSelectButton,
      settingsButton,
      howToPlayButton,
    ];
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
      .fillRoundedRect(-100, -25, 200, 50, 10)
      .lineStyle(2, 0xffffff, 1)
      .strokeRoundedRect(-100, -25, 200, 50, 10);

    // Button text
    const textObj = this.add
      .text(0, 0, text, {
        fontSize: "18px",
        fill: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    button.add([bg, textObj]);

    // Make interactive
    button.setSize(200, 50);
    button.setInteractive();

    // Hover effects
    button.on("pointerover", () => {
      bg.clear()
        .fillStyle(0x5ba0f2, 1)
        .fillRoundedRect(-100, -25, 200, 50, 10)
        .lineStyle(2, 0xffffff, 1)
        .strokeRoundedRect(-100, -25, 200, 50, 10);
    });

    button.on("pointerout", () => {
      bg.clear()
        .fillStyle(0x4a90e2, 1)
        .fillRoundedRect(-100, -25, 200, 50, 10)
        .lineStyle(2, 0xffffff, 1)
        .strokeRoundedRect(-100, -25, 200, 50, 10);
    });

    // Click effect
    button.on("pointerdown", () => {
      bg.clear()
        .fillStyle(0x3a80d2, 1)
        .fillRoundedRect(-100, -25, 200, 50, 10)
        .lineStyle(2, 0xffffff, 1)
        .strokeRoundedRect(-100, -25, 200, 50, 10);
    });

    button.on("pointerup", () => {
      bg.clear()
        .fillStyle(0x5ba0f2, 1)
        .fillRoundedRect(-100, -25, 200, 50, 10)
        .lineStyle(2, 0xffffff, 1)
        .strokeRoundedRect(-100, -25, 200, 50, 10);

      // Play click sound
      if (this.game.sound && this.game.sound.get("click")) {
        this.game.sound.play("click");
      }

      callback();
    });

    return button;
  }

  /**
   * Create footer
   */
  createFooter() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Version info
    this.add
      .text(width / 2, height - 30, "Version 1.0.0", {
        fontSize: "14px",
        fill: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    // Progress info
    if (this.game.levelManager) {
      const stats = this.game.levelManager.getStatistics();
      this.add
        .text(
          width / 2,
          height - 50,
          `Progress: ${stats.completionPercentage}%`,
          {
            fontSize: "14px",
            fill: "#ffffff",
            fontFamily: "Arial",
          }
        )
        .setOrigin(0.5);
    }
  }

  /**
   * Start the game
   */
  startGame() {
    console.log("MenuScene: Starting game");
    this.scene.start("GameScene");
  }

  /**
   * Show level select
   */
  showLevelSelect() {
    console.log("MenuScene: Show level select");
    // TODO: Implement level select scene
    this.showMessage("Level Select coming soon!");
  }

  /**
   * Show settings
   */
  showSettings() {
    console.log("MenuScene: Show settings");
    // TODO: Implement settings scene
    this.showMessage("Settings coming soon!");
  }

  /**
   * Show how to play
   */
  showHowToPlay() {
    console.log("MenuScene: Show how to play");
    this.showMessage(
      "How to Play:\n\n1. Find all hidden objects in the scene\n2. Click on objects to collect them\n3. Complete the level to progress\n4. Try to beat your best time!"
    );
  }

  /**
   * Show a message
   * @param {string} message - Message to display
   */
  showMessage(message) {
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
      .fillStyle(0x4a90e2, 1)
      .fillRoundedRect(width / 2 - 200, height / 2 - 100, 400, 200, 10)
      .lineStyle(2, 0xffffff, 1)
      .strokeRoundedRect(width / 2 - 200, height / 2 - 100, 400, 200, 10);

    // Create message text
    const messageText = this.add
      .text(width / 2, height / 2, message, {
        fontSize: "16px",
        fill: "#ffffff",
        fontFamily: "Arial",
        align: "center",
        wordWrap: { width: 350 },
      })
      .setOrigin(0.5);

    // Create close button
    const closeButton = this.createButton(
      width / 2,
      height / 2 + 60,
      "Close",
      () => {
        overlay.destroy();
        messageBox.destroy();
        messageText.destroy();
        closeButton.destroy();
      }
    );

    // Add to scene
    this.add.existing(closeButton);
  }
}
