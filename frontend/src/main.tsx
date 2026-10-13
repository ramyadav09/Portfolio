import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root was not found in index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    {/*
      reducedMotion="user" makes Motion honour the operating-system
      "reduce motion" preference for transform and layout animations.
      Components that fade content in additionally check useReducedMotion()
      so nothing stays hidden when animation is disabled.
    */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
