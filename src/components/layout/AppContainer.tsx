import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../utils/appStore'
import { searchAll } from '../../store/searchSlice'
import CardContainer from './CardContainer'
import Player from '../MusicPlayer/Player'

const AppContainer = () => {
  const dispatch = useDispatch<AppDispatch>()

  // Load default content when the app starts
  useEffect(() => {
    console.log('Loading default music content...')
    dispatch(searchAll({ query: 'top hits 2024' }))
  }, [dispatch])

  return (
    <div className="app-container overflow-x-hidden">
        <CardContainer />
        <Player />
    </div>
  )
}

export default AppContainer