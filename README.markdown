# Real-Time Code Editor

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![GitHub stars](https://img.shields.io/github/stars/Pcquifume/Real-time-code-editor?style=social)
![GitHub issues](https://img.shields.io/github/issues/Pcquifume/Real-time-code-editor)

A web-based code editor built with the Monaco Editor, supporting real-time HTML, CSS, and JavaScript editing with a live preview. Features include template insertion, a snippet library, and a resizable divider for a customizable layout.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Monaco Editor Integration**: Syntax highlighting and autocompletion for HTML, CSS, and JavaScript.
- **Live Preview**: Real-time rendering of code in an iframe.
- **Template Insertion**: One-click insertion of boilerplate code for HTML, CSS, and JavaScript.
- **Snippet Library**: Quick access to common code snippets via a sidebar for each language.
- **Resizable Layout**: Drag a divider to adjust the editor and preview sizes.
- **Responsive Design**: Flexbox-based layout for a seamless experience across devices.

## Demo
Try the editor live by opening `index.html` in a browser or hosting it on a web server. A hosted demo will be added soon!

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```
2. Navigate to the project directory:
   ```bash
   cd YOUR_REPO_NAME
   ```
3. Open `index.html` in a browser, or serve the project using a local web server (recommended for best performance):
   ```bash
   npx http-server
   ```
   Then, visit `http://localhost:8080`.

**Note**: The project uses the Monaco Editor via a CDN, so an internet connection is required.

## Usage
1. **Edit Code**: Use the three editors (HTML, CSS, JavaScript) to write code. Changes are reflected instantly in the preview pane.
2. **Insert Templates**: Click the "Insérer modèle" button for each editor to load a boilerplate (hidden after typing).
3. **Access Snippet Library**: Click the "Bibliothèque" button to open a sidebar with common snippets. Click a snippet to insert it at the cursor.
4. **Resize Layout**: Drag the vertical divider between the editors and preview to adjust their widths.
5. **Experiment**: Combine HTML elements, CSS styles, and JavaScript functions to create dynamic web content.

## Project Structure
```
Real-time-code-editor/
├── index.html       # Main HTML structure
├── styles.css       # CSS styles for layout and UI
├── script.js        # JavaScript logic for editors and interactions
└── README.md        # Project documentation
```

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

Please ensure your code follows the existing style and includes relevant tests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
