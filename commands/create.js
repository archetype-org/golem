const { fileExists, createFile, createPath} = require("../lib/files");
const { installCoreDependencies } = require('../lib/urbit')
const { emptyDesk } = require('../templates/empty-desk')
const { crudDesk } = require('../templates/crud-desk')
const { sailDesk } = require('../templates/sail-desk')
async function create (deskName, template, { skipDeps }) {
  console.log(`create: creating urbit project`)
  console.log(`create: using template — ${template}`)
  // todo: import dynamically from folder
  const templates = {
    "empty": emptyDesk,
    "crud": crudDesk,
    "sail": sailDesk,
  }
  // app always distributed through fake ~zod, by convention
  const { files } = templates[template]('zod', deskName)
  for (let file of files) {
    file.path = file.path.replace('./', '')
    if (!(await fileExists(file))) await createFile(`./${deskName}/${file.path}/${file.name}`, file.content.trimStart())
  }
  // download code dependancues (incl. base, garden etc)
    const depsPath = `./${deskName}/apps/${deskName}/desk-deps`
    await createPath(depsPath)
  if (!skipDeps) {
    await installCoreDependencies(depsPath)
  }
}

module.exports = {
  create,
}
