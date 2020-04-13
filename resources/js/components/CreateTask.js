import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskForm from './TaskForm';

const mapStateToProps = (state) =>{
  return {
      customer_name: state.customer_name,
      trackingNumber:state.trackingNumber,
      orderDescription:state.orderDescription,
      tasks: [...state.tasks],
      itemList:[...state.itemList],
  }
}

const CreateTask = (props)=> {
  return <TaskForm handleSubmit={(task)=>{ //by dumping the handleSubmit into the child component, the Taskform can be shared by Edit and Create Task
    const { dispatch } = props;
    dispatch ({ 
        type: 'CREATE_NEWTASK',
        customer_name: task.customer_name,
        trackingNumber: task.trackingNumber, 
        orderDescription:task.orderDescription,
        orderDescription_string:task.orderDescription_string,
        freightCompany: task.freightCompany
    })
    props.history.push('/home');
  }}/>
}

export default connect(mapStateToProps)(CreateTask);