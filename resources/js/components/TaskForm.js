import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) =>{
    return {
        customer_name:state.customer_name,
        trackingNumber:state.trackingNumber,
        orderDescription:state.orderDescription,
        tasks: [...state.tasks],
        itemList:[...state.itemList]
    }
}

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            customer_name: this.props.customer_name,
            trackingNumber:this.props.trackingNumber, // Use the current state
            orderDescription: [],
            orderDescription_string:'',
            freightCompany: this.props.freightCompany,
            tasks:[...this.props.tasks],
            itemList:[...this.props.itemList],
            item_quantity:0,
            item_name:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.initialization = this.initialization.bind(this);
        this.handleItemSubmit = this.handleItemSubmit.bind(this);
        this.renderItems= this.renderItems.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    } 
    
    handleItemSubmit(){
        this.setState({
            orderDescription: [...this.state.orderDescription, {name:this.state.item_name, quantity: this.state.item_quantity}],//continue to add the new item_name and item-quantity to the order_description Array
            orderDescription_string: ((description='')=>{
                this.state.orderDescription.forEach((i)=>{
                    description =  description + i.name + '*' + i.quantity + ' '
                })
                return description;
            })()
        })
    }

    onSubmit(e){
        e.preventDefault();
        let orderDescription_string = ((description='')=>{
            this.state.orderDescription.forEach((i)=>{
                description =  description + i.name + '*' + i.quantity + ' '
            })
            return description;
        })();
        
        this.props.handleSubmit({ 
            customer_name: this.state.customer_name,
            trackingNumber: this.state.trackingNumber, 
            orderDescription:this.state.orderDescription,
            orderDescription_string:orderDescription_string,
            freightCompany: this.state.freightCompany
        });
    }

    initialization() {
        const { dispatch } = this.props;
        dispatch({ type: 'FETCH_TASKS_ITEMS_DATA'}); 
    }

    componentWillMount(){
        this.initialization();
    }

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
            case "item_name":
                this.setState({
                        item_name:target.value
                    })
            break;         
            case "item_quantity":
                this.setState({
                        item_quantity:parseInt(target.value)
                    })
            break;
        }
    }

    renderItems(){
        return this.props.itemList.map((item, index) => (
            <option key={index} value={item.name}> {item.name} </option>
        ))
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>
                            <div className="card-body">
                                <form onSubmit = {this.onSubmit}>
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
                                        placeholder='Enter the TrackingNumber' 
                                        required
                                        maxLength = '255'
                                        name='trackingNumber'
                                        />
                                        <div className='container'>
                                            <div className='row' >
                                                <div className='col-6 col align-self-center'>
                                                    <div className='row' >
                                                        <select onChange={this.handleChange} className='col-5' name="item_name">
                                                            {this.renderItems()}
                                                        </select>
                                                        <select onChange={this.handleChange} className='col-5 ml-1' name="item_quantity">
                                                            <option > 数量 </option>
                                                            <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                            <option value={3}>3</option>
                                                            <option value={4}>4</option>
                                                            <option value={5}>5</option>
                                                            <option value={6}>6</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='col-6 no-gutters'>
                                                    <div className= 'row justify-content-end'>
                                                        <button onClick={this.handleItemSubmit} type='submit' className='btn btn-sm btn-success col-4'> Confirm </button>
                                                    </div>    
                                                </div>
                                            </div>
                                        </div>

                                        <textarea 
                                        className='form-control mt-2 mb-2' 
                                        row='5'// we use props directly
                                        placeholder='The discription about the order' 
                                        required
                                        value={ ((description='')=>{
                                            this.state.orderDescription.forEach((i)=>{
                                                description =  description + i.name + '*' + i.quantity + ' '
                                            })
                                            return description;
                                        })()}
                                        maxLength = '255'
                                        name='orderDescription'
                                        onChange = {this.handleChange}
                                        />
                                        <textarea 
                                        className='form-control' 
                                        row='5'
                                        onChange = {this.handleChange}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(TaskForm);