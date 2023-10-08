const guideMenu = [{
  text: 'Quick Start',
  collapsed: false,
  items: [
    { text: "Getting Started", link: "/guide/get-started" },
    { text: "Client Side", link: "/guide/client-side" },
    { text: "Room Hooks", link: "/guide/hook" },
    { text: "Schema", link: "/guide/schema" },
  ]
}]

export default {
  //extends: baseConfig,
  title: 'Simple Room',
  ignoreDeadLinks: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    repo: 'https://github.com/RSamaium/RPG-JS',

    sidebar: {
      '/guide/': guideMenu,
    },
  }
}