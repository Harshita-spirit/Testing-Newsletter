
(function (jQuery) {
  if (!jQuery.browser) {
    var userAgent = navigator.userAgent || "";

    jQuery.uaMatch = function (uaString) {
      uaString = uaString.toLowerCase();
      var match = /(edge)[ \/]([\w.]+)/.exec(uaString) ||
        /(chrome)[ \/]([\w.]+)/.exec(uaString) ||
        /(webkit)[ \/]([\w.]+)/.exec(uaString) ||
        /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(uaString) ||
        /(msie) ([\w.]+)/.exec(uaString) ||
        (uaString.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(uaString)) ||
        [];
      return {
        browser: match[1] || "",
        version: match[2] || "0"
      };
    };
    userAgentMatch = jQuery.uaMatch(userAgent);

    jQuery.browser = {};
    if (userAgentMatch.browser) {
      jQuery.browser[userAgentMatch.browser] = true;
      jQuery.browser.version = userAgentMatch.version;
    }
    if (jQuery.browser.webkit) {
      jQuery.browser.safari = true;
    }
  }
})(jQuery);

jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
  //x--unused
  //t--currentTime
  //b--startingValue
  //c--changeInValue
  //d--totalTimeDuration
  easeOutCubic: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    if (t == d) return b + c;

    return c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
});

window.Modernizr = (function (f, document_, undefinedParam) {
  function testProps(props, prefixed) {
    for (var p in props) if (modernizerStyle[props[p]] !== undefinedParam) return "pfx" == prefixed ? props[p] : !0;
    return !1;
  }
  function testPropsAll(prop, prefixed, element_) {
    var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1),
      props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
    if ("string" === typeof prefixed || "undefined" === typeof prefixed) prefixed = testProps(props, prefixed);
    else
      testsSlice: {
        (props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" ")), (prop = props);
        for (var p in prop)
          if (((ucProp = prefixed[prop[p]]), ucProp !== undefinedParam)) {
            prefixed = !1 === element_ ? prop[p] : "function" === typeof ucProp ? ucProp.bind(element_ || prefixed) : ucProp;
            break testsSlice;
          }
        prefixed = !1;
      }
    return prefixed;
  }
  var modernizer = {},
    htmlElement = document_.documentElement,
    modernizerElement = document_.createElement("modernizr"),
    modernizerStyle = modernizerElement.style;
  prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
  var cssomPrefixes = ["Webkit", "Moz", "O", "ms"],
    domPrefixes = ["webkit", "moz", "o", "ms"];
  modernizerElement = {};
  var tests = [],
    testsSlice = tests.slice,
    lowerCaseData,
    createTest = function (test, testFn, numOfDivs, divIds) {
      var styleText,
        testDiv,
        divElement = document_.createElement("div"),
        bodyElement = document_.body,
        checkBodyElement = bodyElement ? bodyElement : document_.createElement("body");
      if (parseInt(numOfDivs, 10))
        for (; numOfDivs--;) {
          var div_ = document_.createElement("div");
          div_.id = divIds ? divIds[numOfDivs] : "modernizr" + (numOfDivs + 1);
          divElement.appendChild(div_);
        }
      return (
        (styleText = ["&#173;<style>", test, "</style>"].join("")),
        (divElement.id = "modernizr"),
        ((bodyElement ? divElement : checkBodyElement).innerHTML += styleText),
        checkBodyElement.appendChild(divElement),
        bodyElement || ((checkBodyElement.style.background = ""), htmlElement.appendChild(checkBodyElement)),
        (testDiv = testFn(divElement, test)),
        bodyElement ? divElement.parentNode.removeChild(divElement) : checkBodyElement.parentNode.removeChild(checkBodyElement),
        !!testDiv
      );
    },
    hasOwnProperty_ = {}.hasOwnProperty,
    setProp;
  "undefined" === typeof hasOwnProperty_ || "undefined" === typeof hasOwnProperty_.call
    ? (setProp = function (obj, prop) {
      return prop in obj && "undefined" === typeof obj.constructor.prototype[prop];
    })
    : (setProp = function (obj, prop) {
      return hasOwnProperty_.call(obj, prop);
    });
  Function.prototype.bind ||
    (Function.prototype.bind = function (thisArg) {
      var fn = this;
      if ("function" != typeof fn) throw new TypeError();
      var testsSliceArguments = testsSlice.call(arguments, 1),
        boundFn = function () {
          if (this instanceof boundFn) {
            var empty = function () { };
            empty.prototype = fn.prototype;
            empty = new empty();
            var obj = fn.apply(empty, testsSliceArguments.concat(testsSlice.call(arguments)));
            return Object(obj) === obj ? obj : empty;
          }
          return fn.apply(thisArg, testsSliceArguments.concat(testsSlice.call(arguments)));
        };
      return boundFn;
    });
  (function (prefixes, tests) {
    var styles = prefixes.join(""),
      testLength = tests.length;
    createTest(
      styles,
      function (elem, callBack) {
        for (var childNodes_ = elem.childNodes, elementMap = {}; testLength--;) elementMap[childNodes_[testLength].id] = childNodes_[testLength];
        modernizer.csstransforms3d =
          9 === (elementMap.csstransforms3d && elementMap.csstransforms3d.offsetLeft) &&
          3 === elementMap.csstransforms3d.offsetHeight;
      },
      testLength,
      tests
    );
  })(
    [
      ,
      [
        "@media (",
        prefixes.join("transform-3d),("),
        "modernizr){#csstransforms3d{left:9px;position:absolute;height:3px;}}",
      ].join(""),
    ],
    [, "csstransforms3d"]
  );
  modernizerElement.csstransforms3d = function () {
    var hasPerspective = !!testPropsAll("perspective");
    return hasPerspective && "webkitPerspective" in htmlElement.style && (hasPerspective = modernizer.csstransforms3d), hasPerspective;
  };
  for (var prop in modernizerElement)
    setProp(modernizerElement, prop) &&
      ((lowerCaseData = prop.toLowerCase()), (modernizer[lowerCaseData] = modernizerElement[prop]()), tests.push((modernizer[lowerCaseData] ? "" : "no-") + lowerCaseData));
  modernizerStyle.cssText = "";
  return (
    (modernizerElement = null),
    (modernizer._version = "2.5.3"),
    (modernizer._prefixes = prefixes),
    (modernizer._domPrefixes = domPrefixes),
    (modernizer._cssomPrefixes = cssomPrefixes),
    (modernizer.testProp = function (prop) {
      return testProps([prop]);
    }),
    (modernizer.testAllProps = testPropsAll),
    (modernizer.testStyles = createTest),
    (modernizer.prefixed = function (prop, obj, element) {
      return obj ? testPropsAll(prop, obj, element) : testPropsAll(prop, "pfx");
    }),
    modernizer
  );
})(this, this.document);

