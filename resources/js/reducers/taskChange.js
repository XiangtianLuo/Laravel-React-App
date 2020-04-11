const taskReducerDefaultState = { customer_name:'', trackingNumber:'', orderDescription:'', tasks:[], itemList:[], freightCompany:'AuExpress'};

export default ( state = taskReducerDefaultState, action )=>{
  switch(action.type){
          case "FETCH_TASKS_AND_ITEMS_DATA":
              return Object.assign({}, state, {
                tasks: [...action.tasks],
                itemList: [...action.itemList]// combine the arrays into one array
              })
          case "CREATE_NEWTASK_SUCCESSFUL":
            return Object.assign({}, state, { 
              customer_name: action.payload.customer_name,
              trackingNumber: action.payload.trackingNumber,
              orderDescription: action.payload.description,
              tasks:[...[action.payload],...state.tasks]
            })
            default:
                return state;
      }
}// reducer
