import * as React from 'react';

import { AlbumAndTracklist, ITrack } from './Models';
import { Label, Stack, mergeStyleSets } from '@fluentui/react';

import { GAP10 } from './Constants';
import { fetchAlbumAndTrackList } from './DataService';
import { useParams } from 'react-router-dom';

export interface IPlayAlbumProps { }

//uses the mergeStyleSets to create a style object it performs better in browser
// it does not pulls in the theme variables from the context ** only in SPFX **

const styles = mergeStyleSets({
    lblStyle: { whiteSpace: 'nowrap', textOverflow: 'ellipsis' }
});
export const PlayAlbum: React.FunctionComponent<IPlayAlbumProps> = (props) => {
    const [state, setState] = React.useState<AlbumAndTracklist>();

    const { albumId } = useParams<{ albumId: string }>();

    React.useEffect(() => {
        if (!albumId) return;
        const controller = new AbortController();
        fetchAlbumAndTrackList(albumId, controller.signal).then(setState);
        return () => {
            controller.abort();
        }
    }, [albumId]);

    if (!state) return <div>Loading...</div>;
    const { album, tracks } = state;
    return (
        <Stack horizontal>
            <Stack className='coverImage'>
                <img src={album.cover_xl} alt={album.title} />
                <Label>{album.title}</Label>
            </Stack>
            <Stack tokens={GAP10} className='playlist'>
                {
                    tracks.map((track: ITrack) => {
                        return (
                            <Stack
                                horizontal
                                tokens={GAP10}
                                key={track.id}
                                verticalAlign='center'
                                horizontalAlign='space-between'
                                className={'songBarStyle'}
                            >
                                <Stack horizontal tokens={GAP10}>
                                    <img
                                        src={album.cover_xl}
                                        alt={track.title} height='50px'
                                    />
                                    <Stack
                                        verticalAlign='start'
                                        horizontalAlign='start'
                                    >
                                        <Label
                                            className={styles.lblStyle}
                                        >
                                            {track.title}
                                        </Label>
                                        <div>{track.artist.name}</div>
                                    </Stack>
                                </Stack>

                                <audio controls src={track.preview} />
                            </Stack>
                        )
                    })
                }
            </Stack>
        </Stack>
    );
};
