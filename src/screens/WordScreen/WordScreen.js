import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListWord } from '../../components/MainScreen/ListWord';

export const WordScreen = ({route, ...props}) => {
    const navigation = useNavigation();
    const { categoryId } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <ListWord categoryId={categoryId}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
});