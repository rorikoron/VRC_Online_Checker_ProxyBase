import Separator from '@/components/Separator'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import useVRC from '@/hooks/useVRC'
import { friendlistAtom } from '@/store'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import UserContainer from '@/components/UserContainer'
export default function AddScreen() {
    const vrc = useVRC()
    const friendlist = useAtomValue(friendlistAtom)

    useEffect(() => {
        // initialize
        ;(async () => {
            await vrc.updateFriendlist()
        })()
    }, [])
    return (
        <>
            <ThemedView style={styles.container}>
                <View style={styles.ContainerHeader}>
                    <ThemedText type="title">Add Friends</ThemedText>
                </View>
                <FlatList
                    data={Object.entries(friendlist ?? []).map(([id, val]) => ({ id, ...val }))}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <>
                            {index > 0 && <Separator />}

                            <UserContainer {...item} />
                        </>
                    )}
                />
            </ThemedView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    ContainerHeader: {
        flexDirection: 'row',
        padding: 12
    }
})
