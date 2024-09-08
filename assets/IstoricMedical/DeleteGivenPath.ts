import {getStorage,ref, StorageReference, deleteObject, listAll} from 'firebase/storage'
import { getApp } from 'firebase/app'

const DeleteItem = (RefDelete:StorageReference) =>{
    deleteObject(RefDelete)
    .then(()=>{
        console.log('file deleted')
    })
    .catch((err)=>{
        console.error(err)
    })
}

const DeleteSubDirectory = (RefDelete:StorageReference) =>{

    listAll(RefDelete)
    .then((res)=>{
        res.items.forEach((fileRef)=>{
            DeleteItem(fileRef)
        })
        res.prefixes.forEach((folderRef)=>{
            DeleteSubDirectory(folderRef)
        })
    })
    .catch((err)=>{
        console.error(err)
    })
}

const DeleteGivenPath = ({Ref,IsFolder}:any) =>{

    const app = getApp()
    const storage = getStorage(app,'gs://medisync-4ec40.appspot.com')

    const RefToDelete:StorageReference = ref(storage,Ref)

    if(IsFolder===false)
        DeleteItem(RefToDelete)
    else
        DeleteSubDirectory(RefToDelete)
}

export default DeleteGivenPath