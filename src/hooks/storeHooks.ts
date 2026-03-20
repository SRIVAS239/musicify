import { useAppSelector } from "./useAuthHooks"

export const usePlayer       = () => useAppSelector(s => s.player)
export const useCurrentTrack = () => useAppSelector(s => s.player.currentTrack)
export const useIsPlaying    = () => useAppSelector(s => s.player.isPlaying)