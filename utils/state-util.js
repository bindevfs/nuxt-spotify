export const isMediaPlayingState = (playBackUriList) => {
  return playBackUriList.map(([uri, playback]) => {
    const isCurrentTrackingPlaying = uri === playback.track_window?.current_track?.uri
    if (isCurrentTrackingPlaying) {
      return !playback.paused
    }
    return false
  }).some(isPlaying => isPlaying)
}
