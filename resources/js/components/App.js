import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const mapStateToProps = (state) =>{
    console.log(state);
    return {
        trackingNumber:state.trackingNumber,
        orderDescription:state.orderDescription,
        tasks: [...state.tasks]
    }
} // enable this component the access to the Rudux-store and define what it wants to get.  

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            trackingNumber:this.props.trackingNumber, // Use the current state
            orderDescription: this.orderDescription,
            tasks:[...this.props.tasks]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTask = this.renderTask.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    } 

    handleSubmit(e){
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch ({ type: 'CREATE_NEWTASK', payload:{ 
            trackingNumber: this.state.trackingNumber, 
            orderDescription:this.state.orderDescription}}
        )
    }

        //axios.post('/tasks', {
        //   trackingNumber: this.state.trackingNumber,
        //    orderDescription:this.state.orderDescription
        //}).then(response=>{
        //    console.log(response);
        //    this.setState({
        //        tasks:[response.data, ...this.state.tasks],//add the new one to the existing array
        //        name: ''
        //    });
        //});

    handleChange(e){ // according to the react doc, the way to handle mutuple inputs, altough it is shit. 
        const target = e.target;
        switch (target.name){
            case "trackingNumber": 
                this.setState({
                    trackingNumber: target.value
            })
            break;
            case "orderDescription":
                this.setState({
                    orderDescription:target.value
                })
            break;
        }
    }

    handleDelete(id) {
        const isNotId = task => task.id !== id;
        const updatedTask = this.state.tasks.filter(isNotId);
        this.setState({tasks: updatedTask });

        axios.delete(`/tasks/${id}`);
    }

    getTasks() {
        const { dispatch } = this.props;
        dispatch({ type: 'FETCH_TASKDATA'});  
        //axios.get('/tasks').then(response=> this.setState({
        //    tasks: [...response.data.tasks]
        //})); 
    }

    componentWillMount() {
        this.getTasks();
    }

    renderTask(){
        return this.props.tasks.map(task => (
            <div key={task.id} className='media'>
                <div className='media-body'> 
                    <div> 
                        <span>
                            <br />
                            {task.trackingNumber + task.description}
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
                                        onChange = {this.handleChange}
                                        //value={this.props.trackingNumber} // we use props directly
                                        placeholder='Create a trackingNumber' 
                                        required
                                        maxLength = '255'
                                        name='trackingNumber'
                                        />
                                        <textarea 
                                        className='form-control' 
                                        row='5'// we use props directly
                                        placeholder='The discription about the order' 
                                        required
                                        maxLength = '255'
                                        name='orderDescription'
                                        onChange = {this.handleChange}
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

export default connect(mapStateToProps)(App);