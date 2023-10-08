import DefaultTheme from 'vitepress/theme'
import Sand from './components/Sand.vue'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component('Sand', Sand)
  }
}