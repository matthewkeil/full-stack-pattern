// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Full Stack Pattern',
  tagline: 'A useful set of constructs',
  url: 'https://full-stack-pattern.mathewkeil.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.png',
  organizationName: 'matthewkeil',
  projectName: 'full-stack-pattern',
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../index.ts'],
        tsconfig: '../tsconfig.build.json'
      }
    ]
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://full-stack-patter.matthewkeil.com'
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/blog/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'full-stack-pattern',
        logo: {
          alt: 'Full Stack Pattern Logo',
          src: 'img/cdk-logo-small.png'
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs'
          },
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/matthewkeil/full-stack-pattern',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro'
              }
            ]
          },
          {
            title: 'Maintainer\'s Contact Info',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/matthew-keil/'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/matthewkeil'
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/MatthewKeil'
              }
            ]
          },
          {
            title: 'Distributions',
            items: [
              {
                label: 'npm',
                to: 'https://www.npmjs.com/package/full-stack-pattern'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/matthewkeil/full-stack-pattern'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
