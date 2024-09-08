import PutjsonOnStorageForDebug from "../../FilesThatGetUsersStorageData/PutjsonOnStorageForDebug"
import FromNestedToLinear from "../TransformerFunctions/FromNestedToLinear"

const TemplateExamenUrina = (assignedID:string,InputsLined:any, changeInputslined:any) =>{
    const NewTemplateExamenUrina = [
        {
            "id": `${assignedID}`,
            "value": "EXAMEN COMPLET DE URINA (SUMAR SI SEDIMENT URINAR)",
            "childrenlen": 16,
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-0`,
            "value": [
                "DENUMIRE",
                "REZULTATE",
                "UM",
                "INTERVAL BIOLOGIC DE REF."
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-1`,
            "value": [
                "pH urinar",
                "",
                "",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-2`,
            "value": [
                "Densitate urinara",
                "",
                "",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-3`,
            "value": [
                "Leucocit esteraza",
                "",
                "",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-4`,
            "value": [
                "Hemoglobina",
                "",
                "",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-5`,
            "value": [
                "Bilirubina-",
                "",
                "",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-6`,
            "value": [
                "Urobilinogen-",
                "",
                "mg/dL",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-7`,
            "value": [
                "Glucoza-",
                "",
                "mg/dL,2 mg/dL",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-8`,
            "value": [
                "Proteine",
                "",
                "",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-9`,
            "value": [
                "Corpi cetonici",
                "",
                "",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-10`,
            "value": [
                "Nitriti-",
                "",
                "",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-11`,
            "value": [
                "Acid ascorbic",
                "",
                "",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-12`,
            "value": [
                "Culoare",
                "",
                "",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id":`${assignedID}/4-13`,
            "value": [
                "Claritate",
                "",
                "",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-14`,
            "value": [
                "Celule epiteliale plate-",
                "",
                "UM",
                "/HPF"
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-15`,
            "value": [
                "Leucocite-",
                "",
                "UM",
                "/HPF"
            ],
            "IsUltimul": true
        }
    ]

    NewTemplateExamenUrina.map((obj:any)=>{
        InputsLined.push(obj)
    })
    changeInputslined(InputsLined)
}

export default TemplateExamenUrina