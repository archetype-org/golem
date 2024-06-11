import execSh from 'exec-sh'
const execShPromise = execSh.promise

function getPortFromShipName(shipName) {
  let hash = 0
  for (let i = 0; i < shipName.length; i++) {
    hash = shipName.charCodeAt(i) + ((hash << 5) - hash)
  }
  return 10000 + (hash % 10000) // Ensure port is within a valid range
}

async function fetchUrbitBinary () {
  try {
    await execShPromise(`curl -L https://urbit.org/install/macos-x86_64/latest | tar xzk -s '/.*/urbit/' && mv ./urbit ./ships/urbit`);
  } catch (err) {
    console.log(err)
    return err
  }
}

async function installCoreDependencies (depsPath) {
  try {
    await execShPromise(`git clone https://github.com/urbit/urbit.git ./urbit-git
git clone https://github.com/tloncorp/landscape.git ./landscape-git
mkdir ${depsPath}/urbit
mkdir ${depsPath}/landscape
cp -r ./urbit-git/pkg/base-dev/* ${depsPath}/urbit
cp -r ./landscape-git/desk-dev/* ${depsPath}/landscape
rm -rf ./urbit-git
rm -rf ./landscape-git`)
  } catch (err) {
    console.log(err)
    return err
  }
}

async function bootFakeShip (shipName, { shell } = { shell: false}) {
  try {
    const args = !shell ? ' -dF ' : ' -F '
    const port = getPortFromShipName(shipName)
    await execShPromise(`./ships/urbit -c ./ships/${shipName}${args}${shipName} --http-port=${port}`)
  } catch (err) {
    console.log(err)
    return err
  }
}

async function restartFakeShip (shipName, { shell } = { shell: false}) {
  try {
    const args = !shell ? ' -d ' : ' '
    const port = getPortFromShipName(shipName)
    await execShPromise(`./ships/urbit${args}./ships/${shipName} --http-port=${port}`)
  } catch (err) {
    console.log(err)
    return err
  }
}

export {
  bootFakeShip,
  restartFakeShip,
  fetchUrbitBinary,
  installCoreDependencies,
}
