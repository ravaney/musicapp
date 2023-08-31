import * as React from 'react';

import { Album, IArtist, IGenre } from './Models';
import { Label, Stack } from '@fluentui/react';
import { fetchTopAlbums, fetchTopArtists } from './DataService';

import { AlbumCard } from './AlbumCard';
import { ArtistCard } from './ArtistCard';
import { GAP10 } from './Constants';

export interface IHomeProps { }



export type ReducerState = { genres: IGenre[], searchTerm: string, artists: IArtist[], albums: Album[] };
export type ReducerAction =
    { type: 'FETCH_ARTISTS'; payload: IArtist[] } |
    { type: 'FETCH_GENRES'; payload: IGenre[] } |
    { type: 'FETCH_ALBUMS'; payload: Album[] };

const initialState: ReducerState = { genres: [], searchTerm: '', artists: [], albums: [] };

const reducer = (currentState: ReducerState, action: ReducerAction): ReducerState => {
    console.log(action.payload);
    switch (action.type) {
        case 'FETCH_ARTISTS':
            return {
                ...currentState, artists: action.payload
            };
        case 'FETCH_GENRES':
            return { ...currentState, genres: action.payload };
        case 'FETCH_ALBUMS':
            return { ...currentState, albums: action.payload };
        default:
            return currentState;
    }
};

const homeStyle = {
    padding: '10px',
    overfloowX: 'scroll',
}

export const Home: React.FunctionComponent<IHomeProps> = (props) => {
    //create async function to fetch data from api
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        const controller = new AbortController();

        fetchTopArtists(controller.signal).then((artists) => {
            dispatch({ type: 'FETCH_ARTISTS', payload: artists });
        });
        fetchTopAlbums(controller.signal).then((albums) => {
            dispatch({ type: 'FETCH_ALBUMS', payload: albums });
        });

        return () => {
            controller.abort();
        }
    }, []);

    const { artists, albums } = state;

    return (
        <Stack style={homeStyle} >
            <Label className='section'>Top Artists</Label>
            <Stack horizontalAlign='start' horizontal tokens={GAP10} wrap={false} className='cards'>
                {
                    artists.map((artist) => {
                        return (
                            <ArtistCard artist={artist} key={artist.id} />
                        )
                    })
                }

            </Stack>
            <Label className='section'>Top Albums</Label>
            <Stack horizontalAlign='start' horizontal tokens={GAP10} wrap={false} className='cards'>
                {
                    albums.map((album) => {
                        return (
                            <AlbumCard album={album} key={album.id} />
                        )
                    })
                }
            </Stack>


        </Stack>
    );
};
