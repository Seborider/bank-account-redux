import { useDispatch as useReduxDispatch } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AccountState } from "../features/accounts/accountSlice";
import { CustomerState } from "../features/customers/customerSlice";

export type RootState = {
  account: AccountState;
  customer: CustomerState;
};

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, AnyAction>;

export const useDispatchCustom = () =>
  useReduxDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
