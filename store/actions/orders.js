import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";


export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(`https://shop-app-6c6e4.firebaseio.com/orders/${userId}.json`)

            if(!response.ok){
                // handle 400 and 500 status code
                throw new Error('Something went wrong !')
            }

            const resData = await response.json();
            const loadedOrders = [];

            for(const key in resData){
                loadedOrders.push(new Order(
                    key,
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ))
            }
            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders
            });

        } catch (err) {
            throw err;
        }
        

    }
}


export const addOrder = (cartItems, totalAmount) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(`https://shop-app-6c6e4.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });

        if(!response.ok){
            throw new Error('Something went wrong!'); 
        }

        const resData = await response.json();
        
        dispatch({
            type: ADD_ORDER,
            orderData: { 
                id: resData.name, 
                items: cartItems, 
                amount: totalAmount, 
                date: date 
            }
        });
    };
};