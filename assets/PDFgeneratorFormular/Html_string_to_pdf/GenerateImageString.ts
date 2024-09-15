
const GenerateImageString = (uri:string) =>{
    return `<div class="no-break">
    <img src=${uri} alt=${uri}/>
    </div>`
}

export default GenerateImageString