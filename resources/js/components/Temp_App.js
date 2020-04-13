import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TasksPage from './TasksPage'
import CreateTask from './CreateTask';

const Temp_App =()=> (
  <div className="container">
  <div className="row justify-content-center">
    <TasksPage />
  </div>
</div>
)

export default Temp_App;
