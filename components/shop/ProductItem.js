import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const ProductItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21 ){
        TouchableCmp = TouchableNativeFeedback;
    }

    

    return (
        <Card style={styles.product} >
            <TouchableCmp onPress={props.onSelect} useForeground >
                <View>
                    <View style={styles.imageContainer} >
                        <Image style={styles.image} source={{uri: props.image }} />
                    </View>
                    <View style={styles.details} >
                        <Text style={styles.title} >{props.title}</Text>
                        <Text style={styles.price} >
                            {/* toFixed converts to fixed amount of decimal places. here that is 2 */}
                            ₹ {props.price.toFixed(2)} 
                        </Text>
                    </View>
                    <View style={styles.actions} >
                        {props.children}
                    </View>
                </View>
            </TouchableCmp>
        </Card>
    );
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'

    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    }

});

export default ProductItem;
