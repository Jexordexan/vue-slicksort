# [2.0.0-alpha.2](https://github.com/Jexordexan/vue-slicksort/compare/v1.2.0...v2.0.0-alpha.2) (2021-02-16)


### Bug Fixes

* Account for margin in drag and drop ([0c571bb](https://github.com/Jexordexan/vue-slicksort/commit/0c571bbce89e559c956b8809e41bd99aa22a251e))
* Account for scroll change when transitioning helper ([9a4c0c7](https://github.com/Jexordexan/vue-slicksort/commit/9a4c0c7eb9bf6b50ff55b720324a4dff967b6591))
* change setup() to data() ([6a5617d](https://github.com/Jexordexan/vue-slicksort/commit/6a5617de2b60513bac46f5dd7efd5dc0d407d898))
* components rendering with imported h ([daf9d09](https://github.com/Jexordexan/vue-slicksort/commit/daf9d0993517034e40cc1a3ea2d950bdc732c54e))
* drag-n-drop for vue 3 ([9f603d3](https://github.com/Jexordexan/vue-slicksort/commit/9f603d346b9e725ccf64d91970b5fa083ce625ce))
* Dragging between containers ([849aa8c](https://github.com/Jexordexan/vue-slicksort/commit/849aa8cd3cc48f4baf77e6cd94060f8ebf764986))
* nodes is undefined ([7e2409d](https://github.com/Jexordexan/vue-slicksort/commit/7e2409d7f167a220dbfc6533009267e79bdd24db))
* references to this.getOffset no longer valid ([94816c0](https://github.com/Jexordexan/vue-slicksort/commit/94816c0ca0df0a9d2547b02a369fc5f1a84b6a32))
* scroll compensation and node offset ([69fa066](https://github.com/Jexordexan/vue-slicksort/commit/69fa0666ab5c7b82135fe7cda189913d5d62d526))
* scrolling on mobile broken because of passive events ([37630b2](https://github.com/Jexordexan/vue-slicksort/commit/37630b2adec11dcaba40515ecf8519db8a68b8b9))


### Features

* add drag handle to plugin ([2b088a1](https://github.com/Jexordexan/vue-slicksort/commit/2b088a11272851fd81cd636fc22ed9179c86ac65))
* add support for allow and block props ([e032282](https://github.com/Jexordexan/vue-slicksort/commit/e0322824a721e0a7b37785142986e7545480d074))
* Allow :accept="true" as a prop ([d794cd7](https://github.com/Jexordexan/vue-slicksort/commit/d794cd7cbdf54af20e0e8320a096d2dbdcb70136))
* change modelValue to list prop ([d2c2488](https://github.com/Jexordexan/vue-slicksort/commit/d2c24886288b594e9447003baae08cda58569021))
* working drag between groups ([aa11244](https://github.com/Jexordexan/vue-slicksort/commit/aa1124454ceaba818d6b15ebf3cbd3777ed85a1b))



# [2.0.0-alpha.1](https://github.com/Jexordexan/vue-slicksort/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2021-01-22)


### Bug Fixes

* Handle Directive hook ([86d07d3](https://github.com/Jexordexan/vue-slicksort/commit/86d07d3107325e6afa59badc15c5876d372daeaa))



# [2.0.0-alpha.0](https://github.com/Jexordexan/vue-slicksort/compare/v1.1.3...v2.0.0-alpha.0) (2020-12-01)


### Features

* Upgrade to Vue 3 ([e837d39](https://github.com/Jexordexan/vue-slicksort/commit/e837d3958e56b0571d48b7e2ddcd9c881e81e23b))


### BREAKING CHANGES

* No longer works in Vue 2



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
