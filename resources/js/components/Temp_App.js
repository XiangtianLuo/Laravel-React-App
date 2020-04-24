import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Aperture, PlusSquare } from 'react-feather';
import { connect } from 'react-redux';
import TasksPage from './TasksPage';
import CreateTask from './CreateTask';

const Temp_App =()=> (
  <div id="wrapper">
    <div class="border-right" id="sidebar-wrapper">
    <div class="sidebar-heading"> 呼噜LW澳代小窝 </div>
    <div class="list-group list-group-flush bg-dark text-center">
      <Link class="list-group-item list-group-item-action " to={`/home`}><Aperture /> 订单列表</Link>     
      <Link class="list-group-item list-group-item-action " to={`/createTask`}><PlusSquare /> 新建订单</Link>
      <Link class="list-group-item list-group-item-action " to={`/dataChart`}><Activity /> 数据统计</Link>
    </div>
    </div>
  </div>
)

export default Temp_App;
