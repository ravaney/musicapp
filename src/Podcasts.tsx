import * as React from 'react';

import { GAP10 } from './Constants';
import { Outlet } from 'react-router-dom';
import { Podcast } from './Podcast';
import { PodcastCard } from './PodcastCard';
import { Stack } from '@fluentui/react';
import { fetchPodcasts } from './DataService';

export interface IPodcastsProps { }


export const Podcasts: React.FunctionComponent<IPodcastsProps> = (props) => {
    const [podcasts, setPodcasts] = React.useState<Podcast[]>();

    React.useEffect(() => {
        const controller = new AbortController();
        fetchPodcasts(controller.signal).then(setPodcasts);
        return () => {
            controller.abort();
        }
    }, []);

    //extract the description from the podcast


    return (
        <Stack horizontal>
            <Stack
                tokens={GAP10}
                horizontalAlign='start'
                className={'podcastSideBar'}
                wrap={false}
            >
                {
                    podcasts?.map((podcast: Podcast) => {
                        return (
                            <PodcastCard
                                key={podcast.id}
                                podcast={podcast}
                            />
                        );
                    })
                }
            </Stack>
            <Outlet />
        </Stack>
    );
};
