import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { useEffect } from 'react'

export default function useFontLoaded() {
    // render splashscreen until font loaded
    const [fontLoaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
    })
    useEffect(() => {
        fontLoaded ? SplashScreen.hideAsync() : null
    }, [fontLoaded])

    return fontLoaded
}
