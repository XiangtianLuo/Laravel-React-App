import { put, takeEvery, call, all } from 'redux-saga/effects'
//Saga file will take care of the side-effect(namely asynchronous action only), once finished, then change the state locally via action

function* fetch_Tasks_Items_Data() {
  const response = yield call(()=>axios.get('/tasks'));
  if(response.status === 200){
    yield put({
      type:"FETCH_TASKS_AND_ITEMS_DATA",//This is locally changing the state at redux store
      tasks: [...response.data.tasks],
      itemList: [...response.data.itemList]
    })
  }
}

function* create_newTask(action) {
  const response = yield call(()=> axios.post('/tasks', {
    customer_name: action.customer_name,
    trackingNumber: action.trackingNumber,
    orderDescription: action.orderDescription,
    freightCompany: action.freightCompany,
  }))
  if(response.status === 200){
    yield put({
      type:"CREATE_NEWTASK_SUCCESSFUL",
      payload: response.data
      //trackingNumber:response.data.trackingNumber,
      //orderDescription:response.data.description,
    })
  }
} // create the order detail*** 

function* watchCreateNewTask() {
  yield takeEvery('CREATE_NEWTASK', create_newTask)
}

function* watchFetchTaskAndItemsData() {
  yield takeEvery('FETCH_TASKS_ITEMS_DATA', fetch_Tasks_Items_Data)
}

export default function* rootSaga() {
  yield all([
    watchFetchTaskAndItemsData(),
    watchCreateNewTask()
  ])
}