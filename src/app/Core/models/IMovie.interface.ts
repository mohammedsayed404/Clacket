interface IMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null | string;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    videos: videos;
    credits: credits;
}
interface Genre {
    id: number;
    name: string;
}
interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}
interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}
interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}
interface videos {
    results: video[];
}
interface video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}
interface credits {
    cast: Cast[];
    crew: Crew[];
}
interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}
interface Crew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string;
    credit_id: string;
    department: string;
    job: string;
}
export { IMovie, Genre, ProductionCompany, ProductionCountry, SpokenLanguage, videos, video, credits, Cast, Crew };
