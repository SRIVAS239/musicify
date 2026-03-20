import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../utils/appStore'

// Use these everywhere instead of raw useDispatch / useSelector
export const useAppDispatch: () => AppDispatch               = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Convenience — avoids writing the selector function in every component
export const useIsLoggedIn = () =>
  useAppSelector(s =>
    !!s.auth.accessToken &&
    !!s.auth.expiresAt   &&
    Date.now() < s.auth.expiresAt
  )

// export const useIsPremium    = () => useAppSelector(s => s.auth.isPremium)
// export const useCurrentUser  = () => useAppSelector(s => s.auth.user)
export const useAccessToken  = () => useAppSelector(s => s.auth.accessToken)