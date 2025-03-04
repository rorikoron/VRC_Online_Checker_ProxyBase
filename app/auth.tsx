import CommonTextInput from '@/components/CommonTextInput'
import LoginForm from '@/components/LoginForm'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import useVRC from '@/hooks/useVRC'
import { isAuthedVRChatAtom, isCheckingSessionAtom } from '@/store'
import { useRoute } from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import { Link, router, Stack, useNavigation, useRouter } from 'expo-router'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    Touchable,
    NativeEventEmitter
} from 'react-native'

export default function auth() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isInputInvalid, setIsInputInvalid] = useState(false)
    const [isAuthedVRChat, setIsAuthedVRChat] = useAtom(isAuthedVRChatAtom)
    const [isCheckingSession, setIsCheckingSession] = useAtom(isCheckingSessionAtom)

    const [modalVisible, setModalVisible] = useState(false)
    const [mfaType, setMfaType] = useState('')
    const [mfaCode, setMfaCode] = useState('')

    const vrc = useVRC()
    const router = useRouter()

    useEffect(() => {
        if (isAuthedVRChat) router.canGoBack() ? router.back() : router.replace('/(tabs)')
    }, [isAuthedVRChat])

    useEffect(() => {
        vrc.refreshVRCAuth()
    }, [])

    const handleLogin = async (mfaCode: string | null = null) => {
        try {
            const authResult = await fetch('http://localhost:8000/api/auth', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    eotp: mfaType === 'eotp' ? mfaCode : null,
                    totp: mfaType === 'totp' ? mfaCode : null
                })
            })

            console.log(authResult.status)
            switch (authResult.status) {
                case 200:
                    setIsAuthedVRChat(true)
                    setIsInputInvalid(false)
                    console.log('Authed')
                    break
                case 401:
                    const body = await authResult.json().then((json) => json)
                    setModalVisible(true)
                    setMfaType(body.mfaType)
                    setIsInputInvalid(false)
                    console.log(body)
                    break

                default:
                    setIsInputInvalid(true)
                    console.log('Failed to auth')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const appendix = () => (
        <View>
            <ThemedText type="warning">⚠️This is NOT an official application.</ThemedText>
            <ThemedText type="warning">
                We are not responsible for any loss resulting from the application.
            </ThemedText>
        </View>
    )
    // check if stored verified token in local storage
    return (
        <>
            <LoginForm
                subtitle="Account Login."
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                appendix={appendix()}
                isInputInvalid={isInputInvalid}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <BlurView style={styles.modalMask} intensity={10}>
                    <View style={styles.modalContainer}>
                        <CommonTextInput
                            label="2FA Code"
                            value={mfaCode}
                            onChangeText={setMfaCode}
                        />
                        <View style={styles.modalButtonGroup}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <ThemedText type="tint">cancel</ThemedText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={async () => {
                                    await handleLogin(mfaCode)
                                    setModalVisible(false)
                                }}
                            >
                                <ThemedText type="link">Submit</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </Modal>
        </>
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
    },
    modalMask: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        backgroundColor: '#2c2c2c',
        width: '80%',
        borderRadius: 6,
        padding: 12
    },
    modalButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 24
    },
    modalButton: {
        paddingVertical: 6,
        paddingHorizontal: 12
    }
})
