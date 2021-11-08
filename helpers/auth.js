export const createAuthorizeURL = () => {
  const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
  const CLIENT_ID = '0e7661a75dc54594ba4b1ad55d83d0b3';
  const SCOPES = [
    'user-read-recently-played',
    'user-top-read',
    'user-read-playback-position',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-library-modify',
    'user-library-read',
    'user-read-email',
    'user-read-private'
  ];

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: `${window.location.origin}/`,
    scope: encodeURIComponent(SCOPES.join(' ')),
    response_type: 'token'
  });
  return `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
}
