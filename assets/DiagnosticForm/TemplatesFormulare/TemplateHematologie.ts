import { concentratia_medie_a_hemoglobinei, distributia_plachetelor, fibrogen, hematocrit, hemoglobina, hemoglobina_eritrocitara_medie, largimea_distributiei, numar_de_bazofile, numar_de_eozinofile, numar_de_eritrocite, numar_de_leucocite, numar_de_limfocite, numar_de_monocite, numar_de_neutrofile, numar_de_trombocite, numarul_de_reticulocite, procent_reticulocite, procentul_de_bazofile, procentul_de_eozinofile, procentul_de_limfocite, procentul_de_monocite, procentul_de_neutrofile, viteza_de_sedimentare, volumul_mediu_eritrocitar, volumul_mediu_plachetar } from "../../assignDataBasedOnAge"

const TemplateHematologie = (assignedID:string,InputsLined:any, changeInputslined:any,varsta:number,luni:number,gen:string) =>{
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
            `${numar_de_eritrocite(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-2`,
        "value": [
            "Hemoglobina",
            "",
            "g/dL",
            `${hemoglobina(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-3`,
        "value": [
            "Hematocrit",
            "",
            "%",
            `${hematocrit(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-4`,
        "value": [
            "Volumul mediu eritrocitar",
            "",
            "fL",
            `${volumul_mediu_eritrocitar(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-5`,
        "value": [
            "Hemoglobina eritrocitara medie",
            "",
            "pg",
            `${hemoglobina_eritrocitara_medie(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-6`,
        "value": [
            "Concentratia medie a hemoglobinei eritrocitare",
            "",
            "g/dL",
            `${concentratia_medie_a_hemoglobinei(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-7`,
        "value": [
            "Largimea distributiei eritrocitare - coeficient variatie",
            "",
            "%",
            `${largimea_distributiei(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-8`,
        "value": [
            "Numarul de reticulocite",
            "",
            "mil./μL",
            `${numarul_de_reticulocite(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-9`,
        "value": [
            "Procentul de reticulocite",
            "",
            "%",
            `${procent_reticulocite(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-10`,
        "value": [
            "Numar de leucocite",
            "",
            "mii/μL",
            `${numar_de_leucocite(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-11`,
        "value": [
            "Procentul de neutrofile",
            "",
            "%",
            `${procentul_de_neutrofile(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-12`,
        "value": [
            "Procentul de eozinofile",
            "",
            "%",
            `${procentul_de_eozinofile(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-13`,
        "value": [
            "Procentul de bazofile",
            "",
            "%",
            `${procentul_de_bazofile(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-14`,
        "value": [
            "Procentul de limfocite",
            "",
            "%",
            `${procentul_de_limfocite(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-15`,
        "value": [
            "Procentul de monocite",
            "",
            "%",
            `${procentul_de_monocite(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-16`,
        "value": [
            "Numar de neutrofile",
            "",
            "mii/μL",
            `${numar_de_neutrofile(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-17`,
        "value": [
            "Numar de eozinofile",
            "",
            "mii/μL",
            `${numar_de_eozinofile(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-18`,
        "value": [
            "Numar de bazofile",
            "",
            "mii/μL",
            `${numar_de_bazofile(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-19`,
        "value": [
            "Numar de limfocite",
            "",
            "mii/μL",
            `${numar_de_limfocite(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-20`,
        "value": [
            "Numar de monocite",
            "",
            "mii/μL",
            `${numar_de_monocite(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-21`,
        "value": [
            "Numar de trombocite",
            "",
            "mii/μL",
            `${numar_de_trombocite(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-22`,
        "value": [
            "Volumul mediu plachetar",
            "",
            "fL",
            `${volumul_mediu_plachetar(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-23`,
        "value": [
            "Distributia plachetelor (trombocitelor)",
            "",
            "fL",
            `${distributia_plachetelor(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-24`,
        "value": [
            "VITEZA DE SEDIMENTARE A HEMATIILOR",
            "",
            "mm/h",
            `${viteza_de_sedimentare(varsta,gen,luni)}`
        ],
        "IsUltimul": false
    },
    {
        "id": `${assignedID}/4-25`,
        "value": [
            "fibrogen",
            "",
            "mg/dL",
            `${fibrogen(varsta,gen,luni)}`
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