# RippleJS
A simple library for adding ripple effect to orbitary HTML elements.

## Usage

1. Link the library to your project

  `<link rel="stylesheet" type="text/css" href="ripple.css">`
  
  `<script src="rippleJS-0.0.1.js"></script>`
  
  AMD is also supported
  
2. Initialize the library somewhere in your code
  
  ```javascript
  Ripple.init(document, {selectors:".element-with-ripple"});
  ```
  
  This needs to be done just once. After initialization the library will keep track of changes in DOM and automatially apply ripple effect to the matching elements.
  
## Options

   `
        {selectors:<Array|String>,
       duration:<Number>
       }
    `
  
  **selectors** - A string or an array of strings representing selectors to match ripple enabled elements against.
  
  Examples:
  ```javascript
  Ripple.init(document, {selectors:".element-with-ripple"});
  Ripple.init(document, {selectors:["a", ".button", ".element-with-ripple"]});
  ```
  **duration** - Ripple effect duration in milliseconds. Default value is 300.
  
## Browser support
