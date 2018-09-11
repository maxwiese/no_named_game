module.exports = {
  move : (direction) => {
    if (direction == 'up') {
      return '{"y": 5}'
    }
    if (direction == 'down') {
      return '{"y": -5}'
    }
    if (direction == 'left') {
      return '{"x": 5}'
    }
    if (direction == 'right') {
      return '{"x": -5}'
    }
  }
}
