// Генерация и хранение стабильного sessionId на клиенте
const getSessionId = (): string => {
  if (typeof window === 'undefined') return 'unknown-session'
  try {
    const storageKey = 'chat_session_id'
    let id = window.localStorage.getItem(storageKey)
    if (!id) {
      const generated =
        globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
      window.localStorage.setItem(storageKey, generated)
      id = generated
    }
    return id
  } catch {
    return (
      globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
    )
  }
}

export { getSessionId }
