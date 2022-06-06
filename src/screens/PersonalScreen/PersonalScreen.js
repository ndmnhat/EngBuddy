import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../App';
import { Image, Box, Flex, Center, Text } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChangePasswordScreen } from './ChangePassword/ChangePasswordScreen';
import { SettingScreen } from './SettingScreen/SettingScreen';
import { ExerciseResultScreen } from './ExerciseResultScreen/ExerciseResultScreen';
const Stack = createNativeStackNavigator();

export const PersonalScreen = () => {
    const navigation = useNavigation();
    const user = useContext(UserContext);

    return (
        <Stack.Navigator
            initialRouteName='setting'
        >
            <Stack.Screen
                name='setting'
                component={SettingScreen}
                options={{
                    headerShown: false,
                    headerTitle: 'Chủ đề'
                }}
            />
            <Stack.Screen
                name='changepassword'
                component={ChangePasswordScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Đổi mật khẩu',
                    headerBackTitle: 'Trở về'
                }}
            />
            <Stack.Screen
                name='exerciseresult'
                component={ExerciseResultScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Kết quả ôn tập',
                    headerBackTitle: 'Trở về'
                }}
            />
        </Stack.Navigator>
    )
}