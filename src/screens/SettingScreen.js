import React, { useState } from 'react';
import { PermissionsAndroid, SafeAreaView, StyleSheet, Text, View, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const SettingScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Text>SettingScreen</Text>
        </SafeAreaView>
    )
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});