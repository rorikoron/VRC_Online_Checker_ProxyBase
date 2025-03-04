import { View, type ViewProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type ThemedViewProps = ViewProps & {
    lightColor?: string
    darkColor?: string
}

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                flex: 1
            }}
        >
            <View style={[style]} {...otherProps} />
        </View>
    )
}
