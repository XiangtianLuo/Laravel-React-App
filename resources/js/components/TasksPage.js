import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TasksList from './TasksList';
import TasksFilter from './TasksFilter';
import CreateTask from './CreateTask';
import PaginationPage from './Pagination';


const mapStateToProps = (state) =>{
  return {
      tasks: [...state.tasks],
      filtered_tasks: [...state.filtered_tasks],
      pagination_tasks:[...state.pagination_tasks],
      activePage: state.activePage
  }
}

class TasksPage extends Component {//This component will fetch the data and dump into the taskslist component
  constructor(props){
      super(props);
      this.state = {
          tasks:[...this.props.tasks],
          activePage: this.props.activePage
      }
      this.initialization = this.initialization.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handlePageChange = this.handlePageChange.bind(this);
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

  handlePageChange(pageNumber) {
    const { dispatch } = this.props;
    dispatch({
      type:'TASK_PAGINATION',
      targeted_page: pageNumber,
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

    dispatch ({ 
        type: 'CREATE_NEWTASK',
        customer_name: this.state.customer_name,
        trackingNumber: this.state.trackingNumber, 
        orderDescription:this.state.orderDescription,
        orderDescription_string:orderDescription_string,
        freightCompany: this.state.freightCompany
    })
  }

  shouldComponentUpdate(NextProps, NextState){
    return NextProps.activePage !=  this.props.activePage || JSON.stringify(NextProps.filtered_tasks) != JSON.stringify(this.props.filtered_tasks)||JSON.stringify(NextProps.pagination_tasks) != JSON.stringify(this.props.pagination_tasks)
  }//if without JSON.stringfy to compare 2 arrays, the componentDidUpdate will get into the endless loop due to the constant "false" value of arrayA == arrayB

  componentDidUpdate(){
    this.handlePageChange(this.props.activePage) //This part is very important, since it will always call function: handlePageChange to get the new pagination 
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
                <TasksList handleDelete={this.handleDelete} tasks={this.props.pagination_tasks} />
              </div>
          </div>
          <PaginationPage totalItemsCount={this.props.filtered_tasks.length} handlePageChange={this.handlePageChange} activePage={this.props.activePage}/>
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