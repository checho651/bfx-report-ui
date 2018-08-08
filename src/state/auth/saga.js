import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { postJsonfetch } from 'state/utils'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { platform } from 'var/config'

import types from './constants'
import { setAuthToken, updateAuthStatus } from './actions'

function getAuth(auth) {
  return postJsonfetch(`${platform.API_URL}/check-auth`, {
    auth,
  })
}

function* checkAuth() {
  try {
    const base = yield select(state => state.base)
    const data = yield call(getAuth, {
      apiKey: base.apiKey,
      apiSecret: base.apiSecret,
    })
    const { result = false, error } = data
    yield put(updateAuthStatus(result))

    if (result) {
      yield put(updateSuccessStatus(`Auth Success at ${(new Date()).toLocaleString()}`))
    } else {
      yield put(updateErrorStatus('Auth Fail'))
    }

    if (error) {
      yield put(updateErrorStatus(`Auth fail ${JSON.stringify(error)}`))
    }
  } catch (fail) {
    yield put(updateErrorStatus(`Auth request fail ${JSON.stringify(fail)}`))
  }
}

function* checkAuthWithToken({ payload: authToken }) {
  try {
    yield put(setAuthToken(authToken))
    const data = yield call(getAuth, { authToken })
    const { result = false, error } = data
    yield put(updateAuthStatus(result))

    if (result) {
      yield put(updateSuccessStatus(`Auth Success at ${(new Date()).toLocaleString()}`))
    } else {
      yield put(updateErrorStatus('Auth Fail'))
    }

    if (error) {
      yield put(updateErrorStatus(`Auth fail ${JSON.stringify(error)}`))
    }
  } catch (fail) {
    yield put(updateErrorStatus(`Auth request fail ${JSON.stringify(fail)}`))
  }
}

export default function* authSaga() {
  yield takeLatest(types.CHECK_AUTH, checkAuth)
  yield takeLatest(types.CHECK_AUTH_WITH_TOKEN, checkAuthWithToken)
}