import { useState, useEffect } from 'react'
import tinykeys from 'tinykeys'

const useKeyListener = (toggleWithKeys) => {
  const [isPrompted, setIsPrompted] = useState(false)

  useEffect(() => {
    // use the user-defined key combo if available, otherwise default
    const keysCombo = toggleWithKeys ? toggleWithKeys : 'Control+Space'

    let unsubscribe = tinykeys(window, {
      [keysCombo]: (e) => {
        e.preventDefault()
        // user is toggling Summon
        setIsPrompted(!isPrompted)
      }
    })

    // cleanup
    return () => {
      unsubscribe()
    }
  }, [isPrompted])

  return [isPrompted]
}

export default useKeyListener
