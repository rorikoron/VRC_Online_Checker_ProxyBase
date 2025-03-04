import {
    friendIdAtom,
    friendIdListAtom,
    friendInfo,
    friendOptions,
    friendlistAtom,
    isAuthedVRChatAtom,
    isCheckingSessionAtom
} from '@/store'
import { preventAutoHideAsync } from 'expo-splash-screen'
import { atom, Getter, Setter, useAtom, useAtomValue, useSetAtom } from 'jotai'

const createRecord = <K extends string, V extends friendInfo>(
    keys: K[],
    values: V[]
): Record<K, V> => {
    return Object.fromEntries(keys.map((key, i) => [key, values[i]])) as Record<K, V>
}
export default function useVRC() {
    const setIsCheckingSession = useSetAtom(isCheckingSessionAtom)
    const [isAuthedVRChat, setIsAuthedVRChat] = useAtom(isAuthedVRChatAtom)
    const [friendlist, setFriendlist] = useAtom(friendlistAtom)
    const [friendIdList, setFriendIdList] = useAtom(friendIdListAtom)

    const refreshVRCAuth = async () => {
        setIsCheckingSession(true)

        await fetch('http://localhost:8000/api/auth/check', {
            method: 'GET',
            credentials: 'include'
        })
            .then((data) => setIsAuthedVRChat(data.status === 200))
            .finally(() => setIsCheckingSession(false))
    }

    const toggleTrackAtom = atom(null, (get: Getter, set: Setter, id: string) => {
        set(friendIdAtom(id), !get(friendIdAtom(id)))

        // delete if redundant
        setFriendIdList(Array.from(new Set([...(friendIdList ?? [])]).add(id)))
    })

    const friendIdIsTrackedAtom = atom((get: Getter) => {
        const result: { [key: string]: any } = {}
        ;(friendIdList ?? []).forEach((id: string) => {
            result[id] = get(friendIdAtom(id))
        })
        return result
    })

    const updateFriendAtom = atom(
        null,
        (get: Getter, set: Setter, id: string, newData: friendInfo) => {
            const prevList = get(friendlistAtom)
            const updatatedData = { ...prevList[id], ...newData }

            set(friendlistAtom, { ...prevList, [id]: updatatedData })
        }
    )
    interface fetchProps {
        n?: number
        offset?: number
    }
    const shapeFriendlist = (newFriendlist: friendOptions[]) => {
        const id = newFriendlist.map(({ id }) => id)
        const data = newFriendlist.map(({ id, ...datas }) => datas)
        return createRecord(id, data)
    }

    /**
     *
     * @param n number to fetch
     * @param offset number of ignorance
     * @returns friendlist
     */
    const fetchPartialFriendlist = async ({ n = 50, offset = 0 }: fetchProps) => {
        const record = await fetch(
            `http://localhost:8000/api/vrc/friendlist?n=${n}&offset=${offset}`,
            {
                method: 'GET',
                credentials: 'include'
            }
        )
            .then((res) => res.json())
            .then((json) => json.data)
        //.then((list) => shapeFriendlist(list))

        console.log(record)
        return record
    }

    const updateFriendlist = async (options: fetchProps = { n: 50, offset: 0 }) => {
        setIsCheckingSession(true)

        const record = await fetchPartialFriendlist(options).finally(() =>
            setIsCheckingSession(false)
        )

        setFriendlist(record)
    }

    const refreshFriendlist = async () => {
        setIsCheckingSession(true)

        const record = await fetchPartialFriendlist({ n: Object.keys(friendlist).length }).finally(
            () => setIsCheckingSession(false)
        )

        setFriendlist(record)
    }
    /*

    const refreshGlobalFriendList = async () => {
        setIsCheckingSession(true)

        const latestFriendList = await fetch('http://localhost:8000/api/vrc/friendlist', {
            method: 'GET',
            credentials: 'include',
            body: JSON.stringify({ n: trackedFriendlist.size })
        })
            .then((data) => data.json())
            .then((json) => json.data)
            .finally(() => setIsCheckingSession(false))

        setGlobalFriendlist(latestFriendList)
    }

    const updateGlobalFriendList = async () => {
        setIsCheckingSession(true)

        const friendlist: friendOptions[] = await fetch(
            'http://localhost:8000/api/vrc/friendlist',
            {
                method: 'GET',
                credentials: 'include',
                body: JSON.stringify({ n: globalFriendlist.length + 50 })
            }
        )
            .then((data) => data.json())
            .then((json) => json.data)
            .finally(() => setIsCheckingSession(false))

            
            .then((array) =>
                array.map(({ id, displayName, platform, imageURL, status }: friendOptions) => ({
                    id,
                    displayName,
                    platform,
                    imageURL,
                    status
                }))
            )
        const latestFriendList: Map<string, friendInfo> = new Map([])
        friendlist.forEach(({ id, displayName, platform, imageURL, status }) =>
            latestFriendList.set(id, { displayName, platform, imageURL, status })
        )
        setGlobalFriendlist(friendlist)
    }
        */

    return {
        refreshVRCAuth,
        friendIdIsTrackedAtom,
        toggleTrackAtom,
        updateFriendAtom,
        fetchPartialFriendlist,
        refreshFriendlist,
        updateFriendlist
    }
}
