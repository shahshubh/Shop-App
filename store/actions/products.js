import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProduct = () => {
    return async dispatch => {

        try {
            const response = await fetch('https://shop-app-6c6e4.firebaseio.com/products.json')

            if(!response.ok){
                // handle 400 and 500 status code
                throw new Error('Something went wrong !')
            }

            const resData = await response.json();
            const loadedProducts = [];

            for(const key in resData){
                loadedProducts.push(new Product(
                    key, 
                    'u1', 
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ))
            }

            dispatch({ type: SET_PRODUCTS, products: loadedProducts })
        } catch (err) {

            throw err;
        }
        
    };
}

export const deleteProduct = (productId) => {

    return async dispatch => {
        const response = await fetch(`https://shop-app-6c6e4.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE',
        });

        if(!response.ok){
            throw new Error("Something went wrong!");
        }

        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        })
    }

    
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        // any async code
        const response = await fetch('https://shop-app-6c6e4.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description, 
                imageUrl, 
                price
            })
        });

        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: { 
                id: resData.name,
                title, 
                description, 
                imageUrl, 
                price 
            }
        });
    }
};

export const updateProduct = (id, title, description, imageUrl) => {

    return async dispatch => {

        const response = await fetch(`https://shop-app-6c6e4.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description, 
                imageUrl, 
            })
        });

        if(!response.ok){
            throw new Error("Something went wrong!");
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: { title, description, imageUrl }
        });
    }
};