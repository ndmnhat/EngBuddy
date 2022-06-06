import React, { useState } from 'react';
import { PermissionsAndroid, SafeAreaView, StyleSheet, Text, View, Alert, Button } from 'react-native';
import { useNavigation, NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainScreen } from '../MainScreen';
import { PracticeScreen } from '../PracticeScreen/PracticeScreen';
import { PersonalScreen } from '../PersonalScreen/PersonalScreen';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

export const RootScreen = () => {
    const navigation = useNavigation();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#4251f5',
                tabBarInactiveTintColor: '#cccccc',
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#fff',
                tabBarInactiveBackgroundColor: '#fff'
            }}
        >
            <Tab.Screen
                name="Home"
                component={MainScreen}
                options={({route}) => ({
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="book" color={color} size={size} />
                    ),
                })}
            />

            <Tab.Screen
                name="Practice"
                component={PracticeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="barbell" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Personal"
                component={PersonalScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}