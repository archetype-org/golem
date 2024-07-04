
function shrubFiles (shipName, deskName) {
  const neoPath = `apps/${deskName}/desk/neo/cod/std/src`
  const files = [
      {
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
        path: `${neoPath}/imp`,
        name: "counter.hoon",
        content: `/@  number
/@  counter-diff
^-  kook:neo
|%
++  state
  ^-  curb:neo
  [%pro %number]
++  poke
  ^-  (set stud:neo)
  (sy %counter-diff ~)
++  kids
  ^-  kids:neo
  *kids:neo
++  deps
  ^-  deps:neo
  *deps:neo
++  form
  ^-  form:neo
  |_  [=bowl:neo =aeon:neo =stud:neo state-vase=vase]
    +*  state  !<(number state-vase)
    ++  init
      |=  old=(unit pail:neo)
      ^-  (quip card:neo pail:neo)
      [~ (need old)]
    ++  poke
      |=  [=stud:neo vaz=vase]
      ^-  (quip card:neo pail:neo)
      ?>  =(%counter-diff stud)
      =/  act
        !<(counter-diff vaz)
      ?>  =(-.act %inc)
      [~ [%number !>(+(state))]]
  --
--`
      }, {
        path: `${neoPath}/pro`,
        name: "counter-diff.hoon",
        content: `,[%inc ~]`
      }, {
        path: `${neoPath}/pro`,
        name: "number.hoon",
        content: `,@ud`
      }, {
        path: `${neoPath}/con`,
        name: "number-htmx.hoon",
        content: `/@  number  ::  @ud
/-  feather-icons
:-  [%number %$ %htmx]
|=  =number
|=  =bowl:neo
^-  manx
;div.p3.fc.g2.ac.br2
  ;h1:  Counter
  ;p:  {<number>}
  ;form
    =hx-post  "/neo/hawk{(en-tape:pith:neo here.bowl)}?stud=counter-diff"
    =hx-target  "find .loading"
    =hx-swap  "outerHTML"
    =head  "inc"
    ;button.bd1.br1.p2.b1.hover.loader
      ;span.loaded:  Increment
      ;span.loading
        ;+  loading.feather-icons
      ==
    ==
  ==
==
`
      }, {
        path: `${neoPath}/con`,
        name: "node-counter-diff.hoon",
        content: `/@  node          ::  manx
/@  counter-diff  ::  [%inc ~]
/-  manx-utils
:-  [%node %$ %counter-diff]
|=  =node
^-  counter-diff
=/  mu  ~(. manx-utils node)
=/  head  (?(%inc) (got:mu %head))
[head ~]
`
      }
    ]
    return files
  }
  
  export {
    shrubFiles,
  }
  