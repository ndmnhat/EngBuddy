import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spinner } from 'native-base';
import styles from './styles';
import { firebase } from '../../firebase/config'
import auth from '@react-native-firebase/auth';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
        setLoading(true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        setLoading(false)
                        navigation.navigate('Root', {user: user})
                    })
                    .catch(error => {
                        alert(error)
                        setLoading(false)
                    });
            })
            .catch(error => {
                alert(error)
                setLoading(false)
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Mật khẩu'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    {!loading ? <Text style={styles.buttonTitle}>Đăng nhập</Text> :
                    <Spinner color='white'/>}
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Chưa có tài khoản? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Đăng ký</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
