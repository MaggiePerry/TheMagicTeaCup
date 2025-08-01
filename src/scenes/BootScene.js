/**
 * Boot Scene
 * Handles initial loading and asset preparation
 */

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    // Create loading bar
    this.createLoadingBar();

    // Load essential assets
    this.loadEssentialAssets();
  }

  create() {
    console.log("BootScene: Assets loaded, transitioning to MenuScene");
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
   * Load essential assets
   */
  loadEssentialAssets() {
    // Load placeholder images (will be replaced with actual assets)
    this.load.image(
      "placeholder",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    );

    // Load basic UI elements
    this.load.image(
      "button",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    );
    this.load.image(
      "background",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    );

    // Load sample objects for testing
    this.load.image(
      "teacup",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    );
    this.load.image(
      "spoon",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    );

    // Load audio placeholders
    this.load.audio(
      "click",
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
    );
    this.load.audio(
      "success",
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
    );

    // Load level data
    this.load.json("levels", "assets/data/levels.json");
    this.load.json("ui-text", "assets/data/ui-text.json");
  }
}
