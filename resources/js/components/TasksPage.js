import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TasksList from './TasksList';
import TasksFilter from './TasksFilter';
import CreateTask from './CreateTask';

const mapStateToProps = (state) =>{
  return {
      tasks: [...state.tasks],
      filtered_tasks: [...state.filtered_tasks]
  }
}

class TasksPage extends Component {//This component will fetch the data and dump into the taskslist component
  constructor(props){
      super(props);
      this.state = {
          tasks:[...this.props.tasks],
      }
      this.initialization = this.initialization.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
  }

  initialization() {
      const { dispatch } = this.props;
      dispatch({ type: 'FETCH_TASKS_ITEMS_DATA'}); 
  }

  handleDelete(id) {
    const { dispatch } = this.props;
    dispatch({ 
      type: 'DELETE_TASK',
      Deleted_id: id
    })
  }
  handleSubmit(e){
    e.preventDefault();
    const { dispatch } = this.props;
    let orderDescription_string = ((description='')=>{
        this.state.orderDescription.forEach((i)=>{
            description =  description + i.name + '*' + i.quantity + ' '
        })
        return description;
    })();
    console.log(orderDescription_string);
    dispatch ({ 
        type: 'CREATE_NEWTASK',
        customer_name: this.state.customer_name,
        trackingNumber: this.state.trackingNumber, 
        orderDescription:this.state.orderDescription,
        orderDescription_string:orderDescription_string,
        freightCompany: this.state.freightCompany
    })
}

  componentDidMount() {
      this.initialization();
  }
  render() {
      return (
        <div className="col-md-10 text-center">
          <div className="card text-left">
              <TasksFilter /> 
              <div className="card-body bg-light">
                <TasksList handleDelete={this.handleDelete} tasks={this.props.filtered_tasks} />
              </div>
          </div>
          <Link to={`/createTask`} > 
            <button className='btn-primary mt-2 rounded'>
              建立新订单 
            </button>
          </Link>
        </div>
      );
  }
}

export default connect(mapStateToProps)(TasksPage);