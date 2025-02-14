import { StyleSheet, View, TouchableOpacity, useColorScheme, Button } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useEffect, useRef, useState } from 'react'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Separator from '@/components/Separator'
import CommonIcon from '@/components/CommonIcon'
const base64 = require('base-64')

export default function HomeScreen() {
    const inset = useSafeAreaInsets()
    const scrollRef = useRef<Animated.ScrollView>(null)

    const api = 'http://localhost:8000/api/auth'
    const handleLogin = async () => {}
    return (
        <ThemedView style={[styles.titleContainer, { paddingTop: inset.top + 16 }]}>
            <View {...styles.headerContainer}>
                <ThemedText type="title">Checklist</ThemedText>
                <CommonIcon name={'plus'} size="lg" />
            </View>
            <Separator paddingHorizontal={8} />
            <Animated.ScrollView ref={scrollRef}>
                <Button title="Test Login" onPress={handleLogin} />
            </Animated.ScrollView>
        </ThemedView>
        /*
        <ParallaxScrollViewW
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome!</ThemedText>
                <HelloWave />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 1: Try it</ThemedText>
                <ThemedText>
                    Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see
                    changes. Press{' '}
                    <ThemedText type="defaultSemiBold">
                        {Platform.select({
                            ios: 'cmd + d',
                            android: 'cmd + m',
                            web: 'F12'
                        })}
                    </ThemedText>{' '}
                    to open developer tools.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 2: Explore</ThemedText>
                <ThemedText>
                    Tap the Explore tab to learn more about what's included in this starter app.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
                <ThemedText>
                    When you're ready, run{' '}
                    <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a
                    fresh <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will
                    move the current <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
                    <ThemedText type="defaultSemiBold">app-example</ThemedText>.
                </ThemedText>
            </ThemedView>
        </ParallaxScrollView>
        */
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        height: '100%',
        display: 'flex',
        gap: 8
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: 16,
        paddingBottom: 0
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute'
    }
})
