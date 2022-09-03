export const isMediaPlayingState = (playBackUriList) => {
  return playBackUriList.map(([uri, playback]) => {
    const hasContextUri = !!playback?.context?.uri
    const hasTrackPlaying = !!playback?.track_window?.current_track
    if (hasTrackPlaying) {
      const isCurrentTrackPlaying = uri === playback.track_window?.current_track?.uri
      if (isCurrentTrackPlaying) {
        return !playback.paused
      }
    }
    if (hasContextUri) {
      const isCurrentPlaylistInContext = uri === playback.context?.uri
      if (isCurrentPlaylistInContext) {
        return !playback.paused
      }
    }
    return false
  }).some(isPlaying => isPlaying)
}
