
import { createStore } from "redux";
import expenseReducer from "../reducer/expensereducer";

const Store=createStore(expenseReducer)

export default Store