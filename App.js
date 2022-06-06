import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { RootScreen } from './src/screens/RootScreen/RootScreen';
import { default as LoginScreen } from './src/screens/LoginScreen/LoginScreen';
import { default as RegistrationScreen } from './src/screens/RegistrationScreen/RegistrationScreen';
import { ARScreen } from './src/screens/ARScreen/ARScreen';
// import { firebase } from './src/firebase/config'

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { NativeBaseProvider } from 'native-base'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const UserContext = React.createContext();

function App() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const usersRef = firestore().collection('users');
        auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data()
                        setLoading(false)
                        setUser(userData)
                    })
                    .catch((error) => {
                        setLoading(false)
                    });
            } else {
                setLoading(false)
                setUser(null)
            }
        });
    }, []);

    if (loading) {
        return (
            <></>
        )
    }
    return (
        <NativeBaseProvider>
            <UserContext.Provider value={user}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}>
                        {user ? (
                            <>
                            <Stack.Screen name="Root" component={RootScreen} />
                            <Stack.Screen name="AR" component={ARScreen} />
                            </>
                        ) : (
                            <>
                                <Stack.Screen name="Login" component={LoginScreen} />
                                <Stack.Screen name="Registration" component={RegistrationScreen} />
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </UserContext.Provider>
        </NativeBaseProvider>

    );
}

export default App;
