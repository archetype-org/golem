import { cruft } from '../partials/cruft.js'
import { hubAgent } from '../partials/hub-agent.js'
import { itemFiles } from '../partials/item-source-files.js'
import { reactFiles } from '../partials/react-files.js'

function crudDesk (shipName, deskName) {
  const files = [
    ...cruft(shipName, deskName),
    ...hubAgent(shipName, deskName),
    ...itemFiles(shipName, deskName),
    ...reactFiles(shipName, deskName),
    {
        path: `apps/${deskName}/ui/src`,
        name: `app.jsx`,
        content: `
import React, { useEffect, useState } from 'react'
import Urbit from '@urbit/http-api'

const api = new Urbit('', '', window.desk)
api.ship = window.ship

const sendPoke = async (path, payload) => {
    return api.poke({
    app: "hub",
    mark: "item-action",
    json: { [path]: { ...payload } },
    onError: err => {
        alert(\\\`Error: \\\${path} failed. You may need to refresh the page and try again\\\`)
    }
    })
}

const scryFor = async (path) => {
    return api.scry({ app: 'hub', path })
}


export function App() {
    const [items, setItems] = useState([])
    const [name, setName] = useState("")

    useEffect(() => {
    async function init() {
        let items = await scryFor('/items')
        setItems(items)
    }
    init()
    }, [])

    return (
    <main className="flex items-center justify-center min-h-screen">
        <div className="max-w-md space-y-6 py-20">
        <div className="bg-white rounded shadow">
            <div className="p-4">
            <h1 className="text-3xl font-bold">Welcome to hub</h1>
            <p>Here are ~zod's items:</p>
            </div>
            {items && (
            <ul className="border-b border-gray-300 space-y-4 pb-2">
                {items.map(({id, item}) => (
                <li key={id} className="flex items-center space-x-3 text-sm leading-tight">
                    <div className="flex-1 text-black border-t border-gray-300">
                    <p className="text-2xl p-4">
                        <span className="">{item.name || 'untitled'}</span>
                        &nbsp;
                    </p>
                    </div>
                </li>
                ))}
            </ul>
            )}
        </div>
        </div>
    </main>
    )
}        
`
    }
  ]
  return { files }
}

export default crudDesk
