import { IArtist } from "./IArtist";
import { ITrack } from "./ITrack";

export interface ArtistAndTrackList {
    artist: IArtist;
    tracks: ITrack[];
}
