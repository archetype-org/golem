import { Account } from '@near-js/accounts'
import { connect, keyStores } from 'near-api-js' 
import { homedir } from 'os'
import * as pathlib from 'path'

const homedDirectory = homedir()
const CREDENTIALS_DIR = '.near-credentials'
const credentialsPath = pathlib.join(homedDirectory, CREDENTIALS_DIR)
const myKeyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath)

const connectionConfig = {
  networkId: 'testnet',
  keyStore: myKeyStore,
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://testnet.mynearwallet.com/',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://testnet.nearblocks.io',
}

async function getAccount () {
	const nearConnection = await connect(connectionConfig)
	const accountNames = await myKeyStore.getAccounts('testnet')
  if (!accountNames || accountNames.length === 0) {
    throw new Error(`
You Need to login to near to write/update the registry, run:

near login

to connect to your NEAR account
`)
  } else if (accountNames.length === 1) {
    return await nearConnection.account(accountNames[0])
  } else {
    // todo: update to handle multiple accounts & selection
    return await nearConnection.account(accountNames[0])
  }
}


export {
  getAccount,
}