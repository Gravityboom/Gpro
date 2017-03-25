var list = require('./list.json')

module.exports = function() {
  console.log(list)
  return {
    'list.php': list
  }
}
