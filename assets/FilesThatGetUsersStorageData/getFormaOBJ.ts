import { getDownloadURL, StorageReference } from "firebase/storage"

const getFormaOBJ = async (RefFile: StorageReference) => {

    let FormaOBJ: any = {}
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

export default getFormaOBJ