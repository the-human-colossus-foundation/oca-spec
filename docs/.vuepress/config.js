const { defaultTheme } = require('@vuepress/theme-default')

module.exports = {
  lang: 'en-US',
  title: 'Overlays Capture Architecture',
  description: 'Official OCA resources',
  base: '/',
  markdown: {
    anchor: {
      level: [2, 3, 4, 5]
    },
    extractHeaders: {
      level: [2, 3, 4, 5]
    }
  },

  theme: defaultTheme({
    repoLabel: 'Contribute',
    docsRepo: 'the-human-colossus-foundation/oca-spec',
    lastUpdated: true,
    logo: 'images/oca-logo.png',
    logoDark: 'images/oca-logo-white.png',
    editLink: false,
    contributors: false,
    sidebar: 'auto',
    sidebarDepth: 4,
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
            text: "Applications",
            link: '/guide/applications',
          },
          {
            text: "FAQ",
            link: '/guide/faq'
          },
        ]
      },
      {
        text: 'Specification',
        children: [
          {
            text: 'v1.0.0',
            link: '/specification',
          },
          {
            text: 'Contribute',
            link: 'https://github.com/the-human-colossus-foundation/oca-spec',
          }
        ]
      },
      {
        text: 'Ecosystem',
        children: [
          {
            text: "Ecosystem Tour",
            link: '/ecosystem/tour',
          },
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
          {
            text: 'Get Started',
            link: '/ecosystem/getting-started'
          },
        ],
      },
      {
        text: 'Community',
        link: '/community'
      },
      {
        text: 'Download as PDF',
        link: 'https://humancolossus.foundation/s/HCF-Overlays-Capture-Architecture-OCA-v1.pdf'
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
