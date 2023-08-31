import './Card.css';

import * as React from 'react';

import { ArtistAndTrackList, ITrack } from "./Models";
import { Label, Stack } from '@fluentui/react';

import { GAP10 } from "./Constants";
import { fetchArtistAndTrackList } from './DataService';
import { useParams } from 'react-router-dom';

export interface IPlayArtistProps {
}
export const PlayArtist: React.FunctionComponent<IPlayArtistProps> = () => {
    const [state, setState] = React.useState<ArtistAndTrackList>();


    const { id } = useParams<{ id: string, albumID: string }>();


    React.useEffect(() => {
        if (!id) return;
        const controller = new AbortController();
        fetchArtistAndTrackList(id, controller.signal).then(setState);
        return () => {
            controller.abort();
        }
    }, [id]);



    if (!state) return <div>Loading...</div>;
    const { artist, tracks } = state;
    return (
        <Stack horizontal tokens={GAP10} >
            <img className={'coverImage'} src={artist.picture_xl} alt={artist.name} />
            <Stack tokens={GAP10} className={'playlist'}>
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
                                        src={track.album?.cover_medium}
                                        alt={track.title} height='50px'
                                    />
                                    <Stack
                                        verticalAlign='start'
                                        horizontalAlign='start'
                                    >
                                        <Label
                                            style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
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
