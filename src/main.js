/**
 * Lost Little Things - Main Game Entry Point
 * Initializes Phaser 3 and manages the game lifecycle
 */

import { BootScene } from "./scenes/BootScene.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { GameScene } from "./scenes/GameScene.js";
import { LevelCompleteScene } from "./scenes/LevelCompleteScene.js";
import { GameConfig } from "./core/GameConfig.js";
import { LevelManager } from "./core/LevelManager.js";

/**
 * Main game class that manages the Phaser game instance
 */
class LostLittleThings {
  constructor() {
    this.game = null;
    this.isInitialized = false;
    this.initTimeout = null;
    this.init();
  }

  /**
   * Initialize the game
   */
  init() {
    try {
      // Set up initialization timeout
      this.initTimeout = setTimeout(() => {
        console.warn("Game initialization timed out - forcing initialization");
        this.forceInitialization();
      }, 15000); // 15 second timeout

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
      this.game.levelManager = new LevelManager(this.game);

      // Initialize the level manager
      this.game.levelManager
        .initialize()
        .then(() => {
          console.log("LevelManager initialized successfully");
        })
        .catch((error) => {
          console.error("Failed to initialize LevelManager:", error);
        });

      console.log("Game initialization completed");

      this.isInitialized = true;

      // Clear timeout since initialization succeeded
      if (this.initTimeout) {
        clearTimeout(this.initTimeout);
        this.initTimeout = null;
      }

      // Hide loading message
      const loadingElement = document.getElementById("loading");
      if (loadingElement) {
        loadingElement.style.display = "none";
      }

      console.log("Lost Little Things initialized successfully!");
    } catch (error) {
      console.error("Failed to initialize Lost Little Things:", error);
      this.showError(error.message);
    }
  }

  /**
   * Force initialization if timeout occurs
   */
  forceInitialization() {
    console.warn("Forcing game initialization due to timeout");

    // Hide loading message
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
      loadingElement.style.display = "none";
    }

    // Show a message about the timeout
    const container = document.getElementById("game-container");
    const timeoutDiv = document.createElement("div");
    timeoutDiv.className = "timeout-message";
    timeoutDiv.innerHTML = `
      <h3>Game Loading Timeout</h3>
      <p>The game took too long to load. This might be due to a large audio file.</p>
      <p>Please refresh the page to try again, or check your internet connection.</p>
      <button onclick="location.reload()">Refresh Page</button>
    `;

    container.appendChild(timeoutDiv);
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
  window.lostLittleThings = new LostLittleThings();
});

// Export for module usage
export { LostLittleThings };

// Global cache clearing function for development
window.clearGameCache = function () {
  // Clear localStorage
  localStorage.removeItem("lost-little-things_progress");
  localStorage.removeItem("lost-little-things_settings");

  // Clear browser cache for this page
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }

  // Reload the page
  window.location.reload(true);
};
