import * as React from 'react';

import { NavBar } from './NavBar';
import { Outlet } from 'react-router-dom';

export interface ILayoutProps { }

export const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};
