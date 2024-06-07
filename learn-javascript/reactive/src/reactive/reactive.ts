// https://vuejs.org/guide/extras/reactivity-in-depth.html

export function reactive(obj: any) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
      return true
    },
  })
}

export function ref(value: any) {
  const refObject = {
    get value() {
      track(refObject, "value")
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, "value")
    },
  }

  return refObject
}

type Key = string | symbol

type Effect = () => void

let activeEffect: Effect | null = null

// const globalSubscribers: WeakMap<any, Map<Key, Set<Effect>>> = new WeakMap()
const globalSubscribers: Map<any, Map<Key, Set<Effect>>> = new Map()

function getEffectsForProperty(
  target: any,
  key: string | symbol,
): Set<Effect> {
  let subscriber = globalSubscribers.get(target)
  if (subscriber === undefined) {
    subscriber = new Map()
    globalSubscribers.set(target, subscriber)
  }

  let effects = subscriber.get(key)
  if (effects === undefined) {
    effects = new Set()
    subscriber.set(key, effects)
  }

  return effects
}

function track(target: any, key: string | symbol) {
  if (activeEffect) {
    const effects = getEffectsForProperty(target, key)
    effects.add(activeEffect)
  }
}

function trigger(target: any, key: string | symbol) {
  const effects = getEffectsForProperty(target, key)
  effects.forEach((effect) => effect())
}

export function watchEffect(update: Effect) {
  const effect = () => {
    activeEffect = effect
    update()
    activeEffect = null
  }

  effect()
}
