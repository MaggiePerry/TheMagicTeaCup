/**
 * Boot Scene
 * Handles initial loading and asset preparation
 */

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
    this.essentialAssetsLoaded = false;
  }

  preload() {
    // Create loading bar
    this.createLoadingBar();

    // Load only essential assets first
    this.loadEssentialAssets();
  }

  create() {
    console.log("BootScene: create() called - transitioning to MenuScene");

    // Ensure sounds are properly loaded before transitioning
    const soundsToCheck = ["click", "success", "level-complete"];
    let allSoundsLoaded = true;

    // soundsToCheck.forEach((soundKey) => {
    //   if (!this.sound.exists(soundKey)) {
    //     console.warn(
    //       `BootScene: Sound ${soundKey} not found before transition`
    //     );
    //     allSoundsLoaded = false;
    //   }
    // });

    if (!allSoundsLoaded) {
      console.warn("BootScene: Some sounds not loaded, but continuing anyway");
    }

    // Always transition to MenuScene, even if some sounds failed to load
    console.log("BootScene: Starting MenuScene...");
    this.scene.start("MenuScene");
  }

  /**
   * Create loading bar UI
   */
  createLoadingBar() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create loading text
    this.loadingText = this.add
      .text(width / 2, height / 2 - 50, "Loading Lost Little Things...", {
        fontSize: "24px",
        fill: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    // Create progress bar background
    this.progressBarBg = this.add.graphics();
    this.progressBarBg.fillStyle(0x222222, 1);
    this.progressBarBg.fillRect(width / 2 - 150, height / 2, 300, 20);

    // Create progress bar
    this.progressBar = this.add.graphics();

    // Create progress text
    this.progressText = this.add
      .text(width / 2, height / 2 + 40, "0%", {
        fontSize: "16px",
        fill: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    // Set up loading events
    this.load.on("progress", (value) => {
      this.updateProgressBar(value);
    });

    this.load.on("complete", () => {
      this.progressText.setText("100%");

      // Debug: Check which sounds were loaded
      const loadedSounds = ["click", "success", "level-complete"];
      // loadedSounds.forEach((soundKey) => {
      //   if (this.sound && this.sound.exists(soundKey)) {
      //     console.log(`BootScene: Sound ${soundKey} loaded successfully`);
      //   } else {
      //     console.warn(`BootScene: Sound ${soundKey} failed to load`);
      //   }
      // });

      // Additional debugging for sound system
      console.log("BootScene: Sound system available:", !!this.sound);
      if (this.sound) {
        console.log("BootScene: Sound cache keys:", this.sound.getAllPlaying());
        console.log("BootScene: Sound manager keys:", Object.keys(this.sound));
      }

      this.essentialAssetsLoaded = true;
    });

    this.load.on("loaderror", (file) => {
      console.error("BootScene: Failed to load asset:", file.key, file.url);
    });
  }

  /**
   * Update progress bar
   * @param {number} value - Progress value (0-1)
   */
  updateProgressBar(value) {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Clear previous progress
    this.progressBar.clear();

    // Draw progress
    this.progressBar.fillStyle(0x00ff00, 1);
    this.progressBar.fillRect(width / 2 - 150, height / 2, 300 * value, 20);

    // Update text
    this.progressText.setText(Math.round(value * 100) + "%");
  }

  /**
   * Load essential assets only (excluding large audio files)
   */
  loadEssentialAssets() {
    // Load images with proper file paths
    this.load.image("background", "assets/images/background.png");
    this.load.image("teacup", "assets/images/teacup.png");
    this.load.image("spoon", "assets/images/spoon.png");
    this.load.image("sugar", "assets/images/sugar.png");
    this.load.image("milk", "assets/images/milk.png");

    // Load only small audio files for immediate use
    this.load.audio("click", "assets/audio/click.wav");
    this.load.audio("success", "assets/audio/success.mp3");
    this.load.audio("level-complete", "assets/audio/level-complete.wav");

    // Load level data
    this.load.json("levels", "assets/data/levels.json");
    this.load.json("ui-text", "assets/data/ui-text.json");
  }
}
