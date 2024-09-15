import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const GeneratePhotoPDF = async (uriphoto:string) => {
    let html: string = `<html><head><style>
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
          </style></head>
          <body>
          <div class="no-break">
            <img src=${uriphoto} />
          </div>
        </body>
    </html>`;

    const { uri } = await Print.printToFileAsync({ html: html, base64: false });
    await Sharing.shareAsync(uri);
}

export default GeneratePhotoPDF