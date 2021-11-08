export const actions = {
  async initPlayer({commit, dispatch, getters}, token) {
    if (getters['auth/isLoggedIn']) {
      window.onSpotifyWebPlaybackSDKReady = () => {
      };
      return;
    }
    const { Player } = await dispatch('waitForSpotifyWebPlaybackSDKToLoad')
    const player = new Player({
      name: 'spotify',
      volume: 1,
      getOAuthToken: (callback) => {
        callback(token);
      },
    });

    player.addListener('ready', () => {
      console.info('This device goes active. 🚀');
    });

    player.addListener('not_ready', ({ device_id: deviceId }) => {
      console.info('This device has gone offline. 😴', deviceId);
    });

    player.addListener('initialization_error', (err) => {
      console.error({ err });
    });

    player.addListener('authentication_error', (err) => {
      console.error({ err });
      // await dispatch('auth/refreshAccessToken', undefined, { root: true });
      // await dispatch('player/disconnectPlayer', undefined, { root: true });
      // await dispatch('player/initPlayer', undefined, { root: true });
    });

    player.addListener('account_error', (err) => {
      console.error({ err });
    });
    player.addListener('playback_error', (err) => {
      console.error({ err });
    });

    player.addListener('player_state_changed', ((playerState) => {
      console.log('playerState: ', playerState)
    }));

    await player.connect();
  },
  waitForSpotifyWebPlaybackSDKToLoad() {
    window.onSpotifyWebPlaybackSDKReady = () => {};

    return new Promise((resolve) => {
      if (window.Spotify) {
        resolve(window.Spotify);
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve(window.Spotify);
        };
      }
    });
  }
}
