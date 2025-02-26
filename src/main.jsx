import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google"
import React from 'react'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="624920069354-4lsp4pj7e8g98lpd7pot44080tob5qcn.apps.googleusercontent.com">
  <React.StrictMode>
      <App />
  </React.StrictMode>
</GoogleOAuthProvider>,
)
