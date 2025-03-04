import { Text, TextInput, TextInputProps, View, StyleSheet } from 'react-native'
import { ThemedText } from './ThemedText'
import { setNativeProps } from 'react-native-reanimated'
import { useState } from 'react'

export type CommonInputProps = TextInputProps & {
    label: string
}
export default function CommonTextInput({ label, ...rest }: CommonInputProps) {
    return (
        <View style={[styles.InputContainer]}>
            <ThemedText type="subtitle" style={[styles.LabelText]}>
                {label}
            </ThemedText>
            <TextInput style={[styles.ValueText]} {...rest} />
        </View>
    )
}

const styles = StyleSheet.create({
    InputContainer: {},
    LabelText: {
        color: '#d2d2d2',
        paddingVertical: 8
    },
    ValueText: {
        width: '100%',
        color: '#d2d2d2',
        fontSize: 19,
        padding: 3,
        borderWidth: 1,
        borderColor: '#d2d2d2'
    },
    valueText_Focus: {}
})
