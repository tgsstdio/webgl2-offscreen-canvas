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

function render(gl, r, g, b , a) {
    // https://github.com/WebGLSamples/WebGL2Samples/blob/master/samples/draw_instanced.html#L98

    // -- Init Program
    let program = createProgram(gl, getShaderSource('vs'), getShaderSource('fs'))
    gl.useProgram(program)
    // -- Init Vertex Array
    let vertexArray = gl.createVertexArray()
    gl.bindVertexArray(vertexArray)
    // -- Init Buffers
    let vertexPosLocation = 0  // set with GLSL layout qualifier
    let vertices = new Float32Array([
      -0.3, -0.5,
      0.3, -0.5,
      0.0, 0.5
    ])
    let vertexPosBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(vertexPosLocation)
    gl.vertexAttribPointer(vertexPosLocation, 2, gl.FLOAT, false, 0, 0)
    let vertexColorLocation = 1  // set with GLSL layout qualifier
    let colors = new Float32Array([
      1.0, 0.5, 0.0,
      0.0, 0.5, 1.0
    ])
    let vertexColorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(vertexColorLocation)
    gl.vertexAttribPointer(vertexColorLocation, 3, gl.FLOAT, false, 0, 0)
    gl.vertexAttribDivisor(vertexColorLocation, 1) // attribute used once per instance
    gl.bindVertexArray(null)  
    
    // -- Render
    gl.clearColor(r, g, b, a)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.bindVertexArray(vertexArray)
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 3, 2)
    // -- Delete WebGL resources
    gl.deleteBuffer(vertexPosBuffer)
    gl.deleteBuffer(vertexColorBuffer)
    gl.deleteProgram(program)
    gl.deleteVertexArray(vertexArray)
}

function start (enabled, onGL, offGL) {   
  let normal = document.getElementById('normalRendering')
  let offRender = document.getElementById('offScreenRendering')

  if (enabled) {
    if (normal)
      normal.style = 'display:none';
    if (offRender)
      offRender.style = ''

    render(offGL, 1, 0, 0, 1);  
    onGL.clearColor(0, 1, 0, 1); 
    onGL.clear(onGL.COLOR_BUFFER_BIT)  
  }
  else {
    if (offRender)
      offRender.style = 'display:none';
    if (normal)
      normal.style = ''

    render(onGL, 0, 1, 1, 1);    
    offGL.clearColor(0, 1, 0, 1);
    offGL.clear(offGL.COLOR_BUFFER_BIT)  
  }

  let bitmap = offscreen.transferToImageBitmap()
  dest.transferImageBitmap(bitmap);  
}

let onCanvas = document.getElementById('onCanvas')
onCanvas.addEventListener('webglcontextlost', function(e) {
  console.log(e); 
}, false);

let offCanvas = document.getElementById('offCanvas')
onCanvas.addEventListener('webglcontextlost', function(e) {
  console.log(e); 
}, false);

let offscreenExtAvailable = ('transferControlToOffscreen' in onCanvas);
let el = document.getElementById('messageLog')

if (el !== null) {    
  el.innerText =
    offscreenExtAvailable
    ? 'offscreen canvas found'
    : 'offscreen canvas not found'
}
let cb = document.getElementById('checkBox')

// Initialize the GL context
let onGL = onCanvas.getContext('webgl2');
// Only continue if WebGL is available and working
if (!onGL) {
  throw Error('on WebGL2 missing');
}

let dest = offCanvas.getContext("bitmaprenderer")
let offscreen = new OffscreenCanvas(offCanvas.clientWidth, offCanvas.clientHeight);
let offGL = offscreen.getContext('webgl2')
// Only continue if WebGL is available and working
if (!offGL) {
  throw Error('off WebGL2 missing');
} 

start(cb.checked, onGL, offGL)
cb.onchange = function() {
  console.log("RENDER : " + this.checked)  
  start(this.checked, onGL, offGL)


}



/***/ })
/******/ ]);