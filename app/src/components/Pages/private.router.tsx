import { Outlet } from 'react-router'
import { IPagesRouterProps } from '../pages.interface';
import NavBar from './Navbar';

const PrivateRouter = (props: IPagesRouterProps) => {
    return (
        <>
            <NavBar {...props} />
            <Outlet />
        </>
    )
}

export default PrivateRouter;