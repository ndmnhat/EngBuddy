import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-navigation';
import { ListCategory } from '../../components/MainScreen/ListCategory';

export const CategoryScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
            <ListCategory/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#fff'
    },
});