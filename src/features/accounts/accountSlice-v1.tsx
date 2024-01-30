//This uses just Redux

import { Action } from "redux";
import { ThunkResult } from "../../hooks/useDispatchCustom";

export interface AccountState {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}

interface CustomAction extends Action {
  payload?: any;
}

const initialAccountState: AccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(
  state: AccountState = initialAccountState,
  action: { type: string; payload?: any },
): AccountState {
  if (state === undefined) {
    return initialAccountState;
  }
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

export function deposit(
  amount: number | string,
  currency: string,
): CustomAction | ThunkResult<void> {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  }
  return async function (dispatch: any) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount: number | string) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount: number | string, loanPurpose: string) {
  return {
    type: "account/requestLoan",
    payload: { amount, loanPurpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
