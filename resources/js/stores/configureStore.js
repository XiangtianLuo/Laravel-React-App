import { createStore, combineReducers, applyMiddleware} from 'redux';
import taskReducer from '../reducers/taskChange';
import createSagaMiddleware from 'redux-saga';
import rootsaga from '../sagas/taskSaga';

const sagaMiddleware = createSagaMiddleware();

export default ()=> {
    const store = createStore(taskReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootsaga);
    return store;
}; // normally, combine two reducers
  