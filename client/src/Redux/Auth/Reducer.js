import { type } from "@testing-library/user-event/dist/type"
import { REGISTER, LOGIN, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType"
import { searchUser, updateUser } from "./Action"

const initialValue = {
    signup: null,
    signin: null,
}

export const authReducer=(store=initialValue, {type, payload})=>{

    if (type===REGISTER){
        return {...store, signup:payload}
    }
    else if (type===LOGIN){
        return {...store, signin:payload}
    }
    else if (type===REQ_USER){
        return {...store, reqUser:payload}
    }
    else if (type===SEARCH_USER){
        return {...store, searchUser:payload}
    }
    else if (type===UPDATE_USER){
        return {...store, updateUser:payload}
    }
    return store;
}