import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import GenerateTextInputString from './Html_string_to_pdf/GenerateTextInputstring';
import GenerateParagrafString from './Html_string_to_pdf/GenerateParagrafString';
import GenerateBooleanString from './Html_string_to_pdf/GenerateBooleanString';
import GenerateLinearInputsString from './Html_string_to_pdf/GenerateLinearInputsString';
    ///text structure: {id:code,value:string}
    ///paragraf structure: {id:code,masterText,value:[]}
    ///boolean structure: {id:code,valuebool:boolean,valuetext:string}

const GeneratePDF = async ( {inputs,titlu}:any ) => {
    let html:string = `<html><h1 style="font-size:50px;text-align:center;">${titlu}</h1><div style="padding:30px">`;
    inputs.map((textobj:any) => {
        if (textobj.id[0] === "1") {
            html = html.concat(GenerateTextInputString(textobj))
        }
        else if (textobj.id[0] === "2") {
            html = html.concat(GenerateParagrafString(textobj))
        }
        else if (textobj.id[0] === "3"){
            html = html.concat(GenerateBooleanString(textobj))
        }
        else if (textobj.id[0] === "4"){
            html = html.concat(GenerateLinearInputsString(textobj))
        }
    })
    html = html.concat("</div></html")
    const { uri } = await Print.printToFileAsync({ html: html, base64: false });
    await Sharing.shareAsync(uri);
}

export default GeneratePDF