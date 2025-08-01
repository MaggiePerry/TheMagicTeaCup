/**
 * Level Manager Class
 * Manages level loading, progression, and state
 */

export class LevelManager {
  constructor(game) {
    this.game = game;
    this.levels = [];
    this.currentLevel = 0;
    this.completedLevels = new Set();
    this.levelData = null;
    this.isInitialized = false;
  }

  /**
   * Initialize the level manager
   * @returns {Promise} Promise that resolves when initialization is complete
   */
  async initialize() {
    try {
      // Load level data from JSON
      await this.loadLevelData();

      // Load saved progress
      this.loadProgress();

      this.isInitialized = true;
      console.log("LevelManager initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize LevelManager:", error);
      return false;
    }
  }

  /**
   * Load level data from JSON file
   * @returns {Promise} Promise that resolves when data is loaded
   */
  async loadLevelData() {
    return new Promise((resolve, reject) => {
      this.game.load.json("levels", "assets/data/levels.json");

      this.game.load.once("complete", () => {
        try {
          this.levelData = this.game.cache.json.get("levels");
          this.levels = this.levelData.levels || [];
          console.log(`Loaded ${this.levels.length} levels`);
          resolve();
        } catch (error) {
          console.error("Failed to parse level data:", error);
          reject(error);
        }
      });

      this.game.load.once("loaderror", (file) => {
        console.error("Failed to load level data:", file);
        reject(new Error("Failed to load level data"));
      });

      this.game.load.start();
    });
  }

  /**
   * Get current level data
   * @returns {Object|null} Current level data or null if not available
   */
  getCurrentLevel() {
    if (this.levels.length === 0 || this.currentLevel >= this.levels.length) {
      return null;
    }
    return this.levels[this.currentLevel];
  }

  /**
   * Get level by index
   * @param {number} index - Level index
   * @returns {Object|null} Level data or null if not found
   */
  getLevel(index) {
    if (index >= 0 && index < this.levels.length) {
      return this.levels[index];
    }
    return null;
  }

  /**
   * Get total number of levels
   * @returns {number} Total number of levels
   */
  getTotalLevels() {
    return this.levels.length;
  }

  /**
   * Get current level index
   * @returns {number} Current level index
   */
  getCurrentLevelIndex() {
    return this.currentLevel;
  }

  /**
   * Set current level
   * @param {number} levelIndex - Level index to set
   * @returns {boolean} True if level was set successfully
   */
  setCurrentLevel(levelIndex) {
    if (levelIndex >= 0 && levelIndex < this.levels.length) {
      this.currentLevel = levelIndex;
      this.saveProgress();
      return true;
    }
    return false;
  }

  /**
   * Go to next level
   * @returns {boolean} True if moved to next level, false if at last level
   */
  nextLevel() {
    if (this.currentLevel < this.levels.length - 1) {
      this.currentLevel++;
      this.saveProgress();
      return true;
    }
    return false;
  }

  /**
   * Go to previous level
   * @returns {boolean} True if moved to previous level, false if at first level
   */
  previousLevel() {
    if (this.currentLevel > 0) {
      this.currentLevel--;
      this.saveProgress();
      return true;
    }
    return false;
  }

  /**
   * Mark current level as completed
   */
  completeCurrentLevel() {
    this.completedLevels.add(this.currentLevel);
    this.saveProgress();
  }

  /**
   * Check if level is completed
   * @param {number} levelIndex - Level index to check
   * @returns {boolean} True if level is completed
   */
  isLevelCompleted(levelIndex) {
    return this.completedLevels.has(levelIndex);
  }

  /**
   * Check if current level is completed
   * @returns {boolean} True if current level is completed
   */
  isCurrentLevelCompleted() {
    return this.isLevelCompleted(this.currentLevel);
  }

  /**
   * Get completion percentage
   * @returns {number} Completion percentage (0-100)
   */
  getCompletionPercentage() {
    if (this.levels.length === 0) return 0;
    return Math.round((this.completedLevels.size / this.levels.length) * 100);
  }

  /**
   * Get unlocked levels
   * @returns {Array} Array of unlocked level indices
   */
  getUnlockedLevels() {
    const unlocked = [];
    for (let i = 0; i < this.levels.length; i++) {
      if (i === 0 || this.isLevelCompleted(i - 1)) {
        unlocked.push(i);
      }
    }
    return unlocked;
  }

  /**
   * Check if level is unlocked
   * @param {number} levelIndex - Level index to check
   * @returns {boolean} True if level is unlocked
   */
  isLevelUnlocked(levelIndex) {
    if (levelIndex === 0) return true;
    return this.isLevelCompleted(levelIndex - 1);
  }

  /**
   * Reset all progress
   */
  resetProgress() {
    this.currentLevel = 0;
    this.completedLevels.clear();
    this.saveProgress();
  }

  /**
   * Save progress to localStorage
   */
  saveProgress() {
    try {
      const progress = {
        currentLevel: this.currentLevel,
        completedLevels: Array.from(this.completedLevels),
        timestamp: Date.now(),
      };
      localStorage.setItem("theMagicTeaCup_progress", JSON.stringify(progress));
    } catch (error) {
      console.warn("Could not save progress to localStorage:", error);
    }
  }

  /**
   * Load progress from localStorage
   */
  loadProgress() {
    try {
      const saved = localStorage.getItem("theMagicTeaCup_progress");
      if (saved) {
        const progress = JSON.parse(saved);
        this.currentLevel = progress.currentLevel || 0;
        this.completedLevels = new Set(progress.completedLevels || []);

        // Validate current level
        if (this.currentLevel >= this.levels.length) {
          this.currentLevel = 0;
        }
      }
    } catch (error) {
      console.warn("Could not load progress from localStorage:", error);
    }
  }

  /**
   * Get level statistics
   * @returns {Object} Level statistics
   */
  getStatistics() {
    return {
      totalLevels: this.levels.length,
      completedLevels: this.completedLevels.size,
      currentLevel: this.currentLevel,
      completionPercentage: this.getCompletionPercentage(),
      unlockedLevels: this.getUnlockedLevels().length,
    };
  }

  /**
   * Validate level data
   * @param {Object} levelData - Level data to validate
   * @returns {boolean} True if level data is valid
   */
  validateLevelData(levelData) {
    if (!levelData || typeof levelData !== "object") {
      return false;
    }

    const requiredFields = [
      "id",
      "name",
      "description",
      "objects",
      "background",
    ];
    for (const field of requiredFields) {
      if (!levelData.hasOwnProperty(field)) {
        console.error(`Level data missing required field: ${field}`);
        return false;
      }
    }

    if (!Array.isArray(levelData.objects)) {
      console.error("Level objects must be an array");
      return false;
    }

    return true;
  }

  /**
   * Add a new level
   * @param {Object} levelData - Level data to add
   * @returns {boolean} True if level was added successfully
   */
  addLevel(levelData) {
    if (this.validateLevelData(levelData)) {
      this.levels.push(levelData);
      return true;
    }
    return false;
  }

  /**
   * Get level difficulty
   * @param {number} levelIndex - Level index
   * @returns {string} Difficulty level ('easy', 'medium', 'hard')
   */
  getLevelDifficulty(levelIndex) {
    const level = this.getLevel(levelIndex);
    if (!level) return "easy";

    const objectCount = level.objects.length;
    const timeLimit = level.timeLimit || 0;

    if (objectCount <= 3 && timeLimit >= 120) return "easy";
    if (objectCount <= 5 && timeLimit >= 90) return "medium";
    return "hard";
  }
}
