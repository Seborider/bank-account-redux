import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkResult } from "../../hooks/useDispatchCustom";
import { Action } from "redux";

export interface AccountState {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}

export interface RequestLoanAction {
  amount: number;
  purpose: string;
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

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    deposit(state, action: PayloadAction<number>) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action: PayloadAction<number>) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action: PayloadAction<RequestLoanAction>) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

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

export default accountSlice.reducer;
