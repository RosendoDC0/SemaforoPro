export type TrafficColor = 'red' | 'yellow' | 'green'

interface LightConfig {
  color: TrafficColor
  duration: number
  label: string
  hex: string
}

export const LIGHTS: LightConfig[] = [
  { color: 'red',    duration: 4000, label: 'Alto',     hex: '#ff3b3b' },
  { color: 'yellow', duration: 2000, label: 'Precaución', hex: '#ffcc00' },
  { color: 'green',  duration: 4000, label: 'Adelante', hex: '#39d353' },
]

let timer: ReturnType<typeof setTimeout> | null = null
let progressTimer: ReturnType<typeof setInterval> | null = null
let elapsed = 0

export function useTrafficLight() {
  const activeIndex = useState<number>('traffic-index', () => 0)
  const running = useState<boolean>('traffic-running', () => false)
  const progress = useState<number>('traffic-progress', () => 0)

  const activeLight = computed<TrafficColor>(() => LIGHTS[activeIndex.value].color)
  const currentConfig = computed<LightConfig>(() => LIGHTS[activeIndex.value])

  function clearTimers() {
    if (timer) { clearTimeout(timer); timer = null }
    if (progressTimer) { clearInterval(progressTimer); progressTimer = null }
  }

  function scheduleNext() {
    const current = LIGHTS[activeIndex.value]
    elapsed = 0
    progress.value = 0

    progressTimer = setInterval(() => {
      elapsed += 50
      progress.value = Math.min((elapsed / current.duration) * 100, 100)
    }, 50)

    timer = setTimeout(() => {
      clearTimers()
      activeIndex.value = (activeIndex.value + 1) % LIGHTS.length
      if (running.value) scheduleNext()
    }, current.duration)
  }

  function start() {
    if (running.value) return
    running.value = true
    scheduleNext()
  }

  function stop() {
    running.value = false
    clearTimers()
    progress.value = 0
  }

  function reset() {
    stop()
    activeIndex.value = 0
  }

  return {
    lights: LIGHTS,
    activeLight,
    activeIndex,
    currentConfig,
    running,
    progress,
    start,
    stop,
    reset,
  }
}
