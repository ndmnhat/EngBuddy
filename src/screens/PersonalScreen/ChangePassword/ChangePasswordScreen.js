import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-navigation';
import { Stack, Input, Icon, HStack, VStack, Flex, ZStack, Center, Text, Button, Image, Box, Avatar, Pressable, Divider, IconButton } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const ChangePasswordScreen = () => {
    const navigation = useNavigation();
    const [showPwd, setShowPwd] = useState(false);
    const [showPwdConfirm, setShowPwdConfirm] = useState(false);

    return (
        <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
            <Stack space={8} w="100%" alignItems="center" mt='8'>
                <Input
                    w='75%'
                    size='2xl'
                    type='password'
                    placeholder="Mật khẩu cũ"
                />
                <Input
                    w='75%'
                    size='2xl'
                    type={showPwd ? 'text' : 'password'}
                    InputRightElement={
                        <IconButton onPress={()=>setShowPwd(!showPwd)}
                            icon={<Icon
                                as={<Ionicons name={showPwd ? 'eye-off' : 'eye'} />}
                                size={5}
                                mr="2"
                                color="muted.400"
                            />}
                            _pressed={{
                                bg: 'white:alpha.0'
                            }}
                        />
                        
                    }
                    placeholder="Mật khẩu mới"
                />
                <Input
                    w='75%'
                    size='2xl'
                    type={showPwdConfirm ? 'text' : 'password'}
                    InputRightElement={
                        <IconButton onPress={() => setShowPwdConfirm(!showPwdConfirm)}
                            icon={<Icon
                                as={<Ionicons name={showPwdConfirm ? 'eye-off' : 'eye'} />}
                                size={5}
                                mr="2"
                                color="muted.400"
                            />}
                            _pressed={{
                                bg: 'white:alpha.0'
                            }}
                         />
                    }
                    placeholder="Xác nhận mật khẩu mới"
                />
                <Button size='lg' w='100' colorScheme='info'>Lưu</Button>
            </Stack>
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