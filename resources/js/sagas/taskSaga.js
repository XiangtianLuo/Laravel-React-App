import { put, takeEvery, call } from 'redux-saga/effects'

function* fetch_taskData() {
  const response = yield call(()=>axios.get('/tasks'));
  if(response.status === 200){
        yield put({
        type:"CREATE_TASKDATA",
        tasks: [...response.data.tasks]
    }) 
  }
}

export default function* rootSaga() {
    yield takeEvery('FETCH_TASKDATA', fetch_taskData)
}