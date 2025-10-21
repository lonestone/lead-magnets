import React, { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'
import 'iframe-resizer/js/iframeResizer.contentWindow.js'

// If not in an iframe, redirect parent to lonestone.io
const isInIframe = window.self !== window.top
if (!isInIframe) {
  window.parent.location.href = 'https://www.lonestone.io'
}

export function initApp(component: ReactNode) {
  const container = document.getElementById('root')
  if (!container) throw new Error('Root element not found')

  const root = createRoot(container)
  root.render(<React.StrictMode>{component}</React.StrictMode>)
}
