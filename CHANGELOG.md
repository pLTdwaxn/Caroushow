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

### Removed

- Expo new project examples
