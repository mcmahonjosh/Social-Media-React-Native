import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Divider, Image } from 'react-native-elements';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase';  // Adjust the import based on your project structure

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/?size=100&id=87&format=png&color=FFFFFF',
    likedImageUrl: 'https://img.icons8.com/?size=100&id=7697&format=png&color=FFFFFF',
  },
  {
    name: 'Comment',
    imageUrl: 'https://img.icons8.com/?size=100&id=143&format=png&color=FFFFFF',
  },
  {
    name: 'Share',
    imageUrl: 'https://img.icons8.com/?size=100&id=97424&format=png&color=FFFFFF',
  },
  {
    name: 'Save',
    imageUrl: 'https://img.icons8.com/?size=100&id=25157&format=png&color=FFFFFF',
    savedImageUrl: 'https://img.icons8.com/?size=100&id=26083&format=png&color=FFFFFF',
  },
];

const Post = ({ post }) => {
  const handleLike = async (post) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const currentLikeStatus = !(post.likes_by_users && post.likes_by_users.includes(currentUser.email));

    const postRef = doc(collection(db, 'users', post.owner_email, 'posts'), post.id);

    try {
      await updateDoc(postRef, {
        likes_by_users: currentLikeStatus ? arrayUnion(currentUser.email) : arrayRemove(currentUser.email),
      });
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation='vertical' />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
      </View>
      <CommentSection post={post} />
      <Comments post={post} />
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />
      <Text style={{ color: 'white', marginLeft: 5, fontWeight: '700' }}>
        {post.user}
      </Text>
    </View>
    <Text style={{ color: 'white', fontWeight: '900' }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: '100%', height: 400 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: '100%', resizeMode: 'cover' }}
    />
  </View>
);

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={styles.leftFooterIconsContainer}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image
          style={styles.footerIcon}
          source={{ uri: post.likes_by_users && post.likes_by_users.includes(getAuth().currentUser.email) ? postFooterIcons[0].likedImageUrl : postFooterIcons[0].imageUrl }}
        />
      </TouchableOpacity>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl} />
    </View>
    <View>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: 'row', margin: 4 }}>
    <Text style={{ color: 'white', fontWeight: '600' }}>{post.likes_by_users ? post.likes_by_users.length.toLocaleString('en') : 0} likes</Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: 'white' }}>
      <Text style={{ fontWeight: '600' }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5, marginLeft: 14 }}>
    {!!post.comments.length && (
      <Text style={{ color: 'gray' }}>
        View {post.comments.length > 1 ? 'all' : ''} {post.comments.length} {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: 'row', marginTop: 5, marginLeft: 14 }}>
        <Text style={{ color: 'white' }}>
          <Text style={{ fontWeight: '600' }}>{comment.user}</Text>
          <Text> {comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.3,
    borderColor: '#ff8501',
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
});

export default Post;
