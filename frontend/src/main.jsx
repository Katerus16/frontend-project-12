import { StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom/client'
import Init from './Init.jsx'

const app = async () => {
  const vdom = await Init()
  const root = ReactDOM.createRoot(document.getElementById('chat'))
  root.render(
    <StrictMode>
      {vdom}
    </StrictMode>,
  )
}

app()
