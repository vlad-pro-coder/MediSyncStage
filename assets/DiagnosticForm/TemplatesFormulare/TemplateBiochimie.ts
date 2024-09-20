
const TemplateBiochimie = (assignedID:string,InputsLined:any, changeInputslined:any,varsta:number,luni:number) =>{
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
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-2`,
            "value": [
                "alaninaminotransferaza(ALT/GPT/TGP)",
                "",
                "U/L",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-3`,
            "value": [
                "aspartataminotransferaza(GOT/AST/TGO)",
                "",
                "U/L",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-4`,
            "value": [
                "calciu seric",
                "",
                "mg/dL",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-5`,
            "value": [
                "colesterol total",
                "",
                "mg/dL",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-6`,
            "value": [
                "colesterol HDL",
                "",
                "mg/dL",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-7`,
            "value": [
                "LDL colesterol",
                "",
                "mg/dL",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-8`,
            "value": [
                "Creatinina serica",
                "",
                "mg/dL",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-9`,
            "value": [
                "Rata estimata a filtrarii glomerulare(eGFR)",
                "",
                "ml/min/1.73mp",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-10`,
            "value": [
                "glucoza serica(GLICEMIE)",
                "",
                "mg/dL",
                ""
            ],
            "IsUltimul": false
        },
        {
            "id": `${assignedID}/4-11`,
            "value": [
                "trigliceride",
                "",
                "mg/dL",
                ""
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