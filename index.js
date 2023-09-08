const { program } = require('commander')
const execShPromise = require("exec-sh").promise

program
  .name('scrivener')
  .description('generate urbit projects and test environments')
  .version('0.0.1')

program.command('sail')
  .description('create a test ship')
  .argument('<string>', 'pier name; best practice to use a string that casts to @p (omit the ~)')
  .action(sail)

program.parse()

async function sail (shipName) {
  try {
    const urbitInstalled = await fileExists('urbit')
    if (!urbitInstalled) await fetchUrbitBinary()
    const shipCreated = await folderExists(shipName)
    if (!shipCreated) {
      console.log(`booting ${shipName} for the first time — may take a while`)
      await bootFakeShip(shipName)
    } else {
      console.log(`pier named ${shipName} already found, restarting`)
      await restartFakeShip(shipName)
    }
  } catch (err) {
    console.log(err)
    return err
  }

}

async function fetchUrbitBinary () {
  try {
    await execShPromise(`curl -L https://urbit.org/install/macos-x86_64/latest | tar xzk -s '/.*/urbit/' && ./urbit`);
  } catch (err) {
    console.log(err)
    return err
  }
}

async function bootFakeShip (shipName) {
  try {
    await execShPromise(`./urbit -F ${shipName}`);
  } catch (err) {
    console.log(err)
    return err
  }
}

async function restartFakeShip (shipName) {
  try {
    await execShPromise(`./urbit  ${shipName}`);
  } catch (err) {
    console.log(err)
    return err
  }
}

async function fileExists (fileName) {
  try {
    const { stdout } = await execShPromise(`
[ -f ${fileName} ] && echo "true"`, true);
    const exists = stdout.trim() === 'true'
    return exists
  } catch (err) {
    console.log(err)
    return err
  }

}

async function folderExists (dirName) {
  try {
    const { stdout } = await execShPromise(`
[ -d ${dirName} ] && echo "true"`, true);
    const exists = stdout.trim() === 'true'
    return exists
  } catch (err) {
    console.log(err)
    return err
  }
}


