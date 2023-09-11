// casting utils

function truthyString (s) {
  if (typeof s === "boolean") return s
  if (typeof s !== "string") throw new Error(`truthyString: provided value ${s} is not a string`)
  return s === 'true'
}

// array utils

const back = arr => arr.slice(-1)
const front = arr => arr.slice(0, -1)

// path Utils
const branch = path => front(path.split('/')).join('/')
const leaf = path => back(path.split('/'))

module.exports = {
  // casts
  truthyString,
  // array
  back,
  front,
  // path
  branch,
  leaf,
}
