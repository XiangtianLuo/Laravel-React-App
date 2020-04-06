const taskReducerDefaultState = { trackingNumber:'', orderDescription:'', tasks:[]};

export default ( state = taskReducerDefaultState, action )=>{    
  console.log(action)
  switch(action.type){
          case "SET_UP":
            return {
                ...state,// populate the default state into the redux store, as initialization
              }
          case "CREATE_TASKDATA":
            return {
                ...state,
                tasks: [...action.tasks]//After fetched the data from database, change the state locally and re-render the data
              }

          case "CREATE_NEWTASK":
            return {
                ...state,//TASK 并没有改变, 现在是需要再次进行一次getalltask 还是怎么处理？
                trackingNumber: action.trackingNumber,
                orderDescription: action.orderDescription// populate the default state into the redux store, as initialization
              }
          }
}// reducer