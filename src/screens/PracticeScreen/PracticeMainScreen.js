import React, { useState, useContext, useEffect, useRef } from 'react';
import { NavigatorIOS, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-navigation';
import { Modal, HStack, VStack, Flex, ZStack, Center, Text, Button, Image, Box, IconButton, Icon, PresenceTransition, useToast, View } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../../App';
import * as Animatable from 'react-native-animatable'
import _ from 'lodash';

export const PracticeMainScreen = ({ route, ...props }) => {
    const user = useContext(UserContext);
    const toast = useToast();

    const navigation = useNavigation();
    const { categoryId } = route.params;
    const [categoryInfo, setCategoryInfo] = useState(null);
    const [listWord, setlistWord] = useState([]);
    const [score, setScore] = useState(0);
    const [listAnswers, setlistAnswers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStarted, setStarted] = useState(false);
    const [isFinished, setFinished] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [fault, setFault] = useState(0);

    const checkMarkRef = useRef(null);
    const xMarkRef = useRef(null);
    const [showCheckMark, setShowCheckMark] = useState(false);
    const [showXMark, setShowXMark] = useState(false);
    useEffect(() => {
        if (!listWord?.length && categoryId) {
            firestore()
                .collection('categories')
                .doc(categoryId)
                .collection('words')
                .get()
                .then((querySnapshot) => {
                    console.log(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                    setlistWord(_.shuffle(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
                }
                );
            firestore()
                .collection('categories')
                .doc(categoryId)
                .onSnapshot((snapshot) => {
                    console.log(snapshot.data());
                    setCategoryInfo(snapshot.data())
                })
        }
    }, [])

    useEffect(() => {
        if (listWord?.length > 0) {
            const otherAnswer1Index = randomIndexGen(currentIndex, currentIndex);
            let otherAnswer2Index = otherAnswer1Index;
            if (listWord.length > 2) {
                otherAnswer2Index = randomIndexGen(currentIndex, otherAnswer1Index);
            }
            const answers = [
                listWord[currentIndex]?.word,
                listWord[otherAnswer1Index]?.word,
                listWord[otherAnswer2Index]?.word,
            ]

            setlistAnswers(answers);
        }
    }, [listWord, currentIndex])

    useEffect(() => {
        if (isFinished) {
            firestore()
                .collection('users')
                .doc(user.id)
                .collection('exerciseResults')
                .add({
                    date: new Date(),
                    score: score,
                    questionCount: listWord?.length,
                    category: categoryInfo?.title
                });

            setShowModal(true);
        }
    }, [isFinished])
    const randomIndexGen = (exceptNumber1, exceptNumber2) => {
        const num = _.random(0, listWord?.length ? listWord.length - 1 : 0);
        return (num === exceptNumber1 || num === exceptNumber2) ? (listWord?.length == 1 ? 0 : randomIndexGen(exceptNumber1, exceptNumber2)) : num;
    }

    const checkAnswer = (answer) => {
        if (answer === listWord[currentIndex]?.word) {
            setScore(score + 1);
            setShowCheckMark(true);
            checkMarkRef?.current.zoomIn(500).then(() => {
                checkMarkRef.current.pulse(1000).then(() => {
                    checkMarkRef.current.zoomOut(500).then(() => setShowCheckMark(false))
                })
            })
        }
        else {
            setFault(fault + 1);
            setShowXMark(true);
            xMarkRef?.current.zoomIn(500).then(() => {
                xMarkRef.current.pulse(1000).then(() => {
                    xMarkRef.current.zoomOut(500).then(() => setShowXMark(false))
                })
            })
        }
        setCurrentIndex(currentIndex + 1);

        if (currentIndex === listWord?.length - 1) {
            setFinished(true)
        }
    }

    const handleStart = () => {
        if (listWord?.length) {
            setStarted(true)
        }
        else {
            toast.show({
                title: 'Cảnh báo',
                description: 'Chủ đề này chưa có câu hỏi',
                status: 'warning',
                placement: 'top'
            })
        }
    }
    const confirmStart = () => {
        return (
            <VStack
                flex='1'
                alignItems='center'
                justifyContent='center'
                space='4'
            >
                <Text>
                    <Text bold fontSize='xl'>Chủ đề: </Text>
                    <Text fontSize='xl'>{categoryInfo?.title ?? ''}</Text>
                </Text>
                <Text>
                    <Text bold fontSize='xl'>Số câu hỏi: </Text>
                    <Text fontSize='xl'>{listWord?.length ?? ''}</Text>
                </Text>
                <Button size='lg' w='100' colorScheme='tertiary' onPress={() => handleStart()}>Bắt đầu</Button>

                <Button size='lg' w='100' colorScheme='tertiary' variant='outline' onPress={() => navigation.goBack()}>Trở về</Button>
            </VStack>
        )
    }

    const reset = () => {
        setlistWord(_.shuffle(listWord));
        setScore(0);
        setlistAnswers([]);
        setCurrentIndex(0);
        setFinished(false);
        setShowModal(false);
        setFault(0);
    }

    return (
        !isStarted ? confirmStart() :
            <ZStack flex='1' w='full' h='full' display='flex' alignItems="center" justifyContent="center">
                <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
                    <PresenceTransition
                        flex={1}
                        visible={isStarted}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 250,
                            },
                        }}
                    >
                        <VStack
                            flex='1'
                        >
                            <HStack
                                w='full'
                                h='15%'
                                alignItems='center'
                            >
                                <Center w='1/5'>
                                    <IconButton onPress={() => navigation.goBack()}
                                        icon={<Icon
                                            as={<Ionicons name='chevron-back-circle-outline' />}
                                            size='xl'
                                            color='light.500'
                                        />}
                                        _pressed={{
                                            bg: 'white:alpha.0',
                                            _icon: {
                                                color: 'light.800'
                                            }
                                        }}
                                    />
                                </Center>
                                <Center
                                    w='3/5'
                                >
                                    <Flex
                                        direction='row'
                                        h='5'
                                    >
                                        {Array(fault).fill(<Ionicons name='close-sharp' size={20} color='#fc3546' />)}
                                    </Flex>
                                    <Text>Số câu đúng: {score}/{listWord?.length ?? 0}</Text>
                                </Center>
                                <Center w='1/5'>
                                    <IconButton onPress={() => reset()}
                                        icon={<Icon
                                            as={<Ionicons name='refresh-circle-outline' />}
                                            size='xl'
                                            color='light.500'
                                        />}
                                        _pressed={{
                                            bg: 'white:alpha.0',
                                            _icon: {
                                                color: 'light.800'
                                            }
                                        }}
                                    />
                                </Center>
                            </HStack>

                            <Flex
                                w='full'
                                h='60%'
                                p='2'
                                display='flex'
                                align='center'
                            >
                                <Image
                                    key={listWord[currentIndex]?.imageUrl || 'main_image_1'}
                                    source={() => {
                                        console.log(listWord[currentIndex]);
                                        return { uri: listWord[currentIndex]?.imageUrl, }
                                    }}
                                    alt="Alternate Text"
                                    borderRadius='20'
                                    resizeMode='cover'
                                    flex='1'
                                    style={{ aspectRatio: 1 }}
                                />
                            </Flex>
                            <Flex
                                w='full'
                                h='25%'
                                direction='row'
                                align='center'
                                justify='space-around'
                            >
                                {listAnswers.map((answer, index) => (
                                    <Button key={`button_answer_${index}`} w='25%' onPress={() => checkAnswer(answer)}>{answer}</Button>
                                ))}
                            </Flex>
                        </VStack>
                    </PresenceTransition>
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
                        <Modal.Content maxWidth="350">
                            <Modal.CloseButton />
                            <Modal.Header>Kết quả</Modal.Header>
                            <Modal.Body>
                                <VStack space={3}>
                                    <HStack alignItems="center" justifyContent="space-between">
                                        <Text fontWeight="medium">Tổng số câu</Text>
                                        <Text fontWeight="medium" color="gray.500">{listWord.length}</Text>
                                    </HStack>
                                    <HStack alignItems="center" justifyContent="space-between">
                                        <Text fontWeight="medium">Số câu đúng</Text>
                                        <Text fontWeight="medium" color="green.500">{score}</Text>
                                    </HStack>
                                    <HStack alignItems="center" justifyContent="space-between">
                                        <Text fontWeight="medium">Số câu sai</Text>
                                        <Text fontWeight="medium" color="red.500">{listWord.length - score}</Text>
                                    </HStack>
                                </VStack>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space='2'>
                                    <Button
                                        key='button_finish_1'
                                        onPress={() => {
                                            reset()
                                        }}
                                        variant='outline'
                                        colorScheme='secondary'
                                    >
                                        Làm lại
                                    </Button>
                                    <Button
                                        key='button_finish_2'
                                        onPress={() => {
                                            navigation.navigate('pcategory');
                                        }}

                                        colorScheme='secondary'
                                    >
                                        Kết thúc
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </SafeAreaView>

               
                    <Animatable.View ref={checkMarkRef}>
                    {showCheckMark ? <Ionicons name='checkmark' zIndex={2} size={60} color='#22c55e' />
                        : null}
                    </Animatable.View>
                    <Animatable.View ref={xMarkRef}>
                    {showXMark ?
                        <Ionicons name='close-sharp' zIndex={2} size={60} color='#fc3546' />
                        : null}
                    </Animatable.View>
            </ZStack>
            
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width:'100%',
        display: 'flex',
        backgroundColor: '#fff'
    },
});