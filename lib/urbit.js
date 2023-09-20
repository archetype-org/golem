const execShPromise = require("exec-sh").promise
async function fetchUrbitBinary () {
  try {
    await execShPromise(`curl -L https://urbit.org/install/macos-x86_64/latest | tar xzk -s '/.*/urbit/' && mv ./urbit ./ships/urbit`);
  } catch (err) {
    console.log(err)
    return err
  }
}

async function bootFakeShip (shipName, { shell } = { shell: false}) {
  try {
    const args = !shell ? ' -dF ' : ' -F '
    await execShPromise(`./ships/urbit -c ./ships/${shipName}${args}${shipName}`);
  } catch (err) {
    console.log(err)
    return err
  }
}

async function restartFakeShip (shipName, { shell } = { shell: false}) {
  try {
    const args = !shell ? ' -d ' : ' '
    await execShPromise(`./ships/urbit${args}./ships/${shipName}`);
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {
  bootFakeShip,
  restartFakeShip,
  fetchUrbitBinary,
}
