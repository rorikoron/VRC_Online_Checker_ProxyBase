import {
    StyleSheet,
    View,
    TouchableOpacity,
    useColorScheme,
    Button,
    Pressable,
    FlatList
} from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useEffect, useRef, useState } from 'react'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Separator from '@/components/Separator'
import CommonIcon from '@/components/CommonIcon'
import { friendIdListAtom, friendlistAtom, isAuthedVRChatAtom, isLoggedInAtom } from '@/store'
import { useAtom, useAtomValue } from 'jotai'
import AuthReminder from '@/components/AuthReminder'
import { Link, Stack, useRouter } from 'expo-router'
import UserContainer from '@/components/UserContainer'

export default function HomeScreen() {
    const inset = useSafeAreaInsets()
    const isAuthedVRChat = useAtomValue(isAuthedVRChatAtom)
    const scrollRef = useRef<Animated.ScrollView>(null)
    const router = useRouter()
    const [friendlist] = useAtom(friendlistAtom)
    const [friendIdList] = useAtom(friendIdListAtom)

    return (
        <>
            <ThemedView style={[styles.titleContainer, { paddingTop: inset.top + 16 }]}>
                <View style={styles.headerContainer}>
                    <ThemedText type="title" style={[styles.headerLegend]}>
                        Checklist
                    </ThemedText>
                    <TouchableOpacity onPress={() => router.push('/add')}>
                        <CommonIcon name={'plus'} size="lg" />
                    </TouchableOpacity>
                </View>
                <Separator paddingHorizontal={8} />
                <View style={styles.contentContainer}>
                    {isAuthedVRChat ? (
                        <FlatList
                            data={friendIdList?.map((id) => ({ ...friendlist[id], id }))}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <>
                                    {index > 0 && <Separator />}
                                    <UserContainer {...item} />
                                </>
                            )}
                        />
                    ) : (
                        <AuthReminder />
                    )}
                </View>
            </ThemedView>
        </>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        gap: 8
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: 16,
        paddingBottom: 0
    },
    headerLegend: {
        color: '#d2d2d2'
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute'
    }
})