(function (f, H, E) {
  function J(I) {
    I = I || location.href;
    return "#" + I.replace(/^[^#]*#?(.*)$/, "$1");
  }
  ("$:nomunge");
  var B = document,
    w = f.event.special,
    K = B.documentMode,
    C = "onhashchange" in H && (K === E || 7 < K);
  f.fn.hashchange = function (I) {
    return I ? this.bind("hashchange", I) : this.trigger("hashchange");
  };
  f.fn.hashchange.delay = 50;
  w.hashchange = f.extend(w.hashchange, {
    setup: function () {
      if (C) return !1;
      f(M.start);
    },
    teardown: function () {
      if (C) return !1;
      f(M.stop);
    },
  });
  var M = (function () {
    function I() {
      var e = J(),
        g = d(a);
      e !== a
        ? (c((a = e), g), f(H).trigger("hashchange"))
        : g !== a && (location.href = location.href.replace(/#.*/, "") + g);
      P = setTimeout(I, f.fn.hashchange.delay);
    }
    var O = {},
      P,
      a = J(),
      b = function (e) {
        return e;
      },
      c = b,
      d = b;
    O.start = function () {
      P || I();
    };
    O.stop = function () {
      P && clearTimeout(P);
      P = E;
    };
    f.browser.msie &&
      !C &&
      (function () {
        var e, g;
        O.start = function () {
          e ||
            ((g = (g = f.fn.hashchange.src) && g + J()),
              (e = f('<iframe tabindex="-1" title="empty"/>')
                .hide()
                .one("load", function () {
                  g || c(J());
                  I();
                })
                .attr("src", g || "javascript:0")
                .insertAfter("body")[0].contentWindow),
              (B.onpropertychange = function () {
                try {
                  "title" === event.propertyName && (e.document.title = B.title);
                } catch (k) { }
              }));
        };
        O.stop = b;
        d = function () {
          return J(e.location.href);
        };
        c = function (k, n) {
          var p = e.document,
            r = f.fn.hashchange.domain;
          k !== n &&
            ((p.title = B.title),
              p.open(),
              r && p.write('<script>document.domain="' + r + '"\x3c/script>'),
              p.close(),
              (e.location.hash = k));
        };
      })();
    return O;
  })();
})(jQuery, this);


try {
  (function (f, H, E, J) {
    function setTimeOutWithArgs(function_, delay, arguments) {
      return setTimeout(boundFunction(function_, arguments), delay);
    }
    function isArray_(inputArray, message, currentValue) {
      return Array.isArray(inputArray) ? (forEach_(inputArray, currentValue[message], currentValue), !0) : !1;
    }
    function forEach_(inputArray, callBack, currentValue) {
      var i;
      if (inputArray)
        if (inputArray.forEach) inputArray.forEach(callBack, currentValue);
        else if (inputArray.length !== J)
          for (i = 0; i < inputArray.length;) callBack.call(currentValue, inputArray[i], i, inputArray), i++;
        else for (i in inputArray) inputArray.hasOwnProperty(i) && callBack.call(currentValue, inputArray[i], i, newObject);
    }
    function mergeObjects(targetObject, sourceObject, undefinedValues) {
      for (var sourceKeys = Object.keys(sourceObject), index = 0; index < sourceKeys.length;) {
        if (!undefinedValues || (undefinedValues && targetObject[sourceKeys[index]] === J)) targetObject[sourceKeys[index]] = sourceObject[sourceKeys[index]];
        index++;
      }
      return targetObject;
    }
    function mergeObjects_(targetObject, sourceObject) {
      return mergeObjects(targetObject, sourceObject, !0);
    }
    function extendClass(subClass, baseClass, additionalProps) {
      baseClass = baseClass.prototype;
      var subPrototype = (subClass.prototype = Object.create(baseClass));
      subPrototype.constructor = subClass;
      subPrototype._super = baseClass;
      additionalProps && mergeObjects(subPrototype, additionalProps);
    }
    function boundFunction(func, context) {
      return function () {
        return func.apply(context, arguments);
      };
    }
    function processCallback(callback, args) {
      return "function" == typeof callback ? callback.apply(args ? args[0] || J : J, args) : callback;
    }
    function addEvent(element, eventTypes, handeler) {
      forEach_(splitString(eventTypes), function (eventType) {
        element.addEventListener(eventType, handeler, !1);
      });
    }
    function removeEvent(element, eventTypes, handeler) {
      forEach_(splitString(eventTypes), function (eventType) {
        element.removeEventListener(eventType, handeler, !1);
      });
    }
    function elementContains(child, parent) {
      for (; child;) {
        if (child == parent) return !0;
        child = child.parentNode;
      }
      return !1;
    }
    function splitString(string_) {
      return string_.trim().split(/\s+/g);
    }
    function indexOf_(inputArray, element, prop) {
      if (inputArray.indexOf && !prop) return inputArray.indexOf(element);
      for (var index = 0; index < inputArray.length;) {
        if ((prop && inputArray[index][prop] == element) || (!prop && inputArray[index] === element)) return index;
        index++;
      }
      return -1;
    }
    function toArray_(inputArray) {
      return Array.prototype.slice.call(inputArray, 0);
    }
    function uniqueArray(inputArray, prop, sort_) {
      for (var unique = [], uniqueValues = [], index = 0; index < inputArray.length;) {
        var value = prop ? inputArray[index][prop] : inputArray[index];
        0 > indexOf_(uniqueValues, value) && unique.push(inputArray[index]);
        uniqueValues[index] = value;
        index++;
      }
      sort_ &&
        (unique = prop
          ? unique.sort(function (value1, value2) {
            return value1[prop] > value2[prop];
          })
          : unique.sort());
      return unique;
    }
    function getPrefixed(prefix, prop) {
      for (var testProp, upperProp = prop[0].toUpperCase() + prop.slice(1), index = 0; index < prefixes.length;) {
        testProp = (testProp = prefixes[index]) ? m + upperProp : prop;
        if (testProp in prefix) return testProp;
        index++;
      }
      return J;
    }
    function getWindowForElement(element) {
      element = element.ownerDocument || element;
      return element.defaultView || element.parentWindow || f;
    }
    function inputHandeler(manager, callback) {
      var self = this;
      this.manager = manager;
      this.callback = callback;
      this.element = manager.element;
      this.target = manager.options.inputTarget;
      this.domHandler = function (value) {
        processCallback(manager.options.enable, [manager]) && self.handler(value);
      };
      this.init();
    }
    function createInputHandeler(manager) {
      var inputClass_ = manager.options.inputClass;
      return new (inputClass_ ? inputClass_ : hasPointer ? pointerRecognizer : hasTouchAndMobile ? touchRecognizer : hasTouch ? gestureInputHandeler : mouseRecognizer)(manager, handeler);
    }
    function handeler(manager, eventType, input) {
      var pointersLength = input.pointers.length,
        changedPointersLength = input.changedPointers.length;
      var isFirst = eventType & 1 && 0 === pointersLength - changedPointersLength;
      input.isFirst = !!isFirst;
      input.isFinal = !!(eventType & 12 && 0 === pointersLength - changedPointersLength);
      isFirst && (manager.session = {});
      input.eventType = eventType;
      eventType = manager.session;
      pointersLength = input.pointers;
      changedPointersLength = pointersLength.length;
      eventType.firstInput || (eventType.firstInput = simpleCloneInputData(input));
      1 < changedPointersLength && !eventType.firstMultiple
        ? (eventType.firstMultiple = simpleCloneInputData(input))
        : 1 === changedPointersLength && (eventType.firstMultiple = !1);
      isFirst = eventType.firstInput;
      var offsetCenter = (changedPointersLength = eventType.firstMultiple) ? changedPointersLength.center : isFirst.center;
      var center = (input.center = getCenter(pointersLength));
      input.timeStamp = timeStampNow();
      input.deltaTime = input.timeStamp - isFirst.timeStamp;
      input.angle = getAngle(offsetCenter, center);
      input.distance = getDistance(offsetCenter, center);
      isFirst = input.center;
      offsetCenter = eventType.offsetDelta || {};
      center = eventType.prevDelta || {};
      var previousInput_ = eventType.prevInput || {};
      if (1 === input.eventType || 4 === previousInput_.eventType)
        (center = eventType.prevDelta = { x: previousInput_.deltaX || 0, y: previousInput_.deltaY || 0 }),
          (offsetCenter = eventType.offsetDelta = { x: isFirst.x, y: isFirst.y });
      input.deltaX = center.x + (isFirst.x - offsetCenter.x);
      input.deltaY = center.y + (isFirst.y - offsetCenter.y);
      input.offsetDirection = getDirection(input.deltaX, input.deltaY);
      offsetCenter = input.deltaTime;
      isFirst = input.deltaX / offsetCenter || 0;
      offsetCenter = input.deltaY / offsetCenter || 0;
      input.overallVelocityX = isFirst;
      input.overallVelocityY = offsetCenter;
      input.overallVelocity = getVelocity(isFirst) > getVelocity(offsetCenter) ? isFirst : offsetCenter;
      changedPointersLength
        ? ((isFirst = changedPointersLength.pointers), (isFirst = getDistance(pointersLength[0], pointersLength[1], xy) / getDistance(isFirst[0], isFirst[1], xy)))
        : (isFirst = 1);
      input.scale = isFirst;
      changedPointersLength
        ? ((changedPointersLength = changedPointersLength.pointers), (pointersLength = getAngle(pointersLength[1], pointersLength[0], xy) + getAngle(changedPointersLength[1], changedPointersLength[0], xy)))
        : (pointersLength = 0);
      input.rotation = pointersLength;
      input.maxPointers = eventType.prevInput
        ? input.pointers.length > eventType.prevInput.maxPointers
          ? input.pointers.length
          : eventType.prevInput.maxPointers
        : input.pointers.length;
      offsetCenter = eventType.lastInterval || input;
      pointersLength = input.timeStamp - offsetCenter.timeStamp;
      8 != input.eventType && (25 < pointersLength || offsetCenter.velocity === J)
        ? ((isFirst = input.deltaX - offsetCenter.deltaX),
          (offsetCenter = input.deltaY - offsetCenter.deltaY),
          (center = isFirst / pointersLength || 0),
          (previousInput_ = offsetCenter / pointersLength || 0),
          (pointersLength = center),
          (changedPointersLength = previousInput_),
          (center = getVelocity(center) > getVelocity(previousInput_) ? center : previousInput_),
          (isFirst = getDirection(isFirst, offsetCenter)),
          (eventType.lastInterval = input))
        : ((center = offsetCenter.velocity),
          (pointersLength = offsetCenter.velocityX),
          (changedPointersLength = offsetCenter.velocityY),
          (isFirst = offsetCenter.direction));
      input.velocity = center;
      input.velocityX = pointersLength;
      input.velocityY = changedPointersLength;
      input.direction = isFirst;
      eventType = manager.element;
      elementContains(input.srcEvent.target, eventType) && (eventType = input.srcEvent.target);
      input.target = eventType;
      manager.emit("hammer.input", input);
      manager.recognize(input);
      manager.session.prevInput = input;
    }
    function simpleCloneInputData(input) {
      for (var pointers_ = [], index = 0; index < input.pointers.length;)
        (pointers_[index] = {
          clientX: round(input.pointers[index].clientX),
          clientY: round(input.pointers[index].clientY),
        }),
          index++;
      return {
        timeStamp: timeStampNow(),
        pointers: pointers_,
        center: getCenter(pointers_),
        deltaX: input.deltaX,
        deltaY: input.deltaY,
      };
    }
    function getCenter(manager) {
      var length = manager.length;
      if (1 === length) return { x: round(manager[0].clientX), y: round(manager[0].clientY) };
      for (var managerClientX = 0, managerClientY = 0, index = 0; index < length;)
        (managerClientX += manager[index].clientX), (managerClientY += manager[index].clientY), index++;
      return { x: round(managerClientX / length), y: round(managerClientY / length) };
    }
    function getDirection(value1, value2) {
      return value1 === value2 ? 1 : getVelocity(value1) >= getVelocity(value2) ? (0 > value1 ? 2 : 4) : 0 > value2 ? 8 : 16;
    }
    function getDistance(startPoint, endPoint, dimension) {
      dimension || (dimension = XY);
      var point_ = endPoint[dimension[0]] - startPoint[dimension[0]];
      startPoint = endPoint[dimension[1]] - startPoint[dimension[1]];
      return Math.sqrt(point_ * point_ + startPoint * startPoint);
    }
    function getAngle(startPoint, endPoint, dimension) {
      dimension || (dimension = XY);
      return (180 * Math.atan2(endPoint[dimension[1]] - startPoint[dimension[1]], endPoint[dimension[0]] - startPoint[dimension[0]])) / Math.PI;
    }
    function mouseRecognizer() {
      this.evEl = mouseDownEvent;
      this.evWin = mouseMoveUpEvent;
      this.allow = !0;
      this.pressed = !1;
      inputHandeler.apply(this, arguments);
    }
    function pointerRecognizer() {
      this.evEl = pointerDownEvent;
      this.evWin = pointerMoveUpCancelEvent;
      inputHandeler.apply(this, arguments);
      this.store = this.manager.session.pointerEvents = [];
    }
    function touchStartRecognizer() {
      this.evTarget = "touchstart";
      this.evWin = "touchstart touchmove touchend touchcancel";
      this.started = !1;
      inputHandeler.apply(this, arguments);
    }
    function touchRecognizer() {
      this.evTarget = touchEvents;
      this.targetIds = {};
      inputHandeler.apply(this, arguments);
    }
    function pointerEventHandelers(touchEvent, eventType) {
      var pointerList = toArray_(touchEvent.touches),
        pointerChangedList = this.targetIds;
      if (eventType & 3 && 1 === pointerList.length) return (pointerChangedList[pointerList[0].identifier] = !0), [pointerList, pointerList];
      var changedPointerList = toArray_(touchEvent.changedTouches),
        array_ = [],
        targetElement = this.target;
      var pointerInTargetList = pointerList.filter(function (R) {
        return elementContains(R.target, targetElement);
      });
      if (1 === eventType) for (index = 0; index < pointerInTargetList.length;) (pointerChangedList[pointerInTargetList[index].identifier] = !0), index++;
      for (index = 0; index < changedPointerList.length;)
        pointerChangedList[changedPointerList[index].identifier] && array_.push(changedPointerList[index]),
          eventType & 12 && delete pointerChangedList[changedPointerList[index].identifier],
          index++;
      if (array_.length) return [uniqueArray(pointerInTargetList.concat(array_), "identifier", !0), array_];
    }
    function gestureInputHandeler() {
      inputHandeler.apply(this, arguments);
      var handeler = boundFunction(this.handler, this);
      this.touch = new touchRecognizer(this.manager, handeler);
      this.mouse = new mouseRecognizer(this.manager, handeler);
    }
    function recognizer(manager, options) {
      this.manager = manager;
      this.set(options);
    }
    function getPanDirection(cssProps) {
      if (-1 < cssProps.indexOf("none")) return "none";
      var allowPanX = -1 < cssProps.indexOf("pan-x"),
        allowPanY = -1 < cssProps.indexOf("pan-y");
      return l && allowPanY
        ? "none"
        : allowPanX || allowPanY
          ? allowPanX
            ? "pan-x"
            : "pan-y"
          : -1 < cssProps.indexOf("manipulation")
            ? "manipulation"
            : "auto";
    }
    function recognizer_(options) {
      options = mergeObjects({}, options || {});
      this.id = id_++;
      this.manager = null;
      this.options = mergeObjects_(options, this.defaults);
      options = this.options.enable;
      this.options.enable = options === J ? !0 : options;
      this.state = 1;
      this.simultaneous = {};
      this.requireFail = [];
    }
    function eventTypeString(data) {
      return data & 16
        ? "cancel"
        : data & 8
          ? "end"
          : data & 4
            ? "move"
            : data & 2
              ? "start"
              : "";
    }
    function directionString(data) {
      return 16 == data
        ? "down"
        : 8 == data
          ? "up"
          : 2 == data
            ? "left"
            : 4 == data
              ? "right"
              : "";
    }
    function getRecognizerByStateId(manager, stateId) {
      var getRecognizer = stateId.manager;
      return getRecognizer ? getRecognizer.get(manager) : manager;
    }
    function applyRecognizer_() {
      recognizer_.apply(this, arguments);
    }
    function panRecognizer() {
      applyRecognizer_.apply(this, arguments);
      this.pY = this.pX = null;
    }
    function pinchRecognizer() {
      applyRecognizer_.apply(this, arguments);
    }
    function pressRecognizer() {
      recognizer_.apply(this, arguments);
      this._input = this._timer = null;
    }
    function rotateRecognizer() {
      applyRecognizer_.apply(this, arguments);
    }
    function swipeRecognizer() {
      applyRecognizer_.apply(this, arguments);
    }
    function tapRecognizer() {
      recognizer_.apply(this, arguments);
      this.pCenter = this.pTime = !1;
      this._input = this._timer = null;
      this.count = 0;
    }
    function createGestureHandeler(target, options) {
      options = options || {};
      var recognizer = options.recognizers;
      options.recognizers = recognizer === J ? createGestureHandeler.defaults.preset : recognizer;
      return new gestureSession(target, options);
    }
    function gestureSession(target, options) {
      options = options || {};
      this.options = mergeObjects_(options, createGestureHandeler.defaults);
      this.options.inputTarget = this.options.inputTarget || target;
      this.handlers = {};
      this.session = {};
      this.recognizers = [];
      this.element = target;
      this.input = createInputHandeler(this);
      this.touchAction = new recognizer(this, this.options.touchAction);
      applyCssProps(this, !0);
      forEach_(
        options.recognizers,
        function (recognizerConfig) {
          var recognizer = this.add(new recognizerConfig[0](recognizerConfig[1]));
          recognizerConfig[2] && recognizer.recognizeWith(recognizerConfig[2]);
          recognizerConfig[3] && recognizer.requireFailure(recognizerConfig[3]);
        },
        this
      );
    }
    function applyCssProps(session, enabled) {
      var element = session.element;
      element.style &&
        forEach_(session.options.cssProps, function (value, prop) {
          element.style[getPrefixed(element.style, prop)] = enabled ? value : "";
        });
    }
    function dispatchGestureEvent(type, gesture) {
      var event = H.createEvent("Event");
      event.initEvent(type, !0, !0);
      event.gesture = gesture;
      gesture.target.dispatchEvent(event);
    }
    var prefixes = " webkit moz MS ms o".split(" "),
      divElement = H.createElement("div"),
      round = Math.round,
      getVelocity = Math.abs,
      timeStampNow = Date.now,
      id_ = 1,
      isMobileDevice = /mobile|tablet|ip(ad|hone|od)|android/i,
      hasTouch = "ontouchstart" in f,
      hasPointer = getPrefixed(f, "PointerEvent") !== J,
      hasTouchAndMobile = hasTouch && isMobileDevice.test(navigator.userAgent),
      XY = ["x", "y"],
      xy = ["clientX", "clientY"];
    inputHandeler.prototype = {
      handler: function () { },
      init: function () {
        this.evEl && addEvent(this.element, this.evEl, this.domHandler);
        this.evTarget && addEvent(this.target, this.evTarget, this.domHandler);
        this.evWin && addEvent(getWindowForElement(this.element), this.evWin, this.domHandler);
      },
      destroy: function () {
        this.evEl && removeEvent(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEvent(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEvent(getWindowForElement(this.element), this.evWin, this.domHandler);
      },
    };
    var mouseEvents = { mousedown: 1, mousemove: 2, mouseup: 4 },
      mouseDownEvent = "mousedown",
      mouseMoveUpEvent = "mousemove mouseup";
    extendClass(mouseRecognizer, inputHandeler, {
      handler: function (event) {
        var mouseEvent_ = mouseEvents[event.type];
        mouseEvent_ & 1 && 0 === event.button && (this.pressed = !0);
        mouseEvent_ & 2 && 1 !== event.which && (mouseEvent_ = 4);
        this.pressed &&
          this.allow &&
          (mouseEvent_ & 4 && (this.pressed = !1),
            this.callback(this.manager, mouseEvent_, {
              pointers: [event],
              changedPointers: [event],
              pointerType: "mouse",
              srcEvent: event,
            }));
      },
    });
    var pointerEvents = {
      pointerdown: 1,
      pointermove: 2,
      pointerup: 4,
      pointercancel: 8,
      pointerout: 8,
    },
      pointerTypes = { 2: "touch", 3: "pen", 4: "mouse", 5: "kinect" },
      pointerDownEvent = "pointerdown",
      pointerMoveUpCancelEvent = "pointermove pointerup pointercancel";
    f.MSPointerEvent &&
      ((pointerDownEvent = "MSPointerDown"),
        (pointerMoveUpCancelEvent = "MSPointerMove MSPointerUp MSPointerCancel"));
    extendClass(pointerRecognizer, inputHandeler, {
      handler: function (event) {
        var store = this.store,
          removePointer = !1,
          eventType = event.type.toLowerCase().replace("ms", "");
        eventType = pointerEvents[eventType];
        var pointerType_ = pointerTypes[event.pointerType] || event.pointerType,
          isTouch = "touch" == pointerType_,
          pointerIndex = indexOf_(store, event.pointerId, "pointerId");
        eventType & 1 && (0 === event.button || isTouch)
          ? 0 > pointerIndex && (store.push(event), (pointerIndex = store.length - 1))
          : eventType & 12 && (m = !0);
        0 > pointerIndex ||
          ((store[pointerIndex] = event),
            this.callback(this.manager, eventType, {
              pointers: store,
              changedPointers: [event],
              pointerType: pointerType_,
              srcEvent: event,
            }),
            removePointer && store.splice(pointerIndex, 1));
      },
    });
    var touchActions_ = { touchstart: 1, touchmove: 2, touchend: 4, touchcancel: 8 };
    extendClass(touchStartRecognizer, inputHandeler, {
      handler: function (event) {
        var touchEventType = touchActions_[event.type];
        1 === touchEventType && (this.started = !0);
        if (this.started) {
          var touches = toArray_(event.touches);
          var changedTouches = toArray_(event.changedTouches);
          touchEventType & 12 && (touches = uniqueArray(touches.concat(changedTouches), "identifier", !0));
          touches = [touches, changedTouches];
          touchEventType & 12 && 0 === touches[0].length - touches[1].length && (this.started = !1);
          this.callback(this.manager, touchEventType, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: "touch",
            srcEvent: event,
          });
        }
      },
    });
    var touchActions__ = { touchstart: 1, touchmove: 2, touchend: 4, touchcancel: 8 },
      touchEvents = "touchstart touchmove touchend touchcancel";
    extendClass(touchRecognizer, inputHandeler, {
      handler: function (event) {
        var eventType = touchActions__[event.type],
          ponterData = pointerEventHandelers.call(this, event, eventType);
        ponterData &&
          this.callback(this.manager, eventType, {
            pointers: ponterData[0],
            changedPointers: ponterData[1],
            pointerType: "touch",
            srcEvent: event,
          });
      },
    });
    extendClass(gestureInputHandeler, inputHandeler, {
      handler: function (manager, action, data) {
        var isMouse = "mouse" == data.pointerType;
        if ("touch" == data.pointerType) this.mouse.allow = !1;
        else if (isMouse && !this.mouse.allow) return;
        action & 12 && (this.mouse.allow = !0);
        this.callback(manager, action, data);
      },
      destroy: function () {
        this.touch.destroy();
        this.mouse.destroy();
      },
    });
    var touchActionProperty = getPrefixed(divElement.style, "touchAction"),
      hasTouchAction = touchActionProperty !== J;
    recognizer.prototype = {
      set: function (value) {
        "compute" == value && (value = this.compute());
        hasTouchAction &&
          this.manager.element.style &&
          (this.manager.element.style[touchActionProperty] = value);
        this.actions = value.toLowerCase().trim();
      },
      update: function () {
        this.set(this.manager.options.touchAction);
      },
      compute: function () {
        var actions = [];
        forEach_(this.manager.recognizers, function (recognizer) {
          processCallback(recognizer.options.enable, [recognizer]) && (actions = actions.concat(recognizer.getTouchAction()));
        });
        return getPanDirection(actions.join(" "));
      },
      preventDefaults: function (event) {
        if (!hasTouchAction) {
          var sourceEvent = event.srcEvent,
            offsetDirection_ = event.offsetDirection;
          if (this.manager.session.prevented) sourceEvent.preventDefault();
          else {
            var actions_ = this.actions,
              hasNone = -1 < actions_.indexOf("none"),
              hasPanY = -1 < actions_.indexOf("pan-y");
            actions_ = -1 < actions_.indexOf("pan-x");
            if (hasNone) {
              var isShort = 2 > event.distance,
                isFast = 250 > event.deltaTime;
              if (1 === event.pointers.length && isShort && isFast) return;
            }
            if (!actions_ || !hasPanY)
              if (hasNone || (hasPanY && offsetDirection_ & 6) || (actions_ && offsetDirection_ & 24)) return this.preventSrc(sourceEvent);
          }
        }
      },
      preventSrc: function (event) {
        this.manager.session.prevented = !0;
        event.preventDefault();
      },
    };
    recognizer_.prototype = {
      defaults: {},
      set: function (options) {
        mergeObjects(this.options, options);
        this.manager && this.manager.touchAction.update();
        return this;
      },
      recognizeWith: function (otherRecognizer) {
        if (isArray_(otherRecognizer, "recognizeWith", this)) return this;
        var simultaneousRecognizer = this.simultaneous;
        otherRecognizer = getRecognizerByStateId(otherRecognizer, this);
        simultaneousRecognizer[otherRecognizer.id] || ((simultaneousRecognizer[otherRecognizer.id] = otherRecognizer), otherRecognizer.recognizeWith(this));
        return this;
      },
      dropRecognizeWith: function (otherRecognizer) {
        if (isArray_(otherRecognizer, "dropRecognizeWith", this)) return this;
        otherRecognizer = getRecognizerByStateId(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
      },
      requireFailure: function (otherRecognizer) {
        if (isArray_(otherRecognizer, "requireFailure", this)) return this;
        var requireFailRecognizer = this.requireFail;
        otherRecognizer = getRecognizerByStateId(otherRecognizer, this);
        -1 === indexOf_(requireFailRecognizer, otherRecognizer) && (requireFailRecognizer.push(otherRecognizer), otherRecognizer.requireFailure(this));
        return this;
      },
      dropRequireFailure: function (otherRecognizer) {
        if (isArray_(otherRecognizer, "dropRequireFailure", this)) return this;
        otherRecognizer = getRecognizerByStateId(otherRecognizer, this);
        otherRecognizer = indexOf_(this.requireFail, otherRecognizer);
        -1 < otherRecognizer && this.requireFail.splice(otherRecognizer, 1);
        return this;
      },
      hasRequireFailures: function () {
        return 0 < this.requireFail.length;
      },
      canRecognizeWith: function (otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
      },
      emit: function (input) {
        function emitEvent(eventType) {
          m.manager.emit(eventType, input);
        }
        var currentRecognizer = this,
          state = this.state;
        8 > state && emitEvent(currentRecognizer.options.event + eventTypeString(state));
        emitEvent(currentRecognizer.options.event);
        input.additionalEvent && emitEvent(input.additionalEvent);
        8 <= state && emitEvent(currentRecognizer.options.event + eventTypeString(state));
      },
      tryEmit: function (input_) {
        if (this.canEmit()) return this.emit(input_);
        this.state = 32;
      },
      canEmit: function () {
        for (var index = 0; index < this.requireFail.length;) {
          if (!(this.requireFail[index].state & 33)) return !1;
          index++;
        }
        return !0;
      },
      recognize: function (inputData) {
        inputData = mergeObjects({}, inputData);
        processCallback(this.options.enable, [this, inputData])
          ? (this.state & 56 && (this.state = 1),
            (this.state = this.process(inputData)),
            this.state & 30 && this.tryEmit(inputData))
          : (this.reset(), (this.state = 32));
      },
      process: function (data) { },
      getTouchAction: function () { },
      reset: function () { },
    };
    extendClass(applyRecognizer_, recognizer_, {
      defaults: { pointers: 1 },
      attrTest: function (eventData) {
        var pointersCount = this.options.pointers;
        return 0 === pointersCount || eventData.pointers.length === pointersCount;
      },
      process: function (event) {
        var state = this.state,
          eventType = event.eventType,
          state_ = state & 6;
        event = this.attrTest(event);
        return state_ && (eventType & 8 || !event)
          ? state | 16
          : state_ || event
            ? eventType & 4
              ? state | 8
              : state & 2
                ? state | 4
                : 2
            : 32;
      },
    });
    extendClass(panRecognizer, applyRecognizer_, {
      defaults: { event: "pan", threshold: 10, pointers: 1, direction: 30 },
      getTouchAction: function () {
        var direction = this.options.direction,
          actions = [];
        direction & 6 && actions.push("pan-y");
        direction & 24 && actions.push("pan-x");
        return actions;
      },
      directionTest: function (eventData) {
        var options = this.options,
          isValidDirection = !0,
          distance = eventData.distance,
          direction = eventData.direction,
          deltaX = eventData.deltaX,
          deltaY = eventData.deltaY;
        direction & options.direction ||
          (options.direction & 6
            ? ((direction = 0 === deltaX ? 1 : 0 > deltaX ? 2 : 4),
              (isValidDirection = deltaX != this.pX),
              (distance = Math.abs(eventData.deltaX)))
            : ((direction = 0 === deltaY ? 1 : 0 > deltaY ? 8 : 16),
              (isValidDirection = deltaY != this.pY),
              (distance = Math.abs(eventData.deltaY))));
        eventData.direction = direction;
        return isValidDirection && distance > options.threshold && direction & options.direction;
      },
      attrTest: function (eventData) {
        return (
          applyRecognizer_.prototype.attrTest.call(this, eventData) &&
          (this.state & 2 || (!(this.state & 2) && this.directionTest(eventData)))
        );
      },
      emit: function (eventData) {
        this.pX = eventData.deltaX;
        this.pY = eventData.deltaY;
        var direction = directionString(eventdata.direction);
        direction && (eventData.additionalEvent = this.options.event + direction);
        this._super.emit.call(this, eventData);
      },
    });
    extendClass(pinchRecognizer, applyRecognizer_, {
      defaults: { event: "pinch", threshold: 0, pointers: 2 },
      getTouchAction: function () {
        return ["none"];
      },
      attrTest: function (eventData) {
        return (
          this._super.attrTest.call(this, eventData) &&
          (Math.abs(eventData.scale - 1) > this.options.threshold || this.state & 2)
        );
      },
      emit: function (eventData) {
        1 !== eventData.scale &&
          (eventData.additionalEvent =
            this.options.event + (1 > eventData.scale ? "in" : "out"));
        this._super.emit.call(this, eventData);
      },
    });
    extendClass(pressRecognizer, recognizer_, {
      defaults: { event: "press", pointers: 1, time: 500, threshold: 5 },
      getTouchAction: function () {
        return ["auto"];
      },
      process: function (eventData) {
        var options = this.options,
          pointersCount = eventData.pointers.length === options.pointers,
          distanceThreshold = eventData.distance < options.threshold,
          timeThreshold = eventData.deltaTime > options.time;
        this._input = eventData;
        if (!distanceThreshold || !pointersCount || (eventData.eventType & 12 && !timeThreshold)) this.reset();
        else if (eventData.eventType & 1)
          this.reset(),
            (this._timer = setTimeOutWithArgs(
              function () {
                this.state = 8;
                this.tryEmit();
              },
              options.time,
              this
            ));
        else if (input.eventType & 4) return 8;
        return 32;
      },
      reset: function () {
        clearTimeout(this._timer);
      },
      emit: function (eventData) {
        8 === this.state &&
          (eventData && eventData.eventType & 4
            ? this.manager.emit(this.options.event + "up", eventData)
            : ((this._input.timeStamp = timeStampNow()),
              this.manager.emit(this.options.event, this._input)));
      },
    });
    extendClass(rotateRecognizer, applyRecognizer_, {
      defaults: { event: "rotate", threshold: 0, pointers: 2 },
      getTouchAction: function () {
        return ["none"];
      },
      attrTest: function (eventData) {
        return (
          this._super.attrTest.call(this, eventData) &&
          (Math.abs(eventData.rotation) > this.options.threshold || this.state & 2)
        );
      },
    });
    extendClass(swipeRecognizer, applyRecognizer_, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.65,
        direction: 30,
        pointers: 1,
      },
      getTouchAction: function () {
        return panRecognizer.prototype.getTouchAction.call(this);
      },
      attrTest: function (eventData) {
        var direction = this.options.direction;
        if (direction & 30) var overallVelocity_ = eventData.overallVelocity;
        else
          direction & 6 ? (overallVelocity_ = eventData.overallVelocityX) : direction & 24 && (overallVelocity_ = eventData.overallVelocityY);
        return (
          this._super.attrTest.call(this, eventData) &&
          direction & eventData.offsetDirection &&
          eventData.distance > this.options.threshold &&
          eventData.maxPointers == this.options.pointers &&
          getVelocity(overallVelocity_) > this.options.velocity &&
          eventData.eventType & 4
        );
      },
      emit: function (eventData) {
        var direction = directionString(eventData.offsetDirection);
        direction && this.manager.emit(this.options.event + direction, eventData);
        this.manager.emit(this.options.event, eventData);
      },
    });
    extendClass(tapRecognizer, recognizer_, {
      defaults: {
        event: "tap",
        pointers: 1,
        taps: 1,
        interval: 300,
        time: 250,
        threshold: 2,
        posThreshold: 10,
      },
      getTouchAction: function () {
        return ["manipulation"];
      },
      process: function (eventData) {
        var options = this.options,
          pointersCount = eventData.pointers.length === options.pointers,
          distanceThreshold = eventData.distance < options.threshold,
          timeThreshold = eventData.deltaTime < options.time;
        this.reset();
        if (eventData.eventType & 1 && 0 === this.count) return this.failTimeout();
        if (distanceThreshold && timeThreshold && pointersCount) {
          if (4 != eventData.eventType) return this.failTimeout();
          pointersCount = this.pTime ? eventData.timeStamp - this.pTime < options.interval : !0;
          distanceThreshold = !this.pCenter || getDistance(this.pCenter, eventData.center) < options.posThreshold;
          this.pTime = eventData.timeStamp;
          this.pCenter = eventData.center;
          this.count = distanceThreshold && pointersCount ? this.count + 1 : 1;
          this._input = eventData;
          if (0 === this.count % options.taps)
            return this.hasRequireFailures()
              ? ((this._timer = setTimeOutWithArgs(
                function () {
                  this.state = 8;
                  this.tryEmit();
                },
                options.interval,
                this
              )),
                2)
              : 8;
        }
        return 32;
      },
      failTimeout: function () {
        this._timer = setTimeOutWithArgs(
          function () {
            this.state = 32;
          },
          this.options.interval,
          this
        );
        return 32;
      },
      reset: function () {
        clearTimeout(this._timer);
      },
      emit: function () {
        8 == this.state &&
          ((this._input.tapCount = this.count),
            this.manager.emit(this.options.event, this._input));
      },
    });
    createGestureHandeler.VERSION = "2.0.4";
    createGestureHandeler.defaults = {
      domEvents: !1,
      touchAction: "compute",
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [rotateRecognizer, { enable: !1 }],
        [pinchRecognizer, { enable: !1 }, ["rotate"]],
        [swipeRecognizer, { direction: 6 }],
        [panRecognizer, { direction: 6 }, ["swipe"]],
        [tapRecognizer],
        [tapRecognizer, { event: "doubletap", taps: 2 }, ["tap"]],
        [pressRecognizer],
      ],
      cssProps: {
        userSelect: "none",
        touchSelect: "none",
        touchCallout: "none",
        contentZooming: "none",
        userDrag: "none",
        tapHighlightColor: "rgba(0,0,0,0)",
      },
    };
    gestureSession.prototype = {
      set: function (options) {
        mergeObjects(this.options, options);
        options.touchAction && this.touchAction.update();
        options.inputTarget &&
          (this.input.destroy(),
            (this.input.target = options.inputTarget),
            this.input.init());
        return this;
      },
      stop: function (value) {
        this.session.stopped = value ? 2 : 1;
      },
      recognize: function (eventData) {
        var session = this.session;
        if (!session.stopped) {
          this.touchAction.preventDefaults(eventData);
          var recognizers = this.recognizers,
            currRecognizer = session.curRecognizer;
          if (!currRecognizer || (currRecognizer && currRecognizer.state & 8)) currRecognizer = session.curRecognizer = null;
          for (var index = 0; index < recognizers.length;) {
            var selectedRecognizer = recognizers[index];
            2 === session.stopped || (currRecognizer && selectedRecognizer != currRecognizer && !selectedRecognizer.canRecognizeWith(currRecognizer))
              ? selectedRecognizer.reset()
              : selectedRecognizer.recognize(eventData);
            !currRecognizer && selectedRecognizer.state & 14 && (currRecognizer = session.curRecognizer = selectedRecognizer);
            index++;
          }
        }
      },
      get: function (recognizer) {
        if (recognizer instanceof recognizer_) return recognizer;
        for (var recognizers_ = this.recognizers, index = 0; index < recognizers_.length; index++)
          if (recognizers_[index].options.event == recognizer) return recognizers_[index];
        return null;
      },
      add: function (recognizer) {
        if (isArray_(recognizer, "add", this)) return this;
        var existingRecognizer = this.get(recognizer.options.event);
        existingRecognizer && this.remove(l);
        this.recognizers.push(recognizer);
        recognizer.manager = this;
        this.touchAction.update();
        return recognizer;
      },
      remove: function (recognizer) {
        if (isArray_(recognizer, "remove", this)) return this;
        var recognizers_ = this.recognizers;
        recognizer = this.get(recognizer);
        recognizers_.splice(indexOf_(recognizers_, recognizer), 1);
        this.touchAction.update();
        return this;
      },
      on: function (events, handeler) {
        var handelers_ = this.handlers;
        forEach_(splitString(events), function (event) {
          handelers_[event] = handelers_[event] || [];
          handelers_[event].push(handeler);
        });
        return this;
      },
      off: function (events, handeler) {
        var handelers_ = this.handlers;
        forEach_(splitString(events), function (event) {
          handeler ? handelers_[event].splice(indexOf_(handelers_[event], handeler), 1) : delete handelers_[event];
        });
        return this;
      },
      emit: function (event, data) {
        this.options.domEvents && dispatchGestureEvent(event, data);
        var handelers_ = this.handlers[event] && this.handlers[event].slice();
        if (handelers_ && handelers_.length) {
          data.type = event;
          data.preventDefault = function () {
            data.srcEvent.preventDefault();
          };
          for (var index = 0; index < handelers_.length;) handelers_[index](data), index++;
        }
      },
      destroy: function () {
        this.element && applyCssProps(this, !1);
        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
      },
    };
    mergeObjects(createGestureHandeler, {
      INPUT_START: 1,
      INPUT_MOVE: 2,
      INPUT_END: 4,
      INPUT_CANCEL: 8,
      STATE_POSSIBLE: 1,
      STATE_BEGAN: 2,
      STATE_CHANGED: 4,
      STATE_ENDED: 8,
      STATE_RECOGNIZED: 8,
      STATE_CANCELLED: 16,
      STATE_FAILED: 32,
      DIRECTION_NONE: 1,
      DIRECTION_LEFT: 2,
      DIRECTION_RIGHT: 4,
      DIRECTION_UP: 8,
      DIRECTION_DOWN: 16,
      DIRECTION_HORIZONTAL: 6,
      DIRECTION_VERTICAL: 24,
      DIRECTION_ALL: 30,
      Manager: gestureSession,
      Input: inputHandeler,
      TouchAction: recognizer,
      TouchInput: touchRecognizer,
      MouseInput: mouseRecognizer,
      PointerEventInput: pointerRecognizer,
      TouchMouseInput: gestureInputHandeler,
      SingleTouchInput: touchStartRecognizer,
      Recognizer: recognizer_,
      AttrRecognizer: applyRecognizer_,
      Tap: tapRecognizer,
      Pan: panRecognizer,
      Swipe: swipeRecognizer,
      Pinch: pinchRecognizer,
      Rotate: rotateRecognizer,
      Press: pressRecognizer,
      on: addEvent,
      off: removeEvent,
      each: forEach_,
      merge: mergeObjects_,
      extend: mergeObjects,
      inherit: extendClass,
      bindFn: boundFunction,
      prefixed: getPrefixed,
    });
    "function" == typeof define && define.amd
      ? define(function () {
        return createGestureHandeler;
      })
      : "undefined" != typeof module && module.exports
        ? (module.exports = createGestureHandeler)
        : (f[E] = createGestureHandeler);
  })(window, document, "Hammer");
} catch (f) {
  console && console.log && console.log(f);
}


(function (f) {
  function H(elem, config) {
    elem = f(elem);
    var currentInstance = this;
    this.elem = elem;
    this.id = elem.attr("id");
    this.pages = [];
    this.opts = config;
    this.currentPage = null;
    this.pageWidth = config.width / 2;
    this.pageHeight = config.height;
    this.startPage = config.startPage;
    this.onShowPage = config.onShowPage;
    this.onShowPage_ = config.onShowPage_;
    this.slideShow = config.slideShow;
    this.slideShowDelay = config.slideShowDelay;
    this.pauseOnHover = config.pauseOnHover;
    this.turnPageDuration = config.turnPageDuration;
    this.foldGradient = config.foldGradient;
    this.foldGradientThreshold = config.foldGradientThreshold;
    this.shadows = config.shadows;
    this.shadowThreshold = config.shadowThreshold;
    this.clipBoundaries = config.clipBoundaries;
    this.zoomEnabled = config.zoomEnabled;
    this.zoomLevel = 1;
    this.zoomMax = Math.max(config.zoomMax, 1);
    this.zoomMin = config.zoomMin;
    this.zoomBoundingBox = config.zoomBoundingBox;
    this.zoomStep = config.zoomStep;
    this.onZoom = config.onZoom;
    this.mouseWheel = config.mouseWheel;
    this.flipSound = config.flipSound;
    this.centeredWhenClosed = config.centeredWhenClosed;
    this.sectionDefinition = config.sections;
    this.rtl = !!config.rtl;
    this.closable = config.closable;
    f.qBook.support.filters = "filters" in elem[0];
    (this._isMobile = f.qBook.utils.isMobile()) && this.mobileSetup();
    elem.addClass("qbook");
    "static" === elem.css("position") && elem.css("position", "relative");
    var children = elem.children();
    if (children.length < config.pageCount) {
      for (var index = config.pageCount - children.length; index--;) elem.append("<div />");
      children = elem.children();
    }
    pagesContainer =
      this.pagesContainer =
      this.origin =
      f("<div class='qbook-origin'></div>")
        .css({ position: "absolute" })
        .appendTo(elem);
    currentInstance.bookShadow = f("<div class='qbook-book-shadow'></div>")
      .appendTo(elem)
      .css({ top: 0, position: "absolute", display: "none", zIndex: 0 });
    this._controls = {};
    this.controllify(this.opts.controls);
    this.insertPages(children, !0);
    pagesContainer.append(
      "<div class='qbook-shadow-clipper'><div class='qbook-shadow-container'><div class='qbook-shadow-internal'></div></div></div>"
    );
    currentInstance.shadowContainer = f(".qbook-shadow-container", pagesContainer);
    currentInstance.internalShadow = f(".qbook-shadow-internal", pagesContainer);
    currentInstance.shadowClipper = f(".qbook-shadow-clipper", pagesContainer).css({ display: "none" });
    currentInstance.foldShadow = f("<div class='qbook-shadow-fold'></div>").appendTo(
      currentInstance.shadowContainer
    );
    currentInstance.foldGradientContainer = f(
      "<div class='qbook-fold-gradient-container'></div>"
    ).appendTo(currentInstance.shadowContainer);
    currentInstance.foldGradientElem = f(
      "<div class='qbook-fold-gradient'></div>"
    ).appendTo(currentInstance.foldGradientContainer);
    currentInstance.hardPageDropShadow = f("<div class='qbook-hard-page-dropshadow'></div>")
      .css({ display: "none" })
      .appendTo(pagesContainer);
    !f.support.opacity &&
      f.qBook.support.filters &&
      f.qBook.applyAlphaImageLoader([
        "qbook-fold-gradient",
        "qbook-fold-gradient-flipped",
        "qbook-shadow-fold",
        "qbook-shadow-fold-flipped",
      ]);
    currentInstance.shadowContainer.css("position", "relative");
    this.leftHandle = f("<div class='qbook-handle qbook-left'></div>")
      .data("corner", "l")
      .appendTo(pagesContainer);
    this.rightHandle = f("<div class='qbook-handle qbook-right'></div>")
      .data("corner", "r")
      .appendTo(pagesContainer);
    Modernizr.csstransforms3d &&
      ((children = f("<div>").css("transform", "perspective(1px)")),
        (this.perspectiveUnit = "none" != children.css("transform") ? "px" : ""),
        (children = null));
    f.browser.msie &&
      f(".qbook-handle", elem).css({ backgroundColor: "#fff", opacity: "0.01" });
    f(".qbook-handle", pagesContainer).bind("mousedown.qbook", function (r) {
      return currentInstance.pageEdgeDragStart(r);
    });
    config.curl &&
      f(".qbook-handle", pagesContainer).hover(
        function (event) {
          currentInstance.curlTimer ||
            (currentInstance.curlTimer = setTimeout(function () {
              var page =
                event.target == currentInstance.leftHandle[0] ? currentInstance.leftPage() : currentInstance.rightPage();
              if (page) {
                var pageOffset = page.offset();
                currentInstance.curl(
                  page,
                  event.pageY - pageOffset.top >
                  (currentInstance.pageHeight * currentInstance.currentScale * currentInstance._cssZoom) / 2
                );
              }
            }, 120));
        },
        function () {
          currentInstance.curlTimer = clearTimeout(currentInstance.curlTimer);
          currentInstance.uncurl();
        }
      );
    var mouseDownTime, corner;
    f(".qbook-handle", pagesContainer)
      .on("mousedown.qbook", function () {
        mouseDownTime = f.now();
        corner = f(this).data("corner");
      })
      .on("mouseup.qbook", function () {
        var releaseCorner = f(this).data("corner");
        if (
          !(new Date().getTime() - mouseDownTime > currentInstance.opts.handleClickDuration || releaseCorner != corner)
        ) {
          currentInstance._cantStopAnimation || currentInstance.stopAnimation(!1);
          if ("r" === releaseCorner) currentInstance[currentInstance.rtl ? "back" : "advance"]();
          if ("l" === releaseCorner) currentInstance[currentInstance.rtl ? "advance" : "back"]();
          corner = "";
        }
      });
    var isPaused = !1;
    elem.hover(
      function (event) {
        currentInstance.pauseOnHover && ((isPaused = currentInstance.slideShowTimer), currentInstance.stopSlideShow(!0));
      },
      function () {
        currentInstance.pauseOnHover && isPaused && currentInstance.startSlideShow();
      }
    );
    this.clipBoundaries &&
      (this.origin.wrap(
        "<div class='qbook-clipper'><div class='qbook-inner-clipper'></div></div>"
      ),
        f(".qbook-inner-clipper", elem).css({
          position: "absolute",
          width: "100%",
          overflow: "hidden",
        }),
        (this.clipper = f(".qbook-clipper", elem).css({
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          overflow: "hidden",
          zIndex: 1,
        })));
    elem.wrapInner(
      "<div class='qbook-zoomwindow'><div class='qbook-zoomcontent'></div></div>"
    );
    this.zoomWindow = f(".qbook-zoomwindow", elem);
    this.zoomContent = f(".qbook-zoomcontent", elem);
    f.browser.ie8mode &&
      this.zoomContent.wrapInner(
        "<div class='IE8-zoom-helper'style='position:relative'></div>"
      );
    this.zoomWindow.css({ position: "absolute", top: 0 });
    this.zoomContent.css({ position: "absolute", left: 0, top: 0 });
    this.opts.zoomEnabled && this.zoomSetup();
    this.setDimensions(2 * config.coverWidth || config.width, config.coverHeight || config.height);
    this.opts.container && this.createContainer();
    this.singlePage(config.singlePage);
    config.responsiveSinglePage && this.responsiveSinglePage();
    config.scaleToFit && (this.scaleToFit(), this.responsive());
    pagesContainer = config.useTranslate3d;
    Modernizr.csstransforms3d &&
      pagesContainer &&
      (f.qBook.useTranslate3d =
        1 == pagesContainer || ("mobile" == pagesContainer && f.qBook.utils.isMobile()));
    config.useScale3d = config.useScale3d && Modernizr.csstransforms3d;
    !(this._isMobile || f.qBook.utils.isIOS) && this.flipSound && (this.audio = this.createAudioPlayer());
    config.forceBasicPage &&
      (this.foldPage = this.holdHardpage = this.foldPageBasic);
    f.qBook.support.transform ||
      ((this.foldPage = this.foldPageBasic),
        f.qBook.support.filters || (this.holdHardpage = this.foldPageBasic));
    this.mouseWheel &&
      ("zoom" == currentInstance.mouseWheel &&
        elem.bind("mousemove.qbook mouseenter.qbook", function (event) {
          currentInstance._mousemoveEvent = event;
        }),
        elem.mousewheel(function (event, zoomValue) {
          if (currentInstance.mouseWheel) {
            if ("zoom" === currentInstance.mouseWheel) {
              var elementOffset = currentInstance.elem.offset(),
                mouseMove = currentInstance._mousemoveEvent,
                elementOffsetLeft = mouseMove.pageX - elementOffset.left;
              elementOffsetTop = mouseMove.pageY - elementOffset.top;
              0 < zoomValue && currentInstance.zoomIn({ x: elementOffsetLeft, y: elementOffsetTop });
              0 > zoomValue && currentInstance.zoomOut({ x: elementOffsetLeft, y: elementOffsetTop });
            } else 0 < zoomValue && currentInstance.advance(), 0 > zoomValue && currentInstance.back();
            return !1;
          }
        }));
    this.opts.touchEnabled && this.touchSupport();
    this.setupFullscreen();
    config.loadingIndicator &&
      (config.images || config.srcs) &&
      this.elem.addClass("qbook-loading");
    this.showPage(this.startPage, !1);
    1 != this.opts.zoomLevel && this.zoom(this.opts.zoomLevel, { duration: 0 });
    this.setStyle(this.opts.styles || this.opts.style);
    this.showPage(this.startPage, !1);
    this.opts.container &&
      (this.updateContainer(),
        config.scaleToFit && this.scaleToFit(),
        config.responsiveSinglePage && this.responsiveSinglePage());
    1 != this.opts.zoomLevel && this.zoom(this.opts.zoomLevel, { duration: 0 });
    this.callRAFCallback = function () {
      currentInstance.rafCallback();
    };
    window.raf(this.callRAFCallback);
    config.slideShow && this.startSlideShow();
  }
  function rotatePoint(point, angle) {
    var cosValue = Math.cos(angle),
      sinValue = Math.sin(angle);
    return {
      x: cosValue * point.x - sinValue * point.y,
      y: sinValue * point.x + cosValue * point.y
    };
  }
  function isFullyVisible(element) {
    var windowHeight = f(window).height(),
      elementOffset = element.offset(),
      scrollTop = f(window).scrollTop();
    return elementOffset.top > scrollTop && elementOffset.top + element.height() < scrollTop + windowHeight;
  }
  function resizeToFit(element, width, height) {
    var borderWidth;
    var borderHeight = (borderWidth = 0);
    if (!f.qBook.support.boxSizing) {
      var calculatedBorderWidth;
      borderHeight =
        "none" == element.css("borderTopStyle")
          ? 0
          : borderWidths[(calculatedBorderWidth = element.css("borderTopWidth"))] || parseFloat(calculatedBorderWidth);
      borderWidth =
        "none" == element.css("borderRightStyle")
          ? 0
          : borderWidths[(calculatedBorderWidth = element.css("borderRightWidth"))] || parseFloat(calculatedBorderWidth);
      var heightValue =
        "none" == element.css("borderBottomStyle")
          ? 0
          : borderWidths[(calculatedBorderWidth = element.css("borderBottomWidth"))] || parseFloat(calculatedBorderWidth);
      var widthValue =
        "none" == element.css("borderLeftStyle")
          ? 0
          : borderWidths[(calculatedBorderWidth = element.css("borderLeftWidth"))] || parseFloat(calculatedBorderWidth);
      borderWidth =
        parseFloat(element.css("paddingLeft")) +
        parseFloat(element.css("paddingRight")) +
        widthValue +
        borderWidth;
      borderHeight =
        parseFloat(element.css("paddingTop")) +
        parseFloat(element.css("paddingBottom")) +
        borderHeight +
        heightValue;
    }
    element.css("width", width - borderWidth);
    element.css("height", height - borderHeight);
  }
  f.qBook = function (a) {
    return f(a).data("qBook");
  };
  f.qBook.version = "1.3.8";
  f.qBook.support = {};

  iframeFlag = false;

  f.fn.qBook = function (inputData) {
    if ("string" === typeof inputData) {
      var arrayArguments = Array.prototype.slice.call(arguments, 1);
      if ("options" === inputData || "prop" === inputData) {
        var startingIndexInstance = f.qBook(this[0]),
          allArguments = arrayArguments[0];
        return 1 < arrayArguments.length ? (startingIndexInstance[allArguments] = arrayArguments[1]) : startingIndexInstance[allArguments];
      }
      return this.each(function () {
        var currentIndexInstance = f.qBook(this);
        window.qBookInstance = currentIndexInstance;
        currentIndexInstance[inputData].apply(currentIndexInstance, arrayArguments);
      });
    }
    var newConfig = f.extend({}, f.qBook.defaults, inputData);

    return this.each(function (index) {
      if (f.qBook(this))
        console.log(
          "Error: the following element cannot be used twice by qBook plugin: ",
          this
        );
      else {
        var newConfigInstance = new H(this, newConfig);
        window.qBookInstance = newConfigInstance;
        f(this).data("qBook", newConfigInstance);
      }
      if (index === 0) {
        if (this.iframeFlag === true) {
          console.log("Last element detected: ", this);
          $(this).trigger('bookReloadEvent');
        }
        this.iframeFlag = true;
      }
    });
  };
  H.prototype = {
    destroy: function () {
      this.callRAFCallback = f.noop;
      this.curlTimer = clearTimeout(this.curlTimer);
      this.stopSlideShow();
      f("*").add(document).add(window).off(".qbook");
      this.destroyContainer();
      this.stopAnimation(!1);
      this.elem.empty().removeData().off();
    },
    mobileSetup: function () {
      this.opts.hardPageShadow = !1;
    },
    setDimensions: function (width, height) {
      this.zoomed && this.zoomReset(0);
      this.currentScale = 1;
      var element = this.elem,
        pageWidth = this.pageWidth;
      element.css({ height: height, width: width });
      var parent_ = element.parent(),
        display = parent_.css("display");
      display && 0 <= display.indexOf("flex") && parent_.css("display", "block");
      var pageHeight = element.height();
      this.pageWidth = element.width() / 2;
      this.pageHeight = pageHeight;
      this._originalHeight || (this._originalHeight = this.pageHeight);
      this._originalWidth || (this._originalWidth = 2 * this.pageWidth);
      display && 0 <= display.indexOf("flex") && parent_.css("display", display);
      parent_ = this.origin.css({ width: "100%", height: pageHeight });
      pageWidth &&
        this.centeredWhenClosed &&
        ((display = parseFloat(parent_.css("left"), 10)),
          parent_.css("left", display / (pageWidth / this.pageWidth)));
      this.bookShadow.css({ width: width, height: height });
      this.setPagesDimension();
      this.positionBookShadow();
      this.shadowClipper.css({ width: element.width(), height: pageHeight });
      this.hardPageDropShadow.css({
        width: this.pageWidth,
        height: this.pageHeight,
      });
      this.opts.handleWidth &&
        f(".qbook-handle", parent_).css("width", this.opts.handleWidth);
      this.rightHandle.css("left", width - this.rightHandle.width());
      if (this.clipBoundaries || this._restoreClipBoundaries)
        (pageWidth = Math.ceil(
          Math.sqrt(
            this.pageWidth * this.pageWidth + this.pageHeight * this.pageHeight
          )
        )),
          (pageWidth = [this.pageHeight - pageWidth, element.width(), pageWidth, 0]),
          this.origin.css("top", -pageWidth[0]),
          f(".qbook-inner-clipper", element).css({
            width: "100%",
            height: pageWidth[2] - pageWidth[0],
            top: pageWidth[0],
          }),
          this.clipper.css({ width: "100%", height: pageHeight });
      this.zoomWindow.css({ width: 2 * this.pageWidth, height: pageHeight });
      this.zoomContent.css({ width: 2 * this.pageWidth, height: pageHeight });
      this.corners = {
        tl: [0, 0],
        bl: [0, this.pageHeight],
        tr: [this.pageWidth, 0],
        br: [this.pageWidth, this.pageHeight],
        l: [0, 0],
        r: [this.pageWidth, 0],
      };
      element.css({ height: window.innerHeight, width: width });
    },
    setPagesDimension: function () {
      for (var page_, pageWidth, pageHeight, index = 0, lastPageIndex = this.pages.length; index < lastPageIndex; index++)
        (page = this.pages[index]),
          (pageWidth = page.isCover
            ? this.pageWidth
            : this.opts.pageWidth || this.pageWidth),
          (pageHeight = page.isCover
            ? this.pageHeight
            : this.opts.pageHeight || this.pageHeight),
          (page.pageWidth = pageWidth),
          (page.pageHeight = pageHeight),
          page.css({
            width: pageWidth,
            height: pageHeight,
            left: page.onLeft ? 0 : this.pageWidth,
          }),
          (page_ = f(".qbook-page-content", page)),
          resizeToFit(page_, pageWidth, pageHeight),
          this.setPageCorners(page);
      this.opts.gutterShadow &&
        f(".qbook-gutter-shadow", this.elem).css("height", pageHeight);
    },
    setPageCorners: function (page) {
      var pageWidth = 0 + page.pageWidth,
        pageHeight = 0 + page.pageHeight;
      page.corners = {
        tl: [0, 0],
        bl: [0, pageHeight],
        tr: [pageWidth, 0],
        br: [pageWidth, pageHeight],
        l: [0, 0],
        r: [pageWidth, 0],
      };
    },
    setPagePosition: function (page) {
      page.left = page.onLeft ? this.pageWidth - page.pageWidth : this.pageWidth;
      page.top = Math.floor((this.pageHeight - page.pageHeight) / 2);
      page.css({ left: page.left, top: page.top });
    },
    scaleToWidthFit: function (scale) {
      if (f.qBook.support.transform) {
        this.zoomed && this.zoom(1, 0, { offset: { dx: 0, dy: 0 } });
        this.currentScale = scale;
        var zoomContent = this.zoomContent;

        var scaledHeight = this._originalHeight * scale;
        var aspectRatio = this._originalWidth / this._originalHeight;

        zoomContent.css({
          transform: "scale(" + scale + ")",
          transformOrigin: "0 0",
          overflow: "hidden"
        });

        this.elem.css({
          height: scaledHeight,
          width: window.innerWidth,
          overflowX: "hidden",
        });
        this.resizeHandles();
        if (this.opts.onResize) this.opts.onResize(this);
      }
    },
    scale: function (scale) {
      if (f.qBook.support.transform) {
        this.zoomed && this.zoom(1, 0, { offset: { dx: 0, dy: 0 } });
        this.currentScale = scale;
        var zoomContent = this.zoomContent;
        this.opts.zoomUsingTransform
          ? (zoomContent.css({ transform: "scale(" + scale + ")", transformOrigin: "0 0" }),
            (this._cssZoom = 1))
          : (zoomContent.css("zoom", scale), (this._cssZoom = scale * this.zoomLevel));
        this.elem.css({
          height: this._originalHeight * scale,
          width: this._originalWidth * scale,
        });
        this.zoomWindow.css({
          height: this._originalHeight * scale,
          width: this._originalWidth * scale,
        });
        this.resizeHandles();
        if (this.opts.onResize) this.opts.onResize(this);
      }
    },
    scaleToFit: function (width, height) {
      var width_ = width;
      if (!f.isNumeric(width)) {
        var selector = f(width || this.opts.scaleToFit);
        if (!selector.length)
          throw "jQuery selector passed to qbook.resize did not matched in any DOM element.";
        width_ = selector.width();
        height = selector.height();
      }
      this.opts.maxWidth && width_ > this.opts.maxWidth && (width_ = this.opts.maxWidth);
      this.opts.maxHeight &&
        height > this.opts.maxHeight &&
        (height = this.opts.maxHeight);
      this._singlePage && (width_ *= 2);
      selector = this._originalWidth / this._originalHeight;
      height * selector <= width_ || (height = width_ / selector);
      this.scale(height / this._originalHeight);
    },
    resize: function (width, height) {
      this.setDimensions(width, height);
      if (this.opts.onResize) this.opts.onResize(this);
    },
    responsive: function () {
      var currentInstance = this;
      this._reponsiveApplied = !0;
      f(window).on("resize.qbook", function () {
        currentInstance.responsiveResizeHandler();
      });
    },
    responsiveResizeHandler: function () {
      if (f.qBook.utils.isIOS) {
        var container =
          (this.opts.container == window && this.container),
          window_ = f(window);
        if (
          container &&
          (container.outerHeight() != window_.height() || container.outerWidth() != window_.width()) &&
          (this.safariFixTotalDelayedTime ||
            (this.safariFixTotalDelayedTime = 0),
            800 > (this.safariFixTotalDelayedTime || 0))
        ) {
          var currentInstance = this;
          setTimeout(function () {
            currentInstance.safariFixTotalDelayedTime += 100;
            currentInstance.responsiveResizeHandler();
          }, 100);
          return;
        }
        this.safariFixTotalDelayedTime = 0;
      }
      this.responsiveUpdater();
    },
    responsiveUpdater: function () {
      this.opts.container && this.updateContainer();
      this.responsiveSinglePage();
      !0 !== this.opts.container || this.opts.containerHeight
        ? this.scaleToFit()
        : (this.scaleToFit(this.containerBook.width(), 1e4),
          this.containerBook.css("height", "auto"),
          this.updateContainer());
      if ((this.opts.container) && this._singlePage) {
        var pageWidth = this.pageWidth * this.currentScale;
        this.elem.css("left", (this.opts.scaleToFit.width() - pageWidth) / 2);
      }
    },
    responsiveSinglePage: function (option) {
      if ((option = void 0 != option ? option : this.opts.responsiveSinglePage))
        f.isFunction(option) ||
          (option = function (book) {
            if (!this._isMobile) return !1;
            book = f(book.opts.scaleToFit);
            var width = book.width();
            return book.height() > width;
          }),
          this.singlePage(this.opts.singlePage || option.call(this, this));
    },
    resizeHandles: function () {
      if (this.opts.responsiveHandleWidth) {
        var handleWidth = this.opts.responsiveHandleWidth / this.currentScale;
        f(".qbook-handle").width(handleWidth);
        this.rightHandle.css("left", 2 * this.pageWidth - handleWidth);
      }
    },
    insertPages: function (pages, update) {
      for (var index = 0, lastPageIndex = pages.length; index < lastPageIndex; index++) this.insertPage(pages[index], !0);
      this.updateBook(update);
    },
    insertPage: function (page, update) {
      if (this.isDoublePage(page)) this.insertDoublePage(page, update);
      else {
        page = f(page).addClass("qbook-page-content");
        var pageElement = f("<div class='qbook-page'></div>")
          .css({
            width: this.pageWidth,
            height: this.pageHeight,
            display: "none",
            position: "absolute",
          })
          .appendTo(this.pagesContainer)
          .append(page);
        f.qBook.support.boxSizing &&
          page.css(f.qBook.support.boxSizing, "border-box");
        resizeToFit(page, this.pageWidth, this.pageHeight);
        pageElement.hardPageSetByUser = page.hasClass("qbook-hardpage");
        this.opts.gutterShadow && this.upsertGutterShadowInPage(pageElement);
        this.pages.push(pageElement);
        update || this.updateBook();
        return pageElement;
      }
    },
    insertDoublePage: function (page, updateBookFlag) {
      if (!this._insertingDoublePage) {
        this._insertingDoublePage = !0;
        var page_ = f(page),
          clone_ = page_.clone().insertAfter(page_),
          pages_ = page_.add(clone_);
        page_.css("left", 0);
        clone_.css("right", "100%");
        pages_.css({ width: "200%", height: "100%", position: "relative" });
        pages_.css(f.qBook.support.boxSizing + "", "border-box").wrap(
          "<div class='qbook-double-page'></div>"
        );
        page_.parent().data("src", page_.data("src"));
        clone_.parent().data("src", clone_.data("src"));
        page_.parent().data("image", page_.data("image"));
        clone_.parent().data("image", clone_.data("image"));
        if (this.rtl)
          (pagesDirection = this.insertPage(clone_.parent(), !0)),
            (pages_ = this.insertPage(page_.parent(), !0));
        else {
          pages_ = this.insertPage(page_.parent(), !0);
          var pagesDirection = this.insertPage(clone_.parent(), !0);
        }
        pages_ && (pages_.otherHalf = pagesDirection);
        pagesDirection && (pagesDirection.otherHalf = pages_);
        f.qBook.support.boxSizing ||
          (resizeToFit(page_, 2 * this.pageWidth, this.pageHeight),
            resizeToFit(clone_, 2 * this.pageWidth, this.pageHeight));
        updateBookFlag || this.updateBook();
        this._insertingDoublePage = !1;
      }
    },
    isDoublePage: function (page) {
      page = f(page);
      return page.data("double") || page.is(this.opts.doublePages);
    },
    replaceNumberHolder: function (string_, number_) {
      if (void 0 == string_) return string_;
      number_ += "";
      return string_.replace(/\{\{([^}]+)\}\}/g, function (match, placeholder) {
        if (number_.length < placeholder.length) {
          var paddedValue = placeholder.replace(/./g, "0");
          return (paddedValue + number_).slice(-paddedValue.length);
        }
        return number_;
      });
    },
    loadPage: function (page) {
      "number" === typeof page && (page = this.pages[page]);
      if (
        page &&
        !page.loaded &&
        !page.loading &&
        (page.src || page.image || page.cached)
      ) {
        if (page.cached) return this.finishPageLoading(page, page.cache);
        page.loading = !0;
        this.opts.loadingIndicator && page.addClass("qbook-loading");
        var currentInstance = this;
        if (page.src)
          (page.otherHalf && page.otherHalf.loading) ||
            f.get(page.src, function (data) {
              currentInstance.finishPageLoading(page, data);
              page.otherHalf && currentInstance.finishPageLoading(page.otherHalf, data);
            });
        else if (page.image) {
          var image = new Image();
          image.onload = function () {
            currentInstance.finishPageLoading(page, this);
          };
          f(image).addClass("qbook-lazy");
          image.src = page.image;
        }
      }
    },
    finishPageLoading: function (page, content) {
      page.loading = !1;
      page.loaded = !0;
      var isCached = !page.cached;
      page.cached = !1;
      this.opts.loadingIndicator &&
        (page.removeClass("qbook-loading"),
          this.elem.removeClass("qbook-loading"));
      var pageContent = page.find(".qbook-page-content");
      isCached &&
        (page.image || page.src) &&
        this.isDoublePage(pageContent.children().first()) &&
        (pageContent = pageContent.children().first());
      pageContent.append(content);
      this.upsertNumberInPage(page);
      this.opts.gutterShadow && this.upsertGutterShadowInPage(page);
      if (this.opts.onLoadPage) this.opts.onLoadPage(this, page, page.pageIndex);
    },
    unloadPage: function (page) {
      "number" === typeof page && (page = this.pages[page]);
      if (
        page &&
        page.loaded &&
        !this.isPageToKeep(page) &&
        ((page.cache = page.find(".qbook-page-content").html()),
          page.find(".qbook-page-content").empty(),
          (page.cached = !0),
          (page.loaded = !1),
          ((page.cache = void 0), (page.cached = !1), (page.textLayer = null)),
          this.opts.onUnloadPage)
      )
        this.opts.onUnloadPage(this, page, page.pageIndex);
    },
    isPageToKeep: function (page) {
      if (!page.keep) var pageContent = page.find(".qbook-page-content");
      return page.keep || pageContent.data("keep") || pageContent.is(this.opts.pagesToKeep);
    },
    selectPagesToUnload: function (currentPage) {
      void 0 == currentPage && (currentPage = this.currentPage);
      var pagesToUnload = [],
        leftPageIndex = this.leftPageIndex(currentPage);
      currentPage = this.rightPageIndex(currentPage);
      var pageBelowLeft = this.pageBelow(leftPageIndex),
        pageBelowRight = this.pageBelow(currentPage),
        backPageLeft = this.backPage(leftPageIndex),
        backPageRight = this.backPage(currentPage);
      backPageLeft = backPageLeft && backPageLeft.pageIndex;
      backPageRight = backPageRight && backPageRight.pageIndex;
      for (var index = 0, lastPageIndex = this.pages.length; index < lastPageIndex; index++) {
        var page = this.pages[index];
        page.loaded &&
          index != leftPageIndex &&
          index != currentPage &&
          index != pageBelowLeft &&
          index != pageBelowRight &&
          index != backPageLeft &&
          index != backPageRight &&
          !this.isPageToKeep(page) &&
          pagesToUnload.push(index);
      }
      return pagesToUnload;
    },
    loadedPages: function () {
      for (var loadedPages = [], index = 0, lastPageIndex = this.pages.length; index < lastPageIndex; index++)
        this.pages[index].loaded && loadedPages.push(index);
      return loadedPages;
    },
    unloadUnusedPages: function (currentPage) {
      var loadedPages = this.loadedPages();
      if (!(loadedPages.length <= this.opts.pagesInMemory)) {
        loadedPages = loadedPages.length - this.opts.pagesInMemory;
        currentPage = this.selectPagesToUnload(currentPage);
        for (var index = 0; index < loadedPages; index++) this.unloadPage(currentPage[index]);
      }
    },
    removePages: function (startIndex, endIndex) {
      arguments.length || ((startIndex = 0), (endIndex = -1));
      this.holdedPage && this.releasePage(this.holdedPage);
      var pages = this.pages;
      endIndex = (endIndex || startIndex) + 1 || pages.length;
      var removedPages = pages.slice(startIndex, endIndex),
        remainingPages = pages.slice(endIndex);
      pages.length = 0 > startIndex ? pages.length + startIndex : startIndex;
      pages.push.apply(pages, remainingPages);
      remainingPages = 0;
      for (var removedlastPageIndex = removedPages.length; remainingPages < removedlastPageIndex; remainingPages++) removedPages[remainingPages].remove();
      this.updateBook();
      return pages.length;
    },
    updateBook: function (update) {
      this.doPageNumbering();
      this.findPagesType();
      this.positionBookShadow();
      var isRightToLeft = (this.rtl && this.closable) || (!this.rtl && !this.closable),
        pageWidth = this.opts.pageWidth || this.opts.pageHeight;
      this.differentPageSizes = pageWidth;
      for (var index = 0, lastPageIndex = this.pages.length - 1; index <= lastPageIndex; index++) {
        var page = this.pages[index]
          .toggleClass("qbook-left", isRightToLeft)
          .toggleClass("qbook-right", !isRightToLeft)
          .data({ pageIndex: index, holded: !1 });
        page.pageIndex = index;
        page.cover = !1;
        page.insideCover = !1;
        page.isCover =
          pageWidth &&
          (0 == index ||
            index == lastPageIndex ||
            (this.closable && 1 == index) ||
            (index == lastPageIndex - 1 && !this.otherPage(lastPageIndex)));
        var pageContent = f(".qbook-page-content", page);
        page.src = this.replaceNumberHolder(pageContent.data("src") || this.opts.srcs, index);
        page.image = this.replaceNumberHolder(
          pageContent.data("image") || this.opts.images,
          index
        );
        1 != page.loaded && (page.loaded = !page.src && !page.image && !page.cached);
        !page.loaded &&
          this.opts.loadingIndicator &&
          page.addClass("qbook-loading");
        page.onLeft = isRightToLeft;
        page.onRight = !isRightToLeft;
        isRightToLeft = !isRightToLeft;
        page.thickness = this.opts.pageThickness;
        pageWidth && (page.thickness = page.isCover ? this.opts.pageThickness : "1px");
      }
      this.setCovers();
      this.setPagesDimension();
      this.findSections();
      update ? this.updateCurrentPageControl() : this.showPage(this.currentPage);
    },
    setCovers: function () {
      function checkPage(pageIndex) {
        if (0 == pageIndex || pageIndex == lastPageIndex) {
          var page = currentInstance.pages[pageIndex];
          if (page) {
            var backPage = currentInstance.backPage(pageIndex);
            currentInstance.otherPage(pageIndex)
              ? backPage || ((page.cover = !1), (page.insideCover = !0))
              : ((page.cover = !0),
                (page.insideCover = !1),
                backPage && !backPage.cover && (backPage.insideCover = !0));
          }
        }
      }
      var lastPageIndex = this.pages.length - 1,
        currentInstance = this;
      checkPage(0);
      checkPage(lastPageIndex);
      currentInstance.insideCoverLeft = null;
      currentInstance.insideCoverRight = null;
      for (var index = 0, lastPageIndex = this.pages.length - 1; index <= lastPageIndex; index++) {
        var page = currentInstance.pages[index];
        page.insideCover &&
          (page.onLeft ? (currentInstance.insideCoverLeft = page) : (currentInstance.insideCoverRight = page),
            currentInstance.differentPageSizes && (page.keep = !0));
      }
    },
    singlePage: function (isSinglePage) {
      if (void 0 !== isSinglePage) {
        (this._singlePage = !!isSinglePage)
          ? this.clipBoundaries &&
          ((this.clipBoundaries = !1),
            (this._restoreClipBoundaries = !0),
            this.clipper.css("overflow", "visible"),
            this.clipper
              .children(".qbook-inner-clipper")
              .css("overflow", "visible"),
            this.container && this.container.css("overflow", "hidden"))
          : this._restoreClipBoundaries &&
          ((this._restoreClipBoundaries = !1),
            (this.clipBoundaries = !0),
            this.clipper.css("overflow", "hidden"),
            this.clipper
              .children(".qbook-inner-clipper")
              .css("overflow", "visible"));
        isSinglePage = 0;
        var pageWidth = this.pageWidth;
        if (this._singlePage)
          isSinglePage = this.pageIsOnTheRight(this.currentPage) ? -pageWidth : 0;
        else if (this.centeredWhenClosed) {
          isSinglePage = !!this.leftPage(this.currentPage);
          var getRightPage = this.rightPage(this.currentPage);
          isSinglePage = isSinglePage && getRightPage ? 0 : isSinglePage ? pageWidth / 2 : -pageWidth / 2;
        }
        this.origin.css("left", isSinglePage);
        this.positionBookShadow();
      }
      return this._singlePage;
    },
    doPageNumbering: function () {
      var opts = this.opts;
      if (opts.pageNumbers && this.pages.length) {
        var numberedPages = opts.numberedPages;
        var lastPageIndex = this.pages.length - 1;
        var lastPageIsOnTheLeft = this.pageIsOnTheLeft(lastPageIndex);
        "all" == numberedPages && (numberedPages = [0, -1]);
        numberedPages || (numberedPages = this.closable ? [2, lastPageIsOnTheLeft ? -3 : -2] : [0, -1]);
        var firstNumberedPageIndex = numberedPages[0];
        var lastNumberedPageIndex = lastNumberedPageIndex[1];
        0 > firstNumberedPageIndex && (firstNumberedPageIndex = lastPageIndex + firstNumberedPageIndex + 1);
        0 > firstNumberedPageIndex && (firstNumberedPageIndex = 0);
        firstNumberedPageIndex > this.pages.length - 1 && (firstNumberedPageIndex = lastPageIndex);
        0 > lastNumberedPageIndex && (lastNumberedPageIndex = lastPageIndex + lastNumberedPageIndex + 1);
        0 > lastNumberedPageIndex && (lastNumberedPageIndex = 0);
        lastNumberedPageIndex > this.pages.length - 1 && (lastNumberedPageIndex = lastPageIndex);
        var firstPageNumber = this.opts.firstPageNumber;
        for (index = 0; index < lastPageIndex; index++) delete this.pages[index].number;
        for (index = 0; index < firstNumberedPageIndex; index++)
          f(".qbook-page-number", this.pages[index]).remove();
        for (index = lastNumberedPageIndex + 1; index < lastPageIndex; index++)
          f(".qbook-page-number", this.pages[index]).remove();
        for (index = firstNumberedPageIndex; index <= lastNumberedPageIndex; index++)
          (this.pages[index].number = firstPageNumber),
            (lastPageIndex = f(".qbook-page-number", this.pages[index])),
            lastPageIndex.length ||
            ((lastPageIndex = f(".qbook-page-content", this.pages[index])),
              (lastPageIndex = f('<div class="qbook-page-number"></div>').appendTo(lastPageIndex))),
            lastPageIndex.html(firstPageNumber++);
      }
    },
    upsertNumberInPage: function (pageIndex) {
      "number" === typeof pageIndex && (pageIndex = this.pages[pageIndex]);
      if (pageIndex.number || 0 === pageIndex.number) {
        var page = f(".qbook-page-number", pageIndex);
        page.length ||
          ((content = f(".qbook-page-content", pageIndex)),
            (page = f('<div class="qbook-page-number"></div>').appendTo(content)));
        page.html(pageIndex.number);
      }
    },
    upsertGutterShadowInPage: function (pageIndex) {
      "number" === typeof pageIndex && (pageIndex = this.pages[pageIndex]);
      pageIndex.find(".qbook-gutter-shadow").length ||
        ((pageIndex = pageIndex.find(".qbook-page-content")),
          f("<div class='qbook-gutter-shadow'>")
            .css("height", this.pageHeight)
            .appendTo(pageIndex));
    },
    findPagesType: function () {
      var options = this.opts,
        hardPages = {},
        hardPagesLength;
      var userDefinedHardPages = options.hardPages || [];
      var allHardPages = !0 === userDefinedHardPages;
      if (!allHardPages)
        for (
          options.hardcovers &&
          (userDefinedHardPages.push(0, -1),
            this.closable && userDefinedHardPages.push(1),
            this.otherPage(this.pages.length - 1) || userDefinedHardPages.push(-2)),
          index = 0,
          hardPagesLength = userDefinedHardPages.length;
          index < hardPagesLength;
          index++
        ) {
          var hardPage = userDefinedHardPages[index];
          0 > hardPage && (hardPage = this.pages.length + hardPage);
          0 <= hardPage && hardPage < this.pages.length && (hardPages[hardPage] = !0);
        }
      for (pagesLength = this.pages.length; pagesLength--;)
        (userDefinedHardPages = allHardPages || hardPages[pagesLength] || this.pages[pagesLength].hardPageSetByUser),
          (this.pages[pagesLength].toggleClass("qbook-hardpage", userDefinedHardPages).isHardPage = userDefinedHardPages);
    },
    showPage: function (pageIndex, shouldUpdateBrowserUrl) {
      0 > pageIndex && (pageIndex = 0);
      pageIndex > this.pages.length - 1 && (pageIndex = this.pages.length - 1);
      var leftPageIndex = this.leftPageIndex(pageIndex),
        rightPageIndex = this.rightPageIndex(pageIndex),
        leftPageBelow = this.pageBelow(leftPageIndex),
        rightPageBelow = this.pageBelow(rightPageIndex),
        pageWidth = this.pageWidth,
        pageLength = this.pages.length - 1;
      this.loadPage(leftPageIndex);
      this.loadPage(rightPageIndex);
      this.loadPage(leftPageBelow);
      this.loadPage(rightPageBelow);
      this.loadPage(this.backPage(leftPageIndex));
      this.loadPage(this.backPage(rightPageIndex));
      this.differentPageSizes &&
        (null !== leftPageBelow && this.loadPage(this.insideCoverLeft),
          null !== rightPageBelow && this.loadPage(this.insideCoverRight));
      this.opts.pagesInMemory && this.unloadUnusedPages(pageIndex);
      for (var index = 0; index <= pageLength; index++) {
        var zIndex = this.pages[index].onLeft != this.rtl ? index : pageLength - index;
        var displayStyle = index === leftPageBelow || index === leftPageIndex || index === rightPageIndex || index === rightPageBelow ? "block" : "none";
        this.pages[index]
          .data("zIndex", zIndex)
          .css({
            display: displayStyle,
            left: this.pages[index].onLeft ? 0 : pageWidth,
            top: 0,
            zIndex: zIndex,
          });
        this.setPagePosition(this.pages[index]);
      }
      this.differentPageSizes &&
        (null !== leftPageBelow && this.insideCoverLeft.css("display", "block"),
          null !== rightPageBelow && this.insideCoverRight.css("display", "block"));
      var isFirstPage = 0 == pageIndex || (!this.closable && 1 == pageIndex);
      var isLastPage = pageIndex == pageLength || pageIndex == this.otherPage(isLastPage);
      this.leftHandle.toggleClass("qbook-disabled", !this.backPage(leftPageIndex));
      this.rightHandle.toggleClass("qbook-disabled", !this.backPage(rightPageIndex));
      this.toggleControl("back", isFirstPage);
      this.toggleControl("next", isLastPage);
      this.toggleControl("first", isFirstPage);
      this.toggleControl("last", isLastPage);
      var isNoPages = !this.pages.length;
      this.toggleControl("left", isNoPages || (this.rtl ? isLastPage : isFirstPage));
      this.toggleControl("lastLeft", isNoPages || (this.rtl ? isLastPage : isFirstPage));
      this.toggleControl("right", isNoPages || (this.rtl ? isFirstPage : isLastPage));
      this.toggleControl("lastRight", isNoPages || (this.rtl ? isFirstPage : isLastPage));
      (onShowPage = this.onShowPage) &&
        f.isFunction(onShowPage) &&
        !this.isOnPage(pageIndex) &&
        ((this.currentPage = pageIndex),
          onShowPage(this, this.pages[pageIndex], pageIndex),
          (otherPage = this.otherPage(pageIndex)) && onShowPage(this, this.pages[otherPage], otherPage));
      (onShowPage_ = this.onShowPage_) &&
        f.isFunction(onShowPage_) &&
        !this.isOnPage(pageIndex) &&
        (onShowPage_(this.currentPage, pageIndex));
      this.currentPage = pageIndex;
      this._controls.currentpage && this.updateCurrentPageControl();
      this._sliding ||
        ((pageWidth = this._singlePage && this.pageIsOnTheRight(pageIndex) ? -pageWidth : 0),
          this.origin.css("left", pageWidth),
          this.origin.css("transform", ""));
      this.centeredWhenClosed &&
        !this._singlePage &&
        ((isLeftPage = !!this.leftPage(pageIndex)),
          (rightPageIndex = this.rightPage(pageIndex)),
          this.origin.css("left", isLeftPage && rightPageIndex ? 0 : isLeftPage ? pageWidth / 2 : -pageWidth / 2));
      this.positionBookShadow();
    },
    slideX: function (target, callback) {
      var currentLeft = parseFloat(this.origin.css("left")),
        distanceToMove = target - currentLeft;
      this.origin.css("left", 0);
      var currentInstance = this;
      this._move = 0;
      this._sliding = !0;
      f(this).animate(
        { _move: 1 },
        {
          duration: this.opts.turnPageDuration,
          easing: "easeOutCubic",
          complete: function () {
            this._sliding = !1;
            this.origin.css("transform", "");
            this.origin.css("left", target);
            this.positionBookShadow();
            f.isFunction(callback) && callback();
          },
          step: function (percent, animation) {
            currentInstance.translate(this.origin, currentLeft + percent * distanceToMove);
            this.positionBookShadow();
          },
        }
      );
    },
    holdPage: function (page, width, height, corner, backPage) {
      "number" === typeof page && (page = this.pages[page]);
      if (page) {
        var pageIndex = page.pageIndex,
          lastPageIndex = this.pages.length - 1,
          otherPageExists = !this.otherPage(lastPageIndex);
        if (!corner) corner = this.pageIsOnTheLeft(pageIndex) ? "l" : "r";
        else if (
          !this.corners[corner] ||
          (this.pageIsOnTheLeft(pageIndex) ? /r/ : /l/).test(corner)
        )
          return;
        void 0 === backPage && (backPage = this.backPage(pageIndex));
        if (backPage) {
          var backPageIndex = backPage.pageIndex;
          page.data("holded_info", [width, height, corner]);
          if (
            !this._singlePage &&
            this.centeredWhenClosed &&
            (0 === pageIndex || 0 === backPageIndex || (otherPageExists && (backPageIndex === lastPageIndex || pageIndex === lastPageIndex)))
          ) {
            var value = 0,
              isRightToLeft = !this.rtl,
              pageWidth = this.pageWidth;
            if (isRightToLeft ? 0 === pageIndex : pageIndex === lastPageIndex && otherPageExists) {
              var A = -pageWidth / 2;
              var D = -pageWidth / 4;
              var F = 0;
              var L = -pageWidth / 2;
              var Q = -pageWidth;
              var S = D;
              var V = Q;
              var Z = width;
            }
            if (isRightToLeft ? pageIndex === lastPageIndex && otherPageExists : 0 === pageIndex)
              (A = pageWidth),
                (D = (3 * pageWidth) / 2),
                (F = pageWidth / 2),
                (L = 0),
                (Q = pageWidth),
                (S = 2 * pageWidth),
                (V = width),
                (Z = S);
            if (isRightToLeft ? 0 === backPageIndex : backPageIndex === lastPageIndex && otherPageExists)
              (A = pageWidth / 2),
                (D = pageIndex === (isRightToLeft ? lastPageIndex : 0) ? pageWidth : (3 * pageWidth) / 2),
                (F = pageIndex === (isRightToLeft ? lastPageIndex : 0) ? pageWidth / 2 : 0),
                (L = -pageWidth / 2),
                (Q = A),
                (S = 2 * pageWidth),
                (V = width),
                (Z = S);
            if (isRightToLeft ? backPageIndex === lastPageIndex && otherPageExists : 0 === backPageIndex)
              (A = pageIndex === (isRightToLeft ? 0 : lastPageIndex) ? 0 : -pageWidth / 2),
                (D = pageWidth / 2),
                (F = pageWidth / 2),
                (L = pageIndex === (isRightToLeft ? 0 : lastPageIndex) ? -pageWidth / 2 : 0),
                (Q = -pageWidth),
                (S = D),
                (V = Q),
                (Z = width);
            if (width < A) {
              value = F;
              var W = V;
            }
            width > D && ((value = L), (W = Z));
            width >= A &&
              width <= D &&
              ((width = (width - A) / (D - A)),
                (value = F + width * (L - F)),
                (W = Q + width * (S - Q)));
            width = W;
            this.origin.css("left", value);
            this.positionBookShadow();
          }
          this.zoomed ||
            "basic" == this.pageType(page) ||
            "basic" == this.pageType(backPage)
            ? this.foldPageBasic(page, width, height, corner, backPage)
            : page.isHardPage || backPage.isHardPage
              ? this.holdHardpage(page, width, height, corner, backPage)
              : this.foldPage(page, width, height, corner, backPage);
          if (
            !page.data("holded") &&
            (page.addClass("qbook-page-holded"),
              backPage.addClass("qbook-page-holded"),
              page.data("holded", !0),
              (this.holdedPage = page),
              (this.holdedPageBack = backPage),
              this.shadows && this.shadowClipper.css("display", "block"),
              this.clipBoundaries && this.clipper.css("overflow", "visible"),
              this.positionBookShadow(),
              this.opts.onHoldPage)
          )
            this.opts.onHoldPage(this, pageIndex, page, backPage);
        }
      }
    },
    foldPage: function (page, width, height, corner, backPage) {
      this._currentFlip ||
        (this._currentFlip = this.foldPageStart(page, width, height, corner, backPage));
      this._currentFlip.page == page &&
        ((this._currentFlip.x = width),
          (this._currentFlip.y = height),
          this._currentFlip.page.data("holdedAt", { x: width, y: height }),
          (this._currentFlip.corner = corner),
          this.foldPageStyles(this._currentFlip));
    },
    foldPageStart: function (page, width, height, corner, backPage) {
      var currentFold = {};
      "number" === typeof page && (page = this.pages[page]);
      currentFold.book = this;
      currentFold.page = page;
      currentFold.pageIndex = page.data("pageIndex");
      void 0 === backPage && (backPage = this.backPage(currentFold.pageIndex));
      if (backPage && backPage.length) {
        currentFold.back = backPage;
        currentFold.pageContent = page.children().first();
        currentFold.backContent = backPage.children().first();
        var pageWidth = currentFold.page.pageWidth,
          pageHeight = currentFold.page.pageHeight;
        corner || (corner = "tl");
        if ("l" == corner || "r" == corner) {
          var grabPoint = { x: "l" == corner ? 0 : pageWidth, y: height };
          page.data("grabPoint", grabPoint);
          currentFold.grabPoint = grabPoint;
          corner = (height >= grabPoint.y ? "t" : "width") + corner;
        }
        currentFold.page.data("holdedAt", { x: width, y: height });
        currentFold.x = width;
        currentFold.y = height;
        currentFold.page.data("holdedCorner", corner);
        currentFold.corner = corner;
        currentFold.pageDiagonal = Math.sqrt(pageWidth * pageWidth + pageHeight * pageHeight);
        width = Math.ceil(currentFold.pageDiagonal);
        width = "rect(-" + width + "px " + width + "px " + width + "px 0px)";
        currentFold.page.css("clip", width);
        currentFold.pageLeft = parseFloat(page.css("left"));
        backPage.css({ left: currentFold.pageLeft + "px", zIndex: 1e5, clip: width });
        currentFold.shadowHeight = 2 * Math.ceil(currentFold.pageDiagonal);
        currentFold.shadowTop = -(currentFold.shadowHeight - pageHeight) / 2;
        this.shadowClipper.css({
          top: currentFold.page.top,
          left: page.onLeft ? page.left : backPage.left,
          width: 2 * pageWidth,
          height: pageHeight,
        });
        this.internalShadow.css({ display: "block", height: currentFold.shadowHeight });
        currentFold.foldShadowWidth = this.foldShadow.width();
        this.foldShadow.css({ display: "block", height: currentFold.shadowHeight });
        this.foldGradientContainer.appendTo(currentFold.backContent);
        currentFold.foldGradientWidth = this.foldGradientElem.width();
        currentFold.foldGradientHeight = 2 * Math.ceil(currentFold.pageDiagonal);
        this.foldGradientElem.css("height", currentFold.foldGradientHeight);
        this.foldGradientContainer.css({
          position: "absolute",
          width: currentFold.foldGradientWidth,
          height: currentFold.foldGradientHeight,
          top: 0,
          left: 0,
          display: "none",
        });
        currentFold.foldGradientVisible = !1;
        return currentFold;
      }
    },
    foldPageStyles: function (foldSettings) {
      var pageWidth = foldSettings.page.pageWidth,
        pageHeight = foldSettings.page.pageHeight,
        halfPageWidth = pageWidth / 2,
        halfPageHeight = pageHeight / 2,
        translate_ = f.qBook.utils.translate,
        positionX = foldSettings.x,
        positionY = foldSettings.y,
        backPage = foldSettings.back,
        foldCorner = foldSettings.corner || "tl";
      if ("l" == foldCorner || "r" == foldCorner) {
        var grabPoint = foldSettings.page.data("grabPoint");
        grabPoint || ((grabPoint = { x: "l" == foldCorner ? 0 : pageWidth, y: positionY }), page.data("grabPoint", grabPoint));
        foldCorner =
          (positionY >= grabPoint.y ? "t" : "b") +
          (this.pageIsOnTheLeft(foldSettings.pageIndex) ? "l" : "r");
        foldSettings.corner = foldCorner;
        foldSettings.page.data("holdedCorner", foldCorner);
        var differenceX = positionX - grabPoint.x,
          differenceY = positionY - grabPoint.y,
          angle = Math.atan2(differenceY, differenceX),
          translatedGrabPoint = { x: 0, y: (positionY >= grabPoint.y ? 0 : pageHeight) - grabPoint.y };
        translatedGrabPoint = rotatePoint(translatedGrabPoint, 2 * angle);
        positionX = translatedGrabPoint.x + positionX;
        positionY = translatedGrabPoint.y + positionY;
      }
      foldSettings.page.data("holdedAt", { x: positionX, y: positionY });
      foldSettings.page.data("holdedCorner", foldCorner);
      var cornerCoordinates = foldSettings.page.corners[foldCorner],
        cornerX = pageWidth - cornerCoordinates[0],
        cornerY = cornerCoordinates[1],
        diffX = positionX - cornerX,
        diffY = positionY - cornerY;
      var distance = Math.sqrt(diffX * diffX + diffY * diffY);
      distance > pageWidth && ((positionX = cornerX + (pageWidth * diffX) / distance), (positionY = cornerY + (pageWidth * diffY) / distance));
      var heightDifference = pageHeight - cornerY;
      diffX = positionX - cornerX;
      diffY = positionY - heightDifference;
      distance = Math.sqrt(diffX * diffX + diffY * diffY);
      var diagonalLength = foldSettings.pageDiagonal;
      distance > diagonalLength && ((positionX = cornerX + (diagonalLength * diffX) / distance), (positionY = heightDifference + (diagonalLength * diffY) / distance));
      var origX = cornerCoordinates[0];
      var origY = cornerCoordinates[1];
      origY == positionY && (positionY = origY + 0.001);
      diffX = positionX - origX;
      diffY = positionY - origY;
      distance = Math.sqrt(diffX * diffX + diffY * diffY);
      positionX = distance / 2;
      angle = Math.atan2(diffY, diffX);
      angleTan = Math.tan(angle);
      var angleRadians = angle;
      angle = (180 * angle) / Math.PI;
      var origin = { x: origX - halfPageWidth, y: halfPageHeight - origY };
      var translatedOrigin = rotatePoint(origin, angleRadians);
      distance = translatedOrigin.x + positionX + halfPageWidth + 0.5;
      foldSettings.pageContent.css(
        "transform",
        translate_(-distance, 0) + " rotate(" + (-angle).toFixed(7) + "deg)"
      );
      foldSettings.page.css(
        "transform",
        translate_((Math.cos(angleRadians) * distance).toFixed(5), (Math.sin(angleRadians) * distance).toFixed(5)) +
        " rotate(" +
        angle.toFixed(7) +
        "deg)"
      );
      translatedOrigin = this.calculateOpacity(positionX, pageWidth, this.shadowThreshold, 50);
      if (this.shadows && 0 < translatedOrigin) {
        var shadowTop = foldSettings.shadowTop;
        this.internalShadow.css({
          transform:
            translate_(distance + (foldSettings.page.onRight ? foldSettings.page.pageWidth : 0), shadowTop) +
            " rotate(" +
            angle +
            "deg)",
          transformOrigin:
            halfPageWidth - distance + "px " + (halfPageHeight + (foldSettings.shadowHeight - pageHeight) / 2) + "px",
        });
        distance -= foldSettings.foldShadowWidth;
        this.foldShadow.css({
          transform:
            translate_(distance + (foldSettings.page.onRight ? foldSettings.page.pageWidth : 0), shadowTop) +
            " rotate(" +
            angle +
            "deg)",
          transformOrigin:
            halfPageWidth - distance + "px " + (halfPageHeight + (foldSettings.shadowHeight - pageHeight) / 2) + "px",
        });
        this.shadowContainer.css({ opacity: translatedOrigin, display: "block" });
      } else this.shadowContainer.css("display", "none");
      backPage.show();
      origin.x = -origin.x;
      translatedOrigin = rotatePoint(origin, -angleRadians);
      distance = translatedOrigin.x - positionX + halfPageWidth - 1;
      var cornerPoint = { x: translatedOrigin.x - positionX, y: translatedOrigin.y + positionX * angleTan };
      var peakPoint = { x: translatedOrigin.x - positionX, y: translatedOrigin.y - positionX / (0 == angleTan ? 1e-4 : angleTan) };
      cornerPoint = rotatePoint(cornerPoint, -angleRadians);
      peakPoint = rotatePoint(peakPoint, -angleRadians);
      var foldOffsetX = -(peakPoint.x + halfPageWidth),
        foldOffsetY = -(cornerPoint.y - halfPageHeight);
      foldSettings.backContent.css("transform", translate_(-distance, 0) + " rotate(" + angle + "deg)");
      foldSettings.back.css(
        "transform",
        translate_(
          (origX + foldOffsetX + Math.cos(angleRadians) * distance).toFixed(5),
          (origY - foldOffsetY + Math.sin(angleRadians) * distance).toFixed(5)
        ) +
        " rotate(" +
        angle +
        "deg)"
      );
      translatedOrigin = this.calculateOpacity(2 * positionX, 2 * pageWidth, this.foldGradientThreshold, 50);
      this.foldGradient && 0 < translatedOrigin
        ? (this.foldGradientContainer.css({
          opacity: translatedOrigin,
          display: "block",
          transform:
            translate_(pageWidth - origX - foldSettings.foldGradientWidth / 2, origY - foldSettings.foldGradientHeight / 2) +
            " rotate(" +
            -angle +
            "deg)",
        }),
          this.foldGradientElem.css(
            "transform",
            translate_(-positionX + foldSettings.foldGradientWidth / 2, 0)
          ),
          foldSettings.foldGradientVisible ||
          (this.foldGradientContainer.css("display", "block"),
            (foldSettings.foldGradientVisible = !0)))
        : foldSettings.foldGradientVisible &&
        (this.foldGradientContainer.css("display", "none"),
          (foldSettings.foldGradientVisible = !1));
    },
    holdHardpage: function (page, width, height, corner, backPage) {
      this._currentFlip ||
        (this._currentFlip = this.flipHardPageStart(page, width, height, corner, backPage));
      this._currentFlip.page == page &&
        ((this._currentFlip.x = width),
          (this._currentFlip.y = height),
          this._currentFlip.page.data("holdedAt", { x: width, y: height }),
          (this._currentFlip.corner = corner),
          this.flipHardPageStyles(this._currentFlip));
    },
    flipHardPageStart: function (page, width, height, holdedCorner, backPage) {
      this.clipBoundaries &&
        this.clipper
          .children(".qbook-inner-clipper")
          .css("overflow", "visible");
      !this.border3D &&
        this.opts.pageThickness &&
        this.opts.use3d &&
        Modernizr.csstransforms3d &&
        ((this.border3D = f('<div class="qbook-3d-border">')),
          this.border3D.css("background", this.opts.pageEdgeColor));
      this.opts.hardPageShadow &&
        !this.hardPageShadow &&
        (this.hardPageShadow = f('<div class="qbook-hard-page-shadow">'));
      var currentFlip = {};
      "number" === typeof page && (page = this.pages[page]);
      currentFlip.book = this;
      currentFlip.page = page;
      currentFlip.pageIndex = page.data("pageIndex");
      void 0 === backPage && (backPage = this.backPage(currentFlip.pageIndex));
      if (backPage && backPage.length) {
        currentFlip.back = backPage;
        var pageWidth = page.pageWidth;
        holdedCorner || (holdedCorner = "tl");
        page.data("holdedAt", { x: width, y: height });
        page.data("holdedCorner", holdedCorner);
        page.css("zIndex", 1e5);
        backPage.css("zIndex", 1e5);
        this.opts.use3d &&
          Modernizr.csstransforms3d &&
          (page.css(Modernizr.prefixed("perspectiveOrigin"), "0 50%"),
            backPage.css(Modernizr.prefixed("perspectiveOrigin"), "0 50%"));
        width = page.onLeft ? pageWidth : 0;
        page.css("transformOrigin", width + "px 50%");
        backPage.css("transformOrigin", pageWidth - width + "px 50%");
        this.border3D && this.border3D.css("width", page.thickness);
        this.shadows &&
          this.hardPageDropShadow.css({
            display: "block",
            width: page.pageWidth,
            height: page.pageHeight,
            top: page.top,
          });
        return currentFlip;
      }
    },
    flipHardPageStyles: function (config) {
      var page = config.page,
        back = config.back,
        x_ = config.x,
        y_ = config.y,
        isPageOnRight = this.pageIsOnTheRight(config.pageIndex),
        pageWidth = this.pageWidth,
        pageHeight = this.pageHeight;
      (config = config.corner) || (config = "tl");
      page.data("holdedAt", { x: x_, y: y_ });
      page.data("holdedCorner", config);
      y_ = isPageOnRight ? pageWidth - x_ : x_;
      var width_ = isPageOnRight ? 0 : pageWidth;
      var page_;
      0 > y_ && (y_ = 0);
      y_ = (page_ = y_ < pageWidth) ? page : back;
      (page_ ? back : page).css("display", "none");
      isPageOnRight = isPageOnRight != page_;
      width_ = x_ - width_;
      width_ > pageWidth && (width_ = pageWidth);
      width_ < -pageWidth && (width_ = -pageWidth);
      var angle = -Math.sqrt(1600 * (1 - (width_ * width_) / ((pageWidth + 15) * (pageWidth + 15))));
      var widthRatio = Math.abs(width_ / pageWidth);
      angle = 1 == widthRatio ? 0 : Math.atan2(angle, width_);
      if (this.opts.use3d && Modernizr.csstransforms3d) {
        var isPageOnRight_ = isPageOnRight
          ? -this._calculateAngleFromX(-width_, pageWidth)
          : this._calculateAngleFromX(width_, pageWidth);
        if (this.animating) {
          var animationData = this._animationData;
          if (this.curledPage || animationData.curled)
            (animationData.curled = !0),
              animationData.angle ||
              ((angle = { from: isPageOnRight_, to: 0 }),
                (animationData.angle = angle),
                (isPageOnRight_ = width_ + animationData.dx),
                (angle.to = isPageOnRight
                  ? -this._calculateAngleFromX(-isPageOnRight_, pageWidth)
                  : this._calculateAngleFromX(isPageOnRight_, pageWidth)),
                Math.abs(width_) == pageWidth && (angle.from = 0),
                Math.abs(isPageOnRight_) == pageWidth && (angle.to = 0),
                (angle.delta = angle.to - angle.from)),
              (isPageOnRight_ = animationData.angle.from - (animationData.angle.delta * (animationData.from.x - x_)) / animationData.dx);
        }
        y_.append(this.border3D);
        this.hardPageShadow &&
          (y_.append(this.hardPageShadow),
            this.hardPageShadow.css("opacity", 1 - widthRatio));
        y_.css({
          transform:
            "perspective(" +
            this.opts.perspective +
            this.perspectiveUnit +
            ") rotate3d(0, 1, 0, " +
            isPageOnRight_ +
            "deg)",
          display: "block",
        });
      } else
        y_.css({
          transform: "skewY(" + angle + "rad) scaleX(" + widthRatio + ")",
          display: "block",
        });
      !f.qBook.support.transform &&
        f.qBook.support.filters &&
        (y_.css(
          "filter",
          "progid:DXImageTransform.Microsoft.Matrix(M11=" +
          (widthRatio +
            ", M12=0, M21=" +
            Math.tan(angle) * widthRatio +
            ", M22=1, sizingMethod='auto expand')")
        ),
          y_.css({
            marginTop: pageHeight - y_.height(),
            marginLeft: isPageOnRight ? pageWidth - y_.width() : 0,
          }));
      this.shadows &&
        this.hardPageDropShadow.css({
          left: isPageOnRight ? (page.onLeft ? page.left : back.left) : pageWidth,
          opacity: Math.abs(width_) < pageWidth / 2 ? 0 : ((Math.abs(width_) - pageWidth / 2) / pageWidth) * 0.8,
        });
    },
    _calculateAngleFromX: function (a, b, c) {
      var twoThirdOfB = (2 * b) / 3;
      if (a > twoThirdOfB) {
        var e = this._calculateAngleFromX(twoThirdOfB, b, c);
        return e + ((a - twoThirdOfB) / (b - twoThirdOfB)) * (0 - e);
      }
      c = c || this.opts.perspective;
      var degreeToRadians = 180 / Math.PI;
      e = b * b;
      c *= c;
      var squareValue = a * a;
      a = Math.acos(
        (b * c * a - Math.sqrt(e * e * c * squareValue + e * e * squareValue * squareValue - e * c * squareValue * squareValue)) /
        (e * c + e * squareValue)
      );
      return -a * degreeToRadians;
    },
    foldPageBasic: function (page, width, height, corner, backPage) {
      this._currentFlip ||
        (this._currentFlip = this.foldPageBasicStart(page, width, height, corner, backPage));
      this._currentFlip &&
        this._currentFlip.page == page &&
        ((this._currentFlip.x = width),
          (this._currentFlip.y = height),
          this._currentFlip.page.data("holdedAt", { x: width, y: height }),
          (this._currentFlip.corner = corner),
          this.foldPageBasicStyles(this._currentFlip));
    },
    foldPageBasicStart: function (page, width, height, holdedCorner, backPage) {
      var currentFold = {};
      "number" === typeof page && (page = this.pages[page]);
      currentFold.book = this;
      currentFold.page = page;
      currentFold.pageIndex = page.data("pageIndex");
      void 0 === backPage && (backPage = this.backPage(currentFold.pageIndex));
      if (backPage && backPage.length) {
        currentFold.back = backPage;
        var pageHeight = page.pageHeight;
        holdedCorner || (holdedCorner = "tl");
        page.data("holdedAt", { x: width, y: height });
        page.data("holdedCorner", holdedCorner);
        backPage.css("zIndex", 1e5);
        page.data("foldPageBasic", !0);
        currentFold.foldGradientWidth = this.foldGradientElem.width();
        currentFold.foldShadowWidth = this.foldShadow.width();
        this.internalShadow.css("display", "none");
        this.foldShadow
          .css({ display: "none", height: pageHeight, transform: "", top: page.top })
          .toggleClass("qbook-shadow-fold-flipped", page.onRight);
        this.shadowContainer.css("display", "block");
        width = backPage.children().first();
        this.foldGradientContainer
          .appendTo(width)
          .css({
            width: currentFold.foldGradientWidth,
            height: pageHeight,
            top: 0,
            transform: "",
            zIndex: 1e9,
          });
        this.foldGradientElem
          .css({ left: 0, height: pageHeight })
          .toggleClass("qbook-fold-gradient-flipped", page.onRight);
        return currentFold;
      }
    },
    foldPageBasicStyles: function (currentFlip) {
      var page = currentFlip.page,
        back = currentFlip.back;
      width = currentFlip.x;
      height = currentFlip.y;
      var pageWidth = page.pageWidth,
        pageHeight = page.pageHeight,
        corner = currentFlip.corner;
      corner || (corner = "tl");
      page.data("holdedAt", { x: width, y: height });
      page.data("holdedCorner", corner);
      var width_ = (corner = this.pageIsOnTheLeft(currentFlip.pageIndex)) ? width : pageWidth - width;
      0 > width_ && (width_ = 0);
      width_ > 2 * pageWidth && (width_ = 2 * pageWidth);
      var halfWidth_ = width_ / 2;
      if (corner) {
        var clipRect = "rect(-1000px " + pageWidth + "px " + pageHeight + "px " + halfWidth_ + "px)";
        pageHeight = "rect(-1000px " + pageWidth + "px " + pageHeight + "px " + (pageWidth - halfWidth_) + "px)";
        width_ = page.left + (width_ - pageWidth);
      } else
        (clipRect = "rect(-1000px " + (pageWidth - halfWidth_) + "px " + pageHeight + "px -1000px)"),
          (pageHeight = "rect(-1000px " + halfWidth_ + "px " + pageHeight + "px -1000px)"),
          (width_ = back.left + (pageWidth - width_ + pageWidth));
      page.css("clip", clipRect);
      back.css({ clip: pageHeight, left: width_, display: "block" });
      var calculatedOpacity = this.calculateOpacity(2 * halfWidth_, 2 * pageWidth, this.shadowThreshold, 50);
      this.shadows && 0 < calculatedOpacity
        ? ((page = corner ? page.left + halfWidth_ - currentFlip.foldShadowWidth : back.left + pageWidth - halfWidth_ + pageWidth),
          this.shadowContainer.css("opacity", calculatedOpacity),
          this.foldShadow.css({ left: page, display: "block" }))
        : this.foldShadow.css("display", "none");
      calculatedOpacity = this.calculateOpacity(2 * halfWidth_, 2 * pageWidth, this.foldGradientThreshold, 50);
      this.foldGradient && 0 < calculatedOpacity
        ? ((page = corner ? pageWidth - halfWidth_ : halfWidth_ - currentFlip.foldGradientWidth),
          this.foldGradientContainer.css({
            opacity: calculatedOpacity,
            left: page,
            display: "block",
          }))
        : this.foldGradientContainer.css("display", "none");
    },
    stopAnimation: function (removeAnimation) {
      arguments.length || (removeAnimation = !0);
      f(this).stop(!0, removeAnimation);
      this.animating = !1;
      this.currentFlip && (this.currentFlip.finished = !0);
    },
    flip: function (currentFlip_, targetY, page, config) {
      config || (config = f.isPlainObject(currentFlip_) ? currentFlip_ : {});
      config.from || (config.from = []);
      config.to || (config.to = []);
      var currentInstance = this;
      if (!currentInstance.animating) {
        currentInstance.animating = !0;
        page || (page = config.page || currentInstance.holdedPage);
        var holdedInfoPage = page.data("holded_info");
        page.data("holdedAt");
        var corner = config.corner || page.data("holdedCorner"),
          easing =
            f.easing[config.easing] ||
            config.easing ||
            function (power) {
              return 1 == power ? 1 : -Math.pow(2, -10 * power) + 1;
            };
        currentFlip_ = {
          page: page,
          back: config.back || currentInstance.holdedPageBack || currentInstance.backPage(page.pageIndex),
          initialX: void 0 != config.from[0] ? config.from[0] : holdedInfoPage[0],
          initialY: void 0 != config.from[1] ? config.from[1] : holdedInfoPage[1],
          finalX: void 0 != config.to[0] ? config.to[0] : currentFlip_,
          finalY: void 0 != config.to[1] ? config.to[1] : targetY,
          corner: corner || holdedInfoPage[2],
          duration: config.duration,
          complete: function () {
            currentInstance.animating = !1;
            f.isFunction(config.complete) && config.complete();
          },
          easing: easing,
          arc: config.arc,
          dragging: config.dragging,
          start: f.now(),
          finished: !1,
        };
        currentFlip_.deltaX = currentFlip_.finalX - currentFlip_.initialX;
        currentFlip_.deltaY = currentFlip_.finalY - currentFlip_.initialY;
        this._animationData = {
          from: { x: currentFlip_.initialX, y: currentFlip_.initialY },
          to: { x: currentFlip_.finalX, y: currentFlip_.finalY },
          dx: currentFlip_.deltaX,
        };
        void 0 == currentFlip_.duration &&
          (currentFlip_.duration =
            (this.turnPageDuration * Math.abs(currentFlip_.deltaX)) /
            (2 * this.pageWidth));
        currentFlip_.duration < this.opts.turnPageDurationMin &&
          (currentFlip_.duration = this.opts.turnPageDurationMin);
        !page.isHardPage &&
          0.4 < currentFlip_.duration / this.turnPageDuration &&
          this.playFlipSound();
        this.currentFlip = currentFlip_;
      }
    },
    rafCallback: function () {
      window.raf(this.callRAFCallback);
      this._zoomUpdateOnRAF();
      if (this.currentFlip && !this.currentFlip.finished) {
        var currentFlip = this.currentFlip,
          time = (f.now() - currentFlip.start) / currentFlip.duration;
        1 <= time && (time = 1);
        currentFlip.x =
          currentFlip.initialX + currentFlip.deltaX * currentFlip.easing(time, currentFlip.duration * time, 0, 1, currentFlip.duration);
        currentFlip.y =
          currentFlip.initialY + currentFlip.deltaY * currentFlip.easing(time, currentFlip.duration * time, 0, 1, currentFlip.duration);
        currentFlip.arc &&
          (currentFlip.y -=
            ((0.5 - Math.abs(0.5 - currentFlip.easing(time, currentFlip.duration * time, 0, 1))) *
              this.pageHeight) /
            10);
        currentFlip.dragging &&
          ((currentFlip.x = currentFlip.initialX + 0.2 * currentFlip.deltaX),
            (currentFlip.y = currentFlip.initialY + 0.2 * currentFlip.deltaY),
            (currentFlip.initialX = currentFlip.x),
            (currentFlip.initialY = currentFlip.y),
            (currentFlip.deltaX = currentFlip.finalX - currentFlip.initialX),
            (currentFlip.deltaY = currentFlip.finalY - currentFlip.initialY),
            1 > currentFlip.deltaX && 1 > currentFlip.deltaY && 1 == time);
        this.holdPage(currentFlip.page, currentFlip.x, currentFlip.y, currentFlip.corner, currentFlip.back);
        1 == time && ((currentFlip.finished = !0), currentFlip.complete && currentFlip.complete());
      }
    },
    releasePages: function () {
      for (var index = 0, pagesLength = this.pages.length; index < pagesLength; index++)
        this.pages[index].data("holded") && this.releasePage(index);
    },
    releasePage: function (page, pageIndex, backPage, duration) {
      "number" === typeof page && (page = this.pages[page]);
      var currentInstance = this,
        pageHoldedAt = page.data("holdedAt"),
        pageholdedCorner = page.data("holdedCorner");
      if (pageIndex && pageHoldedAt)
        this.flip({
          from: [pageHoldedAt.x, pageHoldedAt.y],
          to: page.corners[pageholdedCorner],
          page: page,
          easing: "linear",
          duration: duration,
          complete: function () {
            currentInstance.releasePage(page);
          },
        });
      else if (
        ((pageIndex = page.data("pageIndex")),
          void 0 === backPage && (backPage = this.holdedPageBack || this.backPage(pageIndex)),
          (this.holdedPageBack = this.holdedPage = null),
          page.data({
            holded_info: null,
            holdedAt: null,
            holdedCorner: null,
            grabPoint: !1,
            foldPageBasic: null,
            holded: !1,
          }),
          this.clipBoundaries &&
          !this.zoomed &&
          (this.clipper.css("overflow", "hidden"),
            this.clipper
              .children(".qbook-inner-clipper")
              .css("overflow", "hidden")),
          this.shadowClipper.css("display", "none"),
          this.internalShadow.parent().hide(),
          this.foldGradientContainer.hide(),
          this.hardPageDropShadow.hide(),
          this.resetPage(page),
          backPage && backPage.length && (this.resetPage(backPage), backPage.hide()),
          this.foldShadow
            .removeClass("qbook-shadow-fold-flipped")
            .css({ transform: "", left: "" }),
          this.foldGradientElem
            .removeClass("qbook-fold-gradient-flipped")
            .css("transform", ""),
          this.foldGradientContainer
            .css("transform", "")
            .appendTo(this.pagesContainer),
          this.positionBookShadow(),
          this.opts.onReleasePage)
      )
        this.opts.onReleasePage(this, pageIndex, page, backPage);
    },
    resetPage: function (page) {
      this._currentFlip = void 0;
      page.removeClass("qbook-page-holded");
      this.resetCSS ||
        (this.resetCSS = {
          transform: "",
          transformOrigin: "",
          clip: "auto",
          marginLeft: 0,
          marginTop: 0,
          filter: "",
        });
      var pageWidth = page.pageWidth,
        pageHeight = page.pageHeight;
      page.css(this.resetCSS).css({
        zIndex: page.data("zIndex"),
        width: pageWidth,
        height: pageHeight,
        left: page.onLeft ? 0 : this.pageWidth,
      });
      this.setPagePosition(page);
      f.browser.msie &&
        9 > f.browser.version &&
        page.attr("style", page.attr("style").replace(/clip: [^;]+;/i, ""));
      page = f(".qbook-page-content", page);
      page.css(this.resetCSS);
      resizeToFit(page, pageWidth, pageHeight);
      this.hardPageShadow && this.hardPageShadow.hide();
    },
    gotoPage: function (pageIndex, shouldUpdateBrowserUrl) {
      var pagesLengthAndHeight;
      if (!this.animating) {
        "string" === typeof pageIndex &&
          "#" == pageIndex.charAt(0) &&
          (pageIndex = this.selectorToPage(pageIndex));
        0 > pageIndex && (pageIndex = 0);
        pageIndex > this.pages.length - 1 && (pageIndex = this.pages.length - 1);
        if (this._singlePage) {
          if (pageIndex == this.currentPage) return;
        } else if (this.isOnPage(pageIndex)) return;
        if (!this.elem.is(":visible")) return this.showPage(pageIndex, shouldUpdateBrowserUrl), pageIndex;
        this._cantStopAnimation = !0;
        var pageisToLeft = pageIndex < this.currentPage;
        var pageisToRight = this.rtl ? pageIndex > this.currentPage : pageisToLeft;
        var currentInstance = this,
          currentPage = pageisToRight ? currentInstance.leftPage() : currentInstance.rightPage();
        if (currentPage) {
          this.uncurl(!0);
          if (pageisToRight) {
            var leftPageData = this.leftPage(pageIndex);
            var rightPageData = this.rightPage(pageIndex);
          } else (leftPageData = this.rightPage(pageIndex)), (rightPageData = this.leftPage(pageIndex));
          if (
            this.closable &&
            this.differentPageSizes &&
            currentPage.isCover != rightPageData.isCover &&
            currentPage.pageIndex !== pageIndex
          ) {
            if (0 == currentPage.pageIndex || 0 == rightPageData.pageIndex) this.showPage(1, !1);
            else {
              var lastPageIndex = this.pages.length - 1;
              this.otherPage(lastPageIndex) ||
                (currentPage.pageIndex != lastPageIndex && rightPageData.pageIndex != lastPageIndex) ||
                this.showPage(this.backPage(lastPageIndex).pageIndex, !1);
            }
            this.gotoPage(rightPageData.pageIndex);
          } else {
            var rightPageIsVisible = rightPageData && rightPageData.is(":visible");
            if (pageisToLeft)
              for (pageisToLeft = currentPage.pageIndex - 1; 0 <= pageisToLeft; pageisToLeft--)
                this.pages[pageisToLeft].css("display", "none");
            else
              for (pageisToLeft = currentPage.pageIndex + 1, pagesLengthAndHeight = this.pages.length; pageisToLeft < pagesLengthAndHeight; pageisToLeft++)
                this.pages[pageisToLeft].css("display", "none");
            leftPageData &&
              (leftPageData.css("display", "block"),
                leftPageData.onLeft
                  ? this.insideCoverLeft.css("display", "block")
                  : this.insideCoverRight.css("display", "block"));
            rightPageIsVisible && rightPageData.css("display", "block");
            var pageToGoTo = pageIndex;
            leftPageData = currentPage.data("holdedAt");
            rightPageIsVisible = currentPage.data("holdedAt");
            pageisToLeft = currentPage.data("holdedCorner") || (pageisToRight ? "tl" : "tr");
            pageisToRight
              ? ((rightPageIsVisible = rightPageIsVisible || { x: 0, y: 0 }),
                (pageisToRight = 2 * currentInstance.pageWidth),
                (pagesLengthAndHeight = "bl" != pageisToLeft ? 0 : currentPage.pageHeight))
              : ((rightPageIsVisible = rightPageIsVisible || { x: currentPage.pageWidth, y: 0 }),
                (pageisToRight = -currentPage.pageWidth),
                (pagesLengthAndHeight = "br" != pageisToLeft ? 0 : currentPage.pageHeight));
            var easing = "linear";
            if (
              this.centeredWhenClosed &&
              !this._singlePage &&
              (currentPage.isHardPage || rightPageData.isHardPage)
            ) {
              lastPageIndex = this.pages.length - 1;
              var rightToLeft = !this.rtl;
              easing = "easeOutCubic";
              this.pageIsOnTheRight(this.currentPage) &&
                !this.otherPage(this.currentPage) &&
                ((pageisToRight += this.pageWidth / 2),
                  pageIndex != (rightToLeft ? lastPageIndex : 0) ||
                  this.otherPage(pageIndex) ||
                  (pageisToRight += this.pageWidth / 2));
              this.pageIsOnTheLeft(this.currentPage) &&
                !this.otherPage(this.currentPage) &&
                ((pageisToRight -= this.pageWidth / 2),
                  pageIndex != (rightToLeft ? 0 : lastPageIndex) ||
                  this.otherPage(pageIndex) ||
                  (pageisToRight -= this.pageWidth / 2));
            }
            if (this._singlePage) {
              if (this.isOnPage(pageIndex))
                return (
                  (this.animating = !0),
                  this.slideX(
                    this.pageIsOnTheLeft(pageIndex) ? 0 : -this.pageWidth,
                    function () {
                      currentInstance._cantStopAnimation = !1;
                      currentInstance.animating = !1;
                      currentInstance.showPage(pageToGoTo, shouldUpdateBrowserUrl);
                    }
                  ),
                  pageIndex
                );
              this.slideX(
                this.pageIsOnTheLeft(pageIndex) ? 0 : -this.pageWidth,
                function () {
                  currentInstance.showPage(pageToGoTo, shouldUpdateBrowserUrl);
                }
              );
            }
            currentInstance.flip({
              from: [rightPageIsVisible.x, rightPageIsVisible.y],
              to: [pageisToRight, pagesLengthAndHeight],
              easing: easing,
              arc: !leftPageData,
              page: currentPage,
              back: rightPageData,
              corner: pageisToLeft,
              complete: function () {
                currentInstance._cantStopAnimation = !1;
                currentInstance.releasePage(currentPage, !1);
                currentInstance.showPage(pageToGoTo, shouldUpdateBrowserUrl);
              },
            });
            return pageIndex;
          }
        }
      }
    },
    gotoDirection: function (direction, page) {
      void 0 == page && (page = this.currentPage);
      "left" == direction && (direction = -1);
      "right" == direction && (direction = 1);
      var pageOffset = direction * (this._singlePage ? 1 : 2);
      this.rtl && (pageOffset = -pageOffset);
      return this.gotoPage(page + pageOffset);
    },
    gotoLeft: function (page) {
      return this.gotoDirection("left", page);
    },
    gotoRight: function (page) {
      return this.gotoDirection("right", page);
    },
    gotoLastLeft: function (page) {
      return this.gotoPage(this.rtl ? this.pages.length : 0);
    },
    gotoLastRight: function (page) {
      return this.gotoPage(this.rtl ? 0 : this.pages.length);
    },
    back: function () {
      return this.gotoPage(this.currentPage - (this._singlePage ? 1 : 2));
    },
    advance: function () {
      return this.gotoPage(this.currentPage + (this._singlePage ? 1 : 2));
    },
    leftPage: function (page) {
      void 0 === page && (page = this.currentPage);
      return this.pages[this.leftPageIndex(page)] || null;
    },
    leftPageIndex: function (pageIndex) {
      if (null != pageIndex) {
        this.pageIsOnTheRight(pageIndex) && (pageIndex += this.rtl ? 1 : -1);
        if (0 > pageIndex || pageIndex > this.pages.length - 1) pageIndex = null;
        return pageIndex;
      }
    },
    rightPage: function (page) {
      void 0 === page && (page = this.currentPage);
      return this.pages[this.rightPageIndex(page)] || null;
    },
    rightPageIndex: function (pageIndex) {
      if (null != pageIndex) {
        this.pageIsOnTheLeft(pageIndex) && (pageIndex += this.rtl ? -1 : 1);
        if (0 > pageIndex || pageIndex > this.pages.length - 1) pageIndex = null;
        return pageIndex;
      }
    },
    pageIsOnTheRight: function (page) {
      return !this.pageIsOnTheLeft(page);
    },
    pageIsOnTheLeft: function (pageIndex) {
      var isLastPageOnTheLeft = !(pageIndex % 2);
      this.closable && (isLastPageOnTheLeft = !isLastPageOnTheLeft);
      this.rtl && (isLastPageOnTheLeft = !isLastPageOnTheLeft);
      return isLastPageOnTheLeft;
    },
    otherPage: function (page) {
      var pageOffset = this.pageIsOnTheLeft(page) ? 1 : -1;
      this.rtl && (pageOffset = -pageOffset);
      page += pageOffset;
      if (0 > page || page > this.pages.length - 1) page = null;
      return page;
    },
    isOnPage: function (page) {
      return (
        "number" === typeof page &&
        (page === this.currentPage || page === this.otherPage(this.currentPage))
      );
    },
    backPage: function (pageIndex) {
      if (!this.pages[pageIndex]) return null;
      var direction = pageIndex % 2 ? 1 : -1;
      pageIndex += this.closable ? -direction : direction;
      return this.pages[pageIndex];
    },
    pageBelow: function (pageIndex) {
      pageIndex = parseInt(pageIndex, 10);
      if (pageIndex != pageIndex) return null;
      pageIndex += this.pageIsOnTheLeft(pageIndex) != this.rtl ? -2 : 2;
      if (0 > pageIndex || pageIndex > this.pages.length - 1) pageIndex = null;
      return pageIndex;
    },
    pageType: function (pageIndex) {
      pageIndex = "number" === typeof pageIndex ? this.pages[pageIndex] : pageIndex;
      return pageIndex.isHardPage
        ? "hard"
        : pageIndex.find(".qbook-page-content.qbook-basic-page").length
          ? "basic"
          : "soft";
    },
    calculateOpacity: function (current, start, end, buffer) {
      if (current <= end || current >= start - end) return 0;
      if (current >= buffer && current <= start - buffer) return 1;
      current > buffer && (current = start - current);
      return (current - end) / (buffer - end);
    },
    startSlideShow: function () {
      this.slideShowRunning = !0;
      this.advanceAfterTimeout(this.slideShowDelay);
      this.toggleControl("slideshow", !0);
    },
    advanceAfterTimeout: function (delay) {
      var currentInstance = this;
      this.slideShowTimer = setTimeout(function () {
        if (currentInstance.animating || currentInstance.holdedPage) currentInstance.advanceAfterTimeout(100);
        else {
          var isLastPage = currentInstance.isOnPage(currentInstance.pages.length - 1);
          currentInstance.opts.slideShowLoop && isLastPage ? currentInstance.gotoPage(0) : currentInstance.advance();
          currentInstance.opts.slideShowLoop || !isLastPage
            ? currentInstance.advanceAfterTimeout(currentInstance.slideShowDelay + currentInstance.turnPageDuration)
            : currentInstance.stopSlideShow();
        }
      }, delay);
    },
    stopSlideShow: function (toggleAnimation) {
      clearTimeout(this.slideShowTimer);
      this.slideShowTimer = void 0;
      this.slideShowRunning = !1;
      toggleAnimation || this.toggleControl("slideshow", !1);
    },
    toggleSlideShow: function () {
      this.slideShowRunning ? this.stopSlideShow() : this.startSlideShow();
    },
    findSections: function (sectionDefinition_) {
      sectionDefinition_ && (this.sectionDefinition = sectionDefinition_);
      var sectionDefinition = this.sectionDefinition;
      sections = [];
      if ("string" === typeof sectionDefinition) {
        var sectionDefinition__ = sectionDefinition;
        sectionDefinition = [];
        f(sectionDefinition__, this.elem).each(function (index, element) {
          sectionDefinition.push(["#" + element.id, f(element).html()]);
        });
      }
      if (f.isArray(sectionDefinition)) {
        for (var index = 0, sectionDefinitionLength = sectionDefinition.length; index < sectionDefinitionLength; index++) {
          sectionDefinition__ = sectionDefinition[index];
          if ("string" === typeof sectionDefinition__)
            try {
              sectionDefinition__ = [sectionDefinition__, f(sectionDefinition__, this.elem).html()];
            } catch (exception_) {
              continue;
            }
          try {
            sectionDefinition__[2] = this.selectorToPage(sectionDefinition__[0]);
          } catch (exception_) {
            continue;
          }
          void 0 !== sectionDefinition__[2] && sections.push({ id: sectionDefinition__[0], title: sectionDefinition__[1], page: sectionDefinition__[2] });
        }
        sections = sections.sort(function (a, b) {
          return a.page - b.page;
        });
      }
      return (this.sections = sections);
    },
    pageToSection: function (pageIndex) {
      for (
        var sections = this.sections, selectedSection, index = 0, sectionsLength = sections.length;
        index < sectionsLength && !(sections[index].page > pageIndex);
        index++
      )
        selectedSection = sections[index];
      return selectedSection;
    },
    currentSection: function () {
      return this.pageToSection(this.currentPage);
    },
    selectorToPage: function (element) {
      element = f(element, this.elem).closest(".qbook-page");
      if (element.length) return +element.data("pageIndex");
    },
    zoomSetup: function () {
      this._zoomOffset = { dx: 0, dy: 0 };
      this._cssZoom = this._cssZoom || 1;
      this.zoomLevel = 1;
      this.detectBestZoomMethod();
      this.zoomTouchSupport();
      this.toggleControl("zoomIn", this.zoomLevel == this.zoomMax);
      this.toggleControl("zoomOut", this.zoomLevel == this.zoomMin);
      this.toggleControl("zoomReset", 1 == this.zoomLevel);
      if (this.opts.doubleClickToZoom) {
        var currentInstance = this;
        this.elem.on("dblclick", function (event) {
          var elementOffset = currentInstance.elem.offset(),
            x = eventb.pageX - elementOffset.left;
          var y = event.pageY - elementOffset.top;
          currentInstance.zoomed ? currentInstance.zoomReset() : currentInstance.zoomIn(1, { x: x, y: y });
        });
      }
    },
    _zoomUpdateOnRAF: function () {
      if (this._zoomDataRAF) {
        var config = f.extend({}, this._zoomDataRAF.options),
          offset = this._zoomDataRAF.options.offset;
        if (offset) {
          var zoomOffset = this._zoomOffset,
            dx = offset.dx - zoomOffset.dx,
            dy = offset.dy - zoomOffset.dy;
          config.offset = { dx: zoomOffset.dx + 0.2 * dx, dy: zoomOffset.dy + 0.2 * dy };
        }
        zoomOffset = this._zoomDataRAF.level || this.zoomLevel;
        zoomOffset != this.zoomLevel &&
          (zoomOffset = this.zoomLevel + 0.2 * (zoomOffset - this.zoomLevel));
        config.transform = !0;
        this._zoom(zoomOffset, config);
        offset &&
          1 > Math.abs(dx) &&
          1 > Math.abs(dy) &&
          1 > Math.abs(this.zoomLevel - zoomOffset) &&
          (this._zoomDataRAF.callback && this._zoomDataRAF.callback.call(this),
            (this._zoomDataRAF = null));
      }
    },
    _zoom: function (zoomLevel, config) {
      config || (config = {});
      var zoomWidth = void 0 != config.x ? config.x : this.pageWidth * this.currentScale,
        zoomOffsetY = config.y || 0;
      this._zoomOffset = config.offset || this.zoomFocusOffset(zoomLevel, zoomWidth, zoomOffsetY);
      this.zoomLevel = zoomLevel;
      var zoomUsingTransform = config.transform || this.opts.zoomUsingTransform;
      var zoomScale = zoomLevel * this.currentScale;
      var cssZoom = f.browser.ie7 ? 1 : zoomUsingTransform ? this._cssZoom : zoomScale;
      var zoomWindow = this.zoomWindow,
        zoomContent = this.zoomContent,
        zoomBoundingBox = f(this.zoomBoundingBox),
        zoomBoundingBoxWidth = zoomBoundingBox.outerWidth(),
        zoomBoundingBoxHeight = zoomBoundingBox.outerHeight(),
        zoomWindowOffset = zoomWindow.offset();
      zoomWindow.position();
      zoomBoundingBox =
        zoomBoundingBox[0] !== window
          ? zoomBoundingBox.offset()
          : { left: zoomBoundingBox.scrollLeft(), top: zoomBoundingBox.scrollTop() };
      zoomWindow.css({ width: zoomBoundingBoxWidth, height: zoomBoundingBoxHeight });
      zoomBoundingBoxWidth = zoomBoundingBox.left - zoomWindowOffset.left;
      zoomWindowOffset = zoomBoundingBox.top - zoomWindowOffset.top;
      zoomBoundingBoxWidth &&
        ((zoomBoundingBoxWidth += parseFloat(zoomWindow.css("marginLeft"))),
          zoomWindow.css("marginLeft", zoomBoundingBoxWidth),
          (zoomContent.marginLeft = zoomBoundingBoxWidth));
      zoomWindowOffset &&
        ((zoomWindowOffset += parseFloat(zoomWindow.css("marginTop"))),
          zoomWindow.css("marginTop", zoomWindowOffset),
          (zoomContent.marginTop = zoomWindowOffset));
      zoomWindow = "";
      zoomWindowOffset = this._zoomOffset.dx / cssZoom;
      zoomBoundingBoxWidth = this._zoomOffset.dy / cssZoom;
      f.qBook.support.transform && (zoomWindowOffset || zoomBoundingBoxWidth)
        ? (zoomWindow = f.qBook.utils.translate(zoomWindowOffset, zoomBoundingBoxWidth))
        : zoomContent.css({ left: zoomWindowOffset, top: zoomBoundingBoxWidth });
      zoomUsingTransform
        ? ((zoomScale /= cssZoom),
          (zoomWindow += this.opts.useScale3d
            ? "scale3d(" + zoomScale + "," + zoomScale + ",1)"
            : "scale(" + zoomScale + ")"))
        : ((this._cssZoom = zoomScale),
          zoomContent.css("zoom", zoomScale),
          zoomContent.css("marginLeft", -zoomContent.marginLeft / cssZoom),
          zoomContent.css("marginTop", -zoomContent.marginTop / cssZoom));
      f.qBook.support.transform && zoomContent.css("transform", zoomWindow);
      1 !== this.zoomLevel
        ? this.zoomed ||
        (zoomContent.css("marginLeft", -zoomContent.marginLeft / cssZoom),
          zoomContent.css("marginTop", -zoomContent.marginTop / cssZoom),
          zoomUsingTransform && zoomContent.css("transformOrigin", "0 0"),
          this.elem.find("img").each(function () {
            var img = f(this);
            img.data("qbook-draggable-before-zoom", img.attr("draggable"));
            img.attr("draggable", !1);
          }))
        : this.zoomFinished();
      this.zoomed = 1 !== zoomLevel;
      zoomContent.toggleClass("qbook-draggable", this.zoomed);
      this.toggleControl("zoomIn", this.zoomLevel == this.zoomMax);
      this.toggleControl("zoomOut", this.zoomLevel == this.zoomMin);
      this.toggleControl("zoomReset", 1 == this.zoomLevel);
    },
    zoom: function (zoomLevel, duration, config) {
      this.uncurl(!0);
      for (var index = 0, pagesLength = this.pages.length; index < pagesLength; index++)
        if (this.pages[index].data("holdedAt")) return;
      f.isPlainObject(duration) && ((config = duration), (duration = config.duration));
      config || (config = {});
      if (zoomLevel <= this.zoomMin && !config.resetting) return this.zoomReset(duration, config);
      zoomLevel > this.zoomMax && (zoomLevel = this.zoomMax);
      if (zoomLevel !== this.zoomLevel || config.force)
        if ((void 0 == duration && (duration = this.opts.zoomDuration), 0 == duration)) {
          if (
            (this._zoom(zoomLevel, config),
              config.callback && config.callback.apply(this),
              this.onZoom)
          )
            this.onZoom(this);
        } else {
          var useTransform = !this.opts.zoomUsingTransform && f.qBook.support.transform;
          this._zoomAnimating &&
            (f(this).stop(), useTransform && this.zoomContent.css("transform", ""));
          this._zoomAnimating = this.zoomLevel;
          var currentInstance = this;
          var focusX = config.x;
          var focusY = config.y;
          void 0 == focusX &&
            (focusX =
              this.pageWidth *
              (this._singlePage ? 1 : 2) *
              this.currentScale *
              this.opts.zoomFocusX);
          void 0 == focusY &&
            (focusY = this.pageHeight * this.currentScale * this.opts.zoomFocusY);
          var zoomFocusInfo = { x: focusX, y: focusY, offset: { dx: 0, dy: 0 } },
            prevZoomFocusOffset = f.extend({ dx: 0, dy: 0 }, this._zoomOffset);
          var focusOffset = config.offset || this.zoomFocusOffset(zoomLevel, focusX, focusY);
          var offsetX = focusOffset.dx - prevZoomFocusOffset.dx,
            offsetY = focusOffset.dy - prevZoomFocusOffset.dy;
          useTransform &&
            ((zoomFocusInfo.transform = !0),
              this._isMobile &&
              (this.leftPage() &&
                this.leftPage().css("-webkit-transform", "translateZ(0)"),
                this.rightPage() &&
                this.rightPage().css("-webkit-transform", "translateZ(0)")));
          f(this).animate(
            { _zoomAnimating: zoomLevel },
            {
              duration: duration,
              easing: config.easing || this.opts.zoomEasing,
              complete: function () {
                currentInstance._zoomAnimating = !1;
                currentInstance._zoom(zoomLevel);
                config.callback && config.callback.apply(this);
                if (currentInstance.onZoom) currentInstance.onZoom(currentInstance);
              },
              step: function (zoomLevel_, A) {
                zoomFocusInfo.offset.dx = prevZoomFocusOffset.dx + offsetX * A.pos;
                zoomFocusInfo.offset.dy = prevZoomFocusOffset.dy + offsetY * A.pos;
                currentInstance._zoom(zoomLevel_, zoomFocusInfo);
              },
            }
          );
        }
    },
    zoomFinished: function () {
      this.zoomWindow.css({
        overflow: "visible",
        width: this.zoomContent.width() * this.currentScale,
        height: this.zoomContent.height() * this.currentScale,
        marginLeft: 0,
        marginTop: 0,
      });
      this.zoomContent.css({ left: 0, top: 0, marginLeft: 0, marginTop: 0 });
      this._zoomOffset = { dx: 0, dy: 0 };
      this.elem.find("img").each(function () {
        var currentImageInstance = f(this);
        void 0 == currentImageInstance.data("qbook-draggable-before-zoom")
          ? currentImageInstance.removeAttr("draggable")
          : currentImageInstance.attr("draggable", currentImageInstance.data("qbook-draggable-before-zoom"));
      });
    },
    zoomReset: function (duration, config) {
      f.isPlainObject(duration) && ((config = duration), (duration = config.duration));
      config || (config = {});
      this._zoomDataRAF = null;
      config.offset = { dx: 0, dy: 0 };
      config.resetting = !0;
      config.force = !0;
      config.callback = function () {
        this.zoomContent.css({ left: 0, top: 0 });
        this.zoomed = !1;
      };
      this.zoom(1, duration, config);
    },
    zoomIn: function (step, config) {
      f.isPlainObject(step) && ((config = step), (step = void 0));
      this.zoom(this.zoomLevel + (step || this.zoomStep), config);
    },
    zoomOut: function (step, config) {
      f.isPlainObject(step) && ((config = step), (step = void 0));
      this.zoom(this.zoomLevel - (step || this.zoomStep), config);
    },
    zoomFocusOffset: function (scale, x, y, zoomOffset, zoomLevel) {
      zoomOffset || (zoomOffset = this._zoomOffset || { dx: 0, dy: 0 });
      zoomOffset = f.extend({ dx: 0, dy: 0 }, zoomOffset);
      var dx = zoomOffset.dx || 0,
        dy = zoomOffset.dy || 0;
      zoomLevel = scale / (zoomLevel || this.zoomLevel);
      x -= dx;
      y -= dy;
      scale = x * zoomLevel;
      zoomLevel *= y;
      zoomOffset.dx = dx - (scale - x);
      zoomOffset.dy = dy - (zoomLevel - y);
      return { dx: dx - (scale - x), dy: dy - (zoomLevel - y) };
    },
    zoomTouchSupport: function () {
      if (this.opts.touchEnabled) {
        if (f.browser.ie8mode || f.browser.ie7)
          return this.zoomDragSupportForIE();
        var currentInstance = this,
          elementOffset,
          center,
          startOffset;
        currentInstance._hammer = new Hammer(currentInstance.zoomContent[0], currentInstance.opts.touch);
        var hammer = currentInstance._hammer;
        hammer.on("panstart pinchstart", function (event) {
          currentInstance.zoomContent.addClass("qbook-dragging");
        });
        hammer.on("hammer.input", function (event) {
          if (
            currentInstance.zoomContent.hasClass("qbook-draggable") &&
            (f(event.target).is("img") &&
              "mousedown" == event.srcEvent.type &&
              event.preventDefault(),
              event.isFinal && currentInstance.zoomContent.hasClass("qbook-dragging"))
          ) {
            center = startOffset = null;
            currentInstance.zoomContent.removeClass("qbook-dragging");
            event = currentInstance.zoomLevel;
            var zoomDataRAF = currentInstance._zoomDataRAF,
              zoomMinLevel = zoomDataRAF ? zoomDataRAF.level : event;
            zoomMinLevel < currentInstance.zoomMin ||
              (zoomMinLevel == currentInstance.zoomMin && (currentInstance._zoomOffset.dx || currentInstance._zoomOffset.dy))
              ? zoomDataRAF
                ? (zoomDataRAF.callback = function () {
                  currentInstance.zoomReset();
                })
                : currentInstance.zoomReset()
              : (currentInstance._zoom(event, { force: !0, offset: currentInstance._zoomOffset }));
          }
        });
        hammer.on("panstart panmove", function (event) {
          currentInstance.zoomed &&
            (event.preventDefault(),
              (startOffset = null),
              center ||
              (center = {
                offset: f.extend({}, currentInstance._zoomOffset),
                pageX: event.center.x,
                pageY: event.center.y,
              }),
              (currentInstance._zoomDataRAF = {
                level: currentInstance.zoomLevel,
                options: {
                  force: !0,
                  offset: {
                    dx: center.offset.dx + (event.center.x - center.pageX),
                    dy: center.offset.dy + (event.center.y - center.pageY),
                  },
                },
              }));
        });
        hammer.on("pinchmove pinchstart", function (event) {
          event.preventDefault();
          center = null;
          var pinchCenterX = event.center.x,
            pinchCenterY = event.center.y;
          if (!startOffset) {
            if (currentInstance.currentFlip && !currentInstance.currentFlip.finished) return;
            elementOffset = currentInstance.elem.offset();
            startOffset = {
              level: currentInstance.zoomLevel,
              pageX: pinchCenterX,
              pageY: pinchCenterY,
              x: pinchCenterX - (elementOffset.left - f(window).scrollLeft()),
              y: pinchCenterY - (elementOffset.top - f(window).scrollTop()),
              offset: f.extend({}, currentInstance._zoomOffset),
              useTransform: currentInstance.opts.zoomUsingTransform,
            };
          }
          event = startOffset.level * event.scale;
          event > currentInstance.zoomMax && (event = currentInstance.zoomMax);
          var focusOffset = currentInstance.zoomFocusOffset(event, startOffset.x, startOffset.y, startOffset.offset, startOffset.level);
          focusOffset.dx += pinchCenterX - startOffset.pageX;
          focusOffset.dy += pinchCenterY - startOffset.pageY;
          currentInstance._zoomDataRAF = { level: event, options: { force: !0, offset: focusOffset } };
        });
        currentInstance.opts.pinchToZoom &&
          (hammer.get("pinch").set({ enable: !0 }),
            hammer.get("pinch").recognizeWith("pan"));
        this.opts.doubleClickToZoom &&
          (hammer.get("doubletap").set({ posThreshold: 50 }),
            hammer.on("doubletap", function (event) {
              event.preventDefault();
              var elementOffset_ = currentInstance.elem.offset(),
                x_ = event.center.x - elementOffset_.left,
                y_ = event.center.y - elementOffset_.top;
              currentInstance.zoomed ? currentInstance.zoomReset() : currentInstance.zoomIn(1, { x: x_, y: y_ });
            }));
      }
    },
    zoomDragSupportForIE: function () {
      var currentInstance = this,
        startDrag,
        handleMouseMove = function (event) {
          currentInstance._zoomDataRAF = {
            level: currentInstance.zoomLevel,
            options: {
              force: !0,
              offset: {
                dx: startDrag.offset.dx + (event.pageX - startDrag.pageX),
                dy: startDrag.offset.dy + (event.pageY - startDrag.pageY),
              },
            },
          };
          return !1;
        },
        handleMouseUp = function (event) {
          var level = currentInstance.zoomLevel;
          (level < currentInstance.zoomMin ||
            (level == currentInstance.zoomMin && (currentInstance._zoomOffset.dx || currentInstance._zoomOffset.dy))) &&
            currentInstance.zoomReset();
          f(document).unbind("mousemove.qbook", handleMouseMove);
          f(document).unbind("mouseup.qbook", handleMouseUp);
        };
      currentInstance.zoomContent.bind("mousedown.qbook", function (event) {
        if (currentInstance.zoomed)
          return (
            (startDrag = {
              offset: f.extend({}, currentInstance._zoomOffset),
              pageX: event.pageX,
              pageY: event.pageY,
            }),
            f(document).bind("mousemove.qbook", handleMouseMove).bind("mouseup.qbook", handleMouseUp),
            !1
          );
      });
    },
    detectBestZoomMethod: function (supportTransform, data, isIE8Mode) {
      if (void 0 != this.opts.zoomUsingTransform)
        return this.opts.zoomUsingTransform ? "transform" : "zoom";
      void 0 === supportTransform && (supportTransform = f.qBook.support.transform);
      void 0 === isIE8Mode && (isIE8Mode = f.browser.ie8mode);
      supportTransform =
        f.browser.chrome ||
        f.browser.webkit ||
        f.browser.safari ||
        f.browser.opera ||
        isIE8Mode ||
        !supportTransform;
      this.opts.zoomUsingTransform = !supportTransform;
      return supportTransform ? "zoom" : "transform";
    },
    setupFullscreen: function () {
      if (requestFullscreen) {
        var currentInstance = this,
          fullScreenErrorEvents =
            "fullscreenerror mozfullscreenerror webkitfullscreenerror MSFullscreenError ";
        var fullScreenChangeEvents =
          "fullscreenchange mozfullscreenchange webkitfullscreenchange MSFullscreenChange ".replace(
            / /g,
            ".qbook "
          );
        fullScreenErrorEvents = fullScreenErrorEvents.replace(/ /g, ".qbook ");
        this._fullscreenChangeHandler = function () {
          var isFullScreen = !!isFullscreen();
          f(currentInstance.opts.fullscreenElement).toggleClass(
            "fullscreen qbook-fullscreen-fix",
            isFullScreen
          );
          currentInstance.elem.toggleClass("fullscreen", isFullScreen);
          currentInstance.toggleControl("fullscreen", isFullScreen);
          currentInstance.elem.trigger("resize");
        };
        f(document).on(fullScreenChangeEvents, this._fullscreenChangeHandler);
        this._fullscreenErrorHandler = function () {
          var message;
          currentInstance.opts.onFullscreenError &&
            (message = currentInstance.opts.onFullscreenError.apply(this, arguments));
          !1 !== message &&
            ("string" == typeof message
              ? alert(message)
              : currentInstance.opts.onFullscreenErrorMessage &&
              alert(currentInstance.opts.onFullscreenErrorMessage));
        };
        f(document).on(fullScreenErrorEvents, this._fullscreenErrorHandler);
      } else f("html").addClass("no-fullscreen");
    },
    positionBookShadow: function () {
      var totalPages = this.pages.length;
      var showBookShadow = !(!this.opts.bookShadow || !totalPages || (totalPages < 3 && this.holdedPage));

      this.bookShadow.toggle(showBookShadow);

      if (showBookShadow) {
        var pageWidth = this.pageWidth,
          holdedPageBack = this.holdedPageBack,
          isHoldedPageBackOnRight = !!holdedPageBack && holdedPageBack.onRight && holdedPageBack.pageIndex == (this.rtl ? totalPages - 1 : 0),
          isHoldedPageBackOnLeft = !!holdedPageBack && holdedPageBack.onLeft && holdedPageBack.pageIndex == (this.rtl ? 0 : totalPages - 1),
          showLeftShadow = !this.leftPage() || isHoldedPageBackOnRight,
          showRightShadow = !this.rightPage() || isHoldedPageBackOnLeft,
          isDifferent = showLeftShadow != showRightShadow;

        if (showLeftShadow && showRightShadow) {
          this.bookShadow.hide();
        } else {
          var zoomLevel = this.opts.zoomUsingTransform
            ? this.currentScale * this.zoomLevel
            : 1;

          var pagesContainerLeft = this.elem.is(":visible")
            ? this.pagesContainer.position().left
            : parseFloat(this.pagesContainer.css("left")) || 0;

          this.translate(this.bookShadow, (showLeftShadow ? pageWidth : 0) + pagesContainerLeft / zoomLevel, 0);
          this.bookShadow.css({ width: isDifferent ? pageWidth : 2 * pageWidth });
        }
      }
    },
    playFlipSound: function () {
      if (!(this._isMobile || f.qBook.utils.isIOS) && this.flipSound) {
        var playFlipSound = this.opts.onPlayFlipSound;
        (f.isFunction(playFlipSound) && !1 === playFlipSound(this)) ||
          (this.audio || (this.audio = this.createAudioPlayer()),
            this.audio && this.audio.play && this.audio.play());
      }
    },
    toggleFlipSound: function (enable) {
      arguments.length || (enable = !this.flipSound);
      this.flipSound = enable;
      this.toggleControl("flipSound", !enable);
    },
    createAudioPlayer: function (flipSoundPath, flipSoundFile) {
      flipSoundPath || (flipSoundPath = this.opts.flipSoundPath);
      flipSoundFile || (flipSoundFile = this.opts.flipSoundFile);
      for (var sources = [], index = 0, flipSoundFileLength = flipSoundFile.length; index < flipSoundFileLength; index++)
        sources.push('<source src="' + flipSoundPath + flipSoundFile[index] + '">');
      return f("<audio preload>" + sources.join("") + "</audio>")[0];
    },
    _untouch: function (event) {
      return (event.originalEvent.touches && event.originalEvent.touches[0]) || event;
    },
    touchSupport: function () {
      var currentInstance = this;
      currentInstance.elem.bind("touchstart.qbook", function (event) {
        var touches = event.originalEvent.touches;
        1 < touches.length ||
          ((currentInstance._touchStarted = {
            x: touches[0].pageX,
            y: touches[0].pageY,
            timestamp: event.originalEvent.timeStamp,
            inHandle: f(event.target).hasClass("qbook-handle"),
          }),
            currentInstance._touchStarted.inHandle && currentInstance.pageEdgeDragStart(currentInstance._untouch(event)));
      });
      f(document).on("touchmove.qbook", function (event) {
        if (currentInstance._touchStarted) {
          var touches = event.originalEvent.touches;
          currentInstance._touchEnded = {
            x: touches[0].pageX,
            y: touches[0].pageY,
            timestamp: event.originalEvent.timeStamp,
          };
          if (currentInstance._touchStarted.inHandle) return currentInstance.pageEdgeDrag(currentInstance._untouch(event));
          (currentInstance.opts.allowDragBrowserPageZoom &&
            1 != document.documentElement.clientWidth / window.innerWidth) ||
            event.preventDefault();
        }
      });
      f(document).on("touchend.qbook touchcancel.qbook", function (event) {
        if (currentInstance._touchStarted) {
          !currentInstance._touchEnded &&
            f(event.target).hasClass("qbook-handle") &&
            ((event = f(event.target).data("corner")),
              "r" === event && currentInstance.gotoRight(),
              "l" === event && currentInstance.gotoLeft());
          var toucheStarted = currentInstance._touchStarted;
          var toucheEnded = currentInstance._touchEnded || currentInstance._touchStarted;
          currentInstance._touchStarted = null;
          currentInstance._touchEnded = null;
          if (!currentInstance.zoomed) {
            if (toucheStarted.inHandle) return currentInstance.pageEdgeDragStop({ pageX: toucheEnded.x }), !1;
            var deltaX = toucheEnded.x - toucheStarted.x,
              deltaTime = toucheEnded.timestamp - toucheStarted.timestamp;
            if (
              !(20 > Math.abs(deltaX) || deltaTime > currentInstance.opts.swipeDuration) &&
              Math.abs(deltaX) > Math.abs(toucheEnded.y - toucheStarted.y)
            )
              return 0 > deltaX ? currentInstance.gotoRight() : currentInstance.gotoLeft(), !1;
          }
        }
      });
    },
    pageEdgeDragStart: function (event) {
      if (!this.zoomed) {
        if (
          (this.animating && !this.curledPage) ||
          !f(event.target).hasClass("qbook-handle")
        )
          return !1;
        var currentInstance = this,
          originOffset = currentInstance.origin.offset();
        this.opts.zoomUsingTransform || (originOffset.left *= this.currentScale);
        currentInstance.elem.addClass("qbook-unselectable");
        currentInstance.mouseDownAtLeft =
          (event.pageX - originOffset.left) / this.currentScale < currentInstance.pageWidth;
        currentInstance.pageGrabbed = currentInstance.mouseDownAtLeft ? currentInstance.leftPage() : currentInstance.rightPage();
        if (!currentInstance.pageGrabbed) return !1;
        this.uncurl(!0);
        currentInstance.pageGrabbedOffset = currentInstance.pageGrabbed.offset();
        currentInstance._dragging = !0;
        this.opts.zoomUsingTransform &&
          ((currentInstance.pageGrabbedOffset.left /= this.currentScale),
            (currentInstance.pageGrabbedOffset.top /= this.currentScale));
        var mouseX = event.pageX / this.currentScale - this.pageGrabbedOffset.left,
          mouseY = event.pageY / this.currentScale - this.pageGrabbedOffset.top;
        this.stopAnimation(!1);
        var corner = currentInstance.mouseDownAtLeft ? "l" : "r";
        this.holdPage(this.pageGrabbed, mouseX, mouseY);
        this.flip(mouseX, mouseY, this.pageGrabbed, { corner: corner });
        f(document)
          .bind("mousemove.qbook", function (event) {
            return currentInstance.pageEdgeDrag(event);
          })
          .bind("mouseup.qbook", function (event) {
            return currentInstance.pageEdgeDragStop(event);
          });
        return !1;
      }
    },
    pageEdgeDrag: function (event) {
      if (!this._dragging) return !1;
      var offsetX = event.pageX / this.currentScale - this.pageGrabbedOffset.left,
        offsetY = event.pageY / this.currentScale - this.pageGrabbedOffset.top;
      var corner = this.mouseDownAtLeft ? "l" : "r";
      this.stopAnimation(!1);
      this.flip(offsetX, offsetY, this.pageGrabbed, { corner: corner, dragging: !0 });
      return !1;
    },
    pageEdgeDragStop: function (event) {
      if (!this._dragging) return !1;
      var originOffset = this.origin.offset();
      this.opts.zoomUsingTransform || (originOffset.left *= this.currentScale);
      var pageX = (event.pageX - originOffset.left) / this.currentScale,
        isLeftHalf = (event.pageX - originOffset.left) / this.currentScale < this.pageWidth,
        pageIndex = this.pageGrabbed.pageIndex;
      this.elem.removeClass("qbook-unselectable");
      this._cantStopAnimation || this.stopAnimation(!1);
      this._singlePage
        ? this.pageGrabbed.onLeft
          ? pageX > this.pageWidth / 2
            ? this.pageGrabbed.pageIndex == this.currentPage
              ? this.rtl
                ? this.advance()
                : this.back()
              : ((pageIndex += (this.rtl ? 1 : -1)),
                this.gotoPage(pageIndex))
            : this.releasePage(this.pageGrabbed, !0)
          : pageX < this.pageWidth + this.pageWidth / 2
            ? this.pageGrabbed.pageIndex == this.currentPage
              ? this.rtl
                ? this.back()
                : this.advance()
              : ((pageIndex += (this.rtl ? -1 : 1)),
                this.gotoPage(pageIndex))
            : this.releasePage(this.pageGrabbed, !0)
        : this.mouseDownAtLeft && !isLeftHalf
          ? this.rtl
            ? this.advance()
            : this.back()
          : !this.mouseDownAtLeft && isLeftHalf
            ? this.rtl
              ? this.back()
              : this.advance()
            : this.releasePage(this.pageGrabbed, !0);
      this._dragging = !1;
      f(document).unbind("mousemove.qbook mouseup.qbook");
    },
    curl: function (pageIndex, curlDown) {
      if (!(this.curledPage || this.holdedPage || this.zoomed)) {
        void 0 == pageIndex && (pageIndex = this.currentPage);
        if ("number" == typeof pageIndex || "string" == typeof pageIndex) pageIndex = this.pages[+pageIndex];
        if (pageIndex && !pageIndex.isCurled) {
          pageIndex.isCurled = !0;
          this.curledPage = pageIndex;
          var isLeftPage = this.pageIsOnTheLeft(pageIndex.pageIndex),
            pageWidth = isLeftPage ? 0 : pageIndex.pageWidth || this.pageWidth,
            pageHeight = curlDown ? (pageIndex.pageHeight || this.pageHeight) - 1 : 2;
          this.flip({
            from: [pageWidth, pageHeight],
            to: [
              pageWidth + this.opts.curlSize * (isLeftPage ? 1 : -1),
              pageHeight + this.opts.curlSize * (curlDown ? -1 : 1),
            ],
            corner: (curlDown ? "b" : "t") + (isLeftPage ? "l" : "r"),
            page: pageIndex,
            duration: 400,
          });
        }
      }
    },
    uncurl: function (pageIndexToUncurl, isImmediate) {
      if (this.curledPage) {
        1 == pageIndexToUncurl && ((isImmediate = !0), (pageIndexToUncurl = void 0));
        void 0 == pageIndexToUncurl && (pageIndexToUncurl = this.curledPage || this.currentPage);
        if ("number" == typeof pageIndexToUncurl || "string" == typeof pageIndexToUncurl) pageIndexToUncurl = this.pages[+pageIndexToUncurl];
        pageIndexToUncurl.isCurled &&
          (this.stopAnimation(!1),
            this.releasePage(pageIndexToUncurl, !isImmediate, void 0, 400),
            (pageIndexToUncurl.isCurled = !1),
            (this.curledPage = null));
      }
    },
    scrollBarWidth: function () {
      var a = f(
        "<div style='width:50px;height:60px;overflow-y:auto;display:inline-block;position: absolute;left:-1000px;'></div>"
      ).appendTo("body"),
        b = a.width(),
        c = f(
          "<div style='width:100%;height:100px;display:inline-block;'>Hi!<br/>He<br/>llo!</div>"
        )
          .appendTo(a)
          .width();
      a.remove();
      return b - c;
    },
    scrollBarWidth: function () {
      var element = f(
        "<div style='width:50px;height:60px;overflow-y:auto;display:inline-block;position: absolute;left:-1000px;'></div>"
      ).appendTo("body"),
        containerWidth = element.width(),
        childElement = f(
          "<div style='width:100%;height:100px;display:inline-block;'>Hi!<br/>He<br/>llo!</div>"
        )
          .appendTo(element)
          .width();
      element.remove();
      return containerWidth - childElement;
    },
    createContainer: function (element) {
      container = this.container = f("<div class='qbook-container'>");
      var config = this.opts,
        defaultConfig = f.qBook.defaults;
      container.prependTo(this.elem.parent());
      this.containerBook = f("<div class='qbook-book-container'>")
        .appendTo(container)
        .append(this.elem);
      config.containerWidth && container.css("width", config.containerWidth);
      config.containerHeight && container.css("height", config.containerHeight);
      config.containerBackground && container.css("background", config.containerBackground);
      config.containerPadding &&
        this.containerBook.css("padding", config.containerPadding);
      config.fullscreenElement == defaultConfig.fullscreenElement && (config.fullscreenElement = container);
      config.scaleToFit || (config.scaleToFit = this.containerBook);
      ("window" != config.container && config.container != window) ||
        container.addClass("qbook-container-full");
      this._isMobile && container.addClass("qbook-mobile");
    },
    destroyContainer: function () {
      this.container &&
        (this.container.replaceWith(this.elem), (this.container = void 0));
    },
    updateContainer: function () {
      var config = this.opts,
        containerHeight;
      containerHeight = this.container.height();
      this.containerBook.outerHeight(containerHeight);
      if (!config.conteinerHeight) {
        this.elem.css("top", this.elem.css("top"));
        var currentInstance = this;
        setTimeout(function () {
          currentInstance.elem.css("top", "");
        }, 0);
      }
      f.qBook.support.transform || this.elem.css("top", "auto");
    },
    setStyle: function (customCSSClass) {
      var generatedCSSClass;
      "string" == typeof customCSSClass && (this._customCSSClass = customCSSClass);
      f.isPlainObject(customCSSClass) &&
        (this._customCSSClass ||
          (this._customCSSClass = this.generateCSSClassName()),
          (generatedCSSClass = this.generateCSSClass(customCSSClass, this._customCSSClass)),
          f("body").append("<style>" + generatedCSSClass + "</style>"));
      var _customCSSClass = this._customCSSClass;
      f(this.tocContainer).addClass(_customCSSClass);
      f(this.elem).find(".qbook-page-number").addClass(_customCSSClass);
    },
    generateCSSClassName: function () {
      f.qBook.utils._cssClassCounter =
        (f.qBook.utils._cssClassCounter || 0) + 1;
      return "qbook-cs-" + f.qBook.utils._cssClassCounter;
    },
    generateCSSClass: function (styleObject, className) {
      function createStyleString(selector, style) {
        var styleString = [];
        styleString.push(selector + " {");
        for (var prop in style) styleString.push("\t" + prop + " : " + style[prop] + " !important;");
        styleString.push("}");
        styleString = styleString.join("\n");
        styleArray.push(styleString);
        return styleString;
      }
      function applyStyleIfExists(styleObj, prop, selector) {
        styleObj[prop] && (createStyleString(selector, styleObj[prop]), delete styleObj[prop]);
      }
      if (!styleObject || !className) return "";
      styleObject = f.extend({}, styleObject);
      var styleArray = [];
      styleObject.hover && createStyleString("." + className + " .qbook-close:hover", { color: styleObject.hover.color });
      applyStyleIfExists(styleObject, "hover", "." + className + " a:hover, ." + className + ".qbook-control:hover");
      applyStyleIfExists(styleObject, "active", "." + className + " a:active, ." + className + ".qbook-control:active");
      applyStyleIfExists(
        styleObject,
        "disabled",
        "." +
        className +
        " a.qbook-disabled, ." +
        className +
        ".qbook-control.qbook-disabled"
      );
      styleObject.separator &&
        ((styleObject.separator = styleObject.separator.split(",")),
          createStyleString("." + className + " a", {
            "border-color": styleObject.separator[0],
            "box-shadow":
              "0 1px 0 " + (styleObject.separator[1] || "transparent") + " inset",
          }),
          delete styleObject.separator);
      createStyleString("." + className + ".qbook-page-number", { background: "transparent" });
      styleObject.pageNumber &&
        (createStyleString("." + className + ".qbook-page-number", { color: styleObject.pageNumber }),
          delete styleObject.pageNumber);
      createStyleString("." + className + " .qbook-control", styleObject);
      createStyleString("." + className + " .qbook-control.remove-sticky-hover-style:hover", styleObject);
      createStyleString("." + className, styleObject);
      return styleArray.join("\n");
    },
    controllify: function (config_) {
      var currentInstance = this,
        config = this.opts;
      f(config_.zoomIn || config_.zoomin).on("click.qbook", function () {
        currentInstance.zoomIn({});
        return !1;
      });
      f(config_.zoomOut || config_.zoomout).on("click.qbook", function () {
        currentInstance.zoomOut({});
        return !1;
      });
      f(config_.zoomReset || config_.zoomreset).on("click.qbook", function () {
        currentInstance.zoomReset({});
        return !1;
      });
      f(config_.next).on("click.qbook", function () {
        currentInstance.advance();
        return !1;
      });
      f(config_.back).on("click.qbook", function () {
        currentInstance.back();
        return !1;
      });
      f(config_.first).on("click.qbook", function () {
        currentInstance.gotoPage(0);
        return !1;
      });
      f(config_.last).on("click.qbook", function () {
        currentInstance.gotoPage(currentInstance.pages.length - 1);
        return !1;
      });
      f(config_.left).on("click.qbook", function () {
        currentInstance.gotoLeft();
        return !1;
      });
      f(config_.right).on("click.qbook", function () {
        currentInstance.gotoRight();
        return !1;
      });
      f(config_.lastLeft || config_.lastleft).on("click.qbook", function () {
        currentInstance.gotoLastLeft();
        return !1;
      });
      f(config_.lastRight || config_.lastright).on("click.qbook", function () {
        currentInstance.gotoLastRight();
        return !1;
      });
      f(config_.slideShow || config_.slideshow).on("click.qbook", function () {
        currentInstance.toggleSlideShow();
        return !1;
      });
      f(config_.flipSound || config_.flipsound).on("click.qbook", function () {
        currentInstance.toggleFlipSound();
        return !1;
      });
      f(config_.fullscreen).length && !requestFullscreen && f(config_.fullscreen).hide();
      config_.currentPage && this.createCurrentPageControl(config_.currentPage);
      var controlNames =
        "zoomIn zoomOut zoomReset left lastLeft right lastRight next back first last slideShow flipSound fullscreen currentPage download home".split(
          " "
        ),
        controlName_;

      for (var index = 0, controlNamesLength = controlNames.length; index < controlNamesLength; index++)
        (controlName_ = controlNames[index].toLowerCase()),
          (this._controls[controlName_] = f(this._controls[controlName_]).add(config_[controlNames[index]] || config_[controlName_]));
    },
    toggleControl: function (control, disabled) {
      (control = this._controls[control.toLowerCase()]) &&
        f(control).toggleClass("qbook-disabled", disabled);
    },
    createCurrentPageControl: function (element) {
      element = f(element);
      if (element.length) {
        element.append(
          "<input class='qbook-input-page' /><span class='qbook-current-page'></span>"
        );
        var currentInstance = this,
          inputPage = element.find(".qbook-input-page"),
          currentPage = element.find(".qbook-current-page");
        inputPage.hide();
        element.on("click.qbook", function () {
          currentPage.hide();
          inputPage.show().focus();
        });
        inputPage.on("keypress.qbook", function (event) {
          var allowedKeys = "8,9,13,35,36,37,39".match(new RegExp(event.which));
          !event.which ||
            (49 <= event.which && 57 >= event.which) ||
            (48 == event.which && f(this).val()) ||
            allowedKeys ||
            event.preventDefault();
        });
        inputPage.on("focusin.qbook", function () {
          var currentValue = currentInstance.currentPage + 1;
          f(this).val(currentValue).data("value", currentValue).select();
        });
        inputPage.on("focusout.qbook", function () {
          f(this).hide();
          currentPage.show();
        });
        inputPage.on("change.qbook", function () {
          var currentInstance_ = f(this),
            previousValue = currentInstance_.data("value"),
            selectedValue = parseInt(this.value);
          1 <= selectedValue && selectedValue <= currentInstance.pages.length ? currentInstance.gotoPage(selectedValue - 1) : currentInstance_.val(previousValue);
          currentInstance_.hide();
          currentPage.show();
        });
      }
    },
    updateCurrentPageControl: function (conrol) {
      !conrol && this._controls && (conrol = this._controls.currentpage);
      if (conrol && conrol.length) {
        var currentPagenumber = this.currentPage + 1,
          pageText = currentPagenumber + "/" + this.pages.length;
        conrol.find(".qbook-current-page").text(pageText);
        var inputPage = conrol.find(".qbook-input-page");
        inputPage.outerHeight() && inputPage.css("top", (conrol.height() - inputPage.outerHeight()) / 2);
      }
    },
    translate: function (element, x, y, useTransform) {
      f.qBook.support.transform && !1 !== useTransform
        ? element.css(
          "transform",
          f.qBook.useTranslate3d
            ? "translate3d(" + (x || 0) + "px, " + (y || 0) + "px, 0px)"
            : "translate(" + (x || 0) + "px, " + (y || 0) + "px) "
        )
        : (void 0 !== x && element.css({ left: x }),
          void 0 !== y && element.css({ top: y }));
    }
  };
  f.qBook.defaults = {
    width: 500,
    height: 300,
    pageWidth: void 0,
    pageHeight: void 0,
    coverWidth: void 0,
    coverHeight: void 0,
    startPage: 0,
    hardcovers: !1,
    hardPages: !1,
    closable: !0,
    centeredWhenClosed: !1,
    doublePages: ".double",
    container: !1,
    containerWidth: void 0,
    containerHeight: void 0,
    containerPadding: void 0,
    containerBackground: void 0,
    rtl: !1,
    responsive: !1,
    scaleToFit: "",
    maxWidth: void 0,
    maxHeight: void 0,
    onResize: null,
    responsiveHandleWidth: void 0,
    singlePage: !1,
    responsiveSinglePage: !0,
    fullscreenElement: document.documentElement,
    onFullscreenError: null,
    onFullscreenErrorMessage: "Cannot enter fullscreen mode.",
    use3d: !0,
    perspective: 2e3,
    useTranslate3d: "mobile",
    useScale3d: !0,
    pageThickness: 0,
    pageEdgeColor: null,
    hardPageShadow: !0,
    style: null,
    bookShadow: !0,
    gutterShadow: !0,
    shadowThreshold: 20,
    shadows: !0,
    foldGradient: !0,
    foldGradientThreshold: 20,
    pageNumbers: !0,
    firstPageNumber: 1,
    numberedPages: !1,
    deepLinking: !0,
    updateBrowserURL: !0,
    moveToViewPort: !1,
    curl: !0,
    curlSize: 40,
    slideShow: !1,
    slideShowDelay: 1e3,
    slideShowLoop: !1,
    pauseOnHover: !0,
    touchEnabled: !0,
    swipeDuration: 200,
    mouseWheel: !1,
    handleWidth: !1,
    handleClickDuration: 300,
    turnPageDuration: 1e3,
    turnPageDurationMin: 300,
    forceBasicPage: !1,
    sections: ".qbook-section",
    images: void 0,
    srcs: void 0,
    loadingIndicator: !0,
    zoomEnabled: !1,
    zoomLevel: 1,
    zoomMax: 2,
    zoomMin: 1,
    zoomBoundingBox: window,
    zoomStep: 0.25,
    zoomDuration: 200,
    zoomEasing: "linear",
    onZoom: null,
    pinchToZoom: !0,
    doubleClickToZoom: !1,
    zoomFocusX: 0.5,
    zoomFocusY: 0.5,
    allowDragBrowserPageZoom: !1,
    flipSound: !0,
    flipSoundFile: ["flipsound.mp3"],
    flipSoundPath: "flipbook/sounds/",
    onPlayFlipSound: null,
    clipBoundaries: !0,
    onShowPage: null,
    onShowPage_: null,
    onHoldPage: null,
    onReleasePage: null,
    pagesInMemory: null,
    pagesToKeep: null,
    onLoadPage: null,
    onUnloadPage: null,
    controls: {}
  };
  f.qBook.qBookConstructor = H;
  window.raf = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1e3 / 60);
      }
    );
  })();
  f.browser.ie8mode = f.browser.msie && 8 == document.documentMode;
  f.browser.ie7 =
    f.browser.msie && (7 == f.browser.version || 7 == document.documentMode);
  var borderAdjustment = f.browser.msie && 9 > f.browser.version ? 1 : 0,
    borderWidths = { thin: 2 - borderAdjustment, medium: 4 - borderAdjustment, thick: 6 - borderAdjustment },
    windowDocument = window.document,
    windowDocumentElement = windowDocument.documentElement,
    requestFullscreen =
      windowDocumentElement.requestFullscreen ||
      windowDocumentElement.mozRequestFullScreen ||
      windowDocumentElement.msRequestFullscreen ||
      windowDocumentElement.webkitRequestFullscreen ||
      windowDocumentElement.webkitRequestFullScreen,
    exitFullScreen =
      windowDocument.exitFullscreen ||
      windowDocument.mozCancelFullScreen ||
      windowDocument.msExitFullscreen ||
      windowDocument.webkitExitFullscreen ||
      windowDocument.webkitCancelFullScreen,
    isFullscreen = function () {
      return (
        windowDocument.fullscreenElement ||
        windowDocument.mozFullScreenElement ||
        windowDocument.msFullscreenElement ||
        windowDocument.webkitFullscreenElement ||
        windowDocument.webkitCurrentFullScreenElement
      );
    };
  f.qBook.utils = {
    translate: function (a, b, c) {
      return f.qBook.useTranslate3d
        ? "translate3d(" + a + "px, " + b + "px, " + (c || 0) + "px) "
        : "translate(" + a + "px, " + b + "px) ";
    },
    isMobile: function () {
      return 480 >= f(window).width() || 480 >= f(window).height() ||
        /android/i.test(navigator.userAgent);
    },
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  };
})(jQuery);


(function (f) {
  function handleMouseWheelEvent(data) {
    var event = data || window.event,
      arrayArguments = [].slice.call(arguments, 1),
      value1 = 0,
      value2 = 0;
    data = f.event.fix(event);
    data.type = "mousewheel";
    event.wheelDelta && (value1 = event.wheelDelta / 120);
    event.detail && (value1 = -event.detail / 3);
    var value3 = value1;
    void 0 !== event.axis &&
      event.axis === event.HORIZONTAL_AXIS &&
      ((value3 = 0), (value2 = -1 * value1));
    void 0 !== event.wheelDeltaY && (value3 = event.wheelDeltaY / 120);
    void 0 !== event.wheelDeltaX && (value2 = (-1 * event.wheelDeltaX) / 120);
    arrayArguments.unshift(data, value1, value2, value3);
    return (f.event.dispatch || f.event.handle).apply(this, arrayArguments);
  }
  var events = ["DOMMouseScroll", "mousewheel"];
  if (f.event.fixHooks)
    for (var J = events.length; J;) f.event.fixHooks[events[--J]] = f.event.mouseHooks;
  f.event.special.mousewheel = {
    setup: function () {
      if (this.addEventListener)
        for (var len = events.length; len;) this.addEventListener(events[--len], handleMouseWheelEvent, !1);
      else this.onmousewheel = handleMouseWheelEvent;
    },
    teardown: function () {
      if (this.removeEventListener)
        for (var len = events.length; len;) this.removeEventListener(events[--len], handleMouseWheelEvent, !1);
      else this.onmousewheel = null;
    },
  };
  f.fn.extend({
    mousewheel: function (data) {
      return data ? this.bind("mousewheel", data) : this.trigger("mousewheel");
    },
    unmousewheel: function (data) {
      return this.unbind("mousewheel", data);
    },
  });
})(jQuery);
(function (f) {
  function getPrefixedCSSProperty(data) {
    if (data in element.style) return (f.qBook.support[data] = data);
    for (
      var len = prefixes.length, prefixedPropertyName, capitalizedData = data.charAt(0).toUpperCase() + data.substr(1);
      len--;

    )
      if (((prefixedPropertyName = prefixes[w] + capitalizedData), prefixedPropertyName in element.style)) return (f.qBook.support[data] = prefixedPropertyName);
  }
  if (f.cssHooks) {
    var element = document.createElement("div"),
      prefixes = ["O", "ms", "Webkit", "Moz"];
    getPrefixedCSSProperty("transform");
    getPrefixedCSSProperty("transformOrigin");
    getPrefixedCSSProperty("boxSizing");
    getPrefixedCSSProperty("zoom");
    f.qBook.support.boxSizing &&
      8 > document.documentMode &&
      (f.qBook.support.boxSizing = !1);
    element = null;
    f.each(["transform", "transformOrigin"], function (propertyValue, property) {
      f.qBook.support[property] &&
        f.qBook.support[property] !== property &&
        !f.cssHooks[property] &&
        (f.cssHooks[property] = {
          get: function (element, property, value) {
            return f.css(element, f.qBook.support[property]);
          },
          set: function (element, value) {
            element.style[f.qBook.support[property]] = value;
          },
        });
    });
    f.qBook.applyAlphaImageLoader = function (data) {
      var urlMatch,
        element,
        cssString = "",
        hiddenElement = f("<div style='display:none'></div>").appendTo("body");
      var index = 0;
      for (element = data.length; index < element; index++) {
        var name = data[index];
        hiddenElement.addClass(name);
        if ((urlMatch = hiddenElement.css("background-image").match(/^url\("(.*)"\)$/)))
          (cssString +=
            "." +
            name +
            "{background:none; filter : progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
            urlMatch[1] +
            "', sizingMethod='scale'); } "),
            hiddenElement.removeClass(name);
      }
      f("body").append("<style>" + cssString + "</style>");
    };
  } else alert("jQuery 1.4.3+ is needed for this plugin to work");
})(jQuery);
