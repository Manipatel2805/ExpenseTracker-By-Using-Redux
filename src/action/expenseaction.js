export const addExpenseAction = (expense) => ({
    type: 'ADD_EXPENSE',
    payload: expense,
  });
  
  export const setBudgetAction = (budget) => ({
    type: 'SET_BUDGET',
    payload: budget,
  });

  export const clearExpenseAction=(clear)=>({
    type:'CLEAR',
    payload:clear
  })