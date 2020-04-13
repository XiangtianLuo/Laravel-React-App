const taskReducerDefaultState = { customer_name:'', trackingNumber:'', orderDescription:'', tasks:[], filtered_tasks:[], itemList:[], freightCompany:'AuExpress'};

export default ( state = taskReducerDefaultState, action )=>{
  switch(action.type){
          case "FETCH_TASKS_AND_ITEMS_DATA":
              return Object.assign({}, state, {
                tasks: [...action.tasks],
                filtered_tasks:[...action.tasks],// before any filter commence, I assigned the filter_tasks as same as the original tasks
                itemList: [...action.itemList]// combine the arrays into one array
              })
          case "TASKS_FILTER":
            return Object.assign({},state,{
              filtered_tasks: state.tasks.filter((task,index)=>{
                let reg = new RegExp(action.filtered_information)
                return  task.customer_name.trim().match(reg) || action.filtered_information.trim() === ''|| task.trackingNumber.trim().match(reg) || task.description.trim().match(reg);
              })
            })
          case "CREATE_NEWTASK_SUCCESSFUL":
            return Object.assign({}, state, { 
              customer_name: action.payload.customer_name,
              trackingNumber: action.payload.trackingNumber,
              orderDescription: action.payload.description,
              tasks:[...[action.payload],...state.tasks]
            })
          case 'UPDATE_TASKS':
            return Object.assign({}, state, { 
              tasks: state.tasks.filter((task)=>{
                return task.id !== action.Deleted_id
              }),
              filtered_tasks: state.filtered_tasks.filter((filtered_task)=>{
                return filtered_task.id !== action.Deleted_id
              })
          })
          default:
            return state;
      }
}// reducer
