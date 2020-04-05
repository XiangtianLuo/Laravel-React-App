const taskReducerDefaultState = { name:'', tasks:[]};

export default ( state = taskReducerDefaultState, action )=>{    
  switch(action.type){
          case "SET_UP":
            return {
                ...state,
                 // duplicate the non-changing ones //state remains the same, while action will determine the new number. 
              }
          
          case "CREATE_TASKDATA":
            return {
                ...state,
                tasks: [...action.tasks]// duplicate the non-changing ones //state remains the same, while action will determine the new number. 
              }
          }
  }// reducer