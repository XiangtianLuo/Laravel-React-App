const taskReducerDefaultState = { customer_name:'', trackingNumber:'', orderDescription:'', tasks:[], freightCompany:'AuExpress'};

export default ( state = taskReducerDefaultState, action )=>{
  console.log(action);
  console.log(state);
  switch(action.type){
          case "CREATE_TASKDATA":
              return Object.assign({}, state, {
                tasks: [...action.tasks]
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
