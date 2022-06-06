import React, { useState } from 'react';
import { Image, Box, Flex, Center, Text } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const CategoryButton = ({ id, imgSrc, title, bg, onPress,...props }) => {
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Flex
                bg={bg || 'blue.200'}
                h='150'
                w='45%'
                dir='column'
                align='center'
                justify='space-evenly'
                borderRadius='30'
                shadow='1'
            >
                <Image
                    h='90'
                    w='90'
                    resizeMode={"cover"}
                    borderRadius={90 / 2}
                    source={{
                        uri: imgSrc
                    }}
                    alt={title}
                />
                <Text
                    noOfLines={1}
                    isTruncated={true}
                    fontSize='xl'
                    fontWeight='bold'
                >
                    {title}
                </Text>
            </Flex>
        </TouchableWithoutFeedback>
    )
}