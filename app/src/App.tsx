import { useAuth } from './hooks/AuthContext'
import Auth from './components/Auth'
import Pages from './components/Pages'
import './App.scss';
// import './scss/list.scss'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
    const { isConnected } = useAuth()
    if (!isConnected) {
        return <Auth />
    }
    return <Pages />
}

export default App
