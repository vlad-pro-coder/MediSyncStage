import { acid_uric_seric, alaninaminotransferaza_ALT_GPT_TGP, aspartataminotransferaza_GOT_AST_TGO, calciu_seric, colesterol_HDL, colesterol_LDL, colesterol_total, creatinina_serica, glucoza_serica, rata_estimata_filtrari, trigliceride } from "../../assignDataBasedOnAge"

const TemplateBiochimie = (assignedID:string,InputsLined:any, changeInputslined:any,varsta:number,luni:number,gen:string) =>{
    const NewTemplateBiochimie = [
        {
            "id": `${assignedID}`,
            "value": "BIOCHIMIE",
            "childrenlen": 12,
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
                "acid uric seric",
                "",
                "mg/dL",
                `${acid_uric_seric(varsta,gen,luni)}`
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-2`,
            "value": [
                "alaninaminotransferaza(ALT/GPT/TGP)",
                "",
                "U/L",
                `${alaninaminotransferaza_ALT_GPT_TGP(varsta,gen,luni)}`
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-3`,
            "value": [
                "aspartataminotransferaza(GOT/AST/TGO)",
                "",
                "U/L",
                `${aspartataminotransferaza_GOT_AST_TGO(varsta,gen,luni)}`
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-4`,
            "value": [
                "calciu seric",
                "",
                "mg/dL",
                `${calciu_seric(varsta,gen,luni)}`
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-5`,
            "value": [
                "colesterol total",
                "",
                "mg/dL",
                `${colesterol_total(varsta,gen,luni)}`
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-6`,
            "value": [
                "colesterol HDL",
                "",
                "mg/dL",
                `${colesterol_HDL(varsta,gen,luni)}`
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-7`,
            "value": [
                "LDL colesterol",
                "",
                "mg/dL",
                `${colesterol_LDL(varsta,gen,luni)}`
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-8`,
            "value": [
                "Creatinina serica",
                "",
                "mg/dL",
                `${creatinina_serica(varsta,gen,luni)}`
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-9`,
            "value": [
                "Rata estimata a filtrarii glomerulare(eGFR)",
                "",
                "ml/min",
                `${rata_estimata_filtrari(varsta,gen,luni)}`
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-10`,
            "value": [
                "glucoza serica(GLICEMIE)",
                "",
                "mg/dL",
                `${glucoza_serica(varsta,gen,luni)}`
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-11`,
            "value": [
                "trigliceride",
                "",
                "mg/dL",
                `${trigliceride(varsta,gen,luni)}`
            ],
            "IsUltimul": true
        }
    ]

    NewTemplateBiochimie.map((obj:any)=>{
        InputsLined.push(obj)
    })
    changeInputslined(InputsLined)
}

export default TemplateBiochimie