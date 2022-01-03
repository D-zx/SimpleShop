import { v4 as uuid } from 'uuid';

const initialState = {
    products: [],
};

const order = (state = initialState, action) =>{
    const { type, payload } = action;
    const id = uuid()
    switch(type) {
        case "SET_INIT_ORDER":
            return {
                ...initialState,
            }
        case "ADDTO_CART":
            console.log(state)
            return {
                ...state,
                products: [...payload],
                orderId: state.id || id
            }
        case "REMOVEFROM_CART":
            return{
                ...state,
                products: state.products.filter((product)=> product.id!==payload)
            }
        case "EDIT_ITEM":
            return{
                ...state,
                products: [...payload]
            } 
        case "DELIVERY_ADDRESS":
            return{
                ...state,
                address: payload
            } 
        case "SET_PAYMENT":
            return{
                ...state,
                payment: payload
            } 
        case "CREATEORDER_SUCCESS":
            return {
                ...state,
                order: payload
            }
        default:
            return state;
    }
}

export default order