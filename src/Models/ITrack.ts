import { Album } from "./Album";
import { Contributor } from "./Contributor";
import { LightArtist } from "./LightArtist";

export interface ITrack {
    id: number;
    readable: boolean;
    title: string;
    title_short: string;
    title_version: string;
    link: string;
    duration: number;
    rank: number;
    explicit_lyrics: boolean;
    explicit_content_lyrics: number;
    explicit_content_cover: number;
    preview: string;
    contributors: Contributor[];
    md5_image: string;
    artist: LightArtist;
    album?: Album;
    type: string;
}
