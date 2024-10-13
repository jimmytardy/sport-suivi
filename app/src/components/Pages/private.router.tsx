import { Outlet } from 'react-router'
import NavBar from './Navbar'
import { IPagesRouterProps } from './pages.interface'
import { Container } from '@mui/material'

const PrivateRouter = (props: IPagesRouterProps) => {
    return (
        <>
            <NavBar {...props} />
            <Outlet />
        </>
    )
}

export default PrivateRouter
