import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../App';
import { Image, Box, Flex, Center, Text } from 'native-base';
import { ListCategory } from '../components/MainScreen/ListCategory';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoryScreen } from './CategoryScreen/CategoryScreen';
import { WordScreen } from './WordScreen/WordScreen';
import { ARScreen } from './ARScreen/ARScreen';

const Stack = createNativeStackNavigator();

export const MainScreen = () => {
    const navigation = useNavigation();
    const user = useContext(UserContext);

    return (
        <Stack.Navigator
            initialRouteName='category'
        >
            <Stack.Screen
                name='category'
                component={CategoryScreen}
                options={{
                    headerShown: false,
                    headerTitle: 'Chủ đề'
                }}
            />
            <Stack.Screen
                name='word'
                component={WordScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Từ vựng',
                    headerBackTitle: 'Trở về'
                }}
            />
            <Stack.Screen
                name='ar'
                component={ARScreen}
                options={{
                    headerShown: false,
                    headerTitle: 'Mô phỏng'
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