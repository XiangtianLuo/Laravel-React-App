import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import axios from 'axios';

const data = [
  {
    name: '1月', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: '2月', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: '3月', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: '4月', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: '5月', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: '6月', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: '7月', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: '1月', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: '2月', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: '3月', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: '4月', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: '5月', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: '6月', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: '7月', uv: 3490, pv: 4300, amt: 2100,
  },
];

export default class Example extends Component {

  constructor(props){
    super(props);
    this.state = {
      response:''
    }
  }

  componentWillMount(){
    axios.get('/tasks',{
      params: {
        targeted_item_name:'A2-3段'
      },
    }).then((response)=>{
      console.log(response)
      this.setState({
        response
      })
    })
  }

  render() {
    return (
      <div className="container">
        <LineChart
        width={900}
        height={500}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth="3"/>
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth="5"/>
        </LineChart>
      </div>
    );
  }
}