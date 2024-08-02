import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = () => {
  return (
    <View style={styles.container}>
        <Header />
        <FormikPostUploader />
    </View>
  )
}

const Header = () => (
    <View style={styles.headerContainer}>
        <TouchableOpacity>
            <Image 
                source={{uri: 'https://img.icons8.com/?size=100&id=40217&format=png&color=FFFFFF'}}
                style={{ width: 30, height: 30}}
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>NEW POST</Text>
        <Text></Text>
    </View>
)
//empty text componenet above centers the 'NEW POST' text because of space-between
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        marginRight: 23,
    }

})

export default AddNewPost