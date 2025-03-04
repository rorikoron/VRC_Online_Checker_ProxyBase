import { View } from 'react-native'
import { ThemedText } from './ThemedText'
import { Link } from 'expo-router'

export default function AuthReminder() {
    return (
        <View>
            <ThemedText type="subtitle">Please Authenticate VRChat Account.</ThemedText>
            <Link href="/auth">
                <ThemedText type="link">Go to Authenticate</ThemedText>
            </Link>
        </View>
    )
}
