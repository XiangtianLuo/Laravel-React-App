import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskForm from './TaskForm';

const mapStateToProps = (state) =>{
  return {
      tasks: [...state.tasks],
  }
}

class EditTask extends Component {

  constructor(props){
    super(props)
  }

  getTargetedTask (Taskid){ // find the current task by using 'find' method
    let current_task = this.props.tasks.find((task)=> task.id == Taskid )
    let { id, customer_name, trackingNumber, description, freightCompany } = current_task;
    return {
      id,
      customer_name,
      trackingNumber,
      description,
      freightCompany
    }
  }


  render(){
    return ( 
      <div><TaskForm handleSubmit={(task)=>{ //by dumping the handleSubmit into the child component, the Taskform can be shared by Edit and Create Task
      const { dispatch } = this.props;
      const {  targeted_id, customer_name, trackingNumber, orderDescription, orderDescription_string, freightCompany} = task
      dispatch ({
          type: 'EDIT_TASK',//需要修改并且简化操作
          targeted_id,
          customer_name,
          trackingNumber, 
          orderDescription_string,
          freightCompany
      })
      setTimeout(()=>this.props.history.push('/home'),2000)
    }}
    isEditForm={true}
    current_task ={this.getTargetedTask(this.props.match.params.id)} // pass down the current_task data to the child component
    />
    </div>)
  }
}


export default connect(mapStateToProps)(EditTask);