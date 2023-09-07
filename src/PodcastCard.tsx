import * as React from 'react';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import { Podcast } from './Models/Podcast';
import { styles } from './AlbumCard';

export interface IPodcastCardProps {
    podcast: Podcast;
}

const cardStyle = {
    width: 300,
    minWidth: 300,
    minHeight: 350,
}

export const PodcastCard: React.FunctionComponent<IPodcastCardProps> = ({ podcast }) => {
    return (
        <Card
            sx={cardStyle}
        >
            <Link to={`/podcasts/${podcast.id}`} >
                <CardMedia component='img' src={podcast.picture_xl} />
            </Link>
            <CardContent sx={{ p: 1 }} className={styles.content}>
                <Typography variant="h6" color="text.secondary" className={styles.title}>
                    {podcast.title}
                </Typography>
            </CardContent>

        </Card>
    );
};
