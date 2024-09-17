import { render } from 'solid-js/web'
import App from './App.jsx'
import './shims/solid.ts'
import './styles/index.css'

const root = document.getElementById('root') as HTMLElement

render(() => <App />, root)
