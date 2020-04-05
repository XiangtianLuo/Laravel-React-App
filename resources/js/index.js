import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import TaskEdit from './components/TaskEdit'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
//import { changeMind } from './actions/changTaskName'; about to abandon this action due to the size of the project
import { createStore, applyMiddleware} from 'redux';
import taskReducer from './reducers/taskChange';
import createSagaMiddleware from 'redux-saga';
import rootsaga from './sagas/taskSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(taskReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootsaga);

store.dispatch({type: "SET_UP"});

if (document.getElementById('root')) {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/:id/edit" component={TaskEdit} />
                    <Provider store = {store}>
                        <App />
                    </Provider>    
                </Switch>  
            </div>
        </BrowserRouter>
        , document.getElementById('root'));
}
