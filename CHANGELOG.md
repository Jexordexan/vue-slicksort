## Changelog

## 1.2.0

feat: `tag` props on SlickList and SlickItem components
fix: Dragging broken on Android when distance property is set
fix: node helper not clean
fix: add event listeners in passive mode
fix: stopPropogation on click events
fix: .d.ts types
docs: Chinese documentation
chore: lots of dependencies

## 1.1.0

ADDED appendTo prop - appends the helper to the selected DOM node.

## 1.0.0

ADDED Typescript support
ADDED Settling animation, the drag helper will now settle back into its new location after releasing the drag.
BREAKING: sortStart, sortMove, and sortEnd events are now kebab-case (sort-start, sort-move, sort-end) as per standard practice.
Any previous event listeners will need to be updated

### 0.1.5

Fixed a bug in firefox where the text got selected upon dragging

### 0.1.1

Fixed bug where the node index wasn't being updated on the manager

### 0.1.0

Initial push: Convert library from react to vue.
