import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const mapStateToProps = (state) =>{
    console.log(state);
    return {
        customer_name: state.customer_name,
        trackingNumber:state.trackingNumber,
        orderDescription:state.orderDescription,
        tasks: [...state.tasks]
    }
}

const itemsList = ["A2 1段","A2 2段","A2 3段","A2 4段","爱他美铂金1段","爱他美铂金2段","爱他美铂金3段","爱他美铂金4段","爱他美金装1段","爱他美金装2段","爱他美金装3段","爱他美金装4段","Bubs羊奶 1段","Bubs羊奶 2段","Bubs羊奶 3段","贝拉米1段","贝拉米2段","贝拉米3段","贝拉米4段","小安素奶粉","糖尿病人奶粉","其他奶粉",'Bioisland 儿童乳钙','Bioisland 儿童DHA','Bioisland 儿童鳕鱼油','Bioisland 儿童锌','Bioisland 孕妇DHA','Ostelin 儿童VD滴液','']

// enable this component the access to the Rudux-store and define what it wants to get.  

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            customer_name: this.props.customer_name,
            trackingNumber:this.props.trackingNumber, // Use the current state
            orderDescription: this.props.orderDescription,
            freightCompany: this.props.freightCompany,
            tasks:[...this.props.tasks]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTask = this.renderTask.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getTasks = this.getTasks.bind(this);
    } 

    handleSubmit(e){
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch ({ 
            type: 'CREATE_NEWTASK',
            customer_name: this.state.customer_name,
            trackingNumber: this.state.trackingNumber, 
            orderDescription:this.state.orderDescription,
            freightCompany: this.state.freightCompany
        })
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
            case "customer_name": 
            this.setState({
                    customer_name: target.value
            })
            break;
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
            case "freightCompany": 
            this.setState({
                    freightCompany: target.value
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
                                        className='form-control mb-2' 
                                        row='5'
                                        onChange = {this.handleChange}
                                        //value={this.props.trackingNumber} // we use props directly
                                        placeholder='Enter the customer name' 
                                        required
                                        maxLength = '255'
                                        name='customer_name'
                                        />
                                        <textarea 
                                        className='form-control mb-2' 
                                        row='5'
                                        onChange = {this.handleChange}
                                        //value={this.props.trackingNumber} // we use props directly
                                        placeholder='Enter the TrackingNumber' 
                                        required
                                        maxLength = '255'
                                        name='trackingNumber'
                                        />
                                        <div className='container'>
                                            <div className='row' >
                                                <div className='col-6 col align-self-center'>
                                                    <div className='row' >
                                                        <select className='col-5' id="exampleFormControlSelect1">
                                                            <option>A2</option>
                                                            <option>Bellamy</option>
                                                            <option>Aptimail</option>
                                                            <option>Kericare</option>
                                                            <option>Bubs</option>
                                                        </select>
                                                        <select className='col-5 ml-1' id="exampleFormControlSelect2">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                            <option>6</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='col-6 no-gutters'>
                                                    <div className= 'row justify-content-end'>
                                                        <button className='btn btn-sm btn-success col-4'> Confirm</button>
                                                    </div>    
                                                </div>
                                            </div>
                                        </div>

                                        <textarea 
                                        className='form-control mt-2 mb-2' 
                                        row='5'// we use props directly
                                        placeholder='The discription about the order' 
                                        required
                                        maxLength = '255'
                                        name='orderDescription'
                                        onChange = {this.handleChange}
                                        />
                                        <textarea 
                                        className='form-control' 
                                        row='5'
                                        onChange = {this.handleChange}
                                        //value={this.props.trackingNumber} // we use props directly
                                        placeholder='Please choose the freight company' 
                                        required
                                        maxLength = '255'
                                        name='freightCompany'
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