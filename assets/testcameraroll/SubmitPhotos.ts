import { getApp } from "firebase/app"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import ConvertTimeToString from "../ConvertTimeToString"
import { Platform } from "react-native"

const generateForJson = (catepoze: number, titlu: string) => {
    let inputs = []
    for (let i = 0; i < catepoze; i++)
        inputs.push({ "id": "5" + i, "ithURI": i })

    return { "titlu": titlu, "inputs": inputs }
}

const SubmitPhotos = async ({ titlu, URIs, email }: any) => {

    const app = getApp()
    const storage = getStorage(app, 'gs://medisync-4ec40.appspot.com')

    const formular = generateForJson(URIs[0].length,titlu)

    const path = `${email}/ISTORICMEDICAL/${ConvertTimeToString()}`

    ///send formular
    const jsonfile = JSON.stringify(formular)
    const blobfile = new Blob([jsonfile],{type:"application/json"})

    console.log(path)

    const formularRef = ref(storage,path.concat("/formular.json"))
    uploadBytes(formularRef,blobfile).then((snapshot)=>{console.log(snapshot)})
    ///

    ///send formular dependent photos
    
    const FormularPhotoRef = ref(storage,path.concat("/ImagineFolosite"))
    URIs[0].map(async (photo:any,index:number) =>{
            const uploadUri = Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri;

            const response = await fetch(uploadUri);
            const blob = await response.blob();

            uploadBytes(ref(FormularPhotoRef,`/${index}.photo`), blob)
    })
    ///

    ///send Retete photos
    const RetetePhotoRef = ref(storage,path.concat("/RETETE"))
    URIs[1].map(async (photo:any,index:number) =>{
            const uploadUri = Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri;

            const response = await fetch(uploadUri);
            const blob = await response.blob();

            uploadBytes(ref(RetetePhotoRef,`/${index}.photo`), blob)
    })
    ///

}

export default SubmitPhotos