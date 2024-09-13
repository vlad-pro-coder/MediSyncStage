import React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import PrintComponentReteta from "../../ComponenteTypeFormToPrint/PrintComponentReteta"
import { formularButtonSubmit } from "../../color"
import PrintComponentaRetetaPhoto from "../../ComponenteTypeFormToPrint/PrintComponentaRetetaPhoto"


const AfiseazaReteteTreptat = ({ DataToPrint }: any) => {
    const { Retete } = DataToPrint
    console.log(Retete)
    const [nrReteteDeAfisat, changeNrAfisare] = useState<number>(0)

    return <View>
        <View >
            <Text style={{ width: '100%', textAlign: 'center', paddingTop: 5, paddingBottom: 5 }}>La acest formular sunt atasate {Retete.length} Prescriptii</Text>
            <TouchableOpacity style={styles.showMoreBTN} onPress={() => {
                if (nrReteteDeAfisat == 0)
                    changeNrAfisare(Math.min(nrReteteDeAfisat + 2, Retete.length))
                else
                    changeNrAfisare(0)
            }}>{nrReteteDeAfisat === 0 ? <Text style={{ textAlign: 'center', fontSize: 17 }}>Afiseaza</Text> : <Text style={{ textAlign: 'center' }}>Inchide Prescriptiile</Text>}
            </TouchableOpacity>
        </View>
        <View>
            {
                Retete.map((Reteta: any, index: number) => {
                    const { value, path } = Reteta
                    if (index < nrReteteDeAfisat)
                        return <View style={{ flex: 1, flexDirection: 'row' }} id={`${index}`}>
                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 15 }}>
                                <View style={{ borderRadius:30,width:'80%' }}>
                                {value.uri===undefined?
                                    <PrintComponentReteta DataToPrint={{ masterInputs: value }} />:
                                    <PrintComponentaRetetaPhoto prop={{uri:value.uri}} />}
                                </View>

                            </View>

                        </View>
                })
            }
        </View>
        {nrReteteDeAfisat !== Retete.length && nrReteteDeAfisat !== 0 ?
            <TouchableOpacity style={styles.showMoreBTN} onPress={() => { changeNrAfisare(Math.min(nrReteteDeAfisat + 2, Retete.length)) }}>
                <Text style={{ textAlign: 'center' }}>Afiseaza mai multe</Text>
            </TouchableOpacity> :
            <></>
        }
    </View>

}

const styles = StyleSheet.create({
    deleteButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: 35,
        alignSelf: 'flex-start',
    },
    deleteButtonText: {
        color: 'grey',
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 17
    },
    PDFbtnstyle: {
        height: 40,
        width: 40,
        backgroundColor: formularButtonSubmit,
        marginLeft: 5,
        borderRadius: 15,
        marginTop: 15,
        justifyContent: 'center',
    },
    showMoreBTN: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: formularButtonSubmit,
        width: 90,
        height: 40,
        borderRadius: 10,
        marginBottom: 10,
    }
})

export default AfiseazaReteteTreptat