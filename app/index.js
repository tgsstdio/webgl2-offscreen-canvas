var el = document.getElementById('messageLog')

if (el !== null) {
  el.innerText = 'Hello World'
}

const initWebGL = require('./initWebGL.js')

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
