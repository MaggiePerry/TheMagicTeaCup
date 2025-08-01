# Lost Little Things - Find the Object Game Project Rules

## 🎯 Project Overview
A modular "find the object" game built with Phaser 3, designed for easy level creation and feature expansion.

## 📁 Project Structure Rules

### Core Architecture
```
lost-little-things/
├── index.html                 # Main entry point
├── assets/                    # Game assets (images, audio, etc.)
│   ├── images/
│   ├── audio/
│   └── data/
├── src/                       # Source code
│   ├── core/                  # Core game systems
│   ├── scenes/                # Game scenes
│   ├── objects/               # Game objects
│   ├── levels/                # Level definitions
│   └── utils/                 # Utility functions
├── dist/                      # Built files (for GitHub Pages)
├── docs/                      # Documentation
└── README.md
```

## 🎮 Game Design Rules

### Core Mechanics
1. **Object Finding**: Players must locate hidden objects within a scene
2. **Click/Tap Interaction**: Primary interaction method
3. **Progressive Difficulty**: Levels increase in complexity
4. **Feedback System**: Visual and audio feedback for interactions

### Level Structure
- Each level is a separate module
- Levels can have different themes and mechanics
- Progressive difficulty through:
  - Number of objects to find
  - Object size and visibility
  - Scene complexity

## 💻 Code Organization Rules

### 1. Modular Architecture
- **Scene-based structure**: Each game state is a separate scene
- **Component-based objects**: Game objects are modular and reusable
- **Level system**: Levels are defined as data structures
- **Plugin system**: Features can be added as plugins

### 2. File Naming Conventions
```
scenes/
├── BootScene.js              # Loading scene
├── MenuScene.js              # Main menu
├── GameScene.js              # Main game scene
└── LevelCompleteScene.js     # Level completion

objects/
├── HiddenObject.js           # Base hidden object class
├── ClickableObject.js        # Interactive objects
└── UIObject.js               # UI elements

levels/
├── level1.js                 # Level 1 definition
├── level2.js                 # Level 2 definition
└── levelData.js              # Level data structure
```

### 3. Code Style Rules
- **ES6+ Features**: Use modern JavaScript features
- **Consistent naming**: camelCase for variables, PascalCase for classes
- **JSDoc comments**: Document all public methods and classes
- **Error handling**: Graceful error handling for all user interactions
- **Performance**: Optimize for 60fps gameplay

### 4. Asset Management Rules
- **Optimized assets**: Compress images and audio
- **Consistent naming**: Use descriptive, consistent file names
- **Version control**: Track asset changes appropriately
- **CDN usage**: Consider CDN for large assets

## 🔧 Development Rules

### 1. Phaser 3 Best Practices
- Use Phaser's built-in physics when appropriate
- Leverage Phaser's scene management system
- Utilize Phaser's asset loading system
- Follow Phaser's event-driven architecture

### 2. Modular JavaScript Rules
- **ES6 Modules**: Use import/export syntax
- **Single Responsibility**: Each module has one clear purpose
- **Dependency Injection**: Minimize tight coupling
- **Configuration-driven**: Use config files for game settings

### 3. Level Creation Rules
```javascript
// Example level structure
const level1 = {
    id: 'level1',
    name: 'Kitchen Chaos',
    description: 'Find all the hidden objects in the kitchen',
    objects: [
        {
            id: 'teacup',
            x: 150,
            y: 200,
            width: 50,
            height: 50,
            image: 'teacup.png',
            hint: 'Look for the magic teacup'
        }
    ],
    background: 'kitchen-bg.png',
    requiredObjects: 5
};
```

### 4. Adding New Features
1. **Create a new module** in the appropriate directory
2. **Follow naming conventions** strictly
3. **Add to the main game** through the plugin system
4. **Update documentation** for new features
5. **Test thoroughly** before committing

## 🚀 Deployment Rules

### GitHub Pages Setup
1. **Build process**: Create a build script for production
2. **Asset optimization**: Minimize and compress assets
3. **Cross-browser testing**: Ensure compatibility
4. **Mobile responsiveness**: Optimize for touch devices

### Performance Rules
- **Asset preloading**: Load assets efficiently
- **Memory management**: Dispose of unused assets
- **Frame rate**: Maintain 60fps
- **Loading times**: Keep initial load under 3 seconds

## 🧪 Testing Rules

### 1. Functionality Testing
- Test all click interactions
- Verify level progression
- Check audio/visual feedback
- Test on different screen sizes

### 2. Performance Testing
- Monitor frame rate during gameplay
- Check memory usage
- Test loading times
- Verify asset loading

### 3. Browser Compatibility
- Test on Chrome, Firefox, Safari, Edge
- Mobile browser testing
- Touch interaction testing

## 📝 Documentation Rules

### 1. Code Documentation
- JSDoc comments for all public methods
- README files for each major module
- Inline comments for complex logic
- API documentation for reusable components

### 2. User Documentation
- Game instructions
- Level guides
- Troubleshooting guide
- Feature documentation

## 🔄 Version Control Rules

### 1. Git Workflow
- **Feature branches**: Create branches for new features
- **Descriptive commits**: Clear commit messages
- **Pull requests**: Review before merging
- **Version tagging**: Tag releases appropriately

### 2. Asset Versioning
- **Asset naming**: Include version in asset names
- **Change tracking**: Document asset changes
- **Backup strategy**: Maintain asset backups

## 🎨 UI/UX Rules

### 1. Visual Design
- **Consistent theme**: Maintain visual consistency
- **Clear feedback**: Visual feedback for all interactions
- **Accessibility**: Consider color-blind users
- **Mobile-first**: Design for touch interfaces

### 2. User Experience
- **Intuitive controls**: Easy to understand interaction
- **Progressive disclosure**: Reveal complexity gradually
- **Error prevention**: Prevent user errors
- **Help system**: Provide contextual help

## 🔧 Configuration Rules

### 1. Game Settings
```javascript
// config/gameConfig.js
const gameConfig = {
    width: 800,
    height: 600,
    backgroundColor: '#87CEEB',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, MenuScene, GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};
```

### 2. Level Configuration
- **JSON-based**: Store level data in JSON format
- **Validation**: Validate level data structure
- **Versioning**: Include version in level data
- **Localization**: Support multiple languages

## 🚨 Error Handling Rules

### 1. Graceful Degradation
- **Asset loading failures**: Provide fallback assets
- **Browser compatibility**: Detect and handle unsupported features
- **Network issues**: Handle offline scenarios
- **Performance issues**: Scale down for low-end devices

### 2. User Feedback
- **Loading indicators**: Show progress during loading
- **Error messages**: Clear, helpful error messages
- **Recovery options**: Provide ways to recover from errors

## 📊 Analytics Rules

### 1. Game Metrics
- **Level completion rates**: Track player progress
- **Time spent**: Monitor engagement
- **Error tracking**: Log and analyze errors
- **Performance metrics**: Monitor game performance

### 2. Privacy
- **Data minimization**: Collect only necessary data
- **User consent**: Get permission for analytics
- **Data protection**: Secure user data appropriately

## 🔄 Maintenance Rules

### 1. Regular Updates
- **Dependency updates**: Keep libraries current
- **Security patches**: Apply security updates
- **Performance optimization**: Regular performance reviews
- **Content updates**: Add new levels regularly

### 2. Backup Strategy
- **Code backups**: Regular code backups
- **Asset backups**: Secure asset storage
- **Version history**: Maintain version history
- **Recovery plan**: Document recovery procedures

---

## 🎯 Success Metrics

### Technical Metrics
- [ ] 60fps gameplay maintained
- [ ] <3 second initial load time
- [ ] <50MB total asset size
- [ ] 100% browser compatibility
- [ ] Mobile responsive design

### User Experience Metrics
- [ ] Intuitive controls (no tutorial needed)
- [ ] Engaging gameplay (5+ minutes session time)
- [ ] Clear feedback for all interactions
- [ ] Accessible to all users
- [ ] Smooth level progression

### Development Metrics
- [ ] Modular code structure
- [ ] Easy to add new levels
- [ ] Comprehensive documentation
- [ ] Version control best practices
- [ ] Regular testing and updates 
