import { loaderActions } from "redux/reducers/loader.reducer"
import { store } from "redux/store"

export class LoaderService {
  static identifier = "Loader"

  static startLoading() {
    store.dispatch(loaderActions.increase())
  }

  static stopLoading() {
    store.dispatch(loaderActions.decrease())
  }

  static adjustCount(count = 0) {
    store.dispatch(loaderActions.adjust(count))
  }

  static resetLoading() {
    store.dispatch(loaderActions.reset())
  }
}
