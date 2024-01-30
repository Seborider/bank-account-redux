//This uses just Redux

import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  StoreEnhancer,
} from "redux";
import accountReducer, {
  AccountState,
  deposit,
  payLoan,
  requestLoan,
  withdraw,
} from "./features/accounts/accountSlice";
import customerReducer, {
  CustomerState,
  updateName,
} from "./features/customers/customerSlice";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import { Reducer } from "react";
import createCustomer from "./features/customers/CreateCustomer";
import { composeWithDevTools } from "@redux-devtools/extension";

export type RootState = {
  account: AccountState;
  customer: CustomerState;
};

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, AnyAction>;
export type Action =
  | ReturnType<typeof deposit>
  | ReturnType<typeof withdraw>
  | ReturnType<typeof requestLoan>
  | ReturnType<typeof payLoan>
  | ReturnType<typeof createCustomer>
  | ReturnType<typeof updateName>
  | ThunkResult<void>;

const rootReducer = combineReducers({
  account: accountReducer as Reducer<AccountState, Action>,
  customer: customerReducer as Reducer<CustomerState, Action>,
});

const middlewareEnhancer: StoreEnhancer<{
  dispatch: ThunkDispatch<any, undefined, AnyAction>;
}> = applyMiddleware(thunk);

const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));

export default store;

export {};
