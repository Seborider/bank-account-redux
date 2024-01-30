//This uses just Redux

export interface CustomerState {
  fullName: string;
  nationalID: string;
  createdAt: string;
}

interface CustomerAction {
  type: string;
  payload?: any;
}

const initialCustomerState: CustomerState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export default function customerReducer(
  state: CustomerState = initialCustomerState,
  action: CustomerAction,
): CustomerState {
  if (state === undefined) {
    return initialCustomerState;
  }
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

export function createCustomer(fullName: string, nationalID: string) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

export function updateName(fullName: string) {
  return { type: "customer/updateName", payload: fullName };
}
