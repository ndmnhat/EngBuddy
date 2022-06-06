import React, { useState } from 'react';
import { Image, Box, Flex, Center, Text, HStack, VStack, ZStack, View, Pressable, useToast } from 'native-base';
import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
export const WordButton = ({ imgSrc, word, meaning, soundSrc, bg, type, portalImageUrl, portalVideoUrl, modelUrl, modelType, position, rotation, scale,...props }) => {
    const [isPressed, setPressed] = useState(false);
    const [isPlaying, setPlaying] = useState(false);
    const [childrenIds, setChildrenIds] = useState([]);
    const navigation = useNavigation();
    const toast = useToast();

    const playSound = () => {
        if (soundSrc) {
            setPlaying(true);
            const sound = new Sound(soundSrc,
                null,
                error => {
                    if (error) {
                        setPlaying(false);
                        return
                    }
                    console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());

                    // Play the sound with an onEnd callback
                    sound.play((success) => {
                        if (success) {
                            console.log('successfully finished playing');
                        } else {
                            console.log('playback failed due to audio decoding errors');
                        }
                        setPlaying(false)
                    });
                });
        }
        else {
            toast.show({
                title: 'Cảnh báo',
                description: 'Từ này chưa có âm thanh',
                status: 'warning',
                placement: 'top'
            })
        }
    };

    const handlePressImage = () => {
        if (!isPressed) {
            setPressed(true);
        }
        else {
            if (!modelUrl && !portalVideoUrl && !portalImageUrl) {
                toast.show({
                    title: 'Cảnh báo',
                    description: 'Từ này chưa có mô phỏng',
                    status: 'warning',
                    placement: 'top'
                })
            }
            else {
                navigation.navigate('AR', {
                    type, portalImageUrl, portalVideoUrl, modelUrl, modelType, position, rotation, scale
                });
            }
        }
    }

    return (
        <HStack
            bg={bg || 'lightBlue.100'}
            py='3'
            px='3'
            h='150'
            w='100%'
            space='sm'
            onStartShouldSetResponder={(evt) => {
                evt.persist()
                if (childrenIds && childrenIds.length) {
                    if (childrenIds.includes(evt.target)) {
                        return
                    }
                    setPressed(false)
                }
            }}
            ref={(component) => {
                if (component && !childrenIds?.length) {
                    const children_ids = component._children.map(
                        (el) => el._nativeTag
                    )
                    setChildrenIds(children_ids);
                }

            }}
        >
            <TouchableWithoutFeedback onPress={() => handlePressImage()}>
                <ZStack
                    w='120'
                    h='full'
                    alignItems='center'
                    justifyContent='center'
                    shadow='1'
                >
                    <Image
                        source={{
                            uri: imgSrc,
                        }}
                        alt="Alternate Text"
                        w='full'
                        h='full'
                        borderRadius='20'
                        resizeMode='cover'
                    />
                    {isPressed ? <Center
                        w='full'
                        h='full'
                        borderRadius='20'
                        bg='muted.900:alpha.30'
                    >
                        <Icon name="cube" size={45} color="#ffffff" />
                    </Center> : null}
                </ZStack>
            </TouchableWithoutFeedback>
            <VStack
                flex='1'
            >
                <HStack
                    h='50%'
                >
                    <Text bold fontSize='2xl'>{word+" "}

                        
                    </Text>
                    <TouchableWithoutFeedback
                        onPress={() => playSound()}
                    >
                        <Center
                            size={35}
                        >
                            {!isPlaying ? <FeatherIcon name='play-circle' color='#4f46e5' size={35} />
                                : <FeatherIcon name="stop-circle" color="#4f46e5" size={35} />}
                        </Center>
                    </TouchableWithoutFeedback>
                </HStack>
                <Text noOfLines={2}>
                    <Text fontSize='lg'>{meaning}</Text>
                </Text>
            </VStack>
        </HStack>
    )
}