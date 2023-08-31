import './Card.css';

import * as React from 'react';

import { Stack, mergeStyleSets } from '@fluentui/react';

import { GAP10 } from './Constants';
import { NavLink } from 'react-router-dom';

export interface INavBarProps { }

const styles = mergeStyleSets({
    active: { color: 'red', fontWeight: 'bold', textDecoration: 'none' },
    pending: { color: 'blue', fontWeight: 'bold', textDecoration: 'none' },
    normal: { color: 'White', fontWeight: 'bold', textDecoration: 'none' }
});

const handleLinkClass = (args: { isActive: boolean, isPending: boolean }) => {
    return args.isPending ? styles.pending : args.isActive ? styles.active : styles.normal;
}

export const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
    return (
        <>
            <Stack className={"navBar"} tokens={GAP10} horizontalAlign='center'>
                <img src='/musikiss.png' alt='logo' height='100px' />

                <Stack horizontal tokens={GAP10}>
                    <NavLink to="/home" className={handleLinkClass} >Home</NavLink>
                    <NavLink to="/top100" className={handleLinkClass}>Top-100</NavLink>
                    <NavLink to="/podcasts" className={handleLinkClass}>Podcasts</NavLink>
                </Stack>

            </Stack >
        </>
    );
};
