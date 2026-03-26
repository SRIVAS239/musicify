import CardContainer from './CardContainer'
import Player from '../MusicPlayer/Player'

const AppContainer = () => {
  return (
    <div className="app-container overflow-x-hidden">
        <CardContainer />
        <Player />
    </div>
  )
}

export default AppContainer