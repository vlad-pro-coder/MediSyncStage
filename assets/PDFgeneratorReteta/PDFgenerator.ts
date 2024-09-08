import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const GeneratePDF = async ( {inputs,titlu}:any ) => {
    let html:string = `<html><div style="padding:20px">`;
    console.log(inputs)
    //Unitate Sanitara
    html = html.concat('<div style="padding-left:20px;padding-top:20px">')
    html = html.concat('<h1>Unitate Sanitara:</h1>')
    html = html.concat(`<h1>${inputs[0].val}</h1>`)
    html = html.concat('</div>')
    //titlu
    html = html.concat(`<h1 style="font-size:50px;text-align:center;">${titlu}</h1>`)
    //seria nr
    html = html.concat(`<h2 style="text-align:center;">Seria ${inputs[1].val}    Nr. ${inputs[2].val}</h2>`)
    //date pacient
    html = html.concat(`<h1>Datele Pacientului: ${inputs[3].val}</h1>`)
    //varsta
    html = html.concat(`<h1>Varsta: ${inputs[4].val}</h1>`)
    //CNP
    html = html.concat(`<h1>CNP: ${inputs[5].val}</h1>`)
    //Diagnostic
    html = html.concat(`<h1>Diagnostic: ${inputs[6].val}</h1>`)
    //Detalii medicament
    html = html.concat(`<h1>Detalii medicament: ${inputs[7].val}</h1>`)
    //Denumirea comercială și/sau denumirea comună internațională
    html = html.concat(`<h1>Denumirea comercială și/sau denumirea comună internațională:</h1>`)
    html = html.concat(`<h1>${inputs[8].val}</h1>`)
    //Cantitatea
    html = html.concat(`<h1>Cantitatea: ${inputs[9].val}</h1>`)
    //durata
    html = html.concat(`<h1>Durata tratamentului: ${inputs[10].val}</h1>`)
    //numele doctorului
    html = html.concat(`<h1>Numele medicului prescriptor: ${inputs[11].val}</h1>`)
    //codul de parafa
    html = html.concat(`<h1>Codul de parafă: ${inputs[12].val}</h1>`)

    html = html.concat("</div></html")
    const { uri } = await Print.printToFileAsync({ html: html, base64: false });
    await Sharing.shareAsync(uri);
}

export default GeneratePDF