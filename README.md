# RippleJS
A simple library for adding ripple effect to arbitrary HTML elements as seen in Google's Material Design. Has no dependencies.

[Demo](https://github.com/armenbadalyan/ripplejs/edit/master/README.md)

## Usage

1. Link the library to your project
  
  `<script src="rippleJS.js"></script>`
  
  AMD is also supported
  
2. Initialize the library somewhere in your code
  
  ```javascript
  Ripple.init(document, {selectors:".element-with-ripple"});
  ```
  
  This needs to be done just once. After initialization the library will keep track of changes in DOM and automatially apply ripple effect to the matching elements.
  
## Options

   `
        {selectors: <Array|String>,
       duration: <Number>,
       color: <String>
       }
    `
  
  **selectors** - A string or an array of strings representing selectors to match ripple enabled elements against.
  
  Examples:
  ```javascript
  Ripple.init(document, {selectors:".element-with-ripple"});
  Ripple.init(document, {selectors:["a", ".button", ".element-with-ripple"]});
  ```
  **duration** - Ripple effect duration in milliseconds. The default value is 300.
  
  **color** - Color of the ripple effect. The default color is #ffffff.
  
## Browser support
