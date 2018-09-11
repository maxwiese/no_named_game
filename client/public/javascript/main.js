let vertexShaderText =
  [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    '',
    'void main()',
    '{',
    ' gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
  ].join('\n');

let fragmentShaderText =
  [
    'precision mediump float;',
    '',
    'void main()',
    '{',
    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
    '}'
  ].join('\n');

let main = function () {
  console.log('this is working')
  const canvas = document.querySelector('#canvas');
  const gl = canvas.getContext('webgl');

  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  //canvas.width = window.innerWidth;
  //canvas.height = window.innerHeight;
  //gl.viewport(0, 0, window.innerWidth, window.innerHeight)

  gl.clearColor(0.75, 0.85, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);


  // Create shaders
  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('Error compiling vertex Shader: ', gl.getShaderInfoLog(vertexShader))
    return;
  }

  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('Error compiling fragment Shader: ', gl.getShaderInfoLog(fragmentShader));
    return;
  }

  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Error linking program: ', gl.getProgramInfoLog(program));
    return;
  }

  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('Error validating program', gl.getProgramInfoLog(program));
    return;
  }

  // Create Buffer
  let triangleVertices = [
    // X, Y
    0.0, 0.5,
    -0.5, -0.5,
    0.5, -0.5
  ];

  let triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

  let positionAttribLocation = gl.getAttribLocation(program, 'vertPosition')
  gl.vertexAttribPointer(
    positionAttribLocation, // Attribute Location
    2, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE,
    2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 // Offset from the beginning of a single vertex to this attribute
  );

  gl.enableVertexAttribArray(positionAttribLocation);

  // Main render loop

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

};

