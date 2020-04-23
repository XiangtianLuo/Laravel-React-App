import React from 'react';

const TasksFilter =(props)=> (
    <div className='card-header row no-gutters align-items-center'>
      <div className='font-weight-bold col-4 '>当前订单</div>
        <div className='col-8'>
          <input onChange={props.onchange} className='float-right border border-primary rounded text-center' placeholder='快速查找订单'/>
        </div>
    </div>
)

export default TasksFilter;