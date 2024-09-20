
const TemplateHematologie = (assignedID:string,InputsLined:any, changeInputslined:any,varsta:number,luni:number) =>{
    const NewTemplateHematologie = [{
        "id": `${assignedID}`,
        "value": "HEMATOLOGIE",
        "childrenlen": 26,
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
            "Numar de eritrocite",
            "",
            "mil./μL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-2`,
        "value": [
            "Hemoglobina",
            "",
            "g/dL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-3`,
        "value": [
            "Hematocrit",
            "",
            "%",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-4`,
        "value": [
            "Volumul mediu eritrocitar",
            "",
            "fL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-5`,
        "value": [
            "Hemoglobina eritrocitara medie",
            "",
            "pg",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-6`,
        "value": [
            "Concentratia medie a hemoglobinei eritrocitare",
            "",
            "g/dL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-7`,
        "value": [
            "Largimea distributiei eritrocitare - coeficient variatie",
            "",
            "%",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-8`,
        "value": [
            "Numarul de reticulocite",
            "",
            "mil./μL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-9`,
        "value": [
            "Procentul de reticulocite",
            "",
            "%",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-10`,
        "value": [
            "Numar de leucocite",
            "",
            "mii/μL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-11`,
        "value": [
            "Procentul de neutrofile",
            "",
            "%",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-12`,
        "value": [
            "Procentul de eozinofile",
            "",
            "%",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-13`,
        "value": [
            "Procentul de bazofile",
            "",
            "%",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-14`,
        "value": [
            "Procentul de limfocite",
            "",
            "%",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-15`,
        "value": [
            "Procentul de monocite",
            "",
            "%",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-16`,
        "value": [
            "Numar de neutrofile",
            "",
            "mii/μL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-17`,
        "value": [
            "Numar de eozinofile",
            "",
            "mii/μL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-18`,
        "value": [
            "Numar de bazofile",
            "",
            "mii/μL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-19`,
        "value": [
            "Numar de limfocite",
            "",
            "mii/μL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-20`,
        "value": [
            "Numar de monocite",
            "",
            "mii/μL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-21`,
        "value": [
            "Numar de trombocite",
            "",
            "mii/μL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-22`,
        "value": [
            "Volumul mediu plachetar",
            "",
            "fL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-23`,
        "value": [
            "Distributia plachetelor (trombocitelor)",
            "",
            "fL",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-24`,
        "value": [
            "VITEZA DE SEDIMENTARE A HEMATIILOR",
            "",
            "mm/h",
            ""
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-25`,
        "value": [
            "fibrogen",
            "",
            "mg/dL",
            ""
        ],
        "IsUltimul": true
    }
]

NewTemplateHematologie.map((obj:any)=>{
    InputsLined.push(obj)
})
changeInputslined(InputsLined)

}

export default TemplateHematologie