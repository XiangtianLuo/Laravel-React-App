import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = (state) =>{
  return {
      itemList:[...state.itemList],
  }
}


class DataChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      datalist:[
        {
          Month:'01', quantity:0
        },
        {
          Month:'02', quantity:0
        },
        {
          Month:'03', quantity:0
        },
        {
          Month:'04', quantity:0
        },
        {
          Month:'05', quantity:0
        },
        {
          Month:'06', quantity:0
        },
        {
          Month:'07', quantity:0
        },
        {
          Month:'08', quantity:0
        },
        {
          Month:'09', quantity:0
        },
        {
          Month:'10', quantity:0
        },
        {
          Month:'11', quantity:0
        },
        {
          Month:'12', quantity:0
        },
        ]
    }
    this.getDataSource = this.getDataSource.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getDataSource (tasks){ // 需要进行清0操作
    this.setState({
      datalist:[
        {
          Month:'01', quantity:0
        },
        {
          Month:'02', quantity:0
        },
        {
          Month:'03', quantity:0
        },
        {
          Month:'04', quantity:0
        },
        {
          Month:'05', quantity:0
        },
        {
          Month:'06', quantity:0
        },
        {
          Month:'07', quantity:0
        },
        {
          Month:'08', quantity:0
        },
        {
          Month:'09', quantity:0
        },
        {
          Month:'10', quantity:0
        },
        {
          Month:'11', quantity:0
        },
        {
          Month:'12', quantity:0
        },
        ]
    })

    let stateCopy = Object.assign({},this.state);

    tasks.forEach((task)=>{
      let eachData = { Month: task.pivot.created_at.split(' ').slice(0,1).join().split('-').slice(1,2).join(), quantity: task.pivot.quantity }
      let eachDataKey = parseInt(eachData.Month)-1;
      //stateCopy[eachDataKey].quantity = 
      stateCopy.datalist[eachDataKey].quantity = stateCopy.datalist[eachDataKey].quantity + eachData.quantity
    })

    this.setState(stateCopy)
  }

  handleChange(e){
    const target = e.target;
    axios.get('/tasks',{
      params: {
        targeted_item_name:target.value
      },
    }).then((response)=>{
      this.getDataSource(response.data.tasks);
    })
  }

  componentWillMount(){
    axios.get('/tasks',{
      params: {
        targeted_item_name:'A2-3段'
      },
    }).then((response)=>{
      this.getDataSource(response.data.tasks);
    })
  }

  renderItems(){
    return this.props.itemList.map((item, index) => (
        <option key={index} value={item.name}> {item.name} </option>
    ))
  }

  render() {
    return (
      <div className="container datachart">
        <div className="row">
          <div className="col-10">
            <LineChart
            width={900}
            height={500}
            data={this.state.datalist.slice()}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Month" />
              <YAxis/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="quantity" stroke="#8884d8" strokeWidth="3"/>
            </LineChart>
          </div>
          <div className="col-2">
            <select onChange={this.handleChange} className='m-auto' name="item_name">    
            <option> 选择物品名称 </option>
            {this.renderItems()}
            </select>
        </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DataChart);