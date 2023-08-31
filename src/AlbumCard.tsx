import * as React from 'react';

import { BiLogoDeezer, BiSolidShareAlt } from 'react-icons/bi';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { Album } from './Models';
import { BsCollectionPlay } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { mergeStyleSets } from '@fluentui/react';

export interface IAlbumCardProps {
    album: Album
}

export const styles = mergeStyleSets({
    link: { textDecoration: 'none' },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 8px 8px 8px',
        background: '#F6F4EB',
        verticalAlign: 'middle',
    },
    content: {
        backgroundColor: '#91C8E4',
    },
    title: //no word wrap
        { whiteSpace: 'nowrap', textOverflow: 'ellipsis' }
})

const cardStyle = {
    width: 300,
    minWidth: 300,
}

export const AlbumCard: React.FunctionComponent<IAlbumCardProps> = ({ album }) => {
    return (
        <Card
            sx={cardStyle}
        >
            <a href={album.link} target='_blank' rel='noreferrer'>
                <CardMedia component='img' src={album.cover_xl} />
            </a>
            <CardContent sx={{ p: 1 }} className={styles.content}>
                <Typography variant="h6" color="text.secondary" className={styles.title}>
                    {album.title}
                </Typography>
            </CardContent>
            <CardActions className={styles.actions} >
                <Link
                    className={styles.link}
                    to={album.link}
                    target='_blank'>
                    <BiLogoDeezer />
                </Link>
                <Link
                    className={styles.link}
                    to={`/album/${album.id}`}
                >
                    <BsCollectionPlay />
                </Link>
                <Link
                    to={album?.link}
                    target='_blank'
                    className={styles.link}>
                    <BiSolidShareAlt />
                </Link>

            </CardActions>
        </Card>
    );
};
