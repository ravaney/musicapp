import * as React from 'react';

import { Stack } from '@fluentui/react';

export interface IPodcastSplashProps { }

export const PodcastSplash: React.FunctionComponent<IPodcastSplashProps> = (props) => {
    return (
        <Stack className='splash'>
            {/* <h3>Select a podcats from the sidebar</h3> */}
            <img src='./podcastgif.gif' alt='podcast' className='splashImage' />
        </Stack>
    );
};
