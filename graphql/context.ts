import spotify from './clients/spotify'

export interface Context {
  spotify: typeof spotify
}

const context = {
  spotify,
}

export default context
