export default [
  // [1]
  {
    "name": "DribbbleApp",
    "version": "0.0.1",
    "private": true,
    "scripts": {
      "start": "node_modules/react-native/packager/packager.sh"
    },
    "dependencies": {
      "react-native": "^0.8.0",
      "react-native-blur": "^0.5.4",
      "react-native-htmlview": "^0.2.0",
      "react-native-modal": "^0.3.8",
      "react-native-parallax-view": "^2.0.2",
      "react-native-vector-icons": "^0.6.2"
    }
  }
  // [1]
  , {
    "name": "react-native-icons",
    "version": "0.3.4",
    "description": "Use 1000's of icon fonts in your React Native app including the tab bar.",
    "main": "index.js",
    "author": "Cory Smith <cory.m.smith@gmail.com>",
    "keywords": ["react", "icons", "react-native", "react-component", "react-native-component", "mobile", "ui", "react native icons", "font", "tab bar"],
    "homepage": "https://github.com/corymsmith/react-native-icons",
    "bugs": "https://github.com/corymsmith/react-native-icons/issues",
    "repository": {
      "type": "git",
      "url": "git://github.com/corymsmith/react-native-icons.git"
    },
    "react-native-module": {
      "podfile": "react-native-icons.podspec"
    }
  }
  // [2]
  , {
    "name": "react-native-swiper",
    "keywords": ["react-component", "react-native", "ios"],
    "version": "1.3.0",
    "description": "Swiper component for React Native.",
    "main": "dist/index.js",
    "scripts": {
      "start": "node_modules/.bin/babel src --out-dir dist",
      "watch": "node_modules/.bin/babel src --out-dir dist --watch"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/leecade/react-native-swiper.git"
    },
    "author": "",
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/leecade/react-native-swiper/issues"
    },
    "homepage": "https://github.com/leecade/react-native-swiper#readme",
    "devDependencies": {
      "babel": "^5.1.11"
    }
  }
  // [3]
  , {
    "name": "tcomb-form-native",
    "version": "0.2.5",
    "description": "react-native powered UI library for developing forms writing less code",
    "main": "index.js",
    "scripts": {
      "lint": "eslint lib",
      "test": "node test"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/gcanti/tcomb-form-native.git"
    },
    "author": "Giulio Canti <giulio.canti@gmail.com>",
    "license": "MIT",
    "bugs": {
      "url": "https://github.com/gcanti/tcomb-form-native/issues"
    },
    "homepage": "https://github.com/gcanti/tcomb-form-native",
    "peerDependencies": {
      "react-native": ">=0.9.0",
      "tcomb-validation": "^1.0.4"
    },
    "devDependencies": {
      "eslint": "^0.23.0",
      "eslint-plugin-react": "^2.5.2",
      "react": "^0.13.3",
      "tape": "^3.5.0"
    },
    "tags": ["tcomb", "form", "forms", "react", "react-native", "react-component"],
    "keywords": ["tcomb", "form", "forms", "react", "react-native", "react-component"]
  }
  // [4]
  , {
    "name": "react-native-router",
    "version": "0.2.1",
    "description": "Awesome navigation for your native app.",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/t4t5/react-native-router.git"
    },
    "keywords": ["react", "react-component", "react-native", "ios", "navigation", "navigation-bar", "navbar", "router"],
    "author": "Tristan Edwards <tristan.edwards@me.com> (http://tristanedwards.me)",
    "license": "MIT",
    "bugs": {
      "url": "https://github.com/t4t5/react-native-router/issues"
    },
    "homepage": "https://github.com/t4t5/react-native-router",
    "dependencies": {
      "react-native": "^0.4.x",
      "react-tween-state": "0.0.5"
    }
  }
  // [5]
  , {
    "name": "react-native-camera",
    "repository": {
      "type": "git",
      "url": "https://github.com/lwansbrough/react-native-camera.git"
    },
    "version": "0.3.3",
    "description": "A Camera component for React Native. Also reads barcodes.",
    "main": "Camera.ios.js",
    "author": "Lochlan Wansbrough <lochie@live.com> (http://lwansbrough.com)",
    "nativePackage": true,
    "peerDependencies": {
      "react-native": "*"
    },
    "keywords": ["react-native", "react", "native", "camera", "qr", "code", "barcode"]
  }
];
