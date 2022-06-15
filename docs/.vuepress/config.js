const { defaultTheme } = require('@vuepress/theme-default')

module.exports = {
  lang: 'en-US',
  title: 'Overlays Capture Architecture',
  description: 'Official OCA resources',
  base: '/',

  theme: defaultTheme({
    repo: 'the-human-colossus-foundation/oca-spec',
    repoLabel: 'Source',
    docsRepo: 'the-human-colossus-foundation/oca-spec',
    lastUpdated: true,
    logo: 'images/oca-logo.png',
    logoDark: 'images/oca-logo-white.png',
    editLink: false,
    navbar: [
      // NavbarItem
      {
        text: 'Guide',
        children: [
          {
            text: 'Introduction',
            link: '/guide/'
          },
          {
            text: 'Get Started',
            link: '/guide/getting-started'
          },
        ]
      },
      {
        text: 'Tools',
        children: [
          {
            text: "OCA Repository",
            link: '/tools/oca-repository.md'
          },
        ],
      },
      {
        text: 'Learn more',
        children: [
          {
            text: "Use cases",
            link: '/use-cases.md',
          },
          {
            text: "FAQ",
            link: '/faq.md'
          },
        ]
      },
      {
        text: 'Specification',
        children: [
          {
            text: 'v1.1.0-rc',
            link: '/v1.1.0-rc'
          },
          {
            text: 'v1.0.0-rc',
            link: '/v1.0.0',
          }
        ]
      },
    ],
  }),
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ]
}
