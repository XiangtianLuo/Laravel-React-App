import React from 'react';
import ReactDOM from 'react-dom';
import Temp_App from './components/Temp_App'
import EditTask from './components/EditTask'
import {BrowserRouter, Switch, Route, Link, Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import DataChart from './components/DataChart'
//import { changeMind } from './actions/changTaskName'; about to abandon this action due to the size of the project
import { createStore, applyMiddleware} from 'redux';
import taskReducer from './reducers/taskChange';
import createSagaMiddleware from 'redux-saga';
import rootsaga from './sagas/taskSaga';
import CreateTask from './components/CreateTask';
import TasksPage from './components/TasksPage';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(taskReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootsaga);

if (document.getElementById('root')) {
    ReactDOM.render(
        <BrowserRouter>
            <div className="row appWrapper">
                <Switch>
                    <Provider store = {store}>
                        <Route path="/" component={Temp_App} />
                        <Route path="/dataChart" component={DataChart} />
                        <Route path="/createTask" component={CreateTask} />
                        <Route exact path="/:id/edit" component={EditTask} />
                        <Route exact path="/home" component={TasksPage} />
                    </Provider>    
                </Switch>  
            </div>
        </BrowserRouter>
        , document.getElementById('root'));
}
