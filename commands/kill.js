import execSh from 'exec-sh'
const execShPromise = execSh.promise

async function kill () {
    console.log(`KILL: searching for running urbit ships . . .`)
    const out = await execShPromise(`ps -e | grep '[u]rbit -d' | awk '{ print $1; exit }'`, true)
    const id = out.stdout.trim()
    if (id !== '') {
        try {
            console.log(`KILL: attempting to kill urbit ship running on process ${id}`)
            await execShPromise(`kill ${id}`)
        } catch (e) {
            console.log(`KILL: could not kill urbit ship running on process ${id}`)
            console.log(e)
        }
        console.log(`KILL: urbit ship running on process ${id} killed`)
    } else {
        console.log('KILL: no urbit ships appear to be running. There is nothing to kill')
    }
}

export {
  kill,
}
