import execSh from "exec-sh"
const execShPromise = execSh.promise
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

export {
  bootFakeShip,
  restartFakeShip,
  fetchUrbitBinary,
  installCoreDependencies,
}
