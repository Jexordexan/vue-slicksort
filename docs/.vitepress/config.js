module.exports = {
  title: 'Vue Slicksort',
  head: [
    ['link', { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' }],
  ],
  themeConfig: {
    logo: '/logo.png',
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'Jexordexan/vue-slicksort',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'GitHub',

    // Optional options for generating "Edit this page" link
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'dev',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!',

    sidebar: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Guide', link: '/guide' },
      { text: 'Component API', link: '/components' },
      { text: 'Migrating', link: '/migrating' },
    ],
  },
};
