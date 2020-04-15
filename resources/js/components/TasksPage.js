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
  }
}

class TasksPage extends Component {//This component will fetch the data and dump into the taskslist component
  constructor(props){
      super(props);
      this.state = {
          activePage: 1,
          filtered_tasks:[]
      }
      this.initialization = this.initialization.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handlePageChange = this.handlePageChange.bind(this);
      this.onTextchange = this.onTextchange.bind(this);
  }

  initialization() {
      const { dispatch } = this.props;
      let ok = dispatch({ type: 'FETCH_TASKS_ITEMS_DATA'});
      dispatch({ type: 'FETCH_TASKS_ITEMS_DATA'});
      console.log(ok)
      
  }

  handleDelete(id) { //after handle delete method need to re-oriented to the 1st page
    const { dispatch } = this.props;
    dispatch({ 
      type: 'DELETE_TASK',
      Deleted_id: id
    })
    this.setState({
      activePage:1,
    })
  }

  onTextchange(Text){
    this.setState({
      filtered_tasks: Text.target.value.trim() === ''?this.props.tasks:this.props.tasks.filter((task,index)=>{
        let reg = new RegExp(Text.target.value)
        return  task.customer_name.trim().match(reg) ||  task.trackingNumber.trim().match(reg) || task.description.trim().match(reg);
      }),
      activePage:1
    })
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage:pageNumber
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

  componentWillMount() {
    this.initialization();
  }

  render() {
      const display_tasks = this.state.filtered_tasks == false? this.props.tasks: this.state.filtered_tasks
      return (
        <div className="col-md-10 text-center">
          <div className="card text-left"> 
              <TasksFilter onchange={this.onTextchange}/>
              <div className="card-body bg-light">
                <TasksList targeted_page={this.state.activePage} handleDelete={this.handleDelete} tasks={display_tasks} />
              </div>
          </div>
          <PaginationPage totalItemsCount={display_tasks.length} handlePageChange={this.handlePageChange} activePage={this.state.activePage}/>
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