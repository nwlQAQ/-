import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import {requestDetail} from "../util/request"
const initState = {
    detail: {},//详情的数据
    collections: [],//收藏的数据
}
const changeDetailAction = detail => ({
    type: "changeDetail",
    detail
})
export const collectAction = detail => ({
    type: "collect",
    detail
})
export const cancelAction = id => ({
    type: "cancel",
    id
})
export const requestDetailAction = id => {
    return (dispatch, getState) => {
        requestDetail(id).then(res => {
            dispatch(changeDetailAction(res.data))
            console.log("detail存储成功")
        })
    }
}
const reducer = (state = initState, action) => {
    const { collections } = state;
    switch (action.type) {
        case "changeDetail":
            return {
                ...state,
                detail: action.detail
            }
        case "collect":
            collections.push(action.detail)
            return {
                ...state,
                collections: [...collections]
            }
        case "cancel":
            const idx = collections.findIndex(item => item.id === action.id);
            collections.splice(idx, 1)
            return {
                ...state,
                collections: [...collections]
            }
        default:
            return state;
    }
}
const store = createStore(reducer, applyMiddleware(thunk))
export default store
export const getCollections = state => state.collections
export const getIsCollect = state => {
    return state.collections.some(item => item.id === state.detail.id)
}

