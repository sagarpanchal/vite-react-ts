import React from "react"

export function createFastContext<Store>(initialState: Store) {
  function useStoreData() {
    const store = React.useRef(initialState)

    const subscribers = React.useRef(new Set<() => void>())

    const get = React.useCallback(() => store.current, [])

    const set = React.useCallback((callback: (state: Store) => Store) => {
      store.current = callback(store.current)
      subscribers.current.forEach((callback) => callback())
    }, [])

    const subscribe = React.useCallback((callback: () => void) => {
      subscribers.current.add(callback)
      return () => subscribers.current.delete(callback)
    }, [])

    return { get, set, subscribe }
  }

  const StoreContext = React.createContext<ReturnType<typeof useStoreData> | null>(null)

  function Provider(props: React.PropsWithChildren) {
    const { children } = props
    return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>
  }

  function useContextStore() {
    const store = React.useContext(StoreContext)
    if (!store) throw new Error("Store not found")

    return store
  }

  function useContextSelector<SelectorOutput>(selector: (store: Store) => SelectorOutput) {
    const store = useContextStore()

    const state = React.useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState),
    )

    return state
  }

  return { Provider, useContextSelector, useContextStore }
}
