import React, {useReducer, useCallback, useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, KeyboardAvoidingView, Button, ActivityIndicator, Platform, Alert} from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import { LinearGradient } from 'expo-linear-gradient';
import * as authActions from '../../store/actions/auth';
import { exp } from 'react-native-reanimated';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state,action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        };
    }
    return state;
}

const AuthScreen = props => {

    const dispatch = useDispatch();
    const [ isSignup, setIsSignup ] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, dispatchFormState] = useReducer(
        formReducer,
        {
            inputValues: {
                email: '',
                password: ''
            }, 
            inputValidities: {
                email: false,
                password: false
            }, 
            formIsValid: false
        }
    );

    useEffect(() => {
        if(error){
            Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if(isSignup){
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(action);
            // props.navigation.navigate('Shop');
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };  


    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({ 
            type: FORM_INPUT_UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);


    return(
            <KeyboardAvoidingView 
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={50}
                style={styles.screen} 
            >
                <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient} >
                    <Card style={styles.authContainer} >
                        <ScrollView>
                            <Input 
                                id="email"
                                label="E-mail"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorText="Please enter a valid email address."
                                onInputChange={inputChangeHandler}
                                initialValue=''
                            />
                            <Input 
                                id="password"
                                label="Password"
                                keyboardType="default"
                                secureTextEntry
                                required
                                minLength={6}
                                autoCapitalize="none"
                                errorText="Please enter a valid password."
                                onInputChange={inputChangeHandler}
                                initialValue=''
                            />

                            <View style={styles.buttonContainer} >
                                { isLoading ? (
                                    <ActivityIndicator size='small' color={Colors.primary} />
                                ) : (
                                    <Button 
                                        title={ isSignup ? "Sign Up" : "Login"}
                                        color={Colors.primary} 
                                        onPress={authHandler} 
                                    />
                                ) }
                            </View>
                            <View style={styles.buttonContainer} >
                                <Button 
                                    title={`Switch to ${isSignup ? 'Login' : 'Sign Up'} `} 
                                    color={Colors.accent} 
                                    onPress={() => {
                                        setIsSignup(prevState => !prevState);
                                    }} 
                                />
                            </View>
                            
                        </ScrollView>
                    </Card>
                </LinearGradient>
                
            </KeyboardAvoidingView>
    );
};


export const screenOptions  = {
    headerTitle: 'Authenticate',
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    },
    buttonContainer: {
        marginTop: 10,
    },

});


export default AuthScreen;