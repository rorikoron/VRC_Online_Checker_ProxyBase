import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const isFontLoadedAtom = atom(false)
export const isLoggedInAtom = atom(false)
export const isCheckingSessionAtom = atom(false)
export const isAuthedVRChatAtom = atom(false)

export type statusType = 'join me' | 'active' | 'ask me' | 'busy' | 'offline'

export interface friendInfo {
    platform: string,
    displayName: string
    imageURL: string
    status: statusType
}

export interface friendOptions extends friendInfo{
    id: string
}


// manage if frind is tracked by id
export const friendIdAtom = atomFamily((id: string) => atom<boolean>(false));
export const friendIdListAtom = atom<string[]>()
// store all the friend. 
export const friendlistAtom = atom<Record<string, friendInfo>>({})
