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
