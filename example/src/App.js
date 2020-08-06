import React from 'react'

import Summon from 'summon-js'
import 'summon-js/dist/index.css'

const config = {
  toggleWith: '$mod+D'
}

const App = () => {
  return <Summon config={config} />
}

export default App
