import { ReactNode } from "react";

export interface IPagesRouterProps {
    routes: IRoute[]
    onClickLogo?: (e: any) => void
}

export interface IRoute {
    path: string
    Component?: React.FC<any> | ReactNode
    title?: string
    disabled?: boolean;
}
