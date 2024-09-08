import React, { useEffect, useState } from 'react';
import { ScrollView,  } from 'react-native-gesture-handler';
import PrintComponentFormular from '../../ComponenteTypeFormToPrint/PrintComponentFormular';
import { StyleSheet, View } from 'react-native';
import GetInfoIstoricUser from '../../FilesThatGetUsersStorageData/GetInfoIstoricUser';
import { formularBackground, formularButtonSubmit } from '../../color';
import AfiseazaReteteTreptat from './AfiseazaReteteTreptar';

const GetDataForUserChooseModal = ({prop}:any) => {

    const {chosenPath} = prop

    const [ComponentFormularANDRetete, changeFormularANDRetete] = useState<any>({})

    useEffect(() => {
        const fetchPaths = async () => {
            changeFormularANDRetete(await GetInfoIstoricUser(chosenPath))
        }
        fetchPaths()
    }, []);

    if(ComponentFormularANDRetete.formular === undefined)
        return <View></View>

    const {formular,Retete} = ComponentFormularANDRetete

    
    return <View style={{ paddingTop: 10,backgroundColor:'white' }}>
        <ScrollView>
                <View style={{flex:1,flexDirection:'row',paddingRight: 15, paddingLeft: 15 }}>
                    <View style={[styles.FormANDRetete,{ width: '100%' }]}>
                        <View>
                            <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 30, paddingLeft: 5 }}>
                                <PrintComponentFormular DataToPrint={{ masterInputs: formular}} />
                            </View>
                        </View>

                        <AfiseazaReteteTreptat
                            DataToPrint={{ Retete: Retete}}
                        />
                    </View>
                </View>
        </ScrollView>
        <View style={{height:'25%', backgroundColor:'white'}}></View>
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
    actionBTN: {
        zIndex:10,
        marginEnd:10,
        height: 40,
        width: 40,
        backgroundColor: 'lime',
        borderRadius: 10,
        justifyContent:'center',
    },
    Imgstyle: {
        height: 30,
        width: 30,
        alignSelf: 'center',
    },
    FormANDRetete: {
        backgroundColor: formularBackground,
        marginBottom: 10,
        borderRadius: 30,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
    },
    PDFbtnstyle:{
        zIndex:10,
        height:40,
        width:40,
        backgroundColor:formularButtonSubmit,
        borderRadius:15,
        marginTop:5,
        alignSelf:'center',
        justifyContent:'center',
        
    },
})


export default GetDataForUserChooseModal