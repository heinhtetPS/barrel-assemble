# Takes2

## Table of Contents
1. [Getting Started](#getting-started)
2. [Developing](#developing)
2. [Build Scripts](#using-build-scripts)

## Getting Started

#### Intial Setup
Run this command from your project root directory to download the project's dependencies:
```
npm i
```

#### Copy Files
IF this is your first time starting up the theme, you'll need to run the following to copy all existing files from `src` to `dist`:
```bash
npm run files:copy


## Developing
After the steps above, you're ready to go. The main commands needed to generate the `dist/` are `npm run build` and `npm run assemble:build` (in two seperate terminal tabs). For more specific tasks see [Build Scripts](#using-build-scripts) for more information.
```

## Using Build Scripts
There are a variety of build scripts provided in the `package.json` that can be run directly in your terminal window. All scripts can be run via `npm run <scriptName>`, with the exception of `npm start`.

#### `npm start`
Runs a watch script on you CSS and JS paths, as well as all files. Does not copy any files, but does build CSS and JS once before starting the watch script. 

#### `npm run build`
Build CSS and JS and copy all files.

#### `npm run files:copy`
Copies all files, aside from CSS and JS, from `src/` to `dist/`.

#### `npm run files:watch`
Watches all files, aside from CSS and JS, for changes and copies changed files from `src/` to `dist/`.

#### `npm run assets:watch`
Runs a watch task on your javascripts and CSS sheets.

#### `npm run assets:build`
Builds your javascript bundle and CSS sheet once.

#### `npm run js:build`
Builds your javascript bundle once using production variables if available.

#### `npm run js:dev`
Runs a watch task on your javascripts. On change events, runs `[js:build]`.

#### `npm run css:build`
Compiles and prefixes your CSS using Libass, POSTCSS and Autoprefixer.

#### `npm run css:dev`
Runs a watch task on your CSS. On change events, runs `[css:build]`.

#### `npm run jscs`
Lints your javascript partials and writes a `jscs.js` file in the root of the project.

#### `npm run jscs:watch`
Runs a watch task on your javascripts. On change events, runs `[jscs]`.

#### `npm run jshint`
Analyze your javascript partials and writes a `jshint.js` file in the root of the project.

#### `npm run jshint:watch`
Runs a watch task on your javascripts. On change events, runs `[jshint]`.

#### `npm run assemble:build`
Generate html files in `dist/` from assemble files (.hbs) in `src/`.

#### `npm run assemble:watch`
Watches assemble files (.hbs) for changes and generate html from changed files in `dist/`.

#### Update Environment
Make sure your node environment is updated. You're using Homebrew for this, right?

```bash
# check kegs and brew version
brew update 

# update node
brew upgrade node
```