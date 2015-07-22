(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.Ripple = factory(root.b);
    }
}(this, function () {

    var Ripple = {},
        observerConfig = {
            subtree: true,
            childList: true,
            attributes: false
        },
        selectors = [],
        animationDuration = 600;

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

        // set styles on the element
        node.setAttribute('style', 'position:relative');

        node.addEventListener('click', function (e) {
            var x = e.pageX,
                y = e.pageY,
                node = e.currentTarget,
                clickY = y - node.offsetTop,
                clickX = x - node.offsetLeft,
                setX = parseInt(clickX),
                setY = parseInt(clickY),
                svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
                circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
                newRadius = Math.sqrt(Math.pow(node.offsetWidth, 2) + Math.pow(node.offsetHeight, 2)).toFixed(2);

            var oldSvg = node.querySelector('svg');
            if (oldSvg) {
                oldSvg.remove();
            }

            circle.setAttribute('cx', setX);
            circle.setAttribute('cy', setY);
            circle.setAttribute('r', 0);

            svg.appendChild(circle);

            circle.appendChild(createAnimation('r', animationDuration + 'ms', newRadius, 'freeze'));
            circle.appendChild(createAnimation('fill-opacity', (animationDuration + 400) + 'ms', 0, 'freeze'));

            node.appendChild(svg);
        });
    };

    var createAnimation = function (attribute, dur, to, fill) {
        var animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');

        animation.setAttribute('attributeName', attribute);
        animation.setAttribute('dur', dur);
        animation.setAttribute('to', to);
        animation.setAttribute('fill', fill);

        return animation;
    };

    return Ripple;
}));