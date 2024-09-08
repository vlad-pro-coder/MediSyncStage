import { getApp } from 'firebase/app'
import { getStorage, ref, listAll, getDownloadURL, StorageReference } from 'firebase/storage';

const getFormaOBJ = async (RefFile: StorageReference) => {

    let FormaOBJ: object = {}
    await getDownloadURL(RefFile)
        .then(async (url) => {

            await fetch(url)
                .then(async (ResponsFormular) => {

                    await ResponsFormular.text().then((jsonfile) => {
                        FormaOBJ = JSON.parse(jsonfile)
                    })

                })
                .catch((error) => {
                    console.log(error)
                })
        })
        .catch((error) => {
            console.log(error)
        })

    return FormaOBJ
}

const getEveryRetetaFile = async (RefFolder: StorageReference) => {
    let EveryRetetaData: object[] = []
    try {
        const ReteteRef = ref(RefFolder, '/RETETE')
        const res = await listAll(ReteteRef)

        for (const RetetaRef of res.items)
            EveryRetetaData.push({ value: await getFormaOBJ(RetetaRef), path: RetetaRef.fullPath })

    } catch (err) {
        console.error(err)
    }

    return EveryRetetaData
}

const OldGetInfoIstoricUser = async (email:string) =>{
    let aux: object[] = []
    try {
        const app = getApp()
        const storageRef = getStorage(app, 'gs://medisync-4ec40.appspot.com')
        const IstoricRef = ref(storageRef, `${email}/ISTORICMEDICAL`)
        const res = await listAll(IstoricRef);
        
        for (const FolderPath of res.prefixes) {
            const formularOBJ = await getFormaOBJ(ref(FolderPath, '/formular.json'))
            const ReteteOBJ: object[] = await getEveryRetetaFile(FolderPath)

            aux.push({ FolderPath: FolderPath.fullPath, formular: formularOBJ, Retete: ReteteOBJ })
        }
    } catch (err) {
        console.error(err)
    }
    return aux
}

export default OldGetInfoIstoricUser