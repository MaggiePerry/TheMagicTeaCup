/**
 * Asset Loader Class
 * Manages loading and caching of game assets
 */

export class AssetLoader {
  constructor(game) {
    this.game = game;
    this.loadedAssets = new Set();
    this.failedAssets = new Set();
    this.loadingPromises = new Map();
  }

  /**
   * Load all game assets
   * @returns {Promise} Promise that resolves when all assets are loaded
   */
  async loadAllAssets() {
    const loadPromises = [this.loadImages(), this.loadAudio(), this.loadData()];

    try {
      await Promise.all(loadPromises);
      console.log("All assets loaded successfully");
      return true;
    } catch (error) {
      console.error("Failed to load assets:", error);
      return false;
    }
  }

  /**
   * Load image assets
   * @returns {Promise} Promise that resolves when images are loaded
   */
  loadImages() {
    return new Promise((resolve, reject) => {
      const images = [
        { key: "background", url: "assets/images/background.png" },
        { key: "teacup", url: "assets/images/teacup.png" },
        { key: "spoon", url: "assets/images/spoon.png" },
        { key: "sugar", url: "assets/images/sugar.png" },
        { key: "milk", url: "assets/images/milk.png" },
        { key: "button", url: "assets/images/button.png" },
        { key: "ui-panel", url: "assets/images/ui-panel.png" },
      ];

      let loadedCount = 0;
      const totalImages = images.length;

      images.forEach((image) => {
        this.game.load.image(image.key, image.url);
        this.loadingPromises.set(
          image.key,
          new Promise((imgResolve, imgReject) => {
            this.game.load.once("complete", () => {
              this.loadedAssets.add(image.key);
              loadedCount++;
              imgResolve();
            });

            this.game.load.once("loaderror", (file) => {
              if (file.key === image.key) {
                this.failedAssets.add(image.key);
                console.warn(`Failed to load image: ${image.key}`);
                imgReject(new Error(`Failed to load image: ${image.key}`));
              }
            });
          })
        );
      });

      this.game.load.once("complete", () => {
        if (loadedCount === totalImages) {
          resolve();
        }
      });

      this.game.load.start();
    });
  }

  /**
   * Load audio assets
   * @returns {Promise} Promise that resolves when audio is loaded
   */
  loadAudio() {
    return new Promise((resolve, reject) => {
      const audioFiles = [
        { key: "click", url: "assets/audio/click.mp3" },
        { key: "success", url: "assets/audio/success.mp3" },
        { key: "background-music", url: "assets/audio/background-music.mp3" },
        { key: "level-complete", url: "assets/audio/level-complete.mp3" },
      ];

      let loadedCount = 0;
      const totalAudio = audioFiles.length;

      audioFiles.forEach((audio) => {
        this.game.load.audio(audio.key, audio.url);
        this.loadingPromises.set(
          audio.key,
          new Promise((audioResolve, audioReject) => {
            this.game.load.once("complete", () => {
              this.loadedAssets.add(audio.key);
              loadedCount++;
              audioResolve();
            });

            this.game.load.once("loaderror", (file) => {
              if (file.key === audio.key) {
                this.failedAssets.add(audio.key);
                console.warn(`Failed to load audio: ${audio.key}`);
                audioReject(new Error(`Failed to load audio: ${audio.key}`));
              }
            });
          })
        );
      });

      this.game.load.once("complete", () => {
        if (loadedCount === totalAudio) {
          resolve();
        }
      });

      this.game.load.start();
    });
  }

  /**
   * Load data files
   * @returns {Promise} Promise that resolves when data is loaded
   */
  loadData() {
    return new Promise((resolve, reject) => {
      const dataFiles = [
        { key: "levels", url: "assets/data/levels.json" },
        { key: "ui-text", url: "assets/data/ui-text.json" },
      ];

      let loadedCount = 0;
      const totalData = dataFiles.length;

      dataFiles.forEach((data) => {
        this.game.load.json(data.key, data.url);
        this.loadingPromises.set(
          data.key,
          new Promise((dataResolve, dataReject) => {
            this.game.load.once("complete", () => {
              this.loadedAssets.add(data.key);
              loadedCount++;
              dataResolve();
            });

            this.game.load.once("loaderror", (file) => {
              if (file.key === data.key) {
                this.failedAssets.add(data.key);
                console.warn(`Failed to load data: ${data.key}`);
                dataReject(new Error(`Failed to load data: ${data.key}`));
              }
            });
          })
        );
      });

      this.game.load.once("complete", () => {
        if (loadedCount === totalData) {
          resolve();
        }
      });

      this.game.load.start();
    });
  }

  /**
   * Check if an asset is loaded
   * @param {string} key - Asset key
   * @returns {boolean} True if asset is loaded
   */
  isAssetLoaded(key) {
    return this.loadedAssets.has(key);
  }

  /**
   * Check if an asset failed to load
   * @param {string} key - Asset key
   * @returns {boolean} True if asset failed to load
   */
  isAssetFailed(key) {
    return this.failedAssets.has(key);
  }

  /**
   * Get loading progress
   * @returns {number} Loading progress (0-1)
   */
  getLoadingProgress() {
    const total = this.loadedAssets.size + this.failedAssets.size;
    return total > 0 ? this.loadedAssets.size / total : 0;
  }

  /**
   * Get failed assets
   * @returns {Set} Set of failed asset keys
   */
  getFailedAssets() {
    return new Set(this.failedAssets);
  }

  /**
   * Retry loading failed assets
   * @returns {Promise} Promise that resolves when retry is complete
   */
  async retryFailedAssets() {
    const failedKeys = Array.from(this.failedAssets);
    this.failedAssets.clear();

    // Re-add failed assets to loading queue
    failedKeys.forEach((key) => {
      if (key.includes(".mp3") || key.includes(".wav")) {
        this.game.load.audio(key, `assets/audio/${key}`);
      } else if (key.includes(".json")) {
        this.game.load.json(key, `assets/data/${key}`);
      } else {
        this.game.load.image(key, `assets/images/${key}`);
      }
    });

    return new Promise((resolve) => {
      this.game.load.once("complete", () => {
        resolve();
      });
      this.game.load.start();
    });
  }

  /**
   * Clear asset cache
   */
  clearCache() {
    this.loadedAssets.clear();
    this.failedAssets.clear();
    this.loadingPromises.clear();
    this.game.cache.removeAll();
  }
}
