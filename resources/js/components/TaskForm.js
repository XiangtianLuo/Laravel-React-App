import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpecialButton from './SpecialButton'

const mapStateToProps = (state) =>{
    return {
        itemList:[...state.itemList],
    }
}

class TaskForm extends Component {
    constructor(props){
        super(props);
        console.log('~~~~~~')
        console.log(this.props)
        console.log('~~~~~~')
        this.state = {
            current_task_id: this.props.current_task?this.props.current_task.id:null,
            current_task_customerName: this.props.current_task?this.props.current_task.customer_name:'',
            current_task_trackNumber: this.props.current_task?this.props.current_task.trackingNumber:'',
            current_task_orderDescription_string: this.props.current_task?this.props.current_task.description:'',
            current_task_FreightCompany: this.props.current_task?this.props.current_task.freightCompany:'',
            current_task_orderDescription:[],
            isCreatesButton_Disabled:true,
            isButton_Disabled:true,
            isConfirmButton_Disabled:true,
            isQuantitySelect_Disabled:true,
            item_name:'',
            item_quantity:0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleItemSubmit = this.handleItemSubmit.bind(this);
        this.renderItems= this.renderItems.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleItemSubmit(){
        this.setState({
            current_task_orderDescription: [...this.state.current_task_orderDescription, {name:this.state.item_name, quantity: this.state.item_quantity}],//continue to add the new item_name and item-quantity to the order_description Array
            isCreatesButton_Disabled: false
        },()=>{
            this.setState({
                current_task_orderDescription_string: ((description='')=>{
                    this.state.current_task_orderDescription.forEach((i)=>{
                        description =  description + i.name + '*' + i.quantity + ' '
                    })
                    return description;
                })(),
            })
        })
    }

    onSubmit(e){
        e.preventDefault();
        this.props.handleSubmit({ 
            customer_name: this.state.current_task_customerName,
            trackingNumber: this.state.current_task_trackNumber, 
            orderDescription:this.state.current_task_orderDescription,
            orderDescription_string:this.state.current_task_orderDescription_string,
            freightCompany: this.state.current_task_FreightCompany
        });
    }

    handleChange(e){ // according to the react doc, the way to handle mutuple inputs, altough it is shit. 
        const target = e.target;
        switch (target.name){
            case "customer_name": 
            this.setState({
                current_task_customerName: target.value
            })
            break;
            case "trackingNumber": 
                this.setState({
                current_task_trackNumber: target.value
            })
            break;
            case "freightCompany": 
                this.setState({
                current_task_FreightCompany: target.value
             })
            break;          
            case "item_name":
                this.setState({
                        isQuantitySelect_Disabled:false,
                        item_name:target.value
                    })
            break;         
            case "item_quantity":
                this.setState({
                        isConfirmButton_Disabled:false,
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
                                        value={this.state.current_task_customerName}
                                        placeholder='Enter the customer name' 
                                        required
                                        maxLength = '255'
                                        name='customer_name'
                                        />
                                        <textarea 
                                        className='form-control mb-2' 
                                        row='5'
                                        value={this.state.current_task_trackNumber}
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
                                                        <select disabled={this.state.isQuantitySelect_Disabled} onChange={this.handleChange} className='col-5 ml-1' name="item_quantity">
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
                                                        <button onClick={this.handleItemSubmit} type='submit' className='btn btn-sm btn-success col-4' disabled={this.state.isConfirmButton_Disabled}> Confirm </button>
                                                    </div>    
                                                </div>
                                            </div>
                                        </div>

                                        <textarea 
                                        readOnly
                                        className='form-control mt-2 mb-2' 
                                        row='5'// we use props directly
                                        placeholder='The discription about the order' 
                                        value={this.state.current_task_orderDescription_string}
                                        maxLength = '255'
                                        name='orderDescription'
                                        onChange = {this.handleChange}
                                        />
                                        <textarea 
                                        className='form-control' 
                                        row='5'
                                        value={this.state.current_task_FreightCompany}
                                        onChange = {this.handleChange}
                                        placeholder='Please choose the freight company' 
                                        required
                                        maxLength = '255'
                                        name='freightCompany'
                                        />
                                    </div>
                                    <SpecialButton  type={'submit'} isButton_Disabled={this.state.isCreatesButton_Disabled}/>
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