const taskReducerDefaultState = { customer_name:'', trackingNumber:'', orderDescription:'', tasks:[], filtered_tasks:[], pagination_tasks:[], itemList:[], freightCompany:'AuExpress', activePage: null};

export default ( state = taskReducerDefaultState, action )=>{
  switch(action.type){
          case "FETCH_TASKS_AND_ITEMS_DATA": 
              return Object.assign({}, state, {
                tasks: [...action.tasks],
                filtered_tasks: [...action.tasks],
                itemList: [...action.itemList],// combine the arrays into one array by using ES6 constructor method
                activePage:1
              })
          case "TASKS_FILTER":
            return Object.assign({},state,{
              filtered_tasks: action.filtered_information.trim() === ''?state.tasks :state.tasks.filter((task,index)=>{
                let reg = new RegExp(action.filtered_information)
                return  task.customer_name.trim().match(reg) ||  task.trackingNumber.trim().match(reg) || task.description.trim().match(reg);
              })
            })
          case "TASK_PAGINATION":
            return Object.assign({},state,{
              pagination_tasks: state.filtered_tasks.slice((action.targeted_page-1)*3, (action.targeted_page)*3),
              activePage:action.targeted_page
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
