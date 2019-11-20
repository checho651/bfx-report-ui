import { put, select, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE, replace } from 'connected-react-router'
import _isEmpty from 'lodash/isEmpty'

import { PATHMAP } from 'state/query/utils'

import { setLastRoute, setRouteParams } from './actions'
import { getLastRoute, getRouteParams } from './selectors'

function* locationChange({ payload }) {
  const { isFirstRendering, location } = payload
  const { pathname, search, state } = location

  if (!_isEmpty(state) && state.isSkipped) {
    return
  }

  const [, path] = pathname.split('/')
  const route = PATHMAP[`/${path}`]
  if (!route) {
    return
  }

  // return previously saved params on route change
  const lastRoute = yield select(getLastRoute)
  if (route !== lastRoute && !isFirstRendering) {
    const routeParams = yield select(getRouteParams, route)
    if (_isEmpty(routeParams)) {
      return
    }

    /* eslint-disable-next-line no-shadow */
    const { pathname, search } = routeParams
    yield put(replace(`${pathname}${search}`, { isSkipped: true })) // skip next location change check
    return
  }

  const options = {
    route,
    params: {
      pathname,
      search,
    },
  }

  yield put(setRouteParams(options))
}

function* lastRouteSet({ payload }) {
  const { location: { pathname } } = payload
  const [, path] = pathname.split('/')

  const route = PATHMAP[`/${path}`]
  yield put(setLastRoute(route))
}

export default function* routingSaga() {
  yield takeLatest(LOCATION_CHANGE, locationChange)
  yield takeLatest(LOCATION_CHANGE, lastRouteSet)
}
