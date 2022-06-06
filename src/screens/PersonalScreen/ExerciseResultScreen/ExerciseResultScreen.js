import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../../../App';
import { SafeAreaView } from 'react-navigation';
import { Stack, Input, Icon, HStack, VStack, Flex, ZStack, Center, Text, Button, Image, Box, Avatar, Pressable, Divider, IconButton, FlatList } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
export const ExerciseResultScreen = () => {
    const user = useContext(UserContext);
    const navigation = useNavigation();
    const textFontSize = 'md';

    const [exerciseResults, setExerciseResults] = useState([]);

    useEffect(() => {
        firestore()
            .collection('users')
            .doc(user.id)
            .collection('exerciseResults')
            .orderBy('date','desc')
            .onSnapshot((querySnapshot) => {
                console.log(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setExerciseResults(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            });
        
    }, [])
    
    const Item = (category, date, questionCount, score) => {
        return (
            <Flex
                w='full'
                h='120'
                bg={score >= questionCount/2 ? 'green.300' : 'red.300'}
                align='center'
                justify='space-evenly'
            >
                <Text>
                    <Text bold fontSize={textFontSize}>Ngày ôn tập: </Text>
                    <Text fontSize={textFontSize}>{moment(date).format('DD/MM/YYYY')}</Text>
                </Text>
                <Text>
                    <Text bold fontSize={textFontSize}>Chủ đề: </Text>
                    <Text fontSize={textFontSize}>{category}</Text>
                </Text>
                <Text>
                    <Text bold fontSize={textFontSize}>Số điểm: </Text>
                    <Text fontSize={textFontSize}>{`${score}/${questionCount}`}</Text>
                </Text>
            </Flex>
        )
    }
    return (
        <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
            <FlatList
                w='full'
                data={exerciseResults}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={
                    () => <Divider />
                }
                renderItem={(rs) =>
                    Item(rs.item.category, rs.item.date, rs.item.questionCount, rs.item.score)
                }
            />
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