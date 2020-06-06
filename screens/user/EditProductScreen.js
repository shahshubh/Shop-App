import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditProductScreen = props => {
    return(
        <View>
            <Text>Edit Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

EditProductScreen.navigationOptions = (navData) => {
    return{
        headerTitle: "Edit Screen"
    }
}

export default EditProductScreen;