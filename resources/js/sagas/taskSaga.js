import { put, takeEvery, call, all } from 'redux-saga/effects'
//Saga file will take care of the side-effect(namely asynchronous action only), once finished, then change the state locally via action

function* fetch_taskData() {
  const response = yield call(()=>axios.get('/tasks'));
  if(response.status === 200){
        yield put({
        type:"CREATE_TASKDATA",
        tasks: [...response.data.tasks]
    }) 
  }
}

function* create_newTask(action) {
  const response = yield call(()=> axios.post('/tasks', {
    trackingNumber: action.payload.trackingNumber,
    orderDescription: action.payload.orderDescription
  }))
  console.log(response);
  if(response.status === 200){
    yield put({
      type:"CREATE_NEWTASK",
      trackingNumber:response.data.trackingNumber,
      orderDescription:response.data.description
    })
  }
} // create the order detail*** 

function* watchCreateNewTask() {
  yield takeEvery('CREATE_NEWTASK', create_newTask)
}

function* watchFetchTaskData() {
  yield takeEvery('FETCH_TASKDATA', fetch_taskData)
}

export default function* rootSaga() {
  yield all([
    watchCreateNewTask(),
    watchFetchTaskData()
  ])
}