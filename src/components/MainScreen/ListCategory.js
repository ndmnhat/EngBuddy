import React, { useState, useEffect } from 'react';
import { CategoryButton } from '../../components/MainScreen/CategoryButton';
import { firebase } from '../../firebase/config';
import firestore from '@react-native-firebase/firestore';
import { FlatList, Flex, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export const ListCategory = () => {
    const navigation = useNavigation();
    const [listCategory, setListCategory] = useState(null);
    useEffect(() => {
        if (!listCategory) {
            firestore()
                .collection('categories')
                .onSnapshot((querySnapshot) => {
                    console.log(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                    setListCategory(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                }
                );
        }
    }, []);
    return (
        // <FlatList numColumns={2}>
        //     {listCategory && listCategory.length ? listCategory?.map((category, index) => <CategoryButton key={category?.id} imgSrc={category?.imgUrl} title={category?.title} />) : null}
        // </FlatList>
        <FlatList
            pt='5'
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20}}
            data={listCategory}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={
                () => <View h='4' w='4'/>
            }
            columnWrapperStyle={{ justifyContent: 'space-around' }}
            numColumns={2}
            renderItem={(category) => <CategoryButton key={category.item?.id} id={category.item?.id} imgSrc={category.item?.imgUrl} title={category.item?.title} onPress={() => navigation.navigate('word', { categoryId: category.item?.id })}/>}/>
    )
}