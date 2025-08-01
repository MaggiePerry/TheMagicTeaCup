/**
 * Game Configuration Class
 * Manages Phaser 3 configuration and game settings
 */

import { BootScene } from "../scenes/BootScene.js";
import { MenuScene } from "../scenes/MenuScene.js";
import { GameScene } from "../scenes/GameScene.js";
import { LevelCompleteScene } from "../scenes/LevelCompleteScene.js";

export class GameConfig {
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#87CEEB",
      parent: "game-container",
      dom: {
        createContainer: true,
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
      },
      scene: [BootScene, MenuScene, GameScene, LevelCompleteScene],
      render: {
        pixelArt: false,
        antialias: true,
      },
      audio: {
        disableWebAudio: false,
      },
      fps: {
        target: 60,
        forceSetTimeOut: true,
      },
    };

    // Game-specific settings
    this.gameSettings = {
      debug: false,
      soundEnabled: true,
      musicEnabled: true,
      difficulty: "normal",
      language: "en",
    };
  }

  /**
   * Get the complete Phaser configuration
   * @returns {Object} Phaser game configuration
   */
  getConfig() {
    return this.config;
  }

  /**
   * Get game settings
   * @returns {Object} Game settings
   */
  getGameSettings() {
    return this.gameSettings;
  }

  /**
   * Update game settings
   * @param {Object} settings - New settings to apply
   */
  updateGameSettings(settings) {
    this.gameSettings = { ...this.gameSettings, ...settings };
    this.saveSettings();
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem(
        "lost-little-things_settings",
        JSON.stringify(this.gameSettings)
      );
    } catch (error) {
      console.warn("Could not save settings to localStorage:", error);
    }
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    try {
      const saved = localStorage.getItem("lost-little-things_settings");
      if (saved) {
        this.gameSettings = { ...this.gameSettings, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn("Could not load settings from localStorage:", error);
    }
  }

  /**
   * Reset settings to defaults
   */
  resetSettings() {
    this.gameSettings = {
      debug: false,
      soundEnabled: true,
      musicEnabled: true,
      difficulty: "normal",
      language: "en",
    };
    this.saveSettings();
  }

  /**
   * Get a specific setting
   * @param {string} key - Setting key
   * @returns {*} Setting value
   */
  getSetting(key) {
    return this.gameSettings[key];
  }

  /**
   * Set a specific setting
   * @param {string} key - Setting key
   * @param {*} value - Setting value
   */
  setSetting(key, value) {
    this.gameSettings[key] = value;
    this.saveSettings();
  }

  /**
   * Toggle debug mode
   */
  toggleDebug() {
    this.gameSettings.debug = !this.gameSettings.debug;
    this.saveSettings();

    // Update physics debug if game is running
    if (window.lostLittleThings && window.lostLittleThings.getGame()) {
      const game = window.lostLittleThings.getGame();
      if (game.scene.scenes.length > 0) {
        const currentScene = game.scene.getScene("GameScene");
        if (currentScene && currentScene.physics) {
          currentScene.physics.world.drawDebug = this.gameSettings.debug;
        }
      }
    }
  }
}
