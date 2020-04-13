import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) =>{
  return {
    filtered_tasks: [...state.filtered_tasks],
  }
}

const TasksFilter =(props)=> (
    <div className='container card-header row no-gutters align-items-center'>
      <div className='font-weight-bold col-4 '>当前订单</div>
        <div className='col-8'>
          <input onChange={(e)=> {
            props.dispatch({
              type:'TASKS_FILTER',
              filtered_information: e.target.value
            })
          }} className='float-right border border-primary rounded text-center' placeholder='快速查找订单'/>
        </div>
    </div>
)

export default connect(mapStateToProps)(TasksFilter);