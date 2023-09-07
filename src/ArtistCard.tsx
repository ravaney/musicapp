import * as React from 'react';

import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { BiLogoDeezer } from 'react-icons/bi';
import { BsCollectionPlay } from 'react-icons/bs';
import { IArtist } from './Models/IArtist';
import { IconButton } from '@fluentui/react';
import { Link } from 'react-router-dom';
import { styles } from './AlbumCard';

export interface ICardProps {
    artist: IArtist
}
const cardStyle = {
    width: 300,
    minWidth: 300,
}

const initialState = { loading: true, favourite: false };

export type ReducerState = typeof initialState;
export type ReducerAction = { type: string }

const reducer = (currentState: ReducerState, action: ReducerAction): ReducerState => {
    switch (action.type) {
        case 'updateFavourite':
            return { ...currentState, favourite: !currentState.favourite };
        default:
            return currentState;
    }
};

const favStyle = (isFavourite: boolean) => {
    return isFavourite ? 'red' : 'grey';
}

export const ArtistCard: React.FunctionComponent<ICardProps> = ({ artist }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <Card
            sx={cardStyle}
        >
            <Link to={`/artist/${artist.id}`} className={styles.link}>
                <CardMedia component='img' src={artist.picture_big} />
            </Link>
            <CardContent sx={{ p: 1 }} className={styles.content}>
                <Typography variant="h6" color="text.secondary">
                    {artist.name}
                </Typography>
            </CardContent>
            <CardActions className={styles.actions} >
                <Link
                    className={styles.link}
                    to={artist.link}
                    target='_blank'>
                    <BiLogoDeezer />
                </Link>
                <Link
                    className={styles.link}
                    to={`/artist/${artist.id}`}
                >
                    <BsCollectionPlay />
                </Link>
                <IconButton
                    className={styles.link}
                    onClick={() => dispatch({ type: 'updateFavourite' })}
                    iconProps={{ iconName: 'HeartFill', style: { color: favStyle(state.favourite) } }}

                />

            </CardActions>
        </Card>
    );
};
