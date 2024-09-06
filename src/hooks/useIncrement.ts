import { useState, useEffect } from 'react'

type CallbackFunction = () => void

const useIncrement = (
  start: number,
  end: number,
  callback: CallbackFunction,
) => {
  const [current, setCurrent] = useState(start)

  useEffect(() => {
    if (current < end) {
      const timer = setTimeout(() => setCurrent(current + 1), 30)
      return () => clearTimeout(timer)
    } else {
      callback()
    }
  }, [current, end, callback])

  return current
}

export default useIncrement
