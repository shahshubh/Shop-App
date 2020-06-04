import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';
import { createAppContainer } from 'react-navigation';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { Ionicons } from '@expo/vector-icons';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ?  Colors.primary : ''
    },
    headerTitle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    
};


const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,

}, {
    defaultNavigationOptions: defaultNavOptions,

    navigationOptions: {
        drawerIcon: (drawerConfig) => (
            <Ionicons 
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"} 
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    }
});


const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    defaultNavigationOptions: defaultNavOptions,

    //will not be applied to the screens of this navigator 
    //but will be applied if this navigator is a screen in another navigator.
    navigationOptions: {
        drawerIcon: (drawerConfig) => (
            <Ionicons 
                name={Platform.OS === "android" ? "md-list" : "ios-list"} 
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    }
});


const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopNavigator);