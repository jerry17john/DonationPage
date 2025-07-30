import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ImagePicker = ({ profilePic, onImageSelected }) => {
  // 🔐 Permission request function
  const requestCameraAndStoragePermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera access to take a photo.',
            buttonPositive: 'OK',
          }
        );

        const imagePermission = await PermissionsAndroid.request(
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your photo gallery.',
            buttonPositive: 'OK',
          }
        );

        return (
          cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
          imagePermission === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; // iOS handles via Info.plist
    }
  };

  // 📷 Open camera
  const handleOpenCamera = async () => {
    const hasPermission = await requestCameraAndStoragePermissions();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Please enable camera and storage permissions.');
      return;
    }

    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        onImageSelected(response.assets[0]);
      }
    });
  };

  // 🖼️ Open gallery
  const handleOpenGallery = async () => {
    const hasPermission = await requestCameraAndStoragePermissions();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Please enable gallery permissions.');
      return;
    }

    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        onImageSelected(response.assets[0]);
      }
    });
  };

  // ☑️ Show option menu
  const handleChooseOption = () => {
    Alert.alert(
      'Upload Photo',
      'Choose an option',
      [
        { text: 'Camera', onPress: handleOpenCamera },
        { text: 'Gallery', onPress: handleOpenGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity onPress={handleChooseOption} style={styles.imagePicker}>
      {profilePic ? (
        <Image source={{ uri: profilePic.uri }} style={styles.profileImage} />
      ) : (
        <Icon name="user-circle" size={40} color="#555" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    width: 100,
    height: 115,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default ImagePicker;

//ImagePicker.js