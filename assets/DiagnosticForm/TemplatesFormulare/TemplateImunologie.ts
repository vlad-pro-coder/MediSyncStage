
const TemplateImunologie = (assignedID:string,InputsLined:any, changeInputslined:any,varsta:number,luni:number) =>{
    const NewTemplateImunologie = [
        {
            "id": `${assignedID}`,
            "value": "IMUNOLOGIE SI SEROLOGIE",
            "childrenlen": 2,
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
                "TSH(hormon de stimulare tiroidiana)",
                "",
                "µUI/mL",
                ""
            ],
            "IsUltimul": true
        }
    ]

    NewTemplateImunologie.map((obj:any)=>{
        InputsLined.push(obj)
    })
    changeInputslined(InputsLined)
}

export default TemplateImunologie