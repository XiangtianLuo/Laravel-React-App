import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TasksPage from './TasksPage'
import CreateTask from './CreateTask';

const Temp_App =()=> (
      <nav class="sidenav shadow-right sidenav-light">
        <div class="sidenav-menu">
          <div class="nav accordion" id="accordionSidenav">
            <i data-feather="filter"></i>
            <Link class="nav-link a-color" to={`/home`}>  订单列表 </Link> 
            <Link class="nav-link a-color" to={`/createTask`}> 建立新订单 </Link>
            <Link class="nav-link a-color" to={`/dataChart`}>  数据图表 </Link>
          </div>
        </div>
      </nav>
)

export default Temp_App;
