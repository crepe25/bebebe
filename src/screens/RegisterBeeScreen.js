import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Video from 'react-native-video';

const RegisterBeeScreen = () => {
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [videoUri, setVideoUri] = useState('');

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });
    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      uploadFileToFirebase(uri, 'images');
    }
  };

  const pickVideo = async () => {
    const result = await launchImageLibrary({
      mediaType: 'video',
      includeBase64: false,
    });
    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setVideoUri(uri);
      uploadFileToFirebase(uri, 'videos');
    }
  };

  const uploadFileToFirebase = async (uri, folder) => {
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    const reference = storage().ref(`${folder}/${fileName}`);
    await reference.putFile(uri);
    const url = await reference.getDownloadURL();
    console.log('File uploaded and available at:', url);
  };

  return (
    <View>
      <Text>벌에 대한 설명</Text>
      <TextInput
        placeholder="벌의 상태를 설명해주세요"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="이미지 선택" onPress={pickImage} />
      {imageUri ? <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} /> : null}
      <Button title="동영상 선택" onPress={pickVideo} />
      {videoUri ? (
        <Video
          source={{ uri: videoUri }}
          style={{ width: 300, height: 300 }}
          controls
        />
      ) : null}
    </View>
  );
};

export default RegisterBeeScreen;
