ember-behaviors
==============================================================================

Ember Behaviors offer a new way to define the controller in a
model-view-controller (MVC) architecture. 

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-behaviors
```


Usage
------------------------------------------------------------------------------

Ember Behavior is meant to allow other addon creators to add an easy way
for developers to configure the way mouse, touch and keyboard inputs alter
the state passed to their addon components.

Ember has a "data down, actions up" philosophy and the usual way to signal
interactions with a component is by calling "actions" provided by the
developer. In the example bellow, the developer is providing the *onClick*
action to alter whether a light is turned on or not.

```
<SomeToggleSwitch @isOn={{isLightOn}} @onClick={{tryTurningLightOn}} />
```

In most cases, this is perfectly fine. However, for large components that
offer rich interactions with the user, there are reasons to seek a different
approach.

One is that a component might want to offer a predefined way to alter the
state, when it is obvious what needs to be done. For example, a list component
that allows the order of the items to be changed might want to avoid exposing
the drag-drop logic to developers, so that they don't have to pass actions like
*onDragStart*, *onDragMove*, *onDragDrop*, etc. In those cases, the
component might modify the state itself, or it
might expose an action like *onReorder*.

```
<ReorderableList @items={{mut groceries}} />

<ReorderableList @items={{groceries}} @onReorder={{onReorderGroceries}} />

```

In the first approach, it violates Ember philosophy and it both cases, it
forces the addon creator to bundle the drag-drop code inside the component,
even though it might be nice to offer the reordeing capabilities as a
separate addon to the component.

```
<ConfigurableList @items={{groceries}} @behaviors={{array (clDragDropReordering)}} />
```

When you have this in place, it becomes possible to provide developers with a set of
different behaviors and capabilities from which they can choose.

```
<ConfigurableList
    @items = {{groceries}}
    @behaviors = {{array
        (clDragDropReordering))
	(clDefaultContextMenu allowDelete=true)
	(clDefaultKeyboardActions allowDelete=true)
    }}
/>
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
