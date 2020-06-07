import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const dispatch = useDispatch();

    const [title, setTitle] = useState( editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');


    const submitHandler =  useCallback(() => {
        if(editedProduct){
            // Edit product
            dispatch(productsActions.updateProduct(prodId, title, description, imageUrl));
        } else {
            // Add New Product
            dispatch(productsActions.createProduct(title, description, imageUrl, parseInt(price)));
        }

        props.navigation.goBack();
    }, [dispatch, prodId, title, description, imageUrl, price]);

    useEffect(() => {
        props.navigation.setParams({
            'submit': submitHandler
        });
    }, [submitHandler]);

    return(
        <ScrollView>
            <View style={styles.form} >
                <View style={styles.formControl} >
                    <Text style={styles.label} >Title</Text>
                    <TextInput 
                        style={styles.input} 
                        value={title} 
                        onChangeText={text => setTitle(text)} 
                    />
                </View>
                <View style={styles.formControl} >
                    <Text style={styles.label} >Image URL</Text>
                    <TextInput 
                        style={styles.input} 
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                { editedProduct ? null : (
                    <View style={styles.formControl} >
                        <Text style={styles.label} >Price</Text>
                        <TextInput 
                            style={styles.input} 
                            value={price}
                            onChangeText={text => setPrice(text)}
                        />
                    </View>
                ) }
                <View style={styles.formControl} >
                    <Text style={styles.label} >Description</Text>
                    <TextInput 
                        style={styles.input} 
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%',

    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }

});

EditProductScreen.navigationOptions = (navData) => {
    const submitFn = navData.navigation.getParam('submit');
    return{
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                <Item 
                    title="Save" 
                    iconName={ Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark' } 
                    onPress={submitFn} 
                />
            </HeaderButtons>
        )
    }
}

export default EditProductScreen;