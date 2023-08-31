import * as React from 'react';

import { GAP10, convertDate, convertDuration } from './Constants';
import { Stack, mergeStyleSets } from '@fluentui/react';

import { Episode } from './Models';
import { PodcastSplash } from './PodcastSplash';
import { fetchPodcastEpisodes } from './DataService';
import { useParams } from 'react-router-dom';

export interface IPlayPodcastsProps { }

const style = mergeStyleSets({
    mediaBar: { width: '200px' },
    title: { whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
    header: { width: '100%' }
})

export const PlayPodcasts: React.FunctionComponent<IPlayPodcastsProps> = () => {

    const [episodes, setEpisodes] = React.useState<Episode[]>();

    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        if (!id) return;
        const controller = new AbortController();
        fetchPodcastEpisodes(id, controller.signal).then(setEpisodes);
        return () => {
            controller.abort();
        };
    }, [id]);

    if (!episodes) return <PodcastSplash />

    // extract the description from one episode of the podcast
    const description = episodes[0].description;
    const picture = episodes[0].picture_xl;
    return (
        <Stack
            tokens={GAP10}
            className='playlist'
        >
            <Stack
                horizontal
                tokens={GAP10}
                horizontalAlign='start'
                className='descriptionBar'
            >
                <img src={picture} alt='podcast' height='300px' />
                <Stack
                    horizontalAlign='start'
                    verticalAlign='space-between'
                >
                    <Stack.Item >{description}</Stack.Item>
                    <h4>{episodes.length} Episodes</h4>
                </Stack>
            </Stack>
            {
                episodes.map((episode: Episode) => {
                    return (
                        <Stack
                            key={episode.id}
                            horizontal
                            tokens={GAP10}
                            horizontalAlign='space-between'
                        >
                            <Stack className='songBarStyle' horizontal tokens={GAP10}>
                                <img
                                    src={episode.picture}
                                    alt={episode.title}
                                    height='50px'
                                />
                                <audio className={style.mediaBar} controls src={''} />
                                <div className={style.title}>{episode.title}</div>
                                <div>{convertDuration(episode.duration)}</div>
                                <div>{convertDate(episode.release_date)}</div>

                            </Stack>
                        </Stack>
                    );
                })
            }
        </Stack>
    );
};


