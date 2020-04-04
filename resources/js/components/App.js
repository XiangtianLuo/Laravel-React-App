import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            tasks:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTask = this.renderTask.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(e){
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        axios.post('/tasks', {
            name: this.state.name
        }).then(response=>{
            this.setState({
                tasks:[response.data, ...this.state.tasks],
                name: ''
            });
        });
    }

    handleDelete(id) {
        const isNotId = task => task.id !== id;
        const updatedTask = this.state.tasks.filter(isNotId);
        this.setState({tasks: updatedTask });

        axios.delete(`/tasks/${id}`);
    }

    getTasks() {
        axios.get('/tasks').then(response=> this.setState({
            tasks: [...response.data.tasks]
        }));
    }

    componentWillMount() {
        this.getTasks();
    }

    renderTask(){
        return this.state.tasks.map(task => (
            <div key={task.id} className='media'>
                <div className='media-body'> 
                    <div> 
                        {task.name}
                        <span>
                            <br />
                            {task.updated_at.split(' ').slice(0,1)}
                        </span>
                        <button className='btn-danger btn-sm float-right' onClick={()=> this.handleDelete(task.id)}> Delete </button>
                        <Link className='btn-warning btn-sm float-right mr-2' to={`/${task.id}/edit`} > Update </Link>
                    </div>
                </div>
            </div>
        ));
    }


    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">
                                <form onSubmit = {this.handleSubmit}>
                                    <div className = 'form-group'>
                                        <textarea 
                                        className='form-control' 
                                        row='5'
                                        value={this.state.name}
                                        placeholder='Create a new task' 
                                        required
                                        maxLength = '255'
                                        onChange={this.handleChange}
                                        />
                                    </div>
                                    <button type='submit' className="btn btn-primary">
                                        Create Task
                                    </button>
                                </form>
                                <hr />
                                {this.renderTask()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
