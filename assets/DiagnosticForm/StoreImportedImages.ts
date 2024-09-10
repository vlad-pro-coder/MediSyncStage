import { Platform } from "react-native";
import {getStorage,ref, uploadBytes} from 'firebase/storage'
import { getApp } from 'firebase/app'

const uploadImage = async ({uri,email,index,cod}:any) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  
    const response = await fetch(uploadUri);
    const blob = await response.blob();

    const app = getApp()
    const storage = getStorage(app,'gs://medisync-4ec40.appspot.com')
  
    const storageRef = ref(storage, `${email}/ISTORICMEDICAL/${cod}/ImagineFolosite/${index}.photo`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Image uploaded to Firebase Storage!');
    }).catch((error) => {
      console.error('Upload failed', error);
    });
  };

const StoreImportedImages = ({ListaURIs,email,cod}:any) =>{

    ListaURIs.map((uri:string,index:number)=>{
        uploadImage({uri,email,index,cod})
    })

}

export default StoreImportedImages