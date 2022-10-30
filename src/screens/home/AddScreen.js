import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import {
  Camera,
  CameraType,
  FlashMode,
  VideoQuality,
  getCameraPermissionsAsync,
  requestCameraPermissionsAsync,
} from 'expo-camera';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as VideoThumbnails from 'expo-video-thumbnails';

const AddScreen = ({ navigation }) => {
  const [hasPermissionCamera, setHasPermissionCamera] = useState(false);
  const [hasPermissionAudio, setHasPermissionAudio] = useState(false);
  const [hasPermissionLibrary, setHasPermissionLibrary] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [cameraType, setCameraType] = useState(CameraType.front);
  const [cameraFlash, setCameraFlash] = useState(FlashMode.off);
  const [cameraReally, setCameraReally] = useState(false);
  const cameraRef = useRef();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const CameraPermissionsResponse = await requestCameraPermissionsAsync();
      if (CameraPermissionsResponse.granted) {
        setHasPermissionCamera(true);
      }
      const AudioPermissionsResponse = await Audio.requestPermissionsAsync();
      if (AudioPermissionsResponse.granted) {
        setHasPermissionAudio(true);
      }

      const LibraryPermissionsResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (LibraryPermissionsResponse.granted) {
        setHasPermissionLibrary(true);
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: 'creationTime',
          mediaType: 'video',
        });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  const recodeVideo = async () => {
    if (cameraRef.current) {
      try {
        const options = {
          maxDuration: 60,
          quality: VideoQuality['480p'],
        };
        const videoRecodePromise = cameraRef.current.recordAsync(options);
        if (videoRecodePromise) {
          const videoRecode = await videoRecodePromise;
          const videoSource = videoRecode.uri;
          const thumbnail = await generateThumbnail(videoSource, 3000);
          navigation.navigate('SavePostScreen', { source: videoSource, thumbnail });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const stopRecordVideo = async () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  const pickFromLibrary = async () => {
    const options = {
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      aspect: [16, 9],
    };
    const response = await ImagePicker.launchImageLibraryAsync(options);
    if (!response.cancelled) {
      const thumbnail = await generateThumbnail(response.uri, 3000);
      navigation.navigate('SavePostScreen', { source: response.uri, thumbnail });
    }
  };

  const handlerChangeCameraType = () => {
    if (cameraType === CameraType.back) {
      setCameraType(CameraType.front);
    } else {
      setCameraType(CameraType.back);
    }
  };

  const handlerChangeCameraFlash = () => {
    if (cameraFlash === FlashMode.torch) {
      setCameraFlash(FlashMode.off);
    } else {
      setCameraFlash(FlashMode.torch);
    }
  };

  const generateThumbnail = async (source, time) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, { time: time });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  if (!hasPermissionAudio || !hasPermissionCamera || !hasPermissionLibrary) {
    return (
      <View>
        <Text>not has permissions</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          ratio='16:9'
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setCameraReally(true)}
        />
      )}
      <View style={styles.bottomBarContainer}>
        <Pressable style={{ width: 50 }} />
        <Pressable
          disabled={!cameraReally}
          onLongPress={recodeVideo}
          onPressOut={stopRecordVideo}
          style={({ pressed }) => [styles.recordButtonContainer, pressed && { opacity: 0.5 }]}>
          <View style={styles.recordButton} />
        </Pressable>
        <Pressable onPress={pickFromLibrary} style={styles.galleryButton}>
          {galleryItems[0] ? (
            <Image style={styles.galleryButtonImage} source={{ uri: galleryItems[0].uri }} />
          ) : (
            <Image
              style={styles.galleryButtonImage}
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1375/1375106.png' }}
            />
          )}
        </Pressable>
      </View>
      <View style={styles.sidebarContainer}>
        <Pressable
          style={({ pressed }) => [styles.sidebarButton, pressed && { opacity: 0.5 }]}
          onPress={handlerChangeCameraType}>
          <Ionicons name='sync' size={24} color='white' />
          <Text style={styles.sidebarText}>Lật</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.sidebarButton, pressed && { opacity: 0.5 }]}
          onPress={handlerChangeCameraFlash}>
          <Ionicons name='flash' size={24} color='white' />
          <Text style={styles.sidebarText}>Flash</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1, aspectRatio: 9 / 16 },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  recordButtonContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: 'transparent',
    borderWidth: 8,
    borderColor: 'rgba(219,37,79,0.4)',
  },
  recordButton: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: 'transparent',
    backgroundColor: 'rgba(219,37,79,1)',
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  galleryButtonImage: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  sidebarContainer: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
  sidebarButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  sidebarText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
