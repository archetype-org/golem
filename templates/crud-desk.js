const { cruft } = require('../partials/cruft')
const { crudAgent } = require('../partials/crud-agent')
const { itemFiles } = require('../partials/item-files')

function crudDesk (shipName, deskName) {
  const files = [
    ...cruft(shipName, deskName),
    ...crudAgent(shipName, deskName), 
    ...itemFiles(shipName, deskName),
  ]
  return { files }
}

module.exports = {
  crudDesk,
}
