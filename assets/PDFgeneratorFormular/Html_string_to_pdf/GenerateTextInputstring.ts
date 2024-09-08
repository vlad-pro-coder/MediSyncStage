const GenerateTextInputString = (dataobj:any) =>{
    const {id,value} = dataobj
    return `<h1 style="font-family: "Times New Roman", Times, serif;padding-left:10px">${value}</h1>`
}

export default GenerateTextInputString