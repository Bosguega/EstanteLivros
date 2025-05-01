import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { registerSW } from 'virtual:pwa-register'
import PwaNotification from './components/PwaNotification.vue'
import { createApp as createNotificationApp } from 'vue'

// Registra o service worker para funcionalidade offline
const updateSW = registerSW({
  onNeedRefresh() {
    // Cria e monta o componente de notificação para atualização
    const notificationContainer = document.createElement('div')
    document.body.appendChild(notificationContainer)
    
    const notificationApp = createNotificationApp({
      render: () => h(PwaNotification, { 
        type: 'update',
        onUpdate: () => {
          updateSW(true)
        },
        onClose: () => {
          document.body.removeChild(notificationContainer)
        }
      })
    })
    
    notificationApp.mount(notificationContainer)
  },
  onOfflineReady() {
    // Cria e monta o componente de notificação para modo offline
    const notificationContainer = document.createElement('div')
    document.body.appendChild(notificationContainer)
    
    const notificationApp = createNotificationApp({
      render: () => h(PwaNotification, { 
        type: 'offline',
        onClose: () => {
          document.body.removeChild(notificationContainer)
        }
      })
    })
    
    notificationApp.mount(notificationContainer)
  },
})

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
