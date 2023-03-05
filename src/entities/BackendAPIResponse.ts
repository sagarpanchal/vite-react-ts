import { AxiosError, AxiosResponse } from "axios"

import { isEmpty } from "utils"

export interface BackendAPIResponseParams {
  error?: Error | AxiosError<unknown>
  response?: AxiosResponse<unknown>
  result?: unknown
}

export class BackendAPIResponse<T, O> {
  #error?: Error | AxiosError<T>
  #response?: AxiosResponse<T>
  #result?: O

  constructor(params: BackendAPIResponseParams = {}) {
    this.#error = params?.error
    this.#response = params?.response as AxiosResponse<T>
    this.#result = params?.result as O
  }

  set error(error: BackendAPIResponseParams["error"]) {
    this.#error = error as AxiosError<T>
  }

  get error() {
    return this.#error
  }

  set response(response: BackendAPIResponseParams["response"]) {
    this.#response = response as AxiosResponse<T>
  }

  get response() {
    return (this.#response ?? (this.#error as AxiosError)?.response) as AxiosResponse
  }

  get failed() {
    return !this.ok || !isEmpty(this.error)
  }

  get ok() {
    return (this.response as AxiosResponse)?.status > 99 && (this.response as AxiosResponse)?.status < 400
  }

  get notOk() {
    return !this.ok
  }

  get result() {
    return this.#result
  }

  get data() {
    return this.#response?.data
  }

  transform(callback: (t: this) => O) {
    this.#result = callback(this)
    return this
  }

  toArray() {
    return [this.error, this.response, this]
  }
}
