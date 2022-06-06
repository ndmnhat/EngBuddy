import React, { useState, useContext, useEffect } from 'react';
import { Pressable, Flex, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

export const ListItem = ({ title, onPress, ...props }) => {
    return <Pressable
        w='full'
        h='50' onPress={onPress}>
        {({ isHovered, isFocused, isPressed }) => {
            return <Flex
                w='full'
                bg={isPressed ? 'light.100' : 'white'}
                h='full'
                direction='row'
                align='center'
                px='2'
            >
                <Flex flex='1' justify='center'>
                    <Text fontSize='md'>{title}</Text>
                </Flex>
                <Icon name="chevron-forward-outline" size={25} color='#c4c4c4' />
            </Flex>
        }}
    </Pressable>
}