import { createAuthorizeURL } from '~/helpers/auth'

export const state = ({
  accessToken: '',
  isRefreshing: false,
  isLoggedIn: false,
  isPremium: false,
  user: null
})

export const getters = {
  isLoggedIn (state) {
    return state.accessToken !== ''
      && state.user != null
  }
}
export const actions = {
  async initPlaybackSDK({dispatch}) {
    const { Player } = await dispatch('waitForSpotifyWebPlaybackSDKToLoad');
    const player = new Player({
      name: 'Spotify',
      getOAuthToken: (cb) => {
        cb();
      },
      volume: 100
    });

    player.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
      console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
      alert(`You account has to have Spotify Premium for playing music ${message}`);
    });

    player.addListener('playback_error', ({ message }) => {
      console.error(message);
    });

    player.addListener('player_state_changed', (state) => {
      console.log(state);
    });

    player.addListener('ready', ({ device_id: deviceId }) => {
      console.log('[Angular Spotify] Ready with Device ID', deviceId);
    });

    player.addListener('not_ready', ({ device_id: deviceId }) => {
      console.log('[Angular Spotify] Device ID has gone offline', deviceId);
    });

    await player.connect();
  },
  waitForSpotifyWebPlaybackSDKToLoad () {
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
  },
  initAuth () {
    if (!window.location.hash) {
      window.location.href = createAuthorizeURL()
    }
    console.log('window.location.hash', window.location.hash)
  }
}
