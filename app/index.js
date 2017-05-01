var el = document.getElementById('messageLog')

if (el !== null) {
  el.innerText = 'Hello World'
}

const initWebGL = require('./initWebGL.js')

function start () {
  var canvas = document.getElementById('glCanvas')

  // Initialize the GL context
  var gl = initWebGL(canvas)
  // Only continue if WebGL is available and working
  if (!gl) {
    return
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  // Enable depth testing
  gl.enable(gl.DEPTH_TEST)
  // Near things obscure far things
  gl.depthFunc(gl.LEQUAL)
  // Clear the color as well as the depth buffer.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)    
}

start()

