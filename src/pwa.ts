import { registerSW } from 'virtual:pwa-register'

// BroadcastChannel to sync updates across tabs
const broadcastChannel = new BroadcastChannel('sw-update')

broadcastChannel.onmessage = (message: MessageEvent) => {
  if (message.data === 'sw-update') {
    window.location.reload()
  }
}

// Register service worker with auto-refresh
export const updateServiceWorker = registerSW({
  immediate: true,
  onNeedRefresh() {
    updateServiceWorker(true)
    broadcastChannel.postMessage('sw-update')
  },
})

// Export a no-op default to make import side-effect clear
export default undefined
