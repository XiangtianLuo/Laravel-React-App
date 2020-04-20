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
  console.log(action)
  const response = yield call(()=> axios.post('/tasks', {
    customer_name: action.customer_name,
    trackingNumber: action.trackingNumber,
    orderDescription: action.orderDescription,
    freightCompany: action.freightCompany,
    orderDescription_string: action.orderDescription_string
  }))
  if(response.status === 200){
    yield put({
      type:"CREATE_NEWTASK_SUCCESSFUL",
      payload: response.data
      //trackingNumber:response.data.trackingNumber,
      //orderDescription:response.data.description,
    })
  }
}

function* delete_task(action){
  const response = yield call(()=> axios.delete(`/tasks/${action.Deleted_id}`));
  if(response.status === 200){
    yield put({
      type:'UPDATE_TASKS',
      Deleted_id: action.Deleted_id
    })
  }
}

function* edit_task(action){
  console.log(action)
  const response = yield call(()=> axios.put(`/tasks/${action.targeted_id}`,{
    customer_name:action.customer_name,
    trackingNumber: action.trackingNumber,
    description:action.orderDescription_string,
    freightCompany:action.freightCompany
  }));
  console.log(response)
  //if(response.status === 200){// waite for more info
  //  yield put({
  //    type:'UPDATE_CURRENT_TASK',
  //    payload: response.data
  //  })
  //}
}

function* watchEditTask() {
  yield takeEvery('EDIT_TASK', edit_task)
}

function* watchCreateNewTask() {
  yield takeEvery('CREATE_NEWTASK', create_newTask)
}

function* watchDeleteTask() {
  yield takeEvery('DELETE_TASK', delete_task)
}

function* watchFetchTaskAndItemsData() {
  yield takeEvery('FETCH_TASKS_ITEMS_DATA', fetch_Tasks_Items_Data)
}

export default function* rootSaga() {
  yield all([
    watchFetchTaskAndItemsData(),
    watchCreateNewTask(),
    watchDeleteTask(),
    watchEditTask()
  ])
}