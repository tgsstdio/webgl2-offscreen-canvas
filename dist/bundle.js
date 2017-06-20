/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function initWebGL (canvas) {
  var gl = null

  gl = canvas.getContext('webgl2')

  if (!gl) {
    window.alert('Unable to initialize WebGL2. Your browser may not support it.')

    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    // If we don't have a GL context, give up now
    if (!gl) {
      window.alert('Unable to initialize WebGL. Your browser may not support it.')
    }
  }
  return gl
}

module.exports = initWebGL


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var el = document.getElementById('messageLog')

if (el !== null) {
  el.innerText = 'Hello World'
}

const initWebGL = __webpack_require__(0)

function getShaderSource (id) {
  return document.getElementById(id).textContent.replace(/^\s+|\s+$/g, '')
}

function createShader (gl, source, type) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

function createProgram (gl, vertexShaderSource, fragmentShaderSource) {
  var program = gl.createProgram()
  var vshader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
  var fshader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER)
  gl.attachShader(program, vshader)
  gl.deleteShader(vshader)
  gl.attachShader(program, fshader)
  gl.deleteShader(fshader)
  gl.linkProgram(program)

  var log = gl.getProgramInfoLog(program)
  if (log) {
    console.log(log)
  }

  log = gl.getShaderInfoLog(vshader)
  if (log) {
    console.log(log)
  }

  log = gl.getShaderInfoLog(fshader)
  if (log) {
    console.log(log)
  }

  return program
}

function start () {
  var canvas = document.getElementById('glCanvas')

  // Initialize the GL context
  var gl = initWebGL(canvas)
  // Only continue if WebGL is available and working
  if (!gl) {
    return
  }

  // https://github.com/WebGLSamples/WebGL2Samples/blob/master/samples/draw_instanced.html#L98

  // -- Init Program
  var program = createProgram(gl, getShaderSource('vs'), getShaderSource('fs'))
  gl.useProgram(program)
  // -- Init Vertex Array
  var vertexArray = gl.createVertexArray()
  gl.bindVertexArray(vertexArray)
  // -- Init Buffers
  var vertexPosLocation = 0  // set with GLSL layout qualifier
  var vertices = new Float32Array([
    -0.3, -0.5,
    0.3, -0.5,
    0.0, 0.5
  ])
  var vertexPosBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  gl.enableVertexAttribArray(vertexPosLocation)
  gl.vertexAttribPointer(vertexPosLocation, 2, gl.FLOAT, false, 0, 0)
  var vertexColorLocation = 1  // set with GLSL layout qualifier
  var colors = new Float32Array([
    1.0, 0.5, 0.0,
    0.0, 0.5, 1.0
  ])
  var vertexColorBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW)
  gl.enableVertexAttribArray(vertexColorLocation)
  gl.vertexAttribPointer(vertexColorLocation, 3, gl.FLOAT, false, 0, 0)
  gl.vertexAttribDivisor(vertexColorLocation, 1) // attribute used once per instance
  gl.bindVertexArray(null)
  // -- Render
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.bindVertexArray(vertexArray)
  gl.drawArraysInstanced(gl.TRIANGLES, 0, 3, 2)
  // -- Delete WebGL resources
  gl.deleteBuffer(vertexPosBuffer)
  gl.deleteBuffer(vertexColorBuffer)
  gl.deleteProgram(program)
  gl.deleteVertexArray(vertexArray)
}

start()


/***/ })
/******/ ]);