import { Route, Routes, useNavigate } from 'react-router'
import NotFound from '../utils/NotFound'
import { useAuth } from '../../hooks/AuthContext'
import { generateRoutes } from './utils.functions'
import { IRoute } from './pages.interface'
import PrivateRouter from './private.router'
import { TeamRouter } from './Team/team.router'
import TeamList from './Team/TeamList'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './Home'
import { PlayerRouter } from './Player/player.router'
import { ActionTypeRouter } from './Action/action.router'
import { GameRouter } from './Game/game.router'

export interface ICryptobotRouterProps {
    routes: IRoute[]
}

const Pages = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    if (!user) return <div></div>

    const privateRoutes: IRoute[] = [
        {
            path: '',
            Component: Home,
        },
        {
            path: 'team/*',
            Component: TeamRouter,
            title: 'Equipe'
        },
        {
            path: 'player/*',
            Component: PlayerRouter,
            title: 'Joueurs'
        },
        {
            path: 'game/*',
            Component: GameRouter,
            title: 'Matchs'
        },
        {
            path: 'actionType/*',
            Component: ActionTypeRouter
        },
    ]

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Routes>
                <Route path={'/'} element={<PrivateRouter onClickLogo={() => navigate('/')} routes={privateRoutes} />} children={generateRoutes(privateRoutes)} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default Pages
