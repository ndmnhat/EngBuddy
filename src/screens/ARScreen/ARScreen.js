import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Button, ZStack , IconButton, Icon} from 'native-base';
import {
    ViroARSceneNavigator,
    ViroARScene,
    ViroText,
    Viro360Image,
    Viro360Video,
    ViroMaterials,
    ViroQuad,
    Viro3DObject,
    ViroOmniLight,
    ViroController,
    ViroNode,
    ViroARPlane,
    ViroFlexView,
    ViroAmbientLight,
    ViroLightingEnvironment,
    ViroSpotLight,
    ViroConstants,
    ViroPortalScene,
    ViroPortal
} from '@viro-community/react-viro';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ARScene = ({ route, ...props }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const { type, portalImageUrl, portalVideoUrl, modelUrl, modelType, position, rotation, scale } = route.params;

    const [mPos, setMPos] = useState(position ?? [0, 0, 0]);
    const [mRot, setMRot] = useState(rotation ?? [0, 0, 4]);
    const [mScale, setMScale] = useState(scale ?? [.5, .5, .5]);

    const arNodeRef = useRef(null);
    const onTrackingUpdated = (state, reason) => {
        if (loading && state == ViroConstants.TRACKING_NORMAL) {
            setLoading(false);
        }
    }
    useEffect(() => {
        navigation.setOptions({
            tabBarStyle: { display: 'none' }
        })
        return () => {
            navigation.setOptions({
                tabBarStyle: { display: 'flex' }
            })
            setLoading(true);
        }
    }, [])
    

    const onRotate = (rotateState, rotationFactor, source) => {

        if (rotateState == 3) {
            setMRot([mRot[0], mRot[1] + rotationFactor, mRot[2]])
            return;
        }

        arNodeRef.current.setNativeProps({ rotation: [mRot[0], mRot[1] + rotationFactor, mRot[2]] });
    }

    const onPinch = (pinchState, scaleFactor, source) => {
        var newScale = mScale.map((x) => { return x * scaleFactor })

        if (pinchState == 3) {
            setMScale(newScale);
            return;
        }

        arNodeRef.current.setNativeProps({ scale: newScale });
    }

    const renderMainObject = () => {
        if (type === 'PORTAL_IMAGE') {
            return (
                <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={() => { }}>
                    <ViroPortal position={[0, 0, -.3]} scale={[.15, .15, .15]}>
                        <Viro3DObject source={require('./res/portal_wood_frame/portal_wood_frame.vrx')}
                            resources={[require('./res/portal_wood_frame/portal_wood_frame_diffuse.png'),
                            require('./res/portal_wood_frame/portal_wood_frame_normal.png'),
                                require('./res/portal_wood_frame/portal_wood_frame_specular.png')]}
                            type="VRX" />
                    </ViroPortal>
                    <Viro360Image source={{ uri: portalImageUrl}} />
                </ViroPortalScene>
            )
        }
        else if (type === 'PORTAL_VIDEO') {
            return (
                <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={() => { }}>
                    <ViroPortal position={[0, 0, -.3]} scale={[.15, .15, .15]}>
                        <Viro3DObject source={require('./res/portal_wood_frame/portal_wood_frame.vrx')}
                            resources={[require('./res/portal_wood_frame/portal_wood_frame_diffuse.png'),
                                require('./res/portal_wood_frame/portal_wood_frame_normal.png'),
                                require('./res/portal_wood_frame/portal_wood_frame_specular.png')]}
                            type="VRX" />
                    </ViroPortal>
                    <Viro360Video source={{ uri: portalVideoUrl }} loop={true} volumn={1.0}/>
                </ViroPortalScene>
            )
        }
        else if (type === 'OBJECT') {
            return (
                <ViroNode ref={arNodeRef} position={[0, 0, -.5]} dragType="FixedToWorld" onDrag={() => { }} highAccuracyEvents={true}>
                    <ViroSpotLight
                        innerAngle={5}
                        outerAngle={20}
                        attenuationStartDistance={0.1}
                        attenuationEndDistance={22}
                        direction={[0, -1, 0]}
                        position={[0, 6, 0]}
                        color="#ffffff"
                        castsShadow={true}
                        influenceBitMask={2}
                        shadowMapSize={2048}
                        shadowNearZ={.1}
                        shadowFarZ={6}
                        shadowOpacity={.9} />

                    <Viro3DObject
                        source={{ uri: modelUrl}}
                        position={mPos}
                        rotation={mRot}
                        scale={mScale}
                        type={modelType}
                        onPinch={onPinch}
                        onRotate={onRotate}
                        lightReceivingBitMask={3}
                        shadowCastingBitMask={2}
                        onLoadStart={() => console.log('load start')}
                        onLoadEnd={() => console.log('load end')
                        }
                        highAccuracyEvents={true}
                    />

                    <ViroQuad
                        rotation={[-90, 0, 0]}
                        position={[0, -.001, 0]}
                        width={2.5} height={2.5}
                        arShadowReceiver={true}
                        lightReceivingBitMask={2} />
                </ViroNode>
            )
        }
        else return null;
    }
    return (
        <ViroARScene physicsWorld={{ gravity: [0, -9.81, 0] }} onTrackingUpdated={(state, reason) => onTrackingUpdated(state, reason)}>

            <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />

            <ViroSpotLight
                innerAngle={5}
                outerAngle={90}
                direction={[0, -1, -.2]}
                position={[0, 3, 1]}
                color="#aaaaaa"
                castsShadow={true}
            />
            {renderMainObject()}
        </ViroARScene>
    )
}

export const ARScreen = ({route, ...props}) => {
    const navigation = useNavigation();

    return (
        <ZStack flex='1'>
            <ViroARSceneNavigator
                style={{ flex: 1 }}
                initialScene={{
                    scene: () => <ARScene route={route} />
                }}
            />

            <IconButton left='15' top='15' onPress={() => navigation.goBack()}
                icon={<Icon
                    as={<Ionicons name='chevron-back-circle-outline' />}
                    size='xl'
                    color='light.500'
                />}
                _pressed={{
                    bg: 'transparent',
                    _icon: {
                        color: 'light.800'
                    }
                }}
            />
        </ZStack>
    )
}