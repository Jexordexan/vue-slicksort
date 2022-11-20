import { defineConfig } from 'vitepress'

const GOOGLE_APP_ID = 'G-6JF11BVDSJ'

export default defineConfig({
  title: 'Vue Slicksort',
  head: [
    ['link', { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['script', { src: '/confetti.min.js' }],
    ['script', { src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_APP_ID}` }],
    ['meta', { property: 'og:title', content: 'Vue Slicksort' }],
    ['meta', { property: 'og:image', content: '/logo.png' }],
    ['meta', { property: 'og:image:width', content: '375' }],
    ['meta', { property: 'og:image:height', content: '375' }],
    ['meta', { property: 'og:image', content: '/logomark.png' }],
    ['meta', { property: 'og:image:width', content: '1219' }],
    ['meta', { property: 'og:image:height', content: '301' }],
    [
      'meta',
      { property: 'og:description', content: 'Beautiful, touch-friendly sorting for Vue 3' },
    ],
    ['meta', { property: 'og:url', content: 'https://vue-slicksort.netlify.app' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'twitter:image', content: '/logo.png' }],
    ['meta', { property: 'twitter:title', content: 'Vue Slicksort' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [{ icon: 'github', link: 'https://github.com/Jexordexan/vue-slicksort' }],
    nav: [
      { text: 'Guide', link: '/introduction' },
      { text: 'Migration from 1.x', link: '/migrating-1x' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting started', link: '/getting-started' },
          { text: 'Basic use', link: '/basics' },
          { text: 'Drag and drop', link: '/drag-and-drop' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Migrating from 1.x', link: '/migrating-1x' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'SlickList', link: '/components/slicklist' },
          { text: 'SlickItem', link: '/components/slickitem' },
          { text: 'DragHandle', link: '/components/draghandle' },
        ],
      },
      {
        text: 'Demos',
        items: [
          { text: 'Kanban', link: '/kanban' },
          { text: 'Window scroll', link: '/window-scroll' },
        ],
      },
    ],
  },
})
