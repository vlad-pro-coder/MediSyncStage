import { getApp } from "firebase/app"
import { getStorage, ref, uploadBytes } from "firebase/storage"


const PutjsonOnStorageForDebug = (inputs:object[]) =>{
    const app = getApp()
    const storage = getStorage(app,'gs://medisync-4ec40.appspot.com')

    const RefFormular = ref(storage,'debug.json')
    const jsonfile = JSON.stringify(inputs)
    const blobfile = new Blob([jsonfile],{type:"application/json"})

    uploadBytes(RefFormular,blobfile).then((snapshot)=>{console.log(snapshot)})
}

export default PutjsonOnStorageForDebug