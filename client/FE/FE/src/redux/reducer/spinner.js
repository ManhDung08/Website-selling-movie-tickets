import { TURN_OFF, TURN_ON } from "../constant/spinner"

const initialState = {
    isLoading:false
}

export let spinnerReducer =  (state = initialState, { type, payload }) => {
  switch (type) {

  case TURN_ON:
    return { ...state, isLoading:true };
    case TURN_OFF:
        return { ...state, isLoading:false };
  default:
    return state
  }
}
