import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  lang: "en-US",
  title: "Overlays Capture Architecture",
  description: "Official OCA resources",
  base: "/",
  markdown: {
    anchor: {
      level: [2, 3, 4, 5],
    },
    extractHeaders: {
      level: [2, 3, 4, 5],
    },
  },

  plugins: [
    searchPlugin({
      searchMaxSuggestions: 10,
    }),
  ],
  bundler: viteBundler(),
  theme: defaultTheme({
    repoLabel: "Contribute",
    docsRepo: "the-human-colossus-foundation/oca-spec",
    lastUpdated: true,
    logo: "images/oca-logo.png",
    logoDark: "images/oca-logo-white.png",
    editLink: false,
    contributors: false,
    sidebar: "heading",
    sidebarDepth: 5,
    navbar: [
      // NavbarItem
      {
        text: "Guide",
        children: [
          {
            text: "Decentralized Semantics",
            children: [
              {
                text: "Introduction",
                link: "/guide/introduction",
              },
              {
                text: "Applications",
                link: "/guide/applications/",
              },
              {
                text: "FAQ",
                link: "/guide/faq",
              },
            ],
          },
          {
            text: "Practical usage",
            children: [
              {
                text: "Getting Started",
                link: "/guide/usage/getting-started",
              },
            ],
          },
        ],
      },
      {
        text: "Specification",
        children: [
          {
            text: "OCA v1.0.2",
            link: "/specification/README.md",
          },
          {
            text: "OCAFile v1.0.0",
            link: "/specification/ocafile.md",
          },
          {
            text: "Contribute",
            link: "https://github.com/the-human-colossus-foundation/oca-spec",
          },
        ],
      },
      {
        text: "Ecosystem",
        children: [
          {
            text: "OCA Bin",
            link: "/ecosystem/oca-bin",
          },
          {
            text: "OCA File",
            link: "/ecosystem/ocafile",
          },
          {
            text: "OCA Bundle",
            link: "/ecosystem/oca-bundle",
          },
          {
            text: "OCA Repository",
            link: "/ecosystem/oca-repository",
          },
        ],
      },
      {
        text: "Community",
        link: "/community",
      },
    ],
  }),
});
