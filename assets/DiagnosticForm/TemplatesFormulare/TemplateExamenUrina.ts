import { densitate_urina, ph_urina } from "../../assignDataBasedOnAge"

const TemplateExamenUrina = (assignedID:string,InputsLined:any, changeInputslined:any,varsta:number,luni:number,gen:string) =>{
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
                `${ph_urina()}`
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-2`,
            "value": [
                "Densitate urinara",
                "",
                "",
                `${densitate_urina()}`
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-3`,
            "value": [
                "Leucocit esteraza",
                "",
                "",
                "Absent"
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-4`,
            "value": [
                "Hemoglobina",
                "",
                "",
                "Normal"
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-5`,
            "value": [
                "Bilirubina-",
                "",
                "",
                "Negativ"
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-6`,
            "value": [
                "Urobilinogen-",
                "",
                "",
                "Normal"
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-7`,
            "value": [
                "Glucoza-",
                "",
                "",
                "Normal"
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-8`,
            "value": [
                "Proteine",
                "",
                "",
                "Absent"
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-9`,
            "value": [
                "Corpi cetonici",
                "",
                "",
                "Negativ"
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-10`,
            "value": [
                "Nitriti-",
                "",
                "",
                "Negativ"
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-11`,
            "value": [
                "Acid ascorbic",
                "",
                "",
                "Absent"
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-12`,
            "value": [
                "Culoare",
                "",
                "",
                "~Galben"
            ],
            "IsUltimul": false
        },
        {
            "id":`${assignedID}/4-13`,
            "value": [
                "Claritate",
                "",
                "",
                "Clar"
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-14`,
            "value": [
                "Celule epiteliale plate-",
                "",
                "/HPF",
                "F rare"
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-15`,
            "value": [
                "Leucocite-",
                "",
                "/HPF",
                "F rare"
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