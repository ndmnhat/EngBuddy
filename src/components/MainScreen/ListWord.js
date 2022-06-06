import React, { useState, useEffect } from 'react';
import { WordButton } from '../../components/MainScreen/WordButton';
import { firebase } from '../../firebase/config';
import firestore from '@react-native-firebase/firestore';
import { FlatList, Flex, View, Text, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export const ListWord = ({ categoryId, ...props }) => {
    const [listWord, setlistWord] = useState([]);
useEffect(() => {
    if (!listWord?.length && categoryId) {
        firestore()
                .collection('categories')
                .doc(categoryId)
                .collection('words')
                .onSnapshot((querySnapshot) => {
                    console.log(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                    setlistWord(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                }
                );
        }
    }, [])
    return (
        listWord.length ?
            <FlatList
                w='full'
                data={listWord}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={
                    () => <Divider />
                }
                renderItem={(word) =>
                    <WordButton
                        key={word.item?.id}
                        imgSrc={word.item?.imageUrl}
                        word={word.item?.word}
                        meaning={word.item?.meaning}
                        soundSrc={word.item?.soundUrl}
                        type={word.item?.type}
                        portalImageUrl={word.item?.portalImageUrl}
                        portalVideoUrl={word.item?.portalVideoUrl}
                        modelUrl={word.item?.modelUrl}
                        modelType={word.item?.modelType}
                        position={word.item?.position}
                        rotation={word.item?.rotation}
                        scale={word.item?.scale}
                    />}
            /> : <Text>Không có dữ liệu.</Text>
    )
}