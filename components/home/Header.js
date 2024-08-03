import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { app, auth } from '../../firebase'; // Import auth from firebase file

const handleSignout = async () => {
  try {
    await signOut(auth); // Use auth instance directly
    console.log('Signed Out Successfully');
  } catch (error) {
    console.log('Error signing out:', error.message);
  }
};

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignout}>
        <Text style={{ color: 'white', fontSize: 27 }}>Instagram</Text>
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
          <Image
            source={require('../../assets/newpostig3.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/hearticonig.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            source={require('../../assets/messagesiconig.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  unreadBadge: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Header;
