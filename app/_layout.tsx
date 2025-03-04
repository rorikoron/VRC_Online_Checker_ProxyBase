import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
    ThemeProvider
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack, Tabs, useNavigationContainerRef, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    isAuthedVRChatAtom,
    isCheckingSessionAtom,
    isFontLoadedAtom,
    isLoggedInAtom
} from '@/store'
import { ThemedText } from '@/components/ThemedText'
import useFontGuard from '@/hooks/useFontLoaded'
import useFontLoaded from '@/hooks/useFontLoaded'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const colorScheme = useColorScheme()
    const fontLoaded = useFontLoaded()

    // check if user is logged in
    const isLoggedIn = useAtomValue(isLoggedInAtom)
    const isAuthedVRChat = useAtomValue(isAuthedVRChatAtom)
    const router = useRouter()
    const segments = useSegments()

    useEffect(() => {
        const page = segments[0]
        if (isLoggedIn && page === 'login')
            return router.canGoBack() ? router.back() : router.replace('/(tabs)')
        if (isAuthedVRChat && page === 'auth')
            return router.canGoBack() ? router.back() : router.replace('/(tabs)')
        if (!isLoggedIn && page !== 'login') return router.push('/login')
        if (isLoggedIn && !isAuthedVRChat && page === 'add') return router.push('/auth')
    }, [segments, isLoggedIn, isAuthedVRChat])

    if (!fontLoaded) return null
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="add" options={{ headerShown: true }} />

                <Stack.Screen
                    name="auth"
                    options={{
                        title: 'Login to VRChat'
                    }}
                />
                <Stack.Screen name="+not-found" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    )
}
