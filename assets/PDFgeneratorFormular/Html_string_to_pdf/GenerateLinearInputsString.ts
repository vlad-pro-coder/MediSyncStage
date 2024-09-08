const GenerateLinearInputsString = (dataobj:any) =>{
    const {id,value} = dataobj
    let StringToReturn:string = '<div style="display:flex;">'
    value.map((text:string,index:number)=>{
        if(index===0)
            StringToReturn = StringToReturn.concat(`<h1 style="flex:1;text-align:left">${text}</h1>`)
        else if(index===value.length)
            StringToReturn = StringToReturn.concat(`<h1 style="flex:1;text-align:right">${text}</h1>`)
        else
            StringToReturn = StringToReturn.concat(`<h1 style="flex:1;text-align:center">${text}</h1>`)
    })

    StringToReturn = StringToReturn.concat('</div>')
    return StringToReturn
}

export default GenerateLinearInputsString