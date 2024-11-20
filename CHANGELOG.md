# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initialised the project (#1)
- CHANGELOG.md using Keep a Changelog standard. (#1)
- An image viewer to show a fixture image on the index page (#6).
- asdf config file to fix runtime versions ([#5](https://github.com/pLTdwaxn/Caroushow/issues/5)).
- A button to pick an image via PhotoKit Photo Picker [#9](https://github.com/pLTdwaxn/Caroushow/issues/9).
- Ability to tap and zoom the image [#13](https://github.com/pLTdwaxn/Caroushow/issues/13)
- jest-expo library for testing [#15](https://github.com/pLTdwaxn/Caroushow/issues/15).
- Ability to crop an image into 3 columns [#23](https://github.com/pLTdwaxn/Caroushow/issues/23)
- ActionsBar component under ImageViewer [#25](https://github.com/pLTdwaxn/Caroushow/issues/25)
- Bottom navigation bar and tabs [#29](https://github.com/pLTdwaxn/Caroushow/issues/29)
- Action Buttons now have disabled and press colors [#33](https://github.com/pLTdwaxn/Caroushow/issues/33)
- Crop Guide component for previewing the crop area [#41](https://github.com/pLTdwaxn/Caroushow/issues/41)
- An APP icon! [#51](https://github.com/pLTdwaxn/Caroushow/issues/51)
- EAS project config [[#63](https://github.com/pLTdwaxn/Caroushow/issues/63)]

### Changed

- Bumped Nodejs version to 23.0.0 [#10](https://github.com/pLTdwaxn/Caroushow/issues/10)
- "Select an Image" button moved to inside the ImageContainer [#19](https://github.com/pLTdwaxn/Caroushow/issues/19)
- README.md now describe what Caroushow is [#27](https://github.com/pLTdwaxn/Caroushow/issues/27)
- Justify ActionsBar to the flex-end (bottom of the CreateView) [#33](https://github.com/pLTdwaxn/Caroushow/issues/33)
- Custom button label colors to match system button label color [#37](https://github.com/pLTdwaxn/Caroushow/issues/37)
- Turned to Redux for global state management [#43](https://github.com/pLTdwaxn/Caroushow/issues/43)
- Cropping starts at an offset to Y axis to vertically center the cropped pieces [#46](https://github.com/pLTdwaxn/Caroushow/issues/46)
- Resize quality is now functional [[#53](https://github.com/pLTdwaxn/Caroushow/issues/53)]
- `resetImage` action now sends a 'null' payload [#56](https://github.com/pLTdwaxn/Caroushow/issues/56)
- `pieceWidth` is now calculated with `floor` to avoid rounding-caused blank row of pixel [#59](https://github.com/pLTdwaxn/Caroushow/issues/59)
- The Cropper now correctly resizes the cropped pieces to the correct size [#60](https://github.com/pLTdwaxn/Caroushow/issues/60)
- The Cropper now resizes by the shorter side of the cropped piece [#60](https://github.com/pLTdwaxn/Caroushow/issues/60)
- Run Cropper Button now is disabled during and after running [#68](https://github.com/pLTdwaxn/Caroushow/issues/68)
- Reworked some Redux logic. Image Cropper reads from the redux store directly now. [#70](https://github.com/pLTdwaxn/Caroushow/issues/70)
- Bumped Nodejs and npm packages versions. [#72](https://github.com/pLTdwaxn/Caroushow/issues/72)
- Fixed CropGuide not rendering over the selected image [#74](https://github.com/pLTdwaxn/Caroushow/issues/74)
- Updated README.md with images. [#76](https://github.com/pLTdwaxn/Caroushow/issues/76)
- Installed @types/cookie ^1.0.1. [#80](https://github.com/pLTdwaxn/Caroushow/issues/80)

### Removed

- Example project files. (#2)
- Example components [#17](https://github.com/pLTdwaxn/Caroushow/issues/17)
- Placeholder image [#19](https://github.com/pLTdwaxn/Caroushow/issues/19)
- Default Expo project reset script [#31](https://github.com/pLTdwaxn/Caroushow/issues/31)
- Unused Node packages [#35](https://github.com/pLTdwaxn/Caroushow/issues/35)
- Press on image to switch between content fit [#39](https://github.com/pLTdwaxn/Caroushow/issues/39)
