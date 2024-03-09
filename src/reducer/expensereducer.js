const initialState = {
    expenses: [],
    budget: 0,
  };
  
  const expenseReducer = (state = initialState, action) => {
    switch (action.type){
      case 'ADD_EXPENSE':
        return {
          ...state,expenses:[...state.expenses,action.payload]
        };
      case 'SET_BUDGET':
        return {
          ...state,budget:action.payload,
        };
      case "CLEAR":
        return{
            ...state,expenses:[],budget:0
        }
      default:
        return state;
    }
    
  };
  
  export default expenseReducer;