import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-navigation';
import auth from '@react-native-firebase/auth';
import { UserContext } from '../../../../App';
import { FlatList, HStack, VStack, Flex, ZStack, Center, Text, Button, Image, Box, Avatar, Pressable, Divider } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { ListItem } from '../../../components/PersonalScreen/ListItem';

const menu = [
    { key: 1, title: "Kết quả ôn tập", screen: 'exerciseresult'},
    { key: 2, title: "Đổi mật khẩu", screen: 'changepassword' }
]

export const SettingScreen = () => {
    const navigation = useNavigation();
    const user = useContext(UserContext);

    const handleSignOut = () => {
        auth().signOut();
    }

    return (
        <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
            <VStack
                flex='1'
                mt='2'
            >
                <HStack
                    h='150'
                    w='full'
                >
                    <Center
                        w='1/3'
                    >
                        <Avatar
                            key={user?.avatarUrl || 'avatar_1'}
                            bg="amber.500"
                            size='100'
                            source={{
                                uri: user?.avatarUrl,
                            }}
                        >
                            {user?.fullName?.match(/\b\w/g).join('')}
                        </Avatar>
                    </Center>
                    <Flex
                        w='2/3'
                        align='flex-start'
                        justify='center'
                    >
                        <Text bold fontSize='lg'>{user?.fullName} <FeatherIcon name='edit-3'/></Text>
                        <Text>{user?.email}</Text>
                    </Flex>
                </HStack>
                <Flex
                    w='full'
                    flexGrow='0'
                >
                    <Divider />
                    {menu.map(item =>
                        <React.Fragment>
                            <ListItem
                                key={item.key}
                                title={item.title}
                                onPress={() => navigation.navigate(item.screen)}
                            />
                            <Divider />
                        </React.Fragment>)}
                </Flex>
                <Flex
                    flex='1'
                    align='center'
                >
                    <Button
                        m='2'
                        size='md'
                        w='120'
                        variant='subtle'
                        colorScheme='danger'
                        onPress={() => handleSignOut()}
                    >Đăng xuất</Button>
                </Flex>
            </VStack>
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