(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.Ripple = factory();
    }
}(this, function () {

    var Ripple = {},
        observerConfig = {
            subtree: true,
            childList: true,
            attributes: false
        },
        selectors = [],
        animationDuration = 300,
        rippleColor = '#ffffff';

    Ripple.init = function (node, options) {
        var observer = new MutationObserver(mutationsFound);
        observer.observe(node, observerConfig);

        // process options
        processOptions(options);

        applyRipple();
    };

    var processOptions = function (options) {

        if (options) {
            // selectors
            if (options.selectors) {
                if (Object.prototype.toString.call(options.selectors) === '[object Array]') {
                    selectors = selectors.concat(options.selectors);
                } else if (typeof options.selectors === 'string') {
                    selectors.push(options.selectors);
                }
            }

            if (options.duration) {
                animationDuration = options.duration;
            }

            if (options.color) {
                rippleColor = options.color;
            }
        }

    };

    var mutationsFound = function (mutations) {
        mutations.forEach(function (record) {
            processAddedNodes(record.addedNodes);
        });
    };

    var processAddedNodes = function (nodes) {
        var node;

        var processSelector = function (selector) {
            if (node.matches(selector)) {
                applyRippleToElement(node);
            }
        };

        for (var i = 0; i < nodes.length; i++) {
            node = nodes.item(i);
            if (node instanceof Element) {
                selectors.forEach(processSelector);
                applyRipple(node);
            }
        }
    };

    var applyRipple = function (root) {
        var nodes,
            node;

        root = root ? root : document;
        nodes = root.querySelectorAll(selectors.join(','));

        for (var i = 0; i < nodes.length; i++) {
            node = nodes.item(i);

            // apply ripple to node
            applyRippleToElement(node);
        }
    };

    var applyRippleToElement = function (node) {

        var position = getComputedStyle(node).getPropertyValue('position');

        // set styles on the element        
        node.style.overflow = 'hidden';
        if (position === 'static') {
            node.style.position = 'relative';
        }

        node.addEventListener('click', function (e) {

            var node = e.currentTarget,
                localCoord = getLocalEventCoords(e, node),
                setX = localCoord.x,
                setY = localCoord.y,
                svg = node.querySelector('svg'),
                newRadius = Math.sqrt(Math.pow(node.offsetWidth, 2) + Math.pow(node.offsetHeight, 2)).toFixed(2),
                circle;


            if (!svg) {
                svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

                svg.style.position = 'absolute';
                svg.style.top = 0;
                svg.style.left = 0;
                svg.style.width = '100%';
                svg.style.height = '100%';

                svg.appendChild(circle);

                circle.appendChild(createAnimation('r', animationDuration + 'ms', newRadius, 'freeze'));
                circle.appendChild(createAnimation('fill-opacity', (animationDuration + 400) + 'ms', 0, 'freeze'));

                node.appendChild(svg);
            } else {
                circle = svg.querySelector('circle');

            }

            circle.setAttribute('cx', setX);
            circle.setAttribute('cy', setY);
            circle.setAttribute('r', 0);
            circle.setAttribute('fill', rippleColor);
            circle.setAttribute('fill-opacity', 0.4);

            runAnimations(circle.querySelectorAll('animate'));

        });
    };

    var getLocalEventCoords = function (event, node) {
        var rect = node.getBoundingClientRect(),
            scrollTop = document.documentElement.scrollTop ?
            document.documentElement.scrollTop : document.body.scrollTop,
            scrollLeft = document.documentElement.scrollLeft ?
            document.documentElement.scrollLeft : document.body.scrollLeft,
            elementLeft = rect.left + scrollLeft,
            elementTop = rect.top + scrollTop,
            x,
            y;

        if (document.all) {
            x = event.clientX + scrollLeft - elementLeft;
            y = event.clientY + scrollTop - elementTop;
        } else {
            x = event.pageX - elementLeft;
            y = event.pageY - elementTop;
        }

        return {
            x: x,
            y: y
        };
    };

    var createAnimation = function (attribute, dur, to, fill) {
        var animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');

        animation.setAttribute('attributeName', attribute);
        animation.setAttribute('dur', dur);
        animation.setAttribute('to', to);
        animation.setAttribute('fill', fill);
        animation.setAttribute('begin', 'indefinite');

        return animation;
    };

    var runAnimations = function (animations) {
        var animation;
        for (var i = 0; i < animations.length; i++) {
            animations.item(i).beginElement();
        }
    };

    return Ripple;
}));