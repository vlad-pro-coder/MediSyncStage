import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import GenerateTextInputString from './Html_string_to_pdf/GenerateTextInputstring';
import GenerateParagrafString from './Html_string_to_pdf/GenerateParagrafString';
import GenerateBooleanString from './Html_string_to_pdf/GenerateBooleanString';
import GenerateLinearInputsString from './Html_string_to_pdf/GenerateLinearInputsString';
import GenerateImageString from './Html_string_to_pdf/GenerateImageString';

const styles = `<style>
            .no-break {
              page-break-inside: avoid;
              max-width: 100%;
              height: auto;
              display: block;
              margin: auto;
            }
            @media print {
              img {
                max-height: 100vh;
                max-width: 100vw;
                object-fit: contain;
              }
            }
          </style>`

const GeneratePDF = async ( {formular,PhotosURIs}:any ) => {
    const {inputs,titlu} = formular
    let html:string = `<html><head>${styles}</head><body><h1 style="font-size:50px;text-align:center;">${titlu}</h1><div>`;
    let ith = -1
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
        else if(textobj.id[0] === "5"){
            ith+=1
            html = html.concat(GenerateImageString(PhotosURIs[ith]))
        }
    })
    html = html.concat("</div></body></html")
    const { uri } = await Print.printToFileAsync({ html: html, base64: false });
    await Sharing.shareAsync(uri);
}

export default GeneratePDF