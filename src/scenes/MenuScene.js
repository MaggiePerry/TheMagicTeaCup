/**
 * Menu Scene
 * Main menu interface for the game
 */

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
    this.backgroundMusicLoaded = false;
  }

  create() {
    console.log("MenuScene: create() called");

    // Set up the menu background
    this.createBackground();

    // Create menu elements
    this.createMenuElements();

    // Load background music asynchronously (with error handling)
    try {
      this.loadBackgroundMusic();
    } catch (error) {
      console.warn("MenuScene: Background music loading failed:", error);
    }

    console.log("MenuScene: create() completed");
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
   * Create menu elements
   */
  createMenuElements() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Title
    this.add
      .text(centerX, centerY - 100, "Lost Little Things", {
        fontSize: "48px",
        fill: "#ffffff",
        fontFamily: "Arial",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    // Subtitle
    this.add
      .text(centerX, centerY - 50, "Find the Hidden Objects", {
        fontSize: "24px",
        fill: "#ffffff",
        fontFamily: "Arial",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0.5);

    // Start button
    const startButton = this.add
      .text(centerX, centerY + 50, "Start Game", {
        fontSize: "32px",
        fill: "#ffffff",
        fontFamily: "Arial",
        backgroundColor: "#4CAF50",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    // Button hover effects
    startButton.on("pointerover", () => {
      startButton.setStyle({ backgroundColor: "#45a049" });
    });

    startButton.on("pointerout", () => {
      startButton.setStyle({ backgroundColor: "#4CAF50" });
    });

    startButton.on("pointerdown", () => {
      this.startGame();
    });

    // Instructions
    this.add
      .text(
        centerX,
        centerY + 120,
        "Click 'Start Game' to begin your adventure!",
        {
          fontSize: "16px",
          fill: "#ffffff",
          fontFamily: "Arial",
        }
      )
      .setOrigin(0.5);
  }

  /**
   * Load background music asynchronously
   */
  loadBackgroundMusic() {
    // Skip background music loading for now to avoid potential issues
    // This can be re-enabled later if needed
    return;
  }

  /**
   * Load large background music file as fallback
   */
  loadLargeBackgroundMusic(loadingText, resolve, reject) {
    loadingText.setText("Loading large background music...");

    const timeout = setTimeout(() => {
      console.warn("Large background music loading timed out");
      this.createFallbackAudio();
      reject(new Error("Large background music loading timed out"));
    }, 15000); // 15 second timeout for large file

    this.load.audio("background-music", "assets/audio/background-music.wav");

    this.load.once("complete", () => {
      clearTimeout(timeout);
      this.backgroundMusicLoaded = true;
      resolve();
    });

    this.load.once("loaderror", (file) => {
      clearTimeout(timeout);
      console.warn(
        "MenuScene: Failed to load large background music:",
        file.key
      );
      this.createFallbackAudio();
      reject(new Error("Failed to load large background music"));
    });

    this.load.start();
  }

  /**
   * Create fallback audio if background music fails to load
   */
  createFallbackAudio() {
    try {
      // Create a simple beep sound as fallback
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.warn("MenuScene: Could not create fallback audio:", error);
    }
  }

  /**
   * Start the game
   */
  startGame() {
    // Play click sound if available
    try {
      if (this.cache.audio.exists("click")) {
        this.sound.play("click");
      }
    } catch (error) {
      console.warn("MenuScene: Could not play click sound:", error);
    }

    // Check if LevelManager is available
    if (this.game.levelManager) {
      if (this.game.levelManager.isInitialized) {
        // LevelManager is ready
      } else {
        // LevelManager is not initialized yet
      }
    } else {
      console.error("MenuScene: LevelManager is not available");
    }

    // Transition to game scene
    this.scene.start("GameScene");
  }
}
