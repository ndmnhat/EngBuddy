import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-navigation';
import { ListPracticeCategory } from '../../components/PracticeScreen/ListPracticeCategory';

export const PracticeCategoryScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
            <ListPracticeCategory/>
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