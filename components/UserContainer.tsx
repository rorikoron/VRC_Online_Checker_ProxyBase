import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ThemedView } from './ThemedView'
import Checkbox from 'expo-checkbox'
import { ThemedText } from './ThemedText'
import { friendIdAtom, friendOptions, statusType } from '@/store'
import { useAtom, useSetAtom } from 'jotai'
import { Colors } from '@/constants/Colors'
import useVRC from '@/hooks/useVRC'

const getStatusColor = (status: statusType) => {
    const statusKey = status.replaceAll(' ', '') as
        | 'joinme'
        | 'active'
        | 'askme'
        | 'busy'
        | 'offline'
    return Colors[statusKey]
}

export default function UserContainer({
    id,
    displayName,
    imageURL,
    platform,
    status
}: friendOptions) {
    const vrc = useVRC()
    const [isTracked] = useAtom(friendIdAtom(id))
    const toggleTrackState = useSetAtom(vrc.toggleTrackAtom)

    return (
        <TouchableOpacity onPress={() => toggleTrackState(id)}>
            <ThemedView style={styles.UserContainer}>
                <ThemedText type="subtitle" style={styles.UserInfos}>
                    <View
                        style={[
                            platform === 'web' ? styles.status_web : styles.status_window,
                            platform === 'web'
                                ? { borderColor: getStatusColor(status) }
                                : {
                                      backgroundColor: getStatusColor(status)
                                  }
                        ]}
                    />
                    {displayName}
                </ThemedText>

                <Checkbox value={isTracked} disabled color={Colors['active']} />
            </ThemedView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    UserContainer: {
        height: 64,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    UserInfos: {
        alignItems: 'flex-end'
    },

    status_web: {
        height: 14,
        borderWidth: 3.4,
        aspectRatio: 1 / 1,
        borderRadius: '50%',
        marginRight: 10
    },
    status_window: {
        height: 14,
        aspectRatio: 1 / 1,
        borderRadius: '50%',
        marginRight: 10
    }
})
