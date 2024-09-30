import { Route, Routes, useLocation, useNavigate } from 'react-router'
import NotFound from '../utils/NotFound'
import { useAuth } from '../../hooks/AuthContext'
import { generateRoutes } from './utils.functions'
import { IRoute } from './pages.interface'
import { useEffect } from 'react'
import PrivateRouter from './private.router'
import Home from './Home'

export interface ICryptobotRouterProps {
    routes: IRoute[]
}

const Pages = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    if (!user) return <div></div>

    const privateRoutes: IRoute[] = [
        {
            path: '/',
            Component: Home,
        }
    ]

    return (
        <>
            <Routes>
                <Route path={'/'} element={<PrivateRouter onClickLogo={() => navigate('/')} routes={privateRoutes} />} children={generateRoutes(privateRoutes)} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default Pages
