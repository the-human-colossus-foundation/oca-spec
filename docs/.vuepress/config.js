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
            link: '/guide/introduction'
          },
          {
            text: "OCA Ecosystem Tour",
            link: '/guide/oca-ecosystem-tour',
          },
          {
            text: 'Get Started',
            link: '/guide/getting-started'
          },
          {
            text: "Use cases",
            link: '/guide/use-cases',
          },
          {
            text: "OCA vs. Others comparison",
            link: '/guide/oca-vs-others-comparison',
          },
          {
            text: "FAQ",
            link: '/guide/faq'
          },
        ]
      },
      {
        text: 'Ecosystem',
        children: [
          {
            text: "OCA Parser",
            link: '/ecosystem/oca-parser'
          },
          {
            text: "OCA Browser",
            link: '/ecosystem/oca-browser'
          },
          {
            text: "OCA Repository",
            link: '/ecosystem/oca-repository'
          },
          {
            text: "OCA Data Vault",
            link: '/ecosystem/oca-data-vault'
          },
          {
            text: "OCA Transformer",
            link: '/ecosystem/oca-transformer'
          },
          {
            text: "OCA Presenter",
            link: '/ecosystem/oca-presenter'
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
    // sidebar: {
    //   '/guide/': [
    //     {
    //       'text': 'Guide',
    //       children: [
    //         '/guide/README.md',
    //         '/guide/getting-started.md',
    //         '/guide/oca-ecosystem-tour.md',
    //         '/guide/oca-vs-others-comparison.md',
    //         '/guide/references.md'
    //       ]
    //     }
    //   ]
    // }
  }),
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ]
}
