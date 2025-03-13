# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- React Redux and Redux toolkit
- Ability to select an image with Expo Image Picker
- A component to show the selected image
- The Create Tab for making sliced images (slicing not implemented)
- A FlatList image viewer that snap to 1/3 of the image width
- Basic test cases for components
- The Slicing logic
- A button to reset the image selected
- A crop overlay to preview the area kept after slicing
- Slice reducer for storing slicing parameters and slicing now takes aspect ratio into account
- A label to indicate the aspect ratio in use for slicing
- A mocked Social Media indicator
- Ability to choose from a predefined list of social media
- EAS dev build config
- Ability to vertically pan the image (not affecting slicing yet)
- Auto bounce back when image panning is outside a nonsense range
- Tap gesture placeholder in Image Slider
- Prettier package and its config
- A button to cycle the slices the image will be cut into
- Limit the panning of image to where the drag handle is

### Changed

- Updated project readme
- Aspect Ratio label becomes a button for cycling through aspect ratio
- Updated App icon
- Internally renamed Actions Bar to Bottom Actions Bar
- Made Top Actions Bar transparent
- Removed tabs and use single page design instead
- Changed buttons shown in the bottom bar
- Made the bar separating crop preview and bottom shade draggable
- Changed the Ratio interface definition to include fraction and decimal
- Swiping on the Image Slider is no longer blocked by the Crop Overlay
- The slide handle shows the decimal crop ratio at the centre, updated in real-time
- Image Slicing is now based on the decimal ratio instead of the fraction
- Updated README to more accurately present the app
- Moved gesture handling logic into a separate hook component
- Refactored the project's folder structure
- Changed Image Slider from using FlatList to ScrollView for gesture compatibility
- Moved Image Slider's gesture handling into a hook
- Cleaned up the logic behind Crop Overlay component
- Cleaned up the logic behind Image Slider component
- Renamed many variables internally
- Made image slicing taking y-offset into account
- Made drag handle limited to an aspect ratio range given by the selected social media
- Removed header and separated top actions bar from image slider
- Formatted the project with prettier
- Major Structural rework
- The top section of the screen now has blurry effect if the image is panned under it

### Removed

- Expo new project examples
