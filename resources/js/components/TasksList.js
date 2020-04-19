import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const TasksList =(props)=> (
    props.tasks?props.tasks.slice((props.targeted_page-1)*3 , props.targeted_page*3).map(task => ( //carry out magination here in lower component
    <div key={task.id} className='media'>
        <div className='media-body'> 
            <div className='bor'>
                <span>
                    <br />
                    {'姓名: '+ task.customer_name + ' 单号: '+ task.trackingNumber + ' ' + '订单详情: '+ task.description + '  ' +task.created_at}
                </span>
                <button onClick={()=> (props.handleDelete(task.id))} className='btn-outline-danger btn-sm float-right'> 删除 </button>
                <Link to={`/${task.id}/edit`} > 
                    <button className='btn-outline-info btn-sm float-right mr-1'> 
                        修改 
                    </button>
                </Link>
            </div>
        </div>
    </div>
)):[]
)

export default TasksList
