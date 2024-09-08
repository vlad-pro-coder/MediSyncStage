import { getApp } from 'firebase/app'
import { getStorage, ref, listAll } from 'firebase/storage';
import getFormaOBJ from './getFormaOBJ';
import getEveryRetetaFile from './getEveryRetetaFile';

const GetInfoIstoricUser = async (path: string) => {
    try {
        const app = getApp()
        const storageRef = getStorage(app, 'gs://medisync-4ec40.appspot.com')
        const IstoricRef = ref(storageRef, path);

        const formularOBJ = await getFormaOBJ(ref(IstoricRef, '/formular.json'))
        const ReteteOBJ: object[] = await getEveryRetetaFile(IstoricRef)

        return { formular: formularOBJ, Retete: ReteteOBJ }
    }
    catch (err) {
        console.error(err)
    }
}

export default GetInfoIstoricUser