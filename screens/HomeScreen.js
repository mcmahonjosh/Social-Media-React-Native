import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { POSTS } from '../data/posts'
import { getFirestore, collectionGroup, onSnapshot } from 'firebase/firestore';
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs'
import { db } from '../firebase'



const HomeScreen = ({navigation}) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Create a query to get all documents from the 'posts' collection group
    const postsQuery = collectionGroup(db, 'posts');
  
    // Subscribe to the query with onSnapshot
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        ...doc.data(),  // Spread the document data
        id: doc.id,     // Add the document ID
      }));
      setPosts(fetchedPosts);
      console.log(fetchedPosts); // This should now include the document IDs
    }, (error) => {
      console.error('Error fetching posts:', error);
    });
  
    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
            <Post post={post} key={index}/>
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    }

})

export default HomeScreen