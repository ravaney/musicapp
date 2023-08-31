import * as React from 'react';

import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { BiLogoDeezer } from 'react-icons/bi';
import { BiSolidShareAlt } from 'react-icons/bi';
import { BsCollectionPlay } from 'react-icons/bs';
import { IArtist } from './Models/IArtist';
import { Link } from 'react-router-dom';
import { styles } from './AlbumCard';

export interface ICardProps {
    artist: IArtist
}
const cardStyle = {
    width: 300,
    minWidth: 300,
}
export const ArtistCard: React.FunctionComponent<ICardProps> = ({ artist }) => {
    return (
        <Card
            sx={cardStyle}
        >
            <a href={artist.link} target='_blank' rel='noreferrer'>
                <CardMedia component='img' src={artist.picture_big} />
            </a>
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
                <Link
                    to={artist.share}
                    target='_blank'
                    className={styles.link}>
                    <BiSolidShareAlt />
                </Link>

            </CardActions>
        </Card>
    );
};
