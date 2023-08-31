import * as React from 'react';

import { BillboardTrack, PlaylistAndTracks } from './Models';
import { fetchBillboard100 } from './DataService';
import { Stack, mergeStyleSets } from '@fluentui/react';
import { GAP10 } from './Constants';
export interface ITop100Props { }

const styles = mergeStyleSets({

    song: { fontWeight: 'bold', fontSize: '20px', overflow: 'hidden', textOverflow: 'ellipsis', width: '300px', whiteSpace: 'nowrap', textAlign: 'left' },
    artist: { fontWeight: 'light', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    audio: { width: '300px' },
    column1: { width: '400px' },
    icon: { fontSize: '30px' },
    background: { background: 'linear-gradient(90deg, #5170FF, #FF66C4)', padding: '10px', overflowX: 'scroll', height: '100vh' },
});

const spotify = './spotify.png'


const bbtop100 = 'The official  features this week\'s most popular songs across all genres, ranked by radio airplay monitored by Nielsen BDS, download sales tracked by Nielsen SoundScan and streaming activity data provided by leading online music services.'

export const Top100: React.FunctionComponent<ITop100Props> = (props) => {
    const [playlistAndTracks, setPlaylistandTracks] = React.useState<PlaylistAndTracks>();
    React.useEffect(() => {
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
            <Stack className='top100Header' horizontalAlign='center' tokens={GAP10}>
                <img src='./bb100.png' alt='top100' height='100%' width={300} />
                <p className='top100Description'>{bbtop100}</p>
                <Stack horizontal verticalAlign='center'>
                    <img src={spotify} alt='spotify' height='50px' />
                    <p> <a href={playlistLink} target='_blank' rel='noreferrer'> Play on Spotify</a> </p>
                </Stack>
            </Stack>

            <Stack tokens={GAP10} horizontalAlign='center'>

                {
                    billboard100?.map((track: BillboardTrack) => {
                        return (
                            <Stack
                                key={track.id}
                                horizontal
                                horizontalAlign='space-between'
                                className='top100'
                            >
                                <Stack horizontal tokens={GAP10} className={styles.column1} verticalAlign='center'>
                                    <div className='position'>#{billboard100.indexOf(track) + 1}</div>
                                    <img src={track.image} alt='album' height='50px' />
                                    <Stack
                                        verticalAlign='space-between' horizontalAlign='start'
                                    >
                                        <div className={styles.song}>{track.name}</div>
                                        <Stack horizontalAlign='start' horizontal >
                                            {track.artists.map(artist => {
                                                return <div className='artist' key={artist.id}>{artist.name}</div>
                                            })}
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <audio controls src={track.preview_url} className={styles.audio} />
                                <a
                                    href={track.external_urls.spotify}
                                    target='_blank' rel='noreferrer'
                                >
                                    <img src={spotify} alt='spotify' height='50px' />
                                </a>

                            </Stack>
                        );
                    })
                }
            </Stack>
        </Stack>
    );
};


