const GenerateBooleanString = (dataobj:any) =>{
    const {id,valuebool,valuetext} = dataobj
    return `<div style="width:100%;display:flex">
    <h1 style="width:80%;font-family: "Times New Roman", Times, serif">${valuetext}</h1>
    <h1 style="width:20%;float:right;font-family: "Times New Roman", Times, serif">${valuebool==0?"NU":"DA"}</h1>
    </div>`
}

export default GenerateBooleanString