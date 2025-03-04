import CommonTextInput from '@/components/CommonTextInput'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { isCheckingSessionAtom, isLoggedInAtom } from '@/store'
import { Link, router } from 'expo-router'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const inset = useSafeAreaInsets()
    const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom)
    const [, setIsCheckingSession] = useAtom(isCheckingSessionAtom)

    const checkSessionExist = async () => {
        await fetch('http://localhost:8000/auth/check', { method: 'GET', credentials: 'include' })
            .then((data) => setIsLoggedIn(data.status === 200))
            .finally(() => {
                setIsCheckingSession(false)
            })
    }
    useEffect(() => {
        checkSessionExist()
    }, [])

    useEffect(() => {
        if (isLoggedIn) router.canGoBack() ? router.back() : router.replace('/(tabs)')
    }, [isLoggedIn])

    const handleLogin = async () => {
        const authResult = await fetch('http://localhost:8000/auth', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        if (authResult.status === 200) {
            setIsLoggedIn(true)
        }
    }

    // check if stored verified token in local storage
    return (
        <ThemedView style={[styles.LoginContainer, { paddingTop: inset.top }]}>
            <View style={[styles.HeaderContainer]}>
                <View>
                    <ThemedText type="logo" style={[styles.TitleText]}>
                        VRChat
                    </ThemedText>
                    <ThemedText type="title" style={[styles.TitleText]}>
                        Proxy Server.
                    </ThemedText>
                </View>
            </View>
            <View style={[styles.InteractContainer]}>
                <View style={[styles.InputField]}>
                    <CommonTextInput
                        label="username"
                        value={username}
                        onChangeText={setUsername}
                        autoComplete="email"
                        keyboardType="email-address"
                    />
                    <CommonTextInput
                        label="password"
                        value={password}
                        onChangeText={setPassword}
                        autoComplete="current-password"
                        keyboardType="email-address"
                        secureTextEntry={true}
                    />
                    <Link href="/+not-found" style={[styles.ForgetLink]}>
                        <ThemedText type="link">Forget Password?</ThemedText>
                    </Link>
                </View>

                <TouchableOpacity style={[styles.SigninButton]} onPress={handleLogin}>
                    <Text style={[styles.SigninButtonLegend]}>
                        <Text>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    LoginContainer: {
        flex: 1,
        backgroundColor: '#1F1F1F'
    },
    HeaderContainer: {
        flex: 2,
        justifyContent: 'space-around',
        position: 'relative',
        overflow: 'hidden'
    },
    InteractContainer: {
        flex: 3,
        justifyContent: 'space-between',
        paddingVertical: 36,
        paddingHorizontal: 24,
        boxSizing: 'border-box',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: '#2c2c2c'
    },
    InputField: {
        gap: 10
    },
    TitleText: {
        paddingVertical: 4,
        paddingHorizontal: 16,
        color: '#d2d2d2'
    },
    ForgetLink: {
        alignSelf: 'flex-start'
    },
    SigninButton: {
        backgroundColor: '#1f1f1f',
        alignSelf: 'flex-end',
        borderRadius: 4
    },
    SigninButtonLegend: {
        color: '#d2d2d2',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 30
    }
})
