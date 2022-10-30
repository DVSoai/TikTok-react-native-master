import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextIconButton from '../../components/button/TextIconButton';
import { createPost } from '../../redux/slice/postSlice';
import LoadingOverlay from '../../components/other/LoadingOverlay';

const SavePostScreen = ({ navigation, route }) => {
  const [description, setDescription] = useState('');
  const requestRunning = useSelector((state) => state.post.requestRunning);
  const dispatch = useDispatch();

  const handlerSavePost = async () => {
    dispatch(
      createPost({ media: route.params.source, description, thumbnail: route.params.thumbnail })
    );
    // fix tạm (sửa sau)
    // ---------------
    setTimeout(() => {
      navigation.navigate('FeedScreen');
    }, 3000);
    // ---------------
  };

  if (requestRunning) {
    return <LoadingOverlay color='blue' size='large' />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          maxLength={200}
          multiline
          textAlignVertical='top'
          numberOfLines={9}
          value={description}
          onChangeText={(value) => setDescription(value)}
          selectionColor='red'
          placeholder='Hãy mô tả bài đăng, thêm hashtag hoặc nhắc đến những nhà sáng tạo đã truyền cảm hứng cho bạn.'
        />
        <Image style={styles.mediaPreview} source={{ uri: route.params.source }} />
      </View>
      <View style={styles.buttonContainer}>
        <TextIconButton title='Cancel' icon='close' onPress={() => navigation.goBack()} />
        <TextIconButton title='Post' icon='arrow-up' primary onPress={handlerSavePost} />
      </View>
    </View>
  );
};

export default SavePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 160,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
  },
  mediaPreview: {
    width: 90,
    aspectRatio: 9 / 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
});
