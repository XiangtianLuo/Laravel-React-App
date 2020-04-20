import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskForm from './TaskForm';

const mapStateToProps = (state) =>{
  return {
  }
}

const CreateTask = (props)=> {
  return <div><TaskForm handleSubmit={(task)=>{ //by dumping the handleSubmit into the child component, the Taskform can be shared by Edit and Create Task
    const { dispatch } = props;
    const { customer_name, trackingNumber, orderDescription, orderDescription_string, freightCompany } = task
    dispatch ({ 
        type: 'CREATE_NEWTASK',
        customer_name,
        trackingNumber, 
        orderDescription,
        orderDescription_string,
        freightCompany
    })
    setTimeout(()=>props.history.push('/home'),2000)
  }}/>
  </div>
}

export default connect(mapStateToProps)(CreateTask);