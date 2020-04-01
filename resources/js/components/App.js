import React, { Component } from 'react';
import Axios from 'axios';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            tasks:[]
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
        axios.post('/tasks', {
            name: this.state.name
        }).then(response=>{
            console.log('successfully!!!',response)
        });
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
                                    <button type='submit' className="btn btn-primary float-right">
                                        Create Task
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
