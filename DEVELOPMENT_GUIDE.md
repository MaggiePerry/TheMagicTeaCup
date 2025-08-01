# Development Guide - Lost Little Things

This guide provides step-by-step instructions for developing and extending Lost Little Things game.

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Text editor (VS Code, Sublime Text, etc.)
- Local web server
- Basic knowledge of JavaScript and Phaser 3

### Setup Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lost-little-things.git
cd lost-little-things
   ```

2. **Start development server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📝 Adding New Levels

### Step 1: Create Level Data

Add your level to `assets/data/levels.json`:

```json
{
  "id": "level4",
  "name": "My New Level",
  "description": "Find objects in this exciting new scene",
  "background": "my-background",
  "objects": [
    {
      "id": "my-object",
      "x": 200,
      "y": 150,
      "width": 50,
      "height": 50,
      "image": "my-object",
      "hint": "Look for the special object"
    }
  ],
  "timeLimit": 90,
  "requiredObjects": 4,
  "difficulty": "medium"
}
```

### Step 2: Add Assets

1. **Add images** to `assets/images/`
   - Background image: `my-background.png`
   - Object images: `my-object.png`

2. **Add audio** to `assets/audio/` (optional)
   - Sound effects: `my-sound.mp3`

### Step 3: Update Asset Loader

Add your assets to `src/core/AssetLoader.js`:

```javascript
// In loadImages() method
this.load.image('my-background', 'assets/images/my-background.png');
this.load.image('my-object', 'assets/images/my-object.png');

// In loadAudio() method (if needed)
this.load.audio('my-sound', 'assets/audio/my-sound.mp3');
```

### Step 4: Test Your Level

1. Start the development server
2. Open the game in browser
3. Navigate to your new level
4. Test all interactions and timing

## 🎨 Adding New Features

### Creating a New Scene

1. **Create scene file** in `src/scenes/`:
   ```javascript
   // src/scenes/MyNewScene.js
   export class MyNewScene extends Phaser.Scene {
       constructor() {
           super({ key: 'MyNewScene' });
       }
       
       create() {
           // Your scene code here
       }
   }
   ```

2. **Add to game config** in `src/core/GameConfig.js`:
   ```javascript
   import { MyNewScene } from '../scenes/MyNewScene.js';
   
   // Add to scenes array
   scene: [BootScene, MenuScene, GameScene, LevelCompleteScene, MyNewScene]
   ```

3. **Transition to scene**:
   ```javascript
   this.scene.start('MyNewScene');
   ```

### Creating New Game Objects

1. **Create object class** in `src/objects/`:
   ```javascript
   // src/objects/MyNewObject.js
   export class MyNewObject {
       constructor(scene, data) {
           this.scene = scene;
           this.data = data;
           this.createSprite();
       }
       
       createSprite() {
           // Create your object sprite
       }
   }
   ```

2. **Use in scenes**:
   ```javascript
   import { MyNewObject } from '../objects/MyNewObject.js';
   
   // Create instance
   const myObject = new MyNewObject(this, objectData);
   ```

### Adding UI Elements

1. **Create UI component**:
   ```javascript
   createMyUI() {
       const button = this.add.container(x, y);
       
       // Add graphics and text
       const bg = this.add.graphics()
           .fillStyle(0x4a90e2, 1)
           .fillRoundedRect(-50, -25, 100, 50, 10);
       
       const text = this.add.text(0, 0, 'My Button', {
           fontSize: '16px',
           fill: '#ffffff'
       }).setOrigin(0.5);
       
       button.add([bg, text]);
       button.setInteractive();
       
       return button;
   }
   ```

2. **Add event handlers**:
   ```javascript
   button.on('pointerdown', () => {
       // Handle click
   });
   ```

## 🔧 Configuration

### Game Settings

Modify `src/core/GameConfig.js`:

```javascript
// Change game dimensions
width: 1024,
height: 768,

// Change background color
backgroundColor: '#87CEEB',

// Add new scenes
scene: [BootScene, MenuScene, GameScene, MyNewScene]
```

### Level Settings

Adjust difficulty in `assets/data/levels.json`:

```json
{
  "timeLimit": 120,        // Time in seconds
  "requiredObjects": 5,    // Objects to find
  "difficulty": "hard"     // easy, medium, hard
}
```

## 🎵 Audio Integration

### Adding Sound Effects

1. **Add audio files** to `assets/audio/`
2. **Load in AssetLoader.js**:
   ```javascript
   this.load.audio('my-sound', 'assets/audio/my-sound.mp3');
   ```
3. **Play in scenes**:
   ```javascript
   this.game.sound.play('my-sound');
   ```

### Background Music

1. **Add music file** to `assets/audio/`
2. **Load and play**:
   ```javascript
   this.load.audio('background-music', 'assets/audio/background-music.mp3');
   
   // Play with loop
   this.game.sound.play('background-music', { loop: true });
   ```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Game loads without errors
- [ ] All levels are playable
- [ ] Timer works correctly
- [ ] Object finding works
- [ ] Level progression works
- [ ] Sound effects play
- [ ] UI is responsive
- [ ] Progress saves correctly

### Performance Testing

- [ ] 60fps maintained
- [ ] Load time <3 seconds
- [ ] Memory usage <100MB
- [ ] No memory leaks

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

## 🐛 Debugging

### Common Issues

1. **Game won't load**
   - Check browser console for errors
   - Verify all assets are loaded
   - Check file paths

2. **Objects not clickable**
   - Verify object bounds
   - Check interaction setup
   - Test with debug graphics

3. **Timer issues**
   - Check timer initialization
   - Verify pause functionality
   - Test time formatting

### Debug Tools

1. **Console logging**:
   ```javascript
   console.log('Debug info:', data);
   ```

2. **Visual debugging**:
   ```javascript
   // Show object bounds
   this.add.graphics()
       .strokeStyle(0xff0000, 1)
       .strokeRect(x, y, width, height);
   ```

3. **Performance monitoring**:
   ```javascript
   console.log('FPS:', this.game.loop.actualFps);
   ```

## 📦 Building for Production

### Optimization Checklist

- [ ] Compress images
- [ ] Minify JavaScript
- [ ] Optimize audio files
- [ ] Remove debug code
- [ ] Test on target devices

### GitHub Pages Deployment

1. **Push to main branch**
2. **Enable GitHub Pages** in settings
3. **Set source** to main branch
4. **Wait for deployment**

### Custom Domain

1. **Add CNAME file** to repository
2. **Configure DNS** settings
3. **Update GitHub Pages** settings

## 🤝 Contributing

### Code Style

- Use ES6+ features
- Follow JSDoc conventions
- Use meaningful variable names
- Add error handling
- Write clean, readable code

### Git Workflow

1. **Create feature branch**:
   ```bash
   git checkout -b feature/new-level
   ```

2. **Make changes** and test

3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Add new level: Kitchen Adventure"
   ```

4. **Push and create PR**:
   ```bash
   git push origin feature/new-level
   ```

### Pull Request Guidelines

- Clear description of changes
- Screenshots if UI changes
- Test results included
- Follows project rules
- No breaking changes

## 📚 Resources

### Phaser 3 Documentation
- [Official Docs](https://photonstorm.github.io/phaser3-docs/)
- [Examples](https://phaser.io/examples)
- [Community](https://phaser.io/community)

### JavaScript Resources
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [ES6 Features](https://es6-features.org/)

### Game Development
- [Game Design Patterns](https://gameprogrammingpatterns.com/)
- [HTML5 Game Development](https://html5gamedevs.com/)

---

**Happy coding! 🎮**

*This guide is a living document - please contribute improvements and updates.* 
