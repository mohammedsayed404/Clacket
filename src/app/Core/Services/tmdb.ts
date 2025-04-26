import { TMDB } from 'tmdb-ts';
import { environment } from '../../../environments/environment';

export const tmdb = new TMDB(environment.tmdbApiKey);
