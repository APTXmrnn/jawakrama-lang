# Jawakrama Usage Guide

## Installation

### VS Code Extension
### VS Code Extension
1.  Install the `jawakrama-highlight-0.0.5.vsix` extension.
2.  Enjoy syntax highlighting, snippets, icons, and the **Run Button**!

### CLI Tool
1.  Ensure Node.js is installed.
2.  Link the CLI globally (optional):
    ```bash
    npm link
    ```

## CLI Commands

### Initialize Project
Create a new Jawakrama project with a sample file.
```bash
jawa init <project_name>
# Example:
jawa init my_project
```

### Run File
Execute a Jawakrama file (`.jwa`).
```bash
jawa <jenengfile.jwa>
# Utawi (Or):
mlyu <jenengfile.jwa>

# Example:
jawa main.jwa
```

## VS Code Features

### Run Button
Click the **Play Button** (▶️) in the editor title bar to run the current Jawakrama file in the terminal.

### Snippets
Type these prefixes and press `Tab` to generate code:
- `damel` -> Variable declaration
- `karya` -> Function
- `menawi` -> If statement
- `kagem` -> For loop
- `golongan` -> Class definition
- `cobi` -> Try-Catch block

## Error Handling
Errors are automatically translated to Javanese Krama.
Example: `Kalepatan Referensi: x boten dipun tepang` (ReferenceError: x is not defined).
