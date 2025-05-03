import { TmdbImageUrlPipe } from './tmdb-image-url.pipe';

describe('TmdbImageUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new TmdbImageUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
