const { cruft } = require('../partials/cruft')
const { sailFiles } = require('../partials/sail-files')
const { itemFiles } = require('../partials/item-files')
const { reactFiles } = require("../partials/react-files")

function sailDesk (shipName, deskName) {
  const files = [
    ...cruft(shipName, deskName),
    ...sailFiles(shipName, deskName),
    ...itemFiles(shipName, deskName),
    ...reactFiles(shipName, deskName),
  ]
  return { files }
}

module.exports = {
  sailDesk,
}
