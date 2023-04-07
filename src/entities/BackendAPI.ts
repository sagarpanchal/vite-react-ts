import { AxiosError, AxiosRequestConfig } from "axios"

import { LoaderService } from "services/loader.service"

import { GenericObject } from "utils/types"

import { axios } from "libraries/axios"
import { isEmpty, objectToQueryString } from "utils"

import { BackendAPIResponse } from "./BackendAPIResponse"

interface BackendAPIConfig {
  baseUrl?: AxiosRequestConfig["baseURL"]
  headers?: AxiosRequestConfig["headers"]
  method?: AxiosRequestConfig["method"]
  url?: AxiosRequestConfig["url"]
  payload?: AxiosRequestConfig["data"]
  showLoader?: boolean
  notifyError?: boolean
  notifyResponse?: boolean
  onDownloadProgress?: AxiosRequestConfig["onDownloadProgress"]
  onUploadProgress?: AxiosRequestConfig["onUploadProgress"]
}

export class BackendAPI<T, O> {
  static identifier = "BackendAPI"

  // static BASE_URL = ""
  // static ROUTES = API_ROUTES
  url: BackendAPIConfig["url"]
  config: BackendAPIConfig = {}
  #abortController = new AbortController()

  constructor(_config: BackendAPIConfig = {}) {
    this.url = _config.url
    this.config.url = _config.url
    this.config.method = _config.method
    this.config.payload = {}
    this.config.showLoader = false
    this.config.notifyError = true
    this.config.notifyResponse = false
  }

  static isBackendAPI(input?: unknown) {
    return input?.constructor === BackendAPI
  }

  clone(config?: BackendAPIConfig) {
    const clone = new BackendAPI<T, O>(this.config)
    clone.config = { ...this.config, ...config }
    return clone
  }

  static combineURLs(...args: any[]) {
    return args
      .filter((str) => !isEmpty(str))
      .join("/")
      .replace(/([^:]\/)\/+/g, "$1")
  }

  setConfig(config?: BackendAPIConfig) {
    return this.clone({ ...config })
  }

  setURLParams(...args: any[]) {
    return this.clone({
      url: BackendAPI.combineURLs(this.url, ...args),
    })
  }

  setQueryParams(params: GenericObject = {}) {
    return this.clone({
      url: `${this.url}${objectToQueryString(params)}`,
    })
  }

  showLoader(showLoader = true) {
    return this.clone({ showLoader })
  }

  notifyResponse(notifyResponse = true) {
    return this.clone({ notifyResponse })
  }

  notifyError(notifyError = true) {
    return this.clone({ notifyError })
  }

  setPayload(payload?: BackendAPIConfig["payload"]) {
    return this.clone({ payload })
  }

  onUploadProgress(onUploadProgress?: BackendAPIConfig["onDownloadProgress"]) {
    return this.clone({ onUploadProgress })
  }

  onDownloadProgress(onDownloadProgress?: BackendAPIConfig["onDownloadProgress"]) {
    return this.clone({ onDownloadProgress })
  }

  async call(abortController = new AbortController()) {
    const config = this.config
    this.#abortController = abortController

    if (config.showLoader) LoaderService.startLoading()

    const requestParams: AxiosRequestConfig = {
      baseURL: config.baseUrl,
      url: config.url,
      method: config.method,
      data: config.payload,
      headers: config.headers,
      onUploadProgress: config.onDownloadProgress,
      onDownloadProgress: config.onDownloadProgress,
      signal: this.#abortController.signal,
    }

    const output = new BackendAPIResponse()

    try {
      const response = await axios.request(requestParams)
      output.response = response
    } catch (error) {
      output.error = (error as AxiosError) ?? "Unknown Error"
    }

    if (config.showLoader) LoaderService.stopLoading()

    return output as BackendAPIResponse<T, O>
  }

  abort() {
    this.#abortController.abort()
    return this
  }
}
