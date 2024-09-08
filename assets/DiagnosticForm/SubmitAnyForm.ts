import {getStorage,ref, uploadBytes} from 'firebase/storage'
import { getApp } from 'firebase/app'
import ConvertTimeToString from '../ConvertTimeToString'

const SubmitAnyForm = ({inputs,titlu,PrescriptionOrForm,email,RetetaPathSpecific}:any) =>{
    const app = getApp()
    const storage = getStorage(app,'gs://medisync-4ec40.appspot.com')

    let path = `/${email}/ISTORICMEDICAL`
    const jsonfile = JSON.stringify({titlu:titlu,inputs:inputs})
    const blobfile = new Blob([jsonfile],{type:"application/json"})

    if(PrescriptionOrForm===false)
    {
        path = path.concat(`/${ConvertTimeToString()}/formular.json`)
        const RefFormular = ref(storage,path)
        uploadBytes(RefFormular,blobfile).then((snapshot)=>{console.log(snapshot)})
    }
    else
    {
        const Retetapath = RetetaPathSpecific.concat(`/RETETE/${ConvertTimeToString()}.json`)
        const RefReteta = ref(storage,Retetapath)
        uploadBytes(RefReteta,blobfile).then((snapshot)=>{console.log(snapshot)})
    }

}

export default SubmitAnyForm