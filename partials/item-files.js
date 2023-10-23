function itemFiles (shipName, deskName) {
  const files = [
    {
      path: `apps/${deskName}/desk/mar/item`,
      name: `action.hoon`,
      content: `
/-  item
/+  *item
|_  =action:item
++  grab
  |%
  ++  noun  action:item
  ++  json  decode-item-action
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
      path: `apps/${deskName}/desk/lib`,
      name: `item.hoon`,
      content: `
/-  *item
|%
++  decode-item-action
  =,  dejs:format
  |=  jon=json
  ^-  action
  %.  jon
  %-  of
  :~  [%create (ot ~[name+so])]
      [%delete (ot ~[id+ni])]
      [%update (ot ~[id+ni name+so])]
  ==
++  enc-items
  |=  =items
  ^-  json
  a+(turn ~(tap by items) enc-item-tuple)
++  enc-item-tuple
  =,  enjs:format
  |=  t=[=id =item]
  ^=  json
  %-  pairs
  :~  ['id' (numb id.t)]
      ['item' (enc-item item.t)]
  ==
++  enc-item
  =,  enjs:format
  |=  i=item
  %-  pairs
  :~  
      ['name' (tape (trip name.i))]
  ==
--
`
    }, {
      path: `apps/${deskName}/desk/mar`,
      name: `items.hoon`,
      content: `
/-  *item
/+  *item
|_  =items
++  grab
  |%
  ++  noun  items
  --
++  grow
  |%
  ++  noun  items
  ++  json  (enc-items items)
  --
++  grad  %noun
--
`
    },
  ]
  return files
}

module.exports = {
  itemFiles,
}
