function shrubCruft (shipName, deskName) {
    const files = [
      {
        path: `apps/${deskName}/desk`,
        name: "sys.kelvin",
        content: `[%zuse 411]`
      }, {
        path: `apps/${deskName}/desk`,
        name: "desk.docket-0",
        content: `:~
    title+'${deskName}'
    info+'Shrubbery namespace browser.'
    color+0xdd.dddd
    image+'https://storage.googleapis.com/tlon-prod-memex-assets/simsur-ronbet/2024.6.19..16.56.27..5ced.9168.72b0.20c4-sky-icon.png'
    site+/neo/sky
    version+[0 0 1]
    website+'https://github.com/urbit/shrub'
    license+'MIT'
  ==`
      }, {
        path: `apps/${deskName}/desk`,
        name: "desk.bill",
        content: `:~  %neo
  ==`
      }, {
        path: '.',
        name: 'ships.json',
        content: JSON.stringify({
          ships: [
            {
              pier: shipName,
              desks: [ `${deskName}`]
            }
          ]
        }, null, 2)
      }, {
        path: 'ships',
        name: '.keep',
        content: ''
      }, {
        path: '.',
        name: '.gitignore',
        content: `.node_modules
  .DS_Store
  dist
  dist-ssr
  *.local
  stats.html
  .eslintcache
  .vercel
  ships
  ./ships/urbit
  desk-deps        
        `
      },
    ]
    return files
  }
  
  export {
    shrubCruft,
  }
  