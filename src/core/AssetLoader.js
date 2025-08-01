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
    this.loadingTimeouts = new Map();
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
      let hasError = false;

      // Set timeout for entire image loading
      const timeout = setTimeout(() => {
        if (!hasError) {
          console.warn("Image loading timed out");
          reject(new Error("Image loading timed out"));
        }
      }, 15000); // 15 second timeout

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
                hasError = true;
                imgReject(new Error(`Failed to load image: ${image.key}`));
              }
            });
          })
        );
      });

      this.game.load.once("complete", () => {
        clearTimeout(timeout);
        if (loadedCount === totalImages) {
          resolve();
        }
      });

      this.game.load.start();
    });
  }

  /**
   * Load audio assets (excluding large files)
   * @returns {Promise} Promise that resolves when audio is loaded
   */
  loadAudio() {
    return new Promise((resolve, reject) => {
      // Only load small audio files initially
      const audioFiles = [
        { key: "click", url: "assets/audio/click.wav" },
        { key: "success", url: "assets/audio/success.mp3" },
        { key: "level-complete", url: "assets/audio/level-complete.wav" },
      ];

      let loadedCount = 0;
      const totalAudio = audioFiles.length;
      let hasError = false;

      // Set timeout for audio loading
      const timeout = setTimeout(() => {
        if (!hasError) {
          console.warn("Audio loading timed out");
          reject(new Error("Audio loading timed out"));
        }
      }, 20000); // 20 second timeout

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
                hasError = true;
                audioReject(new Error(`Failed to load audio: ${audio.key}`));
              }
            });
          })
        );
      });

      this.game.load.once("complete", () => {
        clearTimeout(timeout);
        if (loadedCount === totalAudio) {
          resolve();
        }
      });

      this.game.load.start();
    });
  }

  /**
   * Load large audio files separately
   * @returns {Promise} Promise that resolves when large audio is loaded
   */
  loadLargeAudio() {
    return new Promise((resolve, reject) => {
      const largeAudioFiles = [
        { key: "background-music", url: "assets/audio/background-music.wav" },
      ];

      let loadedCount = 0;
      const totalAudio = largeAudioFiles.length;

      // Set longer timeout for large files
      const timeout = setTimeout(() => {
        console.warn("Large audio loading timed out");
        reject(new Error("Large audio loading timed out"));
      }, 60000); // 60 second timeout

      largeAudioFiles.forEach((audio) => {
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
                console.warn(`Failed to load large audio: ${audio.key}`);
                audioReject(
                  new Error(`Failed to load large audio: ${audio.key}`)
                );
              }
            });
          })
        );
      });

      this.game.load.once("complete", () => {
        clearTimeout(timeout);
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
      let hasError = false;

      // Set timeout for data loading
      const timeout = setTimeout(() => {
        if (!hasError) {
          console.warn("Data loading timed out");
          reject(new Error("Data loading timed out"));
        }
      }, 10000); // 10 second timeout

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
                hasError = true;
                dataReject(new Error(`Failed to load data: ${data.key}`));
              }
            });
          })
        );
      });

      this.game.load.once("complete", () => {
        clearTimeout(timeout);
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
    this.loadingTimeouts.clear();
    this.game.cache.removeAll();
  }
}
