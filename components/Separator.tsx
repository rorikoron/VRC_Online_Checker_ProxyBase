import { Colors } from '@/constants/Colors'
import { StyleSheet, useColorScheme, View } from 'react-native'

interface SeparatorProps {
    paddingHorizontal?: number
}

export default function Separator({ paddingHorizontal = 0 }: SeparatorProps) {
    const colorScheme = useColorScheme() ?? 'light'
    return (
        <View style={[styles.separatorContainer, { paddingHorizontal }]}>
            <View style={[styles.separator, { backgroundColor: Colors[colorScheme].text }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    separatorContainer: {
        height: 1,
        width: '100%',
        transform: 'tranlateY(-50%)'
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#d2d2d2'
    }
})
