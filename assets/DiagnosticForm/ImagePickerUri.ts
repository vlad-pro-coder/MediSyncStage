import * as ImagePicker from 'expo-image-picker';

const ImagePickerfunc = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }

    return "error try again"
}
export default ImagePickerfunc