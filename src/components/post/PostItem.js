import { Pressable, View } from 'react-native';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Dimensions } from 'react-native';

import { Video, ResizeMode } from 'expo-av';
import { useUser } from '../../hooks/useUser';
import PostOverlay from './PostOverlay';
import { useIsFocused } from '@react-navigation/native';
import PauseOverlay from './PauseOverlay';

export const PostItem = forwardRef(({ item, bottomBarHeight }, parentRef) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const isFocused = useIsFocused();
  const user = useUser(item.creator);
  const videoRef = useRef();

  useImperativeHandle(parentRef, () => ({
    play,
    stop,
    unload,
  }));

  useEffect(() => {
    if (!isFocused) {
      stop();
    }
  }, [isFocused]);

  useEffect(() => {
    return () => {
      unload();
    };
  }, []);

  const play = async () => {
    if (videoRef.current) {
      try {
        const status = await videoRef.current.getStatusAsync();
        if (!status.isPlaying) {
          setIsPlaying(true);
          await videoRef.current.playAsync();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const stop = async () => {
    if (videoRef.current) {
      try {
        const status = await videoRef.current.getStatusAsync();
        if (status.isPlaying) {
          await videoRef?.current?.stopAsync();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const unload = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.unloadAsync();
      } catch (error) {}
    }
  };

  const handlerPress = async () => {
    if (videoRef.current) {
      try {
        const status = await videoRef.current.getStatusAsync();
        if (status.isPlaying) {
          await videoRef?.current?.pauseAsync();
          setIsPlaying(false);
        } else {
          setIsPlaying(true);
          await videoRef?.current?.playAsync();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // fix tạm (sửa sau)
  // -------------------
  const height = Dimensions.get('screen').height - Dimensions.get('window').height;
  let itemHeight = Dimensions.get('window').height - bottomBarHeight + 28;
  if (height < 60 && height >= 30) {
    itemHeight = Dimensions.get('window').height - bottomBarHeight;
  }
  if (itemHeight < 30) {
    itemHeight = Dimensions.get('screen').height - bottomBarHeight;
  }
  // -----------------------

  return (
    <View>
      <Pressable
        style={{
          height: itemHeight,
          flex: 1,
        }}
        onPress={handlerPress}>
        {!isPlaying && <PauseOverlay />}
        <PostOverlay user={user.data} post={item} />
        <Video
          ref={videoRef}
          source={{ uri: item.source.mediaUrl }}
          style={{ flex: 1 }}
          usePoster
          posterSource={{ uri: item.source.thumbnailUrl }}
          posterStyle={{ resizeMode: 'contain', flex: 1 }}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      </Pressable>
    </View>
  );
});

export default PostItem;
