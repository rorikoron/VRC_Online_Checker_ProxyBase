import { Text, type TextProps, StyleSheet } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'
import { TouchEventType } from 'react-native-gesture-handler/lib/typescript/TouchEventType'

export type ThemedTextProps = TextProps & {
    lightColor?: string
    darkColor?: string
    type?:
        | 'default'
        | 'title'
        | 'logo'
        | 'defaultSemiBold'
        | 'subtitle'
        | 'link'
        | 'warning'
        | 'error'
        | 'tint'
}

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return (
        <Text
            style={[
                { color },
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'logo' ? styles.logo : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                type === 'warning' ? styles.warning : undefined,
                type === 'error' ? styles.error : undefined,
                type === 'tint' ? styles.tint : undefined,
                style
            ]}
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
        letterSpacing: 1
    },
    logo: {
        fontSize: 46,
        fontWeight: 'bold',
        lineHeight: 40,
        letterSpacing: 2
    },
    subtitle: {
        fontSize: 16
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#44bce3'
    },
    warning: {
        lineHeight: 24,
        fontSize: 16,
        color: '#e3db44'
    },
    error: {
        lineHeight: 24,
        fontSize: 16,
        color: '#fa5d52'
    },
    tint: {
        lineHeight: 30,
        fontSize: 16,
        color: '#9c9c9c'
    }
})
