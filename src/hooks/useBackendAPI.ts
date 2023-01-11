import React from "react"

import { AxiosRequestConfig } from "axios"

import { BackendAPI } from "entities/BackendAPI"
import { BackendAPIResponse } from "entities/BackendAPIResponse"

import { useAutoRef } from "./useAutoRef"
import { useLoading } from "./useLoading"

type TUseBackendAPIoptions<T, O> = {
  route: { method: AxiosRequestConfig["method"]; url: AxiosRequestConfig["url"] }
  callback: (instance: BackendAPI<T, O>) => BackendAPI<T, O>
  transform: (response: BackendAPIResponse<T, O>) => BackendAPIResponse<T, O> | unknown
  defaultResult: O
  callAutomatically: boolean
  resetBeforeLoading: boolean
}

const useBackendAPIOptions: TUseBackendAPIoptions<any, any> = {
  route: { method: "get", url: "" },
  callback: (instance = new BackendAPI()) => instance,
  transform: (response = new BackendAPIResponse()) => response.response,
  defaultResult: undefined,
  callAutomatically: true,
  resetBeforeLoading: true,
}

export function useBackendAPI<T, O>(
  options: Partial<TUseBackendAPIoptions<T, O>>,
  deps: React.DependencyList = [],
): [boolean, BackendAPIResponse<T, O>, () => Promise<void>, () => void] {
  const { route, callback, transform, callAutomatically, defaultResult, resetBeforeLoading } = {
    ...useBackendAPIOptions,
    ...options,
  }

  const [loading, startLoading, stopLoading] = useLoading(true)
  const [response, setResponse] = React.useState(() => new BackendAPIResponse<T, O>().transform(() => defaultResult))

  const routeRef = useAutoRef(route)
  const loadingRef = useAutoRef(loading)
  const callbackRef = useAutoRef(callback)
  const transformRef = useAutoRef(transform)
  const defaultResultRef = useAutoRef(defaultResult)

  const reset = React.useCallback(() => {
    setResponse(new BackendAPIResponse<T, O>().transform(() => defaultResultRef.current))
  }, [defaultResultRef])

  const call = React.useCallback(async () => {
    const callback = callbackRef.current
    const transform = transformRef.current
    const instance = callback(new BackendAPI(routeRef.current))

    const showLoader = instance.config.showLoader
    instance.config.showLoader = false

    if (showLoader) startLoading()
    if (resetBeforeLoading) {
      setResponse(new BackendAPIResponse<T, O>().transform(() => defaultResultRef.current))
    }

    const response = await instance.call()
    response.transform((instance) => transform(instance) ?? defaultResultRef.current)
    await response.result
    setResponse(response)

    if (showLoader) stopLoading()
  }, [startLoading, callbackRef, transformRef, routeRef, resetBeforeLoading, stopLoading, defaultResultRef])

  React.useEffect(() => {
    if (callAutomatically && !loadingRef.current) call()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call, callAutomatically, loadingRef, ...deps])

  return [loading, response, call, reset]
}
