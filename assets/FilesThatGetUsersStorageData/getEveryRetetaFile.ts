import { listAll, StorageReference, ref } from "firebase/storage"
import getFormaOBJ from "./getFormaOBJ"

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

export default getEveryRetetaFile
