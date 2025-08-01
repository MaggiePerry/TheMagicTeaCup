# Lost Little Things - Find the Object Game

A modular "find the object" game built with Phaser 3, designed for easy level creation and feature expansion. Players must locate hidden objects within various scenes, with progressive difficulty and engaging gameplay mechanics.

## 🎮 Game Features

- **Find the Object Gameplay**: Locate hidden objects in beautifully designed scenes
- **Progressive Difficulty**: Levels increase in complexity and challenge
- **Level Progression**: Unlock new levels as you complete previous ones
- **Responsive Design**: Works on desktop and mobile devices
- **Sound Effects**: Immersive audio feedback
- **Progress Saving**: Your progress is automatically saved

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lost-little-things.git
cd lost-little-things
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
lost-little-things/
├── index.html                 # Main entry point
├── PROJECT_RULES.md           # Development rules and guidelines
├── README.md                  # This file
├── assets/                    # Game assets
│   ├── images/                # Image assets
│   ├── audio/                 # Audio assets
│   └── data/                  # Game data (levels, UI text)
├── src/                       # Source code
│   ├── core/                  # Core game systems
│   │   ├── GameConfig.js      # Game configuration
│   │   ├── AssetLoader.js     # Asset management
│   │   └── LevelManager.js    # Level progression
│   ├── scenes/                # Game scenes
│   │   ├── BootScene.js       # Loading scene
│   │   ├── MenuScene.js       # Main menu
│   │   ├── GameScene.js       # Main gameplay
│   │   └── LevelCompleteScene.js # Level completion
│   ├── objects/               # Game objects
│   │   └── HiddenObject.js    # Hidden object class
│   ├── levels/                # Level definitions
│   └── utils/                 # Utility functions
├── dist/                      # Built files (for GitHub Pages)
└── docs/                      # Documentation
```

## 🎯 Game Mechanics

### Core Gameplay
1. **Object Finding**: Click on hidden objects to collect them
3. **Progressive Difficulty**: Each level increases in challenge

### Level Structure
- **Easy Levels**: 3-4 objects, 120+ seconds
- **Medium Levels**: 4-5 objects, 90+ seconds  
- **Hard Levels**: 5+ objects, 75+ seconds

## 🛠️ Development

### Adding New Levels

1. **Create level data** in `assets/data/levels.json`:
   ```json
   {
     "id": "level4",
     "name": "New Level",
     "description": "Find objects in this new scene",
     "background": "new-background",
     "objects": [
       {
         "id": "new-object",
         "x": 200,
         "y": 150,
         "width": 50,
         "height": 50,
         "image": "new-object",
         "hint": "Look for the new object"
       }
     ],
     "requiredObjects": 4,
     "difficulty": "medium"
   }
   ```

2. **Add assets** to `assets/images/` and `assets/audio/`

3. **Update AssetLoader.js** to include new assets

### Adding New Features

1. **Create new modules** in appropriate directories
2. **Follow naming conventions** (camelCase for variables, PascalCase for classes)
3. **Add to main game** through the plugin system
4. **Update documentation** for new features
5. **Test thoroughly** before committing

### Code Style Guidelines

- **ES6+ Features**: Use modern JavaScript
- **JSDoc Comments**: Document all public methods
- **Error Handling**: Graceful error handling
- **Performance**: Optimize for 60fps
- **Modular Design**: Single responsibility principle

## 🎨 Customization

### Themes
- **Kitchen Chaos**: Find objects in a busy kitchen
- **Living Room Mystery**: Discover hidden treasures
- **Garden Adventure**: Explore outdoor scenes

### Difficulty Settings
- **Easy**: fewer objects
- **Medium**: Balanced challenge
- **Hard**: many objects

### Visual Customization
- **Colors**: Modify CSS variables in `index.html`
- **Fonts**: Change font families in scene files
- **Effects**: Add custom animations and particles

## 🚀 Deployment

### GitHub Pages
1. **Enable GitHub Pages** in repository settings
2. **Set source** to main branch
3. **Configure custom domain** (optional)

### Other Hosting
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **Firebase**: Google's hosting platform

## 🧪 Testing

### Browser Compatibility
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Performance Targets
- **Frame Rate**: 60fps
- **Load Time**: <3 seconds
- **Asset Size**: <50MB total
- **Memory Usage**: <100MB

## 📊 Analytics

### Game Metrics
- Level completion rates
- Player progression
- Error tracking

### Privacy
- No personal data collected
- Anonymous analytics only
- GDPR compliant

## 🤝 Contributing

### Development Rules
1. **Follow PROJECT_RULES.md** guidelines
2. **Create feature branches** for new features
3. **Write tests** for new functionality
4. **Update documentation** for changes
5. **Submit pull requests** for review

### Code Review Process
1. **Automated checks** must pass
2. **Manual review** by maintainers
3. **Performance testing** on target devices
4. **User experience** validation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Phaser 3**: Game framework
- **GitHub Pages**: Hosting platform
- **Community**: Contributors and testers

#### Music Credits

###### All music that is not custom is from <https://freesound.org/>
- **Background Music** -- April Showers: Sweet Lo-Fi Piano Vibes by kjartan_abel -- <https://freesound.org/s/608392/> -- License: Attribution 4.0
- **Success Sound** -- short-loud-success-sound by rayfaiq -- <https://freesound.org/s/810706/> -- License: Creative Commons 0 Short Success Sound Glockenspiel Treasure Video Game.mp3 by FunWithSound -- <https://freesound.org/s/456965/> -- License: Creative Commons 0
- **Click Sound** -- Pop 19.wav by Debsound -- <https://freesound.org/s/320549/> -- License: Attribution NonCommercial 4.0
- **Level Complete** -- Video game level complete sound effect by interstellarcat -- <https://freesound.org/s/787559/> -- License: Creative Commons 0

## 📞 Support

- **Issues**: Report bugs on GitHub
- **Discussions**: Ask questions in GitHub Discussions
- **Documentation**: Check `docs/` folder
- **Wiki**: Community-maintained guides

---

**Made with ❤️ for the gaming community**

*Version 1.0.0 - Lost Little Things*
