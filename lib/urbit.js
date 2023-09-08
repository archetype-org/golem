const execShPromise = require("exec-sh").promise
async function fetchUrbitBinary () {
  try {
    await execShPromise(`curl -L https://urbit.org/install/macos-x86_64/latest | tar xzk -s '/.*/urbit/'`);
  } catch (err) {
    console.log(err)
    return err
  }
}

async function bootFakeShip (shipName) {
  try {
    await execShPromise(`./urbit -F ${shipName}`, true);
  } catch (err) {
    console.log(err)
    return err
  }
}

async function restartFakeShip (shipName) {
  try {
    await execShPromise(`./urbit ${shipName}`);
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
