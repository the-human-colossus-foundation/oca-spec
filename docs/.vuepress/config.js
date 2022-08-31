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
          {
            text: "Use cases",
            link: '/guide/use-cases.md',
          },
          {
            text: "FAQ",
            link: '/guide/faq.md'
          },
        ]
      },
      {
        text: 'Ecosystem',
        children: [
          {
            text: "OCA Parser",
            link: '/ecosystem/oca-parser.md'
          },
          {
            text: "OCA Browser",
            link: '/ecosystem/oca-browser.md'
          },
          {
            text: "OCA Repository",
            link: '/ecosystem/oca-repository.md'
          },
          {
            text: "OCA Data Vault",
            link: '/ecosystem/oca-data-vault.md'
          },
          {
            text: "OCA Transformer",
            link: '/ecosystem/oca-transformer.md'
          },
          {
            text: "OCA Presenter",
            link: '/ecosystem/oca-presenter.md'
          },
        ],
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
    sidebar: {
      '/guide/': [
        {
          'text': 'Guide',
          children: [
            '/guide/README.md',
            '/guide/getting-started.md',
            '/guide/oca-libraries.md',
            '/guide/oca-ecosystem.md',
            '/guide/oca-tools.md',
            '/guide/references.md'
          ]
        }
      ]
    }
  }),
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ]
}
