# GitHub Homepage Enhancer

A Chrome extension that improves the GitHub homepage by focusing on your repositories in the main content area.

## Features

- Replaces the default GitHub homepage feed with your repositories
- Shows repository details including:
  - Repository name and privacy status
  - Description
  - Programming language
  - Stars and forks count
  - Last update date
- Maintains GitHub's native look and feel
- Preserves the top navigation bar

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the directory containing these files
5. Visit GitHub.com and see your repositories in the main content area!

## Development

The extension consists of three main files:

- `manifest.json`: Extension configuration
- `content.js`: Main logic for modifying the GitHub homepage
- `styles.css`: Styling for the repository cards

## Notes

- The extension only modifies the GitHub homepage (https://github.com/)
- All other GitHub pages remain unchanged
- Repository data is fetched from the GitHub API
- Uses GitHub's CSS variables for consistent theming
