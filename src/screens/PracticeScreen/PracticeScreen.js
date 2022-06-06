import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../App';
import { Image, Box, Flex, Center, Text } from 'native-base';
import { ListCategory } from '../components/MainScreen/ListCategory';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PracticeCategoryScreen } from './PracticeCategoryScreen';
import { PracticeMainScreen } from './PracticeMainScreen';

const Stack = createNativeStackNavigator();

export const PracticeScreen = () => {
    const navigation = useNavigation();
    const user = useContext(UserContext);

    return (
        <Stack.Navigator
            initialRouteName='pcategory'
        >
            <Stack.Screen
                name='pcategory'
                component={PracticeCategoryScreen}
                options={{
                    headerShown: false,
                    headerTitle: 'Chủ đề'
                }}
            />
            <Stack.Screen
                name='word'
                component={PracticeMainScreen}
                options={{
                    headerShown: false,
                    headerTitle: 'Tập luyện',
                    headerBackTitle: 'Trở về'
                }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
});