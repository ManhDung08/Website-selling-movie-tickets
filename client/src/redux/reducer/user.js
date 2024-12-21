import { SET_INFO, SET_MALICHCHIEU } from "../constant/user"

let userJson = localStorage.getItem("USER")
let user = JSON.parse(userJson);
const initialState = {
    info:user,
    maLichChieu:""
}

export let userReducer =  (state = initialState, { type, payload }) => {
  switch (type) {

  case SET_INFO:
    return { ...state, info: payload }
    case SET_MALICHCHIEU:
      return { ...state, maLichChieu: payload }
  default:
    return state
  }
}
