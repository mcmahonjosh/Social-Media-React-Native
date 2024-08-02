import { View, Text, TouchableOpacityComponent, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Divider, Image } from 'react-native-elements'

export const bottomTabIcons = [
{
    name: 'Home',
    inactive: 'https://img.icons8.com/?size=100&id=73&format=png&color=FFFFFF',
    active: 'https://img.icons8.com/?size=100&id=2797&format=png&color=FFFFFF',
},
{
    name: 'Search',
    inactive: 'https://img.icons8.com/?size=100&id=132&format=png&color=FFFFFF',
    active: 'https://img.icons8.com/?size=100&id=7695&format=png&color=FFFFFF',
},
{
    name: 'Reels',
    inactive: 'https://img.icons8.com/?size=100&id=PxI9IPCyBAOD&format=png&color=FFFFFF',
    active: 'https://img.icons8.com/?size=100&id=YoIaSvIehcuI&format=png&color=FFFFFF',
},
{
    name: 'Shop',
    inactive: 'https://img.icons8.com/?size=100&id=489&format=png&color=FFFFFF',
    active: 'https://img.icons8.com/?size=100&id=8287&format=png&color=FFFFFF',
},
{
    name: 'Profile',
    inactive: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    active: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
},

]

const BottomTabs = ({ icons }) => {
    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ({icon}) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image source={{uri: activeTab == icon.name ? icon.active : icon.inactive}} 
            style={[
                styles.icon, 
                icon.name == 'Profile' ? styles.profilePic() : null, 
                activeTab == 'Profile' && icon.name == activeTab ? styles.profilePic(activeTab) : null
            ]}
            />
        </TouchableOpacity>
    )

    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: '100%',
        bottom: '3%',
        zIndex: 999,
        backgroundColor: '#000',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10,
    },
    icon: {
        width: 30,
        height: 30,
    },
    profilePic: (activeTab = '') => ({
        borderRadius: 50,
        borderWidth: activeTab == 'Profile' ? 2 : 0,
        borderColor: '#fff',
    }),

})

export default BottomTabs