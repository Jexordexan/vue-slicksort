# Getting started

## Installing

Install the package to your project

```
npm install vue-slicksort@next
```

```
yarn add vue-slicksort@next
```

## Using the plugin

If you want the ability to drag items between lists, you must install the plugin to your Vue app.

```js
// main.js

import { plugin as Slicksort } from 'vue-slicksort';

const app = createApp(/* App */);

// Enables groups and drag and drop functionality
app.use(Slicksort);
```
