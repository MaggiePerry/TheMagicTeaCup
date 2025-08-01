/**
 * TheMagicTeaCup - Main Game Entry Point
 * Initializes Phaser 3 and manages the game lifecycle
 */

import { BootScene } from "./scenes/BootScene.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { GameScene } from "./scenes/GameScene.js";
import { LevelCompleteScene } from "./scenes/LevelCompleteScene.js";
import { GameConfig } from "./core/GameConfig.js";
import { AssetLoader } from "./core/AssetLoader.js";
import { LevelManager } from "./core/LevelManager.js";

/**
 * Main game class that manages the Phaser game instance
 */
class TheMagicTeaCup {
  constructor() {
    this.game = null;
    this.isInitialized = false;
    this.init();
  }

  /**
   * Initialize the game
   */
  init() {
    try {
      // Check if Phaser is loaded
      if (typeof Phaser === "undefined") {
        throw new Error(
          "Phaser 3 is not loaded. Please check your internet connection."
        );
      }

      // Create game configuration
      const config = new GameConfig();
      const gameConfig = config.getConfig();

      // Initialize the game
      this.game = new Phaser.Game(gameConfig);

      // Store references to core systems
      this.game.assetLoader = new AssetLoader(this.game);
      this.game.levelManager = new LevelManager(this.game);

      this.isInitialized = true;

      // Hide loading message
      const loadingElement = document.getElementById("loading");
      if (loadingElement) {
        loadingElement.style.display = "none";
      }

      console.log("TheMagicTeaCup initialized successfully!");
    } catch (error) {
      console.error("Failed to initialize TheMagicTeaCup:", error);
      this.showError(error.message);
    }
  }

  /**
   * Show error message to user
   * @param {string} message - Error message to display
   */
  showError(message) {
    const container = document.getElementById("game-container");
    const loadingElement = document.getElementById("loading");

    if (loadingElement) {
      loadingElement.style.display = "none";
    }

    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.innerHTML = `
            <h3>Game Loading Error</h3>
            <p>${message}</p>
            <p>Please refresh the page to try again.</p>
        `;

    container.appendChild(errorDiv);
  }

  /**
   * Get the game instance
   * @returns {Phaser.Game} The Phaser game instance
   */
  getGame() {
    return this.game;
  }

  /**
   * Check if game is initialized
   * @returns {boolean} True if game is initialized
   */
  isGameInitialized() {
    return this.isInitialized;
  }
}

// Initialize the game when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.theMagicTeaCup = new TheMagicTeaCup();
});

// Export for module usage
export { TheMagicTeaCup };
