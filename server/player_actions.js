module.exports = {
  move : (direction) => {
    if (direction == 'up') {
      return '{"y": 1}'
    }
    if (direction == 'down') {
      return '{"y": -1}'
    }
    if (direction == 'left') {
      return '{"x": -1}'
    }
    if (direction == 'right') {
      return '{"x": 1}'
    }
  }
}
