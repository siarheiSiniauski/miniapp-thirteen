import { useState, useEffect, useRef } from 'react'

interface UseAudioProps {
  url: string
  initialVolume?: number
}

const useAudio = ({ url, initialVolume = 1 }: UseAudioProps) => {
  const audioRef = useRef(new Audio(url))
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(initialVolume)

  const play = () => {
    audioRef.current
      .play()
      .catch((error) => console.error('Ошибка воспроизведения: ', error))
    setPlaying(true)
  }

  const stop = () => {
    audioRef.current.pause()
    audioRef.current.currentTime = 0 // Сбрасываем время воспроизведения на начало
    setPlaying(false)
  }

  const toggle = () => {
    if (playing) {
      stop()
    } else {
      play()
    }
  }

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    return () => {
      audioRef.current.pause()
    }
  }, [])

  return { playing, toggle, play, stop, volume, setVolume }
}

export default useAudio
