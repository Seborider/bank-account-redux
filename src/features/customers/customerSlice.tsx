import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomerState {
  fullName: string;
  nationalID: string;
  createdAt: string;
}

const initialCustomerState: CustomerState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialCustomerState,
  reducers: {
    createCustomer: {
      prepare(fullName: string, nationalID: string) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(
        state,
        action: PayloadAction<{
          fullName: string;
          nationalID: string;
          createdAt: string;
        }>,
      ) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
