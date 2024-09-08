const GenerateParafLinearInputsString = (value:any) =>{
    let StringToReturn:string = '<div style="display:flex;">'
    value.map((text:string,index:number)=>{
        if(index===0)
            StringToReturn = StringToReturn.concat(`<h3 style="flex:1;text-align:left">${text}</h3>`)
        else if(index===value.length)
            StringToReturn = StringToReturn.concat(`<h3 style="flex:1;text-align:right">${text}</h3>`)
        else
            StringToReturn = StringToReturn.concat(`<h3 style="flex:1;text-align:center">${text}</h3>`)
    })

    StringToReturn = StringToReturn.concat('</div>')

    return StringToReturn
}

const GenerateParagrafString = (dataobj:any) => {
    const { id, masterText, value } = dataobj
    let StringToReturn = `<h1 style="font-family: "Times New Roman", Times, serif;">${masterText}:</h1><div style="padding-left:50px"><ul style="list-style-type:none">`
    value.map((Textobj:any) => {
        const { id, value } = Textobj;
        if(id[0]=="1")
            StringToReturn = StringToReturn.concat(`<li style="font-family: "Times New Roman", Times, serif"><h3>${value}</h3></li>`)
        else
            StringToReturn = StringToReturn.concat(`<li style="font-family: "Times New Roman", Times, serif">${GenerateParafLinearInputsString(value)}</li>`)
    })
    StringToReturn = StringToReturn.concat("</ul></div>")
    return StringToReturn
}

export default GenerateParagrafString