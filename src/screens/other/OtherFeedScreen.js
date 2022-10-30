import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import PostItem from '../../components/post/PostItem';
import { postsListenerByUserId } from '../../services/posts';
import { useDispatch } from 'react-redux';
import { setProfileUserIdDisplay } from '../../redux/slice/profileSlice';

const FeedScreen = ({ route }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const mediaRefs = useRef([]);

  useEffect(() => {
    const unsubscribe = async () => {
      const unsub = await postsListenerByUserId(route.params.userId, setPosts);
      return unsub;
    };
    const response = unsubscribe();
    return () => {
      response.then((unsubscribe) => unsubscribe());
    };
  }, []);

  const onViewableVideoChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          dispatch(setProfileUserIdDisplay(element.item.creator));
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <PostItem
            item={item}
            bottomBarHeight={0}
            ref={(postRef) => (mediaRefs.current[item.id] = postRef)}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate='normal'
        onViewableItemsChanged={onViewableVideoChanged.current}
        initialNumToRender={2}
        windowSize={4}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
