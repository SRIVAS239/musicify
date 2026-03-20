import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { exchangeCode } from '../services/auth-service'
import  appStore  from '../utils/appStore'
import { setAuth, clearAuth } from '../store/authSlice'
// import { exchangeCode, fetchMe } from '@api/auth'

type Status = 'loading' | 'error'

export default function Callback() {
  const navigate   = useNavigate()
  const [status, setStatus]   = useState<Status>('loading')
  const [message, setMessage] = useState('')
  const ranRef = useRef(false) // prevents double-run in React StrictMode

  useEffect(() => {
    // React StrictMode mounts twice in development.
    // The code is single-use — the second attempt would get a 400 from Spotify.
    // ranRef prevents that.
    if (ranRef.current) return
    ranRef.current = true

    handleCallback()
  }, [])

  async function handleCallback() {
    const params      = new URLSearchParams(window.location.search)
    const code        = params.get('code')
    const spotifyError = params.get('error')

    // User clicked "Cancel" on Spotify's consent screen
    if (spotifyError) {
      navigate('/', { replace: true })
      return
    }

    // Arrived at /callback without a code — direct navigation, not a redirect
    if (!code) {
      navigate('/', { replace: true })
      return
    }

    const verifier = sessionStorage.getItem('pkce_verifier')
    console.log('Verifier from sessionStorage:', verifier)

    if (!verifier) {
      // This happens when:
      // 1. User opened the callback URL directly in a new tab
      // 2. SessionStorage was cleared between login start and callback
      // 3. Different browser/device than where login was initiated
      setStatus('error')
      setMessage('Login session expired. Please try again.')
      return
    }

    // Clean the URL immediately — code is single-use
    // Don't leave it in history where the user might accidentally re-visit
    window.history.replaceState({}, '', '/callback')

    try {
      // ── 1. Exchange code + verifier for tokens ────────────────
      const tokens = await exchangeCode(code, verifier);
        console.log('Tokens received from exchangeCode:', tokens)

      appStore.dispatch(setAuth({
        accessToken: tokens.access_token,
        expiresAt: Date.now() + tokens.expires_in * 1000,
        scope: tokens.scope,
        tokenType: tokens.token_type,
      }))

      // ── 3. Refresh token → sessionStorage ─────────────────────
      // sessionStorage survives page refresh but not new tabs.
      // Never write access_token here.
      sessionStorage.setItem('spotify_refresh_token', tokens.refresh_token)

    //   // ── 4. Verifier is consumed — delete it ───────────────────
      sessionStorage.removeItem('pkce_verifier')

    //   // ── 5. Fetch user profile (needed for Premium check) ──────
    //   const user = await fetchMe(tokens.access_token)
    //   appStore.dispatch(setUser(user))

      // ── 6. Navigate home ──────────────────────────────────────
      // replace: true so the user can't press Back to re-run the callback
      navigate('/', { replace: true })

    } catch (err) {
      console.error('[Callback] Failed:', err)

      // Clean up any partial state
      appStore.dispatch(clearAuth())
      sessionStorage.removeItem('spotify_refresh_token')
      sessionStorage.removeItem('pkce_verifier')

      setStatus('error')
      setMessage(
        err instanceof Error
          ? err.message
          : 'Login failed. Please try again.'
      )
    }
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-bg-base">
        <p className="text-sm text-error">{message}</p>
        <button
          onClick={() => navigate('/', { replace: true })}
          className="px-6 py-2 bg-accent text-accent-fg font-semibold rounded-full text-sm hover:bg-accent-hover transition-colors"
        >
          Back to home
        </button>
      </div>
    )
  }

  // Loading state — shown for less than a second in practice
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-bg-base">
      <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-fg-muted">Connecting to Spotify…</p>
    </div>
  )
}