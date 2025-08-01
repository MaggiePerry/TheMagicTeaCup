# Assets Checklist - TheMagicTeaCup

This file lists all the assets you need to create and add to your project for the game to work properly.

## 📋 **Complete Assets List**

### 🖼️ **Image Assets** (7 files)
**Location:** `assets/images/`

| File | Size | Purpose | Status |
|------|------|---------|--------|
| `background.png` | 800x600px | Main background image for levels | ⏳ Pending |
| `teacup.png` | ~50x50px | Teacup object sprite | ⏳ Pending |
| `spoon.png` | ~40x40px | Spoon object sprite | ⏳ Pending |
| `sugar.png` | ~30x30px | Sugar bowl object sprite | ⏳ Pending |
| `milk.png` | ~40x40px | Milk jug object sprite | ⏳ Pending |
| `button.png` | ~100x50px | Button UI element | ⏳ Pending |
| `ui-panel.png` | 800x60px | UI panel background | ⏳ Pending |

### 🎵 **Audio Assets** (4 files)
**Location:** `assets/audio/`

| File | Duration | Purpose | Status |
|------|----------|---------|--------|
| `click.mp3` | ~0.5 seconds | Button click sound effect | ⏳ Pending |
| `success.mp3` | ~1-2 seconds | Object found sound effect | ⏳ Pending |
| `background-music.mp3` | 2-3 minutes | Background music (looped) | ⏳ Pending |
| `level-complete.mp3` | ~2-3 seconds | Level completion sound | ⏳ Pending |

### 📄 **Data Files** (2 files)
**Location:** `assets/data/`

| File | Purpose | Status |
|------|---------|--------|
| `levels.json` | Level definitions and object data | ✅ Complete |
| `ui-text.json` | UI text and localization | ✅ Complete |

## ✅ **Progress Tracker**

### Images:
- [ ] `assets/images/background.png`
- [ ] `assets/images/teacup.png`
- [ ] `assets/images/spoon.png`
- [ ] `assets/images/sugar.png`
- [ ] `assets/images/milk.png`
- [ ] `assets/images/button.png`
- [ ] `assets/images/ui-panel.png`

### Audio:
- [x] `assets/audio/click.mp3`
- [x] `assets/audio/success.mp3`
- [x] `assets/audio/background-music.mp3`
- [x] `assets/audio/level-complete.mp3`

### Data:
- [x] `assets/data/levels.json`
- [x] `assets/data/ui-text.json`

## 🎨 **Asset Specifications**

### Image Guidelines:
- **Format:** PNG (preferred) or JPG
- **Transparency:** Use PNG with transparency for objects
- **Resolution:** 72-300 DPI
- **Color Space:** sRGB
- **File Size:** Keep under 1MB each for web optimization
- **Style:** Consistent art style across all assets

### Audio Guidelines:
- **Format:** MP3 (preferred) or WAV
- **Bitrate:** 128-320 kbps for MP3
- **Sample Rate:** 44.1 kHz
- **Channels:** Mono for effects, Stereo for music
- **File Size:** Keep under 5MB each
- **Quality:** Clear, professional sound

## 🚀 **Quick Start Options**

### For Testing (Temporary Assets):
If you want to test the game immediately, you can use:

**Images:**
- Any 800x600 image for `background.png`
- Any small icons (50x50px) for object sprites
- Any button-style image for `button.png`
- Any panel image for `ui-panel.png`

**Audio:**
- Any short click sound for `click.mp3`
- Any success sound for `success.mp3`
- Any ambient music for `background-music.mp3`
- Any victory sound for `level-complete.mp3`

### For Production (Custom Assets):
- Create custom artwork matching your game theme
- Use consistent art style across all assets
- Optimize file sizes for web loading
- Test audio quality on different devices

## 📁 **Directory Structure**

Make sure your assets are organized like this:

```
assets/
├── images/
│   ├── background.png
│   ├── teacup.png
│   ├── spoon.png
│   ├── sugar.png
│   ├── milk.png
│   ├── button.png
│   └── ui-panel.png
├── audio/
│   ├── click.mp3
│   ├── success.mp3
│   ├── background-music.mp3
│   └── level-complete.mp3
└── data/
    ├── levels.json
    └── ui-text.json
```

## 🔧 **Troubleshooting**

### If assets don't load:
1. Check file names match exactly (case-sensitive)
2. Verify file paths are correct
3. Ensure files are in the right directories
4. Check browser console for 404 errors

### If game gets stuck loading:
1. Verify all required assets are present
2. Check file sizes aren't too large
3. Test with smaller placeholder assets first
4. Clear browser cache and reload

## 📝 **Notes**

- Update this checklist as you add assets
- Mark items as complete with ✅
- Test the game after adding each asset type
- Keep backups of your original assets

---

**Last Updated:** [Date]
**Total Assets Needed:** 13 files
**Completed:** 2/13 (15%) 
