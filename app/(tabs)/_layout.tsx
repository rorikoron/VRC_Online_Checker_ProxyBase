import { Stack, Tabs } from 'expo-router'
import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Platform } from 'react-native'

import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { SFSymbol } from 'expo-symbols'
import { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'

const RotatedIcon = ({ name, focused }: { name: SFSymbol; focused: boolean }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: focused ? 1 / 6 : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => rotateAnim.setValue(0))
    }, [() => focused])

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return (
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <IconSymbol
                name={name}
                size={28}
                color={focused ? Colors['askme'] : Colors['offline']}
            />
        </Animated.View>
    )
}

const BouncedIcon = ({ name, focused }: { name: SFSymbol; focused: boolean }) => {
    return (
        <Animated.View>
            <IconSymbol
                name={name}
                size={28}
                color={focused ? Colors['askme'] : Colors['offline']}
            />
        </Animated.View>
    )
}
export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
        <>
            <Tabs
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        const name = route.name
                        switch (name) {
                            case 'index':
                                return <BouncedIcon name="person.2" focused={focused} />
                            case 'settings':
                                return <RotatedIcon name="gear.circle" focused={focused} />
                        }
                    },
                    tabBarButton: HapticTab,
                    tabBarBackground: TabBarBackground,
                    tabBarStyle: Platform.select({
                        ios: {
                            // Use a transparent background on iOS to show the blur effect
                            position: 'absolute'
                        },
                        default: {}
                    })
                })}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Checklist'
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings'
                    }}
                />
            </Tabs>
        </>
    )
}
