function sailDesk (shipName, deskName) {
  const files = [
    {
      path: `apps/${deskName}/desk`,
      name: "sys.kelvin",
      content: `[%zuse 412]`
    }, {
      path: `apps/${deskName}/desk`,
      name: "desk.docket-0",
      content: `:~
  title+'${deskName}'
  info+'A cool app that does amazing things'
  color+0xd9.b06d
  version+[0 1 0]
  website+'https://urbit.org'
  license+'MIT'
  base+'${deskName}'
  glob-ames+[~${shipName} 0v0]
==`
    }, {
      path: `apps/${deskName}/desk`,
      name: "desk.bill",
      content: `:~  %${deskName}
==`
    }, {
      path: `apps/${deskName}/desk/app/pages`,
      name: `index.hoon`,
      content: `
::  home page component (index)
::
|=  [=bowl:gall]
|^  ^-  octs
%-  as-octs:mimes:html
%-  crip
%-  en-xml:html
^-  manx
:: Sail Page
::
;html
  ;head
    ;script(src "https://unpkg.com/@urbit/http-api");
    ;script(src "/session.js");
    ;meta(charset "utf-8");
    ;meta
      =name  "viewport"
      =content  "width=device-width, initial-scale=1";
  ==
  ;body
    ;div
      ;+  home-page
    ==
  ==
==
++  home-page
  ^-  manx
  |^
  ;div
    ;+  content
  ==
  ++  content
    ^-  manx
    ;div
      ;h1: Hello Urbit
      ;p: Welcome to my new site
    ==
  --
--
`
    }, {
      path: `apps/${deskName}/desk/app`,
      name: `${deskName}.hoon`,
      content:
`
/-  item
/+  default-agent, dbug, agentio
/=  home-page  /app/pages/index
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 =items:item]
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
    io    ~(. agentio bowl)
::
++  on-init
  ^-  (quip card _this)
  :_
  this(items ~)
  :*
    (~(arvo pass:io /bind) %e %connect \\\`/'${deskName}' %${deskName})
    ~
  ==
::
++  on-save
  ^-  vase
  !>(state)
::
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  \\\`this(state old)
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
  =^  cards  state
    ?+  mark  (on-poke:def mark vase)
      %handle-http-request
        (handle-http !<([@ta inbound-request:eyre] vase))
      %item-action
        ?>  =(src.bowl our.bowl)
        (handle-poke !<(action:item vase))
    ==
  [cards this]
  ++  handle-poke
    |=  =action:item
    ^-  (quip card _state)
    ?-    -.action
        %create
      ?:  (~(has by items) now.bowl)
        \\\$(now.bowl (add now.bowl ~s0..0001))
      :_  state(items (~(put by items) now.bowl [name.action]))
      :~  :*  %give  %fact  ~[/updates]  %item-update
              !>(\\\`update:item\\\`[%create now.bowl name.action])
          ==
      ==
    ::
        %delete
      :_  state(items (~(del by items) id.action))
      :~  :*  %give  %fact  ~[/updates]  %item-update
              !>(\\\`update:item\\\`action)
          ==
      ==
    ::
        %update
      :-  :~  :*  %give  %fact  ~[/updates]  %item-update
              !>(\\\`update:item\\\`action)
          ==  ==
      %=  state
        items  %+  ~(jab by items)
                 id.action
               |=(i=item:item i(name name.action))
      ==
    ==
++  handle-http
    |=  [rid=@ta req=inbound-request:eyre]
    ^-  (quip card _state)
    ?+  method.request.req
      ::  Error by default on other Request types
      ::
      :_  state
      (make-405 rid)
      :: Run Router on GET requests 
      ::
        %'GET'
      =/  path  url.request.req
      :_  state
      (router rid path)
    ::
    ==
  ++  router
    |=  [rid=@ta path=cord]
    =/  p  (parse-next-path path)
    ::  404 if it doesn't go to a store
    ::
    ?.  =('${deskName}' front.p)
      (make-404 rid)
    =/  p  (parse-next-path back.p)
    ?.  =('home' front.p)
      (make-404 rid)
    (make-200 rid (home-page bowl))
  ++  parse-next-path
    |=  path=cord
    ::  convert to tape and remove opening '/'
    =/  path  (tail (trim 1 (trip path)))
    =/  trio
    %+  roll  path      
    :: for the rest of the tape
    :: accumulate each letter by slamming a gate
    :: stop once you get to the next '/'
    |=  [char=@t acc=[front=tape back=tape incomplete=?]]
      ?:  =(incomplete.acc %.n)
        [front.acc (weld back.acc (trip char)) %.n]
      ?.  =(char '/')
        [(weld front.acc (trip char)) back.acc %.y]
      [front.acc (weld back.acc (trip char)) %.n]
    [front=(crip front.trio) back=(crip back.trio)]
  ++  make-200
    |=  [rid=@ta dat=octs]
    ^-  (list card)
    %^    give-http
        rid
      :-  200
      :~  ['Content-Type' 'text/html']
          ['Content-Length' (crip ((d-co:co 1) p.dat))]
      ==
    [~ dat]
  ++  make-404
    |=  rid=@ta
    =/  dat   (as-octs:mimes:html '<h1>404 Not Found</h1>')
    ^-  (list card)
    %^    give-http
        rid
      :-  404
      :~  ['Content-Type' 'text/html']
          ['Content-Length' (crip ((d-co:co 1) p.dat))]
      ==
    [~ dat]
  ++  make-405
    |=  rid=@ta
    =/  dat   (as-octs:mimes:html '<h1>405 Method Not Allowed</h1>')
    ^-  (list card)
    %^    give-http
        rid
      :-  405
      :~  ['Content-Type' 'text/html']
          ['Content-Length' (crip ((d-co:co 1) p.dat))]
      ==
    [~ dat]
  ++  give-http
    |=  [rid=@ta hed=response-header:http dat=(unit octs)]
    ^-  (list card)
    :~  [%give %fact ~[/http-response/[rid]] %http-response-header !>(hed)]
        [%give %fact ~[/http-response/[rid]] %http-response-data !>(dat)]
        [%give %kick ~[/http-response/[rid]] ~]
    ==
  --
::
++  on-watch
  :: TODO: move to lib
  |=  =path
  ^-  (quip card _this)
  ?+    path
    ~&  (slog leaf+"Path: {(spud path)}." ~)
    (on-watch:def path)
  ::
      [%http-response *]
    %-  (slog leaf+"Eyre subscribed to {(spud path)}." ~)
    \\\`this
  ==
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def
++  on-arvo
  :: TODO: move to lib
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  ?.  ?=([%bind ~] wire)
    (on-arvo:def [wire sign-arvo])
  ?>  ?=([%eyre %bound *] sign-arvo)
  ::  does not print correctly without this for some reason
  =/  path  (trip (crip path.binding.sign-arvo))
  ?:  accepted.sign-arvo
    %-  (slog leaf+"/{path} bound successfully!" ~)
    \\\`this
  %-  (slog leaf+"Binding /{path} failed!" ~)
  \\\`this
++  on-fail   on-fail:def
--
`
    }, {
      path: `apps/${deskName}/desk/mar/item`,
      name: `action.hoon`,
      content: `
/-  item
|_  =action:item
++  grab
  |%
  ++  noun  action:item
  --
++  grow
  |%
  ++  noun  action
  --
++  grad  %noun
--`
    }, {
      path: `apps/${deskName}/desk/mar/item`,
      name: `update.hoon`,
      content: `
/-  item
|_  =update:item
++  grab
  |%
  ++  noun  update:item
  --
++  grow
  |%
  ++  noun  update
  --
++  grad  %noun
--`
    }, {
      path: `apps/${deskName}/desk/sur`,
      name: `item.hoon`,
      content: `
|%
+$  id  @
+$  name  @t
+$  item  [=name]
+$  items  (map id item)
+$  action
  $%  [%create =name]
      [%delete =id]
      [%update =id =name]
  ==
+$  update
  $%  [%create =id =name]
      [%delete =id]
      [%update =id =name]
      [%initial =items]
  ==
--
`
    }, {
      path: 'ships',
      name: 'ships.json',
      content: JSON.stringify({
        ships: [
          {
            pier: shipName,
            desks: [ `${deskName}`]
          }
        ]
      }, null, 2)
    },
  ]
  return { files }
}

module.exports = {
  sailDesk,
}
