import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import ProductsOverviewScreen, { screenOptions as productsOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, { screenOptions as productDetailScreenOptions } from '../screens/shop/ProductDetailScreen';
import CartScreen, {screenOptions as cartScreenOptions} from '../screens/shop/CartScreen';
import OrdersScreen, { screenOptions as ordersScreenOptions } from '../screens/shop/OrdersScreen';
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from '../screens/user/UserProductsScreen';
import EditProductScreen, {screenOptions as editProductScreenOptions} from '../screens/user/EditProductScreen';
import AuthScreen, {screenOptions as authScreenOptions} from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import { exp } from 'react-native-reanimated';



const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary

};


const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <ProductsStackNavigator.Screen 
                name="ProductsOverview" 
                component={ProductsOverviewScreen} 
                options={productsOverviewScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                name="ProductDetail" 
                component={ProductDetailScreen} 
                options={productDetailScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                name="Cart" 
                component={CartScreen} 
                options={cartScreenOptions}
            />
        </ProductsStackNavigator.Navigator>
    );
};



// const ProductsNavigator = createStackNavigator({
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,

// }, {
//     defaultNavigationOptions: defaultNavOptions,

//     navigationOptions: {
//         drawerIcon: (drawerConfig) => (
//             <Ionicons
//                 name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//                 size={23}
//                 color={drawerConfig.tintColor}
//             />
//         )
//     }
// });


const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
    return(
        <OrdersStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <OrdersStackNavigator.Screen 
                name="Orders"
                component={OrdersScreen}
                options={ordersScreenOptions}
            />
        </OrdersStackNavigator.Navigator>
    );
};


// const OrdersNavigator = createStackNavigator({
//     Orders: OrdersScreen
// }, {
//     defaultNavigationOptions: defaultNavOptions,

//     //will not be applied to the screens of this navigator 
//     //but will be applied if this navigator is a screen in another navigator.
//     navigationOptions: {
//         drawerIcon: (drawerConfig) => (
//             <Ionicons
//                 name={Platform.OS === "android" ? "md-list" : "ios-list"}
//                 size={23}
//                 color={drawerConfig.tintColor}
//             />
//         )
//     }
// });


const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
    return(
        <AdminStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <AdminStackNavigator.Screen 
                name="UserProducts"
                component={UserProductsScreen}
                options={userProductsScreenOptions}
            />
            <AdminStackNavigator.Screen 
                name="EditProduct"
                component={EditProductScreen}
                options={editProductScreenOptions}
            />
        </AdminStackNavigator.Navigator>
    );
};


// const AdminNavigator = createStackNavigator({
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen
// }, {
//     defaultNavigationOptions: defaultNavOptions,

//     //will not be applied to the screens of this navigator 
//     //but will be applied if this navigator is a screen in another navigator.
//     navigationOptions: {
//         drawerIcon: (drawerConfig) => (
//             <Ionicons
//                 name={Platform.OS === "android" ? "md-create" : "ios-create"}
//                 size={23}
//                 color={drawerConfig.tintColor}
//             />
//         )
//     }
// });

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return(
        <ShopDrawerNavigator.Navigator
            drawerContent={props => {
                return (
                    <View style={{ flex: 1, paddingTop: 30 }}>
                        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} >
                            <DrawerItemList {...props} />
                            <Button
                                title="Logout"
                                color={Colors.primary}
                                onPress={() => {
                                    dispatch(authActions.logout());
                                    // props.navigation.navigate('Auth');
                                }}
                            />
                        </SafeAreaView>
        
                    </View>
                );
            }}
            drawerContentOptions={{
                activeTintColor: Colors.primary
            }}
        >
            <ShopDrawerNavigator.Screen 
                name="Products"
                component={ProductsNavigator}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
            <ShopDrawerNavigator.Screen 
                name="Orders"
                component={OrdersNavigator}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name={Platform.OS === "android" ? "md-list" : "ios-list"}
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
            <ShopDrawerNavigator.Screen 
                name="Admin"
                component={AdminNavigator}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name={Platform.OS === "android" ? "md-create" : "ios-create"}
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
        </ShopDrawerNavigator.Navigator>
    );
};


// const ShopNavigator = createDrawerNavigator({
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator
// }, {
//     contentOptions: {
//         activeTintColor: Colors.primary
//     },
//     contentComponent: props => {

//         const dispatch = useDispatch();

//         return (
//             <View style={{ flex: 1, paddingTop: 30 }}>
//                 <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} >
//                     <DrawerItems {...props} />
//                     <Button
//                         title="Logout"
//                         color={Colors.primary}
//                         onPress={() => {
//                             dispatch(authActions.logout());
//                             // props.navigation.navigate('Auth');
//                         }}
//                     />
//                 </SafeAreaView>

//             </View>
//         );
//     }
// });

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return(
        <AuthStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <AuthStackNavigator.Screen 
                name="Auth"
                component={AuthScreen}
                options={authScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    );
}


// const AuthNavigator = createStackNavigator({
//     Auth: AuthScreen
// }, {
//     defaultNavigationOptions: defaultNavOptions
// })


// const MainNavigator = createSwitchNavigator({
//     Startup: StartupScreen,
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
// });

// export default createAppContainer(MainNavigator);