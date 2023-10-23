function reactFiles (shipName, deskName) {
  const files = [
    {
      path: `apps/${deskName}/ui`,
      name: `vite.config.js`,
      content: `
import { loadEnv, defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react';
import { urbitPlugin } from '@urbit/vite-plugin-urbit';

// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL = process.env.SHIP_URL || process.env.VITE_SHIP_URL || 'http://localhost:80';
  console.log(SHIP_URL);

  return defineConfig({
    plugins: [urbitPlugin({ base: '${deskName}', target: SHIP_URL, secure: false }), reactRefresh()]
  });
};
`
    }, {
      path: `apps/${deskName}/ui`,
      name: `tailwind.config.js`,
      content: `
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  screens: {},
  variants: {
    extend: {}
  },
  plugins: []
};
`
    }, {
      path: `apps/${deskName}/ui`,
      name: `postcss.config.js`,
      content: `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
`
    }, {
      path: `apps/${deskName}/ui`,
      name: `package.json`,
      content: `
{
  "name": "${deskName}",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "@urbit/http-api": "^2.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@urbit/vite-plugin-urbit": "^1.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.23",
    "tailwindcss": "^3.3.2",
    "vite": "^4.3.9"
  }
}
`
    }, {
      path: `apps/${deskName}/ui`,
      name: `index.html`,
      content: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${deskName}}</title>
    <meta name="theme-color" content="#ffffff" />
    <link rel="icon" href="/src/assets/favicon.svg" sizes="any" type="image/svg+xml" />
    <link rel="mask-icon" href="/src/assets/safari-pinned-tab.svg" color="#000000" />
    <link rel="apple-touch-icon" sizes="180x180" href="/src/assets/apple-touch-icon.png" />
    <link rel="manifest" href="/src/assets/manifest.json" />
  </head>
  <body class="font-sans text-gray-900 bg-gray-50 antialiased">
    <div id="app"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`
    }, {
      path: `apps/${deskName}/ui`,
      name: `.gitignore`,
      content: `node_modules
.DS_Store
dist
dist-ssr
*.local
stats.html
.eslintcache
.vercel
`
    }, {
      path: `apps/${deskName}/ui`,
      name: `.env.local`,
      content: `VITE_SHIP_URL=localhost`
    }, {
      path: `apps/${deskName}/ui/src`,
      name: `main.jsx`,
      content: `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './index.css';

const container = document.getElementById('app');
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
    }, {
      path: `apps/${deskName}/ui/src`,
      name: `index.css`,
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;
`
    }, {
      path: `apps/${deskName}/ui/src`,
      name: `app.jsx`,
      content: `
import React, { useEffect, useState } from 'react'
import Urbit from '@urbit/http-api'

const api = new Urbit('', '', window.desk)
api.ship = window.ship

const sendPoke = async (path, payload) => {
  return api.poke({
    app: "${deskName}",
    mark: "item-action",
    json: { [path]: { ...payload } },
    onError: err => {
      alert(\\\`Error: \\\${path} failed. You may need to refresh the page and try again\\\`)
    }
  })
}

const scryFor = async (path) => {
  return api.scry({ app: '${deskName}', path })
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
            <h1 className="text-3xl font-bold">Welcome to ${deskName}</h1>
            <p>Here are your items:</p>
          </div>
          {items && (
            <ul className="border-b border-gray-300 space-y-4 pb-2">
              {items.map(({id, item}) => (
                <li key={id} className="flex items-center space-x-3 text-sm leading-tight">
                  <div className="flex-1 text-black border-t border-gray-300">
                    <p className="text-2xl p-4">
                      <span className="">{item.name || 'untitled'}</span>
                      &nbsp;
                      <button 
                        className="border border-black rounded p-1 text-sm text-red-600 border-red-600 float-right"
                        onClick={async () => {
                        await sendPoke('delete', { id })
                        document.location = ''
                      }}>Delete</button>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white rounded p-4 shadow">
          <p>Why not add a new one?</p>
          <form 
            className="bg-white"
            onSubmit={async (e) => {
                await sendPoke('create', { name })
            }}>
            <label className="text-xs">
              <input 
                className="bg-gray-50 block border border-gray-200 rounded text-lg w-full px-2 py-1"
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <button 
              className="bg-blue-500 rounded p-1 text-lg text-white font-bold w-full mt-2"
              type="submit">Add</button>
          </form>
        </div>
      </div>
    </main>
  )
}
`
    }, {
      path: `apps/${deskName}/ui/src/assets`,
      name: `favicon.svg`,
      content: `
<svg width="513" height="513" viewBox="0 0 513 513" fill="none" xmlns="http://www.w3.org/2000/svg">
<style>
.icon-color { fill: #000000; }
@media (prefers-color-scheme: dark) {
  .icon-color { fill: #ffffff; }
}
</style>
<path d="M247.634 122.758C247.634 147.519 238.15 162.538 219.182 171.468C198.239 181.21 184.804 197.853 178.876 220.584C172.159 245.751 153.981 260.364 129.481 259.552C109.723 259.146 94.7075 249.404 86.014 231.138C79.2963 216.931 70.6028 204.753 56.7723 197.041C50.4497 193.388 43.732 190.952 36.6192 188.923C16.4661 183.24 1.84525 166.597 0.264615 145.896C-1.71118 121.135 7.37747 103.274 27.5305 93.1266C49.6594 82.5728 63.49 65.1184 69.4173 41.1695C75.3447 16.8145 95.8929 2.60752 122.369 4.6371C137.385 5.85484 148.844 13.5672 157.538 25.7447C163.465 34.2689 168.602 43.199 174.529 51.3173C181.642 61.4652 191.126 67.9598 202.586 72.019C208.118 74.0486 214.045 76.0781 219.182 78.9195C238.15 88.6615 247.634 104.492 247.634 122.758Z" class="icon-color" />
<path d="M512.01 355.757C511.615 372.806 503.712 387.824 486.325 396.349C463.406 407.714 449.18 425.981 442.067 450.335C435.745 471.037 419.543 484.026 398.6 485.65C377.657 487.274 359.084 476.72 350.391 457.236C340.512 434.505 323.915 420.704 300.601 414.209C258.714 403.249 254.762 350.48 279.262 328.561C283.609 324.908 288.351 321.254 293.488 318.819C314.036 308.671 327.076 292.029 333.399 270.109C338.931 250.219 350.786 236.824 370.939 232.765C393.858 228.3 415.197 235.2 426.261 259.555C436.535 282.287 453.132 295.682 476.446 302.582C500.551 309.889 512.01 326.937 512.01 355.757Z" class="icon-color" />
<path d="M463.786 51.3199C462.6 58.2204 461.415 65.121 459.439 71.6156C453.117 93.1291 454.697 113.425 466.157 132.909C476.431 150.363 476.036 168.629 465.762 185.678C455.883 202.32 440.472 210.033 421.899 210.033C417.157 210.033 412.415 208.815 408.069 207.191C384.359 199.073 361.44 200.697 339.706 214.498C310.069 233.17 271.739 206.379 268.973 178.371C268.182 169.441 268.182 160.511 271.344 152.393C280.037 130.067 276.481 109.366 266.997 89.07C262.65 80.1398 259.094 70.8038 259.094 60.6559C259.489 27.3709 290.311 3.42188 321.529 11.9461C331.408 14.7875 341.287 18.4407 351.956 18.4407C364.206 18.4407 374.875 14.3816 385.94 9.10469C393.052 5.45146 400.956 2.20414 408.859 0.580478C434.544 -3.88459 461.02 18.0348 462.996 44.8252C462.996 47.2607 463.391 49.2903 463.391 51.7258C463.391 51.3199 463.786 51.3199 463.786 51.3199Z" class="icon-color" />
<path d="M235.757 342.773C234.571 349.268 233.781 356.168 231.805 362.663C225.483 384.176 227.063 404.878 238.523 424.362C257.095 456.429 237.337 498.239 197.822 501.486C192.684 501.892 187.152 500.674 182.015 499.05C157.515 490.526 134.201 491.744 112.072 505.951C82.8304 524.217 44.8952 497.833 41.7339 470.636C40.9436 461.706 40.5485 453.182 43.7097 444.658C52.4032 421.521 48.8468 399.601 38.1775 378.088C33.0405 367.94 30.2743 356.98 31.4598 345.209C33.8308 322.883 53.9839 302.587 76.1127 300.964C84.4111 300.558 92.3142 301.37 99.8222 304.211C120.766 312.329 140.524 309.488 159.886 298.528C174.507 290.004 190.314 286.757 206.12 294.469C224.692 304.617 234.966 320.448 235.757 342.773Z" class="icon-color" />
</svg>
`
    }, {
      path: `apps/${deskName}/ui/src/assets`,
      name: `manifest.json`,
      content: `
{
  "name": "${deskName}",
  "short_name": "${deskName}",
  "icons": [
    {
      "src": "/apps/grid/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}`
    }, {
      path: `apps/${deskName}/ui/src/assets`,
      name: `safari-pinned-tab.svg`,
      content: `
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="700.000000pt" height="700.000000pt" viewBox="0 0 700.000000 700.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.14, written by Peter Selinger 2001-2017
</metadata>
<g transform="translate(0.000000,700.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M5565 6989 c-16 -5 -39 -11 -50 -13 -54 -12 -116 -37 -230 -91 -219
-105 -335 -135 -495 -131 -63 2 -126 7 -140 10 -14 4 -36 9 -50 12 -14 3 -79
21 -145 41 -205 61 -361 54 -525 -23 -239 -113 -392 -356 -392 -625 0 -110 25
-201 107 -389 85 -197 116 -320 121 -480 3 -137 -12 -231 -60 -370 -15 -41
-30 -97 -33 -125 -8 -58 -8 -190 0 -255 27 -220 225 -440 475 -527 67 -24 92
-27 197 -27 109 0 127 3 189 28 37 16 100 47 140 70 174 103 316 141 521 140
146 0 208 -10 362 -58 171 -54 291 -54 449 -1 294 99 498 442 448 755 -4 25
-9 50 -10 55 -2 6 -7 24 -10 40 -4 17 -36 86 -71 153 -60 117 -113 253 -128
332 -4 19 -8 91 -10 160 -4 126 8 227 40 336 24 82 65 283 60 297 -2 6 -6 43
-10 81 -8 97 -22 150 -62 231 -44 90 -71 126 -148 200 -123 117 -255 175 -415
180 -52 2 -108 -1 -125 -6z"/>
<path d="M1445 6923 c-38 -8 -106 -31 -150 -52 -187 -90 -284 -214 -354 -455
-59 -201 -123 -321 -243 -451 -81 -88 -154 -143 -295 -222 -64 -35 -135 -79
-157 -96 -100 -76 -187 -210 -223 -347 -21 -80 -24 -308 -4 -390 22 -91 84
-209 146 -277 102 -112 188 -163 385 -228 307 -100 451 -229 620 -550 61 -115
94 -161 164 -228 52 -50 156 -117 181 -117 8 0 16 -4 19 -9 16 -26 274 -53
356 -37 14 3 37 7 53 10 71 12 165 55 237 109 122 90 201 216 265 420 51 165
96 258 172 359 86 114 212 216 358 290 147 75 226 139 292 238 36 53 80 162
89 216 3 22 8 42 10 46 3 4 7 53 9 109 10 221 -44 374 -180 512 -67 68 -167
136 -253 173 -31 14 -66 29 -77 33 -11 5 -47 19 -80 31 -164 59 -294 148 -377
257 -25 32 -97 137 -160 233 -131 199 -185 263 -272 324 -147 103 -335 138
-531 99z"/>
<path d="M5070 3824 c-177 -38 -296 -111 -399 -245 -36 -46 -88 -160 -122
-264 -103 -321 -254 -508 -534 -660 -184 -100 -292 -208 -352 -350 -113 -268
-56 -593 138 -785 81 -80 154 -122 300 -171 152 -51 233 -88 322 -147 139 -93
274 -254 346 -415 83 -185 208 -309 376 -372 84 -32 139 -40 260 -39 145 1
248 34 370 117 121 82 205 205 266 388 113 340 278 537 601 714 145 80 234
172 290 300 86 195 64 503 -49 694 -50 85 -141 172 -224 216 -37 19 -120 53
-184 76 -197 67 -303 129 -425 246 -92 87 -158 179 -230 323 -102 202 -207
301 -380 360 -82 28 -272 36 -370 14z"/>
<path d="M2395 3017 c-76 -22 -110 -37 -270 -119 -72 -38 -195 -82 -252 -93
-127 -22 -184 -24 -293 -10 -86 11 -114 17 -179 40 -132 47 -193 58 -317 57
-103 0 -176 -18 -268 -64 -142 -72 -258 -190 -325 -331 -95 -200 -84 -408 34
-666 95 -209 136 -366 136 -528 1 -142 -12 -213 -67 -380 -22 -66 -27 -97 -27
-198 -1 -66 2 -142 6 -169 29 -183 195 -384 394 -476 186 -87 369 -86 533 2
41 23 102 55 135 73 73 39 196 80 290 95 69 12 250 15 283 6 9 -3 38 -7 64
-11 26 -3 87 -17 135 -31 48 -14 113 -32 143 -41 211 -56 483 46 643 242 48
58 120 194 131 245 3 14 8 36 12 50 13 50 13 225 0 285 -19 81 -35 123 -94
240 -96 188 -122 287 -127 468 -2 115 7 188 40 317 52 202 68 337 50 423 -3
15 -7 39 -10 54 -8 38 -40 125 -58 159 -8 16 -24 45 -33 64 -28 53 -150 172
-229 222 -106 68 -172 89 -295 94 -88 3 -118 0 -185 -19z"/>
</g>
</svg>
`
    },
  ]
  return files
}

module.exports = {
  reactFiles,
}
