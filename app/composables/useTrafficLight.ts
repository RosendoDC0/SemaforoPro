/**
 * useTrafficLight — Composable para el ciclo automático del semáforo.
 *
 * Secuencia: rojo → amarillo → verde → rojo …
 * Tiempos por defecto (ms):
 *   - Rojo:    4000 ms
 *   - Amarillo: 2000 ms
 *   - Verde:   4000 ms
 */

export type TrafficColor = 'red' | 'yellow' | 'green'

interface LightConfig {
  color: TrafficColor
  duration: number // ms
  label: string
  hex: string
}

const LIGHTS: LightConfig[] = [
  { color: 'red',    duration: 4000, label: 'Alto',     hex: '#ff3b3b' },
  { color: 'yellow', duration: 2000, label: 'Precaución', hex: '#ffcc00' },
  { color: 'green',  duration: 4000, label: 'Adelante', hex: '#39d353' },
]

// Singleton compartido entre instancias
const activeIndex = ref<number>(0)
const running = ref<boolean>(false)
const progress = ref<number>(0)

let timer: ReturnType<typeof setInterval> | null = null
let progressTimer: ReturnType<typeof setInterval> | null = null
let elapsed = 0

function clearTimers() {
  if (timer) { clearTimeout(timer); timer = null }
  if (progressTimer) { clearInterval(progressTimer); progressTimer = null }
}

function scheduleNext() {
  const current = LIGHTS[activeIndex.value]
  elapsed = 0
  progress.value = 0

  // Actualiza la barra de progreso cada 50 ms
  progressTimer = setInterval(() => {
    elapsed += 50
    progress.value = Math.min((elapsed / current.duration) * 100, 100)
  }, 50)

  // Avanza al siguiente color cuando se acaba el tiempo
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

export function useTrafficLight() {
  const activeLight = computed<TrafficColor>(() => LIGHTS[activeIndex.value].color)
  const currentConfig = computed<LightConfig>(() => LIGHTS[activeIndex.value])

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
