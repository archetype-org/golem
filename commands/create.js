import { fileExists, createFile, createPath } from "../lib/files.js"
import { installCoreDependencies } from '../lib/urbit.js'
import { emptyDesk } from '../templates/empty-desk.js'
import { crudDesk } from '../templates/crud-desk.js'
import { sailDesk } from '../templates/sail-desk.js'

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

export {
  create,
}
