import React from 'react'
import CardContainer from './CardContainer'
import Player from '../MusicPlayer/Player'

const AppContainer = () => {
  return (
    <div className="app-container">
        <CardContainer />
        <Player />
    </div>
  )
}

export default AppContainer