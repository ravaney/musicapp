import * as React from 'react';

import { Stack, mergeStyleSets } from '@fluentui/react';

import { GAP10 } from './Constants';
import { Track } from './Models/BillBoardTypes';

export interface ISongProps {
    track: Track;
}
const spotify = './spotify.png'
const styles = mergeStyleSets({

    song: { fontWeight: 'bold', fontSize: '20px', overflow: 'hidden', textOverflow: 'ellipsis', width: '300px', whiteSpace: 'nowrap', textAlign: 'left' },
    audio: { width: '300px' },
    column1: { width: '400px' },
    image: { height: '50px' }
});


export const Song: React.FunctionComponent<ISongProps> = ({ track }) => {
    return (
        <Stack tokens={GAP10} horizontalAlign='center'>

            <Stack
                key={track.id}
                horizontal
                horizontalAlign='space-between'
                className='top100'
            >
                <Stack
                    horizontal
                    tokens={GAP10}
                    className={styles.column1}
                    verticalAlign='center'
                >

                    <img src={track.album?.images?.[0]?.url} alt='album' className={styles.image} />
                    <Stack
                        verticalAlign='space-between' horizontalAlign='start'
                    >
                        <div className={styles.song}>{track.name}</div>
                        <Stack horizontalAlign='start' horizontal >
                            {track.artists?.map(artist => {
                                return <div key={artist.id}>{artist.name}</div>
                            })}
                        </Stack>
                    </Stack>
                </Stack>
                <audio controls src={track.preview_url ?? undefined} className={styles.audio} />
                <a
                    href={track.external_urls.spotify}
                    target='_blank' rel='noreferrer'
                >
                    <img src={spotify} alt='spotify' className={styles.image} />
                </a>
            </Stack>

        </Stack>
    );
};
