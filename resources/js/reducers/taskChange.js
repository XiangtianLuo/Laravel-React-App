const taskReducerDefaultState = { create_flag:false, current_task_id:'', customer_name:'', trackingNumber:'', orderDescription:'', tasks:[],filtered_tasks:[], itemList:[], freightCompany:''};

export default ( state = taskReducerDefaultState, action )=>{
  switch(action.type){
          case "FETCH_TASKS_AND_ITEMS_DATA": 
              return Object.assign({}, state, {
                tasks: [...action.tasks],
                itemList: [...action.itemList],// combine the arrays into one array by using ES6 constructor method
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
          case 'UPDATE_CURRENT_TASK':
            return Object.assign({}, state, { 
              customer_name: action.payload.customer_name,
              trackingNumber: action.payload.trackingNumber,
              orderDescription: action.payload.description,
              freightCompany:action.payload.freightCompany
            })
          default:
            return state;
      }
}// reducer
