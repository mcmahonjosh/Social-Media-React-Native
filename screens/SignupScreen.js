import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const INSTAGRAM_LOGO = 'https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000'

const SignupScreen = () => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={{uri: INSTAGRAM_LOGO, height: 100, width: 100}} />
        </View>
        {/* <SignupForm /> */}
    </View>
)

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12,
    }, 
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
})

export default SignupScreen