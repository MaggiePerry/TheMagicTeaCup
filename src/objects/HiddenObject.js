/**
 * Hidden Object Class
 * Represents a clickable object in the find the object game
 */

export class HiddenObject {
  constructor(scene, objectData) {
    this.scene = scene;
    this.data = objectData;
    this.isFound = false;
    this.isVisible = true;
    this.name = objectData.id;
    this.x = objectData.x;
    this.y = objectData.y;
    this.width = objectData.width;
    this.height = objectData.height;
    this.hint = objectData.hint;

    this.createSprite();
    this.setupInteraction();
  }

  /**
   * Create the object sprite
   */
  createSprite() {
    // Check if the image exists in the cache
    const imageKey = this.data.image;
    if (this.scene.textures.exists(imageKey)) {
      // Use the actual image
      this.sprite = this.scene.add.image(this.x, this.y, imageKey);
      this.sprite.setDisplaySize(this.width, this.height);

      console.log(`HiddenObject: Using image ${imageKey} for ${this.name}`);
    } else {
      // Fallback to placeholder graphics
      console.warn(
        `HiddenObject: Image ${imageKey} not found, using placeholder for ${this.name}`
      );
      this.sprite = this.scene.add
        .graphics()
        .fillStyle(0x00ff00, 0.8)
        .fillRect(
          this.x - this.width / 2,
          this.y - this.height / 2,
          this.width,
          this.height
        )
        .lineStyle(2, 0xffffff, 1)
        .strokeRect(
          this.x - this.width / 2,
          this.y - this.height / 2,
          this.width,
          this.height
        );
    }

    // Add text label for debugging (only show if using placeholder)
    if (!this.scene.textures.exists(imageKey)) {
      this.label = this.scene.add
        .text(this.x, this.y, this.name, {
          fontSize: "12px",
          fill: "#ffffff",
          fontFamily: "Arial",
          fontStyle: "bold",
        })
        .setOrigin(0.5);
    }

    // Make interactive
    this.sprite.setInteractive(
      new Phaser.Geom.Rectangle(
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      ),
      Phaser.Geom.Rectangle.Contains
    );

    // Add hover effect
    this.sprite.on("pointerover", () => {
      if (!this.isFound) {
        if (this.scene.textures.exists(imageKey)) {
          // For images, add a tint effect
          this.sprite.setTint(0xffff00);
        } else {
          // For graphics, change the fill color
          this.sprite
            .clear()
            .fillStyle(0xffff00, 0.9)
            .fillRect(
              this.x - this.width / 2,
              this.y - this.height / 2,
              this.width,
              this.height
            )
            .lineStyle(3, 0xffffff, 1)
            .strokeRect(
              this.x - this.width / 2,
              this.y - this.height / 2,
              this.width,
              this.height
            );
        }
      }
    });

    this.sprite.on("pointerout", () => {
      if (!this.isFound) {
        if (this.scene.textures.exists(imageKey)) {
          // For images, clear the tint
          this.sprite.clearTint();
        } else {
          // For graphics, restore the original color
          this.sprite
            .clear()
            .fillStyle(0x00ff00, 0.8)
            .fillRect(
              this.x - this.width / 2,
              this.y - this.height / 2,
              this.width,
              this.height
            )
            .lineStyle(2, 0xffffff, 1)
            .strokeRect(
              this.x - this.width / 2,
              this.y - this.height / 2,
              this.width,
              this.height
            );
        }
      }
    });
  }

  /**
   * Setup interaction handling
   */
  setupInteraction() {
    this.sprite.on("pointerdown", () => {
      if (!this.isFound) {
        this.found();
      }
    });

    // Add hover hint
    this.sprite.on("pointerover", () => {
      if (!this.isFound) {
        this.showHint();
      }
    });
  }

  /**
   * Mark object as found
   */
  found() {
    if (this.isFound) return;

    this.isFound = true;

    // Visual feedback
    const imageKey = this.data.image;
    if (this.scene.textures.exists(imageKey)) {
      // For images, add a green tint and scale effect
      this.sprite.setTint(0x00ff00);
      this.sprite.setAlpha(0.7);
    } else {
      // For graphics, change the fill color
      this.sprite
        .clear()
        .fillStyle(0x00ff00, 0.5)
        .fillRect(
          this.x - this.width / 2,
          this.y - this.height / 2,
          this.width,
          this.height
        )
        .lineStyle(2, 0x00ff00, 1)
        .strokeRect(
          this.x - this.width / 2,
          this.y - this.height / 2,
          this.width,
          this.height
        );
    }

    // Add checkmark
    this.checkmark = this.scene.add
      .text(this.x, this.y, "✓", {
        fontSize: "20px",
        fill: "#00ff00",
        fontFamily: "Arial",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Animate found effect
    const targets = [this.sprite, this.checkmark];
    if (this.label) targets.push(this.label);

    this.scene.tweens.add({
      targets: targets,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 200,
      yoyo: true,
      ease: "Power2",
    });

    // Note: Sound will be played by the GameScene when this object is found
    // to avoid duplicate sound playing

    console.log(`HiddenObject: Found ${this.name}`);
  }

  /**
   * Check if point is within object bounds
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @returns {boolean} True if point is within bounds
   */
  contains(x, y) {
    return (
      x >= this.x - this.width / 2 &&
      x <= this.x + this.width / 2 &&
      y >= this.y - this.height / 2 &&
      y <= this.y + this.height / 2
    );
  }

  /**
   * Get object hint
   * @returns {string} Object hint
   */
  getHint() {
    return this.hint;
  }

  /**
   * Show hint effect
   */
  showHint() {
    if (this.isFound) return;

    // Create hint effect
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.3,
      duration: 500,
      yoyo: true,
      ease: "Power2",
    });

    // Show hint text
    const hintText = this.scene.add
      .text(this.x, this.y - this.height / 2 - 20, this.hint, {
        fontSize: "14px",
        fill: "#ffff00",
        fontFamily: "Arial",
        fontStyle: "bold",
        backgroundColor: "#000000",
        padding: { x: 5, y: 2 },
      })
      .setOrigin(0.5);

    // Remove hint text after 3 seconds
    this.scene.time.delayedCall(3000, () => {
      hintText.destroy();
    });
  }

  /**
   * Hide the object
   */
  hide() {
    this.isVisible = false;
    this.sprite.setVisible(false);
    this.label.setVisible(false);
    if (this.checkmark) {
      this.checkmark.setVisible(false);
    }
  }

  /**
   * Show the object
   */
  show() {
    this.isVisible = true;
    this.sprite.setVisible(true);
    this.label.setVisible(true);
    if (this.checkmark) {
      this.checkmark.setVisible(true);
    }
  }

  /**
   * Update object (called each frame)
   */
  update() {
    // Add any per-frame updates here
    // For example, pulsing effect for unfound objects
    if (!this.isFound && this.isVisible) {
      const time = this.scene.time.now;
      const alpha = 0.8 + Math.sin(time * 0.005) * 0.2;
      this.sprite.setAlpha(alpha);
    }
  }

  /**
   * Destroy the object
   */
  destroy() {
    if (this.sprite) {
      this.sprite.destroy();
    }
    if (this.label) {
      this.label.destroy();
    }
    if (this.checkmark) {
      this.checkmark.destroy();
    }
  }
}
