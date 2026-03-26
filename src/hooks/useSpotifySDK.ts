// src/hooks/useSpotifyPlayer.ts
import { useEffect, useRef, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from './useAuthHooks'
import {
  setCurrentTrack, setIsPlaying, setProgress,
  setDeviceId, setIsPremiumMode,
} from '../store/playerSlice'
import store from '../utils/appStore'
import type { SpotifyTrack } from '../types/spotify'

export function useSpotifyPlayer() {
  const dispatch    = useAppDispatch()
  const accessToken = useAppSelector(s => s.auth.accessToken)
  const isPremium   = false // TODO: get from auth state when available
  const deviceId    = useAppSelector(s => s.player.deviceId)
  const volume      = useAppSelector(s => s.player.volume)

  // SDK player lives in a ref — never in state
  const sdkPlayerRef = useRef<SpotifyPlayer | null>(null)
  // Audio element for Free users and preview fallback
  const audioRef     = useRef<HTMLAudioElement | null>(null)
  // Progress interval ref
  const progressRef  = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Initialise for Premium users ─────────────────────────────
  const initSDK = useCallback(() => {
    // Prevent loading the script twice
    if (document.getElementById('spotify-sdk')) return

    // Must set this BEFORE appending the script tag
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Musicify Player',
        getOAuthToken: (cb: (t: string) => void) => {
          // Always read from store — gets the latest token after refresh
          const token = store.getState().auth.accessToken
          if (token) cb(token)
        },
        volume,
      })

      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        dispatch(setDeviceId(device_id))
      })

      player.addListener('player_state_changed', (state: { paused: boolean; position: number } | null) => {
        if (!state) return
        dispatch(setIsPlaying(!state.paused))
        dispatch(setProgress(state.position))
      })

      player.addListener('initialization_error', ({ message }: { message: string }) => {
        console.error('SDK init error:', message)
        dispatch(setIsPremiumMode(false))
      })

      player.addListener('authentication_error', ({ message }: { message: string }) => {
        console.error('SDK auth error:', message)
        dispatch(setIsPremiumMode(false))
      })

      player.connect()
      sdkPlayerRef.current = player
    }

    const script  = document.createElement('script')
    script.id     = 'spotify-sdk'
    script.src    = 'https://sdk.scdn.co/spotify-player.js'
    script.async  = true
    document.body.appendChild(script)
  }, [dispatch, volume])

  useEffect(() => {
    if (!accessToken || !isPremium) {
      dispatch(setIsPremiumMode(false))
      return
    }
    dispatch(setIsPremiumMode(true))
    initSDK()
  }, [accessToken, isPremium, dispatch, initSDK])

  // ── Progress ticker for preview audio ────────────────────────
  const startProgressTicker = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current)
    progressRef.current = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        dispatch(setProgress(Math.floor(audioRef.current.currentTime * 1000)))
      }
    }, 500)
  }, [dispatch])

  const stopProgressTicker = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current)
  }, [])

  // ── playPreview helper ────────────────────────────────────────
  const playPreview = useCallback((track: SpotifyTrack) => {
    console.log('🎵 playPreview() called');
    console.log('preview_url:', track.preview_url);
    if (!track.preview_url) {
      console.warn('No preview available for:', track.name)
      dispatch(setIsPlaying(false))
      return
    }

    // Create audio element once, reuse it for every preview
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.onended = () => {
        dispatch(setIsPlaying(false))
        stopProgressTicker()
      }
    }

    audioRef.current.src    = track.preview_url
    audioRef.current.volume = volume
    audioRef.current.play()
    dispatch(setIsPlaying(true))
    startProgressTicker()
  }, [volume, dispatch, startProgressTicker, stopProgressTicker])

  // ── play(track) ───────────────────────────────────────────────
  const play = useCallback(async (track: SpotifyTrack) => {
    console.log('🎵 play() called for:', track.name);
    console.log('📊 Redux dispatch: setCurrentTrack');
    dispatch(setCurrentTrack(track))

    if (isPremium && deviceId && accessToken) {
      console.log('🎧 Premium mode - using SDK');
      // Premium path: tell Spotify to stream this URI to the SDK device
      try {
        await fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uris: [track.uri] }),
          }
        )
        dispatch(setIsPlaying(true))
      } catch (e) {
        console.error('SDK play failed, falling back to preview', e)
        playPreview(track)
      }
    } else {
      console.log('🎵 Free mode - using preview');
      // Free path: play the 30-second preview URL
      playPreview(track)
    }
  }, [isPremium, deviceId, accessToken, dispatch, playPreview])

  // ── pause() ───────────────────────────────────────────────────
  const pause = useCallback(async () => {
    if (isPremium && sdkPlayerRef.current) {
      await sdkPlayerRef.current.pause()
    } else {
      audioRef.current?.pause()
      stopProgressTicker()
    }
    dispatch(setIsPlaying(false))
  }, [isPremium, dispatch, stopProgressTicker])

  // ── resume() ─────────────────────────────────────────────────
  const resume = useCallback(async () => {
    if (isPremium && sdkPlayerRef.current) {
      await sdkPlayerRef.current.resume()
    } else {
      audioRef.current?.play()
      startProgressTicker()
    }
    dispatch(setIsPlaying(true))
  }, [isPremium, dispatch, startProgressTicker])

  // ── seek(ms) ─────────────────────────────────────────────────
  const seek = useCallback(async (positionMs: number) => {
    if (isPremium && sdkPlayerRef.current) {
      await sdkPlayerRef.current.seek(positionMs)
    } else if (audioRef.current) {
      audioRef.current.currentTime = positionMs / 1000
    }
    dispatch(setProgress(positionMs))
  }, [isPremium, dispatch])

  // ── setVol(0-1) ───────────────────────────────────────────────
  const setVol = useCallback(async (v: number) => {
    if (isPremium && sdkPlayerRef.current) {
      await sdkPlayerRef.current.setVolume(v)
    } else if (audioRef.current) {
      audioRef.current.volume = v
    }
  }, [isPremium])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopProgressTicker()
      audioRef.current?.pause()
    }
  }, [stopProgressTicker])

  return { play, pause, resume, seek, setVol }
}

