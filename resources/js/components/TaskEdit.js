import React, { Component } from 'react';

export default class TaskEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            task:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        axios.put(`/tasks/${this.props.match.params.id}`, {
            name: this.state.name
        }).then(response=>{
            this.props.history.push('/');
        });
    }

    getTasks() {
        axios.get(`/tasks/${this.props.match.params.id}/edit`).then(response=> this.setState({
            task: response.data.task,
            name: response.data.task.name
        }));
    }

    componentWillMount() {
        this.getTasks();
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Task</div>

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
                                        Edit Task
                                    </button>
                                </form>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}