const { cruft } = require('../partials/cruft')
const { sailFiles } = require('../partials/sail-files')
const { itemFiles } = require('../partials/item-files')

function sailDesk (shipName, deskName) {
  const files = [
    ...cruft(shipName, deskName),
    ...sailFiles(shipName, deskName),
    ...itemFiles(shipName, deskName),
  ]
  return { files }
}

module.exports = {
  sailDesk,
}
