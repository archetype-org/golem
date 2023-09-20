const { fileExists, createFile, createPath} = require("../lib/files");
const { installCoreDependencies } = require('../lib/urbit')
const { emptyDesk } = require('../templates/empty-desk')
async function create (deskName, template) {
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
  // todo: download code dependancues (incl. base, garden etc)
  const depsPath = `./${deskName}/apps/${deskName}/desk-deps`
  await createPath(depsPath)
  await installCoreDependencies(depsPath)
}

module.exports = {
  create,
}
