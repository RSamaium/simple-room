const guideMenu = [{
  text: 'Quick Start',
  collapsed: false,
  items: [
    { text: "Getting Started", link: "/guide/get-started" },
    { text: "Client Side", link: "/guide/client-side" }
  ],

}, {
  text: 'Room',
  collapsed: false,
  items: [
    { text: "Room Hooks", link: "/guide/hook" },
    { text: "Room Methods", link: "/guide/room-method" },
  ]
}, {
  text: 'Schema',
  collapsed: false,
  items: [
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