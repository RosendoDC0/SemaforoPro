import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          dark: true,
          colors: {
            background: '#0a0a0f',
            surface: '#12121a',
            'surface-variant': '#1e1e2e',
            primary: '#7c6af7',
            'traffic-red': '#ff3b3b',
            'traffic-yellow': '#ffcc00',
            'traffic-green': '#39d353',
          },
        },
      },
    },
  })

  app.vueApp.use(vuetify)
})
