const { fileExists, createFile } = require("../lib/files");
const { emptyDesk } = require('../templates/empty-desk')
async function start (deskName, template) {
  // todo: import dynamically from folder
  const templates = {
    "empty": emptyDesk,
  }
  // app always distributed through fake ~zod, by convention
  const { files } = templates[template]('zod', deskName)
  for (let file of files) {
    file.path = file.path.replace('./', '')
    if (!(await fileExists(file))) await createFile(`./${deskName}/${file.path}/${file.name}`, file.content.trimStart())
  }
}

module.exports = {
  start,
}
