import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google"
import React from 'react'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="374087748393-o1l18fgacsce0npcaekqhjbkfivlm53r.apps.googleusercontent.com">
  <React.StrictMode>
      <App />
  </React.StrictMode>
</GoogleOAuthProvider>,
)
