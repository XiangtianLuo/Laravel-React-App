import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const TasksList =(props)=> (
    props.tasks?props.tasks.slice((props.targeted_page-1)*8, props.targeted_page*8).map(task => ( //carry out magination here in lower component
        <tr>
            <td className="align-middle"> {task.customer_name} </td>
            <td className="align-middle trackingNumberTag"> {<a  href={`https://m.kuaidi100.com/result.jsp?nu=${task.trackingNumber}`}>{task.trackingNumber}</a>}</td>
            <td className="align-middle"> {task.description} </td>
            <td className="align-middle"> {task.created_at.split(' ').slice(0,1)} </td>
            <td className="align-middle">  {<Link to={`/${task.id}/edit`} > 
                    <button className='btn-outline-info btn-sm float-right mr-1'> 
                        修改 
                    </button>
                </Link>
                }
            </td>
            <td className="align-middle"> { <button onClick={()=> (props.handleDelete(task.id))} className='btn-outline-danger btn-sm float-right'> 删除 </button>} </td>
        </tr>
)):[]
)

export default TasksList
