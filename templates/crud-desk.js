const { cruft } = require('../partials/cruft')
const { crudAgent } = require('../partials/crud-agent')
const { itemFiles } = require('../partials/item-files')
const { reactFiles } = require('../partials/react-files')

function crudDesk (shipName, deskName) {
  const files = [
    ...cruft(shipName, deskName),
    ...crudAgent(shipName, deskName),
    ...itemFiles(shipName, deskName),
    ...reactFiles(shipName, deskName),
  ]
  return { files }
}

module.exports = {
  crudDesk,
}
