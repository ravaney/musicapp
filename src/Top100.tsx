import * as React from 'react';

import { Stack, mergeStyleSets } from '@fluentui/react';

import { GAP10 } from './Constants';
import { PlaylistAndTracks } from './Models';
import { Song } from './Song';
import { Track } from './Models/BillBoardTypes';
import { fetchBillboard100 } from './DataService';

export interface ITop100Props { }

const styles = mergeStyleSets({
    spotifyImage: { height: '50px', width: '50px' },
    bb100Image: { height: '100%', width: '300px' }
})


const spotify = './spotify.png'

export const Top100: React.FunctionComponent<ITop100Props> = (props) => {
    const [playlistAndTracks, setPlaylistandTracks] = React.useState<PlaylistAndTracks>();

    React.useEffect(() => {
        setPlaylistandTracks(undefined);
        const controller = new AbortController();
        fetchBillboard100(controller.signal).then(setPlaylistandTracks);
        return () => {
            controller.abort();
        };
    }, []);

    if (!playlistAndTracks) return <div>Loading...</div>;
    const { billboard100, playlistLink } = playlistAndTracks;

    return (
        <Stack tokens={GAP10} horizontalAlign='center'>

            <Stack className='top100Header' horizontalAlign='start' tokens={GAP10} horizontal>
                <Stack
                    verticalAlign='center'
                    horizontalAlign='center'
                >
                    <img src='./bb100.png' alt='top100' className={styles.bb100Image} />
                    <img src={spotify} alt='spotify' className={styles.spotifyImage} />
                    <p> <a href={playlistLink} target='_blank' rel='noreferrer'> Play Billboard Hot 100 on Spotify</a> </p>
                </Stack>
                <p className='top100Description'>The official  features this week&apos;s most popular songs across all genres, ranked by radio airplay monitored by Nielsen BDS, download sales tracked by Nielsen SoundScan and streaming activity data provided by leading online music services.</p>
            </Stack>
            {
                billboard100?.map((track: Track, index) =>
                    //dont use index for updating items //keys must be static, index is dynamic
                    <Stack
                        horizontal
                        verticalAlign='center'
                        key={track.id}
                    >
                        #{index + 1}
                        <Song track={track} />
                    </Stack>
                )
            }
        </Stack>
    );
};


