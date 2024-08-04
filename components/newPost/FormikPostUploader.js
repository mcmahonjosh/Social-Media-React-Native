import { db, auth, app } from '../../firebase';
import { View, Text, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, Divider, Image } from 'react-native-elements';
import validUrl from 'valid-url';
import { collection, query, where, limit, onSnapshot, addDoc, getFirestore } from 'firebase/firestore';




// Placeholder image URL
const PLACEHOLDER_IMG = 'https://img.icons8.com/?size=100&id=112856&format=png&color=FFFFFF';

// Validation schema for the form
const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'Caption has reached the character limit'),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  // Function to fetch user data from Firestore
  const getUserName = () => {
    const user = auth.currentUser;

    // Create a query to get the user's document from the 'users' collection
    const userQuery = query(
      collection(db, 'users'),
      where('owner_uid', '==', user.uid),
      limit(1)
    );

    // Subscribe to the query with onSnapshot
    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setCurrentLoggedInUser({
          username: doc.data().username,
          profilePicture: doc.data().profile_picture, // Adjust the field name if needed
        });
      });
    });

    return unsubscribe;
  };

  // Fetch user data on component mount
  useEffect(() => {
    const unsubscribe = getUserName();
    return () => unsubscribe();
  }, []);

  // Function to upload post to Firestore
  const uploadPostToFirebase = async (imageUrl, caption) => {
    try {
      // Create a new document and get the DocumentReference
      const docRef = await addDoc(collection(db, 'users', auth.currentUser.email, 'posts'), {
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profilePicture: currentLoggedInUser.profilePicture,
        owner_uid: auth.currentUser.uid,
        owner_email: auth.currentUser.email,
        caption: caption,
        createdAt: new Date(), // Use new Date() for now; use FieldValue.serverTimestamp() if using in a Cloud Function
        likes_by_users: [],
        comments: [],
      });
  
      // Get the document ID
      const docId = docRef.id;
      console.log('Document written with ID:', docId);
  
      // Optionally navigate or perform further actions with the docId
      navigation.goBack();
    } catch (error) {
      console.error('Error uploading post:', error.message);
    }
  };
  

  return (
    <Formik 
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
        <>
          <View style={{ margin: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{ width: 100, height: 100, backgroundColor: 'lightgray', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
              <Image source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }} style={{ width: 100, height: 100 }} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput 
                style={{ color: 'white', fontSize: 20 }}
                placeholder='Write a caption...' 
                placeholderTextColor='gray' 
                multiline={true}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation='vertical'/>
          <TextInput 
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{ color: 'white', fontSize: 18 }}
            placeholder='Enter Image Url' 
            placeholderTextColor='gray' 
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: 'red' }}>
              {errors.imageUrl}
            </Text>
          )}
          <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
