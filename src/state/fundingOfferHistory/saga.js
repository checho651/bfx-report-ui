import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { formatRawSymbols, mapRequestSymbols } from 'state/symbols/utils'
import { getQuery, getTimeFrame } from 'state/query/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { getQueryLimit } from 'state/query/utils'
import { fetchDataWithPagination } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getFundingOfferHistory } from './selectors'

const TYPE = queryTypes.MENU_FOFFER
const LIMIT = getQueryLimit(TYPE)

function getReqFOffer({
  smallestMts,
  query,
  targetSymbols,
  filter,
}) {
  const params = getTimeFrame(query, smallestMts)
  params.limit = LIMIT
  params.filter = filter
  if (targetSymbols.length) {
    params.symbol = formatRawSymbols(mapRequestSymbols(targetSymbols))
  }
  return makeFetchCall('getFundingOfferHistory', params)
}

function* fetchFOffer() {
  try {
    const { targetSymbols } = yield select(getFundingOfferHistory, TYPE)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(fetchDataWithPagination, getReqFOffer, {
      smallestMts,
      query,
      targetSymbols,
      filter,
    })
    yield put(actions.updateFOffer(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'foffer.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'foffer.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshFOffer() {
  yield put(refreshPagination(TYPE))
}

function* fetchFOfferFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* fundingOfferSaga() {
  yield takeLatest(types.FETCH_FOFFER, fetchFOffer)
  yield takeLatest([types.REFRESH, types.ADD_SYMBOL, types.REMOVE_SYMBOL], refreshFOffer)
  yield takeLatest(types.FETCH_FAIL, fetchFOfferFail)
}
