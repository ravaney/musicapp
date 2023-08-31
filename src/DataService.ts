import { Album, AlbumAndTracklist, ArtistAndTrackList, Episode, IArtist, ITrack } from "./Models";

import { BillboardTrack, PlaylistAndTracks } from './Models/BillboardTrack';
import { Podcast } from "./Podcast";

const TRACKLIST_API = 'https://api.deezer.com/artist' as const

const CHART_API = 'https://api.deezer.com/chart' as const

const ALBUM_TRACKS_API = 'https://api.deezer.com/album' as const

const PODCAST_API = 'https://api.deezer.com/podcast' as const

const CLIENT_ID = 'cf3c89466fc5469b9c8eb86f0ea97d3a';
const CLIENT_SECRET = 'b0a55a2956f24bf1940584f6aca9f3b9';
const PLAYLIST_ID = '6UeSakyzhiEt4NB3UAd6NQ';
const BASIC_AUTH = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
const BILLBOARD_OPTIONS = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${BASIC_AUTH}`
    },
    body: 'grant_type=client_credentials'
}


export const fetchArtist = async (id: string, signal: AbortSignal): Promise<IArtist> => {
    const response = await fetch(`${TRACKLIST_API}/${id}`, { signal });
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
}

export const fetchSelectedArtists = async (names: string[], signal: AbortSignal): Promise<IArtist[]> => {
    const artists = await Promise.all(names.map(name => fetchArtist(name, signal)));
    return artists;
}

export const fetchTopArtists = async (signal: AbortSignal): Promise<IArtist[]> => {
    const response = await fetch(`${CHART_API}/0/artists`, { signal });
    if (!response.ok) throw new Error(response.statusText);
    const { data } = await response.json();
    return data;
}
export const fetchTopTracks = async (signal: AbortSignal): Promise<ITrack[]> => {
    const response = await fetch(`${CHART_API}/0/tracks`, { signal });
    if (!response.ok) throw new Error(response.statusText);
    const { data } = await response.json();
    return data;
}
export const fetchTopAlbums = async (signal: AbortSignal): Promise<Album[]> => {
    const response = await fetch(`${CHART_API}/0/albums`, { signal });
    if (!response.ok) throw new Error(response.statusText);
    const { data } = await response.json();
    return data;
}

export const fetchTrackList = async (id: string, signal: AbortSignal, limit = 50): Promise<ITrack[]> => {
    const response = await fetch(`${TRACKLIST_API}/${id}/top?limit=${limit}`, { signal })
    if (!response.ok) throw new Error(response.statusText);
    const { data } = await response.json();
    return data;
}

export const fetchAlbum = async (id: string, signal: AbortSignal): Promise<Album> => {
    const response = await fetch(`${ALBUM_TRACKS_API}/${id}`, { signal })
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
}

export const fetchAlbumTracklist = async (id: string, signal: AbortSignal): Promise<ITrack[]> => {
    console.log('album id', id)
    const response = await fetch(`${ALBUM_TRACKS_API}/${id}/tracks`, { signal })
    if (!response.ok) throw new Error(response.statusText);
    const { data } = await response.json();
    return data;
}

export const fetchAlbumAndTrackList = async (id: string, signal: AbortSignal): Promise<AlbumAndTracklist> => {
    const album = await fetchAlbum(id, signal);
    const tracks = await fetchAlbumTracklist(id, signal);
    return { album, tracks };
}

export const fetchArtistAndTrackList = async (id: string, signal: AbortSignal): Promise<ArtistAndTrackList> => {
    const artist = await fetchArtist(id, signal);
    const tracks = await fetchTrackList(id, signal);
    return { artist, tracks };
}

export const fetchPodcasts = async (signal: AbortSignal): Promise<Podcast[]> => {
    const response = await fetch(`${CHART_API}/0/podcasts`, { signal });
    if (!response.ok) throw new Error(response.statusText);
    const { data } = await response.json();
    return data;
}
export const fetchPodcast = async (id: string, signal: AbortSignal): Promise<Podcast> => {
    const response = await fetch(`${PODCAST_API}/${id}`, { signal });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
}

export const fetchPodcastEpisodes = async (id: string, signal: AbortSignal): Promise<Episode[]> => {
    const response = await fetch(`${PODCAST_API}/${id}/episodes`, { signal });
    if (!response.ok) throw new Error(response.statusText);
    const { data } = await response.json();
    //sort by date
    data.sort((a: Episode, b: Episode) => {
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    })

    //fetch the podcast and append the description to each episode
    const podcast = await fetchPodcast(id, signal);
    data.forEach((episode: Episode) => {
        episode.description = podcast.description;
        episode.picture_xl = podcast.picture_xl;
    })
    return data;
}




export const fetchBillboard100 = async (signal: AbortSignal): Promise<PlaylistAndTracks> => {
    const token = await fetch('https://accounts.spotify.com/api/token', { ...BILLBOARD_OPTIONS, signal })
        .then(response => response.json())
        .then(data => {
            return data.access_token;
        })
    const response = await fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }, signal
    })

    if (!response.ok) throw new Error(response.statusText);
    const { tracks, external_urls } = await response.json();
    console.log(tracks)
    //extract the track from the item
    const billboard100: BillboardTrack[] = tracks.items.map((item: any) => {
        return item.track
    })


    billboard100.forEach((track: BillboardTrack) => {
        track.image = track.album.images[0].url;
    })
    console.log(billboard100)
    return { billboard100, playlistLink: external_urls.spotify };
}





