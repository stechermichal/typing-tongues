# Typing Tongues Project

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
  - [Adding a Custom Theme](#adding-a-custom-theme)
- [License](#license)

## Introduction

Typing Tongues is an interactive web application to help users improve their typing skills while learning new languages. It's built using Angular for the frontend, styled with Tailwind CSS, and deployed on Vercel.

## Features

- Multilingual typing practice
- Customizable themes
- Real-time typing accuracy and speed feedback

## Installation

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Usage

Instructions on how to use the project.

## Contributing

### Adding a Custom Theme

We have a unique way of handling themes, aiming to make it as simple as possible for contributors to add their own.

1. Open `tailwind.config.js` file in the `root` directory.

2. Add your theme in the format shown below:

   ```javascript
   yourThemeName: {
        'bg-general': colors.red[500],
        'bg-component': colors.blue[400],
        'bg-button': colors.yellow[800],
        'main-color': colors.green[600],
        'main-mute-color': colors.teal[400],
        'text-typed': colors.violet[400],
        'text-to-type': colors.slate[700],
        'text-error': colors.red[700],
        'text-highlight': colors.pink[300],
   },
   ```

Replace the colors with your chosen colors. We use the [Tailwind CSS color palette](https://tailwindcss.com/docs/customizing-colors). Make sure that `yourThemeName` is unique.

Add an item to the dropdown button of themes in `header.component.html` file in the `src/app/core/header` directory.

```html
<select #themeSelect (change)="switchTheme(themeSelect.value)">
  <option value="alreadyExistingTheme">alreadyExistingTheme</option>
  <option value="yourThemeName">yourThemeName</option>
</select>
```

3. Create a pull request with your changes. Include a brief explanation of your theme and a screenshot showing how it looks.

4. Once your pull request is accepted, your theme will be available for all users to enjoy!

Please note that when creating a new theme, you should ensure it provides a good user experience and does not impair readability.
You can use [Webaim Contrast Checker](https://webaim.org/resources/contrastchecker/) to get an idea of how compliant your theme is with accessibility standards.

## License

GPL-3.0 license

## How stats work

Todo
