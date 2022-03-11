module.exports = {
  lang: 'en-US',
  title: 'Overlays Capture Architecture',
  description: 'Official OCA resources',

  themeConfig: {
    repo: 'the-human-colossus-foundation/oca-spec',
    repoLabel: 'Source',
    docsRepo: 'the-human-colossus-foundation/oca-spec',
    lastUpdated: true,
    logo: 'images/oca-logo.png',
    logoDark: 'images/oca-logo-white.png',
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
        ]
      },
      {
        text: 'Specification',
        children: [
          {
            text: 'v1.1.0rc',
            link: '/v1.1.0-rc'
          },
          {
            text: 'v1.0.0',
            link: '/v1.0.0',
          }
        ]
      },
    ],
  },
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ]
}
