import { getApp } from 'firebase/app'
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';

const GetFormularsDependentPhotos = async (path: string) => {
    let aux:string[] = []

    try {
        const app = getApp()
        const storageRef = getStorage(app, 'gs://medisync-4ec40.appspot.com')
        const Path:string = `${path}/ImagineFolosite`
        const PhotosRef = ref(storageRef, Path);

        const res = await listAll(PhotosRef);

        for (const FolderPath of res.items) {
            const url = await getDownloadURL(FolderPath)
            aux.push(url)
        }
    }
    catch (err) {
        console.error(err)
    }
    return aux

}

export default GetFormularsDependentPhotos