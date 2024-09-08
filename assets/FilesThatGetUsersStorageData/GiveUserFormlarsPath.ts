import { getApp } from "firebase/app";
import { getStorage, listAll, ref } from "firebase/storage";
import getFormaOBJ from "./getFormaOBJ";

const GetUserFormularsPath = async (email:string) =>{
    let aux: object[] = []
    try {
        const app = getApp()
        const storageRef = getStorage(app, 'gs://medisync-4ec40.appspot.com')
        const IstoricRef = ref(storageRef, `${email}/ISTORICMEDICAL`)
        const res = await listAll(IstoricRef);
        
        for (const FolderPath of res.prefixes) {
            const formularOBJ:any = await getFormaOBJ(ref(FolderPath, '/formular.json'))
            aux.push({folder:FolderPath.fullPath,titlu:formularOBJ.titlu})
        }
    } catch (err) {
        console.error(err)
    }
    return aux
}

export default GetUserFormularsPath