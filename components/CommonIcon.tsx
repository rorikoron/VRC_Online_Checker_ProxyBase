import { TouchableOpacity, useColorScheme } from 'react-native'
import { IconSymbol } from './ui/IconSymbol'
import { useState } from 'react'
import { SFSymbols6_0 } from 'sf-symbols-typescript'
import { Colors } from '@/constants/Colors'

export default function CommonIcon({ name, size }: { name: SFSymbols6_0; size?: string }) {
    const [focused, setFocused] = useState(false)
    const colorScheme = useColorScheme() ?? 'light'

    return (
        <TouchableOpacity onPress={() => setFocused(!focused)}>
            <IconSymbol
                name={name}
                size={size === 'lg' ? 36 : 28}
                color={Colors[colorScheme].iconDefault}
            />
        </TouchableOpacity>
    )
}
