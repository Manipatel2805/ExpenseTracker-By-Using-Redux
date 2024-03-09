import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./expense.css";

import { useDispatch, useSelector } from "react-redux"
import { addExpenseAction, clearExpenseAction, setBudgetAction } from "../action/expenseaction";

const ExpenseTracker=()=>{
    const [expenseInput,setExpenseInput]=useState({amount:""})
    const [budget,setBudget]=useState(0)
    const [balance,setBalance]=useState(0)

    const { expenses, budgets } = useSelector((state) => state);
    const dispatch=useDispatch()
    
    const handleInputChange = (e) => {
         setExpenseInput({
            ...expenseInput,[e.target.name]: e.target.value,
            });
        };

    const handleSetBudget = () => {
            if (budget>0) {
                dispatch(setBudgetAction({budget}))
                // setBudget(balance);
                setBalance(budget)
                toast.success('Budget successfully set!', { position: 'top-center' });
            } else {
                toast.error('Please fill in all required fields.', { position: 'top-center', className: 'toast-error'  });
              console.error('Please fill in all required fields.');
            }
          };    

    const handleAddExpense = () => {
        if (expenseInput.amount && expenseInput.date && expenseInput.category && expenseInput.notes) {
        dispatch(addExpenseAction({ amount: expenseInput.amount,date:expenseInput.date,category:expenseInput.category,notes:expenseInput.notes}));
        setExpenseInput({
            amount: '',
            date:'',
            category:'',
            notes:''
        });
        setBalance(balance-(expenseInput.amount))
        setBudget(balance-(expenseInput.amount))
        toast.success('Expense added successfully!', { position: 'top-center',});

       
        } else {
          console.error('Please fill in all required fields.');
          toast.error('Please fill in all required fields.', { position: 'top-center',className: 'toast-error'  });
        }
      };

      const clear=()=>{
         dispatch(clearExpenseAction());
      }
      const clearAll=()=>{
        dispatch(clearExpenseAction());
        setBudget(0)
        setBalance(0)
      }
    return(
    <div>
        <center><p style={{fontWeight:"bold",fontSize:"30px"}}>Expense Tracker</p></center>
        <center><p style={{fontWeight:"bold"}}>Recording all your expenditures so you have a clear and detailed understanding of your budget.</p></center>
        <center><p style={{fontWeight:"bold"}}>Balance :  &nbsp;₹{balance}</p></center>
        <button style={{position:"relative",left:"1200px",bottom:"65px",backgroundColor:"brown"}} onClick={clearAll} >CLEAR_ALL</button>
        <div className="bigbox">
            <div className="budget">
            <center><h2>Budget</h2></center>
            <center><label htmlFor="budget">Set Budget:</label></center>
            <center><input
            type="number"
            id="budget"
            name="budget"
            value={budget}
          onChange={(e) => setBudget(e.target.value)}
        /></center>
       <center> <button onClick={handleSetBudget}>Set Budget</button></center>
            </div>
            <div className="expense">
            <center><h2>Expenses</h2></center>
        
          <label htmlFor="amount">Amount:</label>
          <center><input
          type="number"
          id="amount"
          name="amount"
          value={expenseInput.amount}
          onChange={handleInputChange}
          /></center>
          
        <label htmlFor="date">Date:</label>
        <center><input
          type="date"
          id="date"
          name="date"
          value={expenseInput.date}
          onChange={handleInputChange}
        /></center>

        <label htmlFor="category">Category:</label>
        <center><input
          type="text"
          id="category"
          name="category"
          value={expenseInput.category}
          onChange={handleInputChange}
        /></center>

        <label htmlFor="notes">Notes:</label>
        <center><input
          type="text"
          id="notes"
          name="notes"
          value={expenseInput.notes}
          onChange={handleInputChange}
        /></center>

        <button onClick={handleAddExpense}>AddExpense</button>
            </div>
            <div className="history">   
            <center><h2>History</h2></center>
            <button style={{position:"relative",left:"280px",bottom:"65px"}} onClick={clear}>Clear</button>
            <div style={{position:"relative",top:"-60px"}}>
            {
            expenses.map((val,ind)=>{
                return(
                    <div key={ind}>
                       <ul>
                        <center><p>Expense:{ind+1}</p></center>
                        <p>Amount: {val.amount}</p>
                        <p>Date: {val.date}</p>
                        <p>Category: {val.category}</p>
                        <p>Notes: {val.notes}</p>
                        </ul> 
                    </div>
                )
            })
          }
          </div>
            </div>
        </div>  
        <ToastContainer/>  
    </div>
         
    )
}

export default ExpenseTracker











