import { fileExists, createFile, createPath, getTemplates } from '../lib/files.js'
import { installCoreDependencies } from '../lib/urbit.js'

async function create (deskName, template, { skipDeps }) {
  console.log(`create: creating urbit project`)
  console.log(`create: using template — ${template}`)
  const templates = await getTemplates()
  // app always distributed through fake ~zod, by convention
  const { files } = templates[template]('zod', deskName)
  for (let file of files) {
    file.path = file.path.replace('./', '')
    if (!(await fileExists(file))) await createFile(`./${deskName}/${file.path}/${file.name}`, file.content.trimStart())
  }

  const shipsPath = `./ships`
  await createPath(shipsPath)
  
  if (!skipDeps) {
    // download code dependancues (incl. base, garden etc)
    const depsPath = `./${deskName}/apps/${deskName}/desk-deps`
    await createPath(depsPath)
    await installCoreDependencies(depsPath)
  }
}

export {
  create,
}
