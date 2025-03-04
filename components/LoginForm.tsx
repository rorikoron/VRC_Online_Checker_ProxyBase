import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import CommonTextInput from './CommonTextInput'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React from 'react'

interface LoginFormProps {
    subtitle: string
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    handleLogin: () => void
    appendix?: React.ReactNode
    isInputInvalid?: boolean
}

export default function LoginForm({
    subtitle,
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    appendix,
    isInputInvalid
}: LoginFormProps) {
    const inset = useSafeAreaInsets()
    return (
        <ThemedView style={[styles.LoginContainer, { paddingTop: inset.top }]}>
            <View style={[styles.HeaderContainer]}>
                <View>
                    <ThemedText type="logo" style={[styles.TitleText]}>
                        VRChat
                    </ThemedText>
                    <ThemedText type="title" style={[styles.TitleText]}>
                        {subtitle}
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
                        keyboardType="default"
                        textContentType="password"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                    {isInputInvalid && (
                        <ThemedText type="error">Invalid username or password</ThemedText>
                    )}
                    {appendix}
                </View>

                <TouchableOpacity style={[styles.SigninButton]} onPress={() => handleLogin()}>
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
        paddingVertical: 16,
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
