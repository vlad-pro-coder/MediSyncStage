import React, { useEffect, useState } from 'react';
import { ScrollView,  } from 'react-native-gesture-handler';
import { Text,Image,TouchableOpacity } from 'react-native'
import PrintComponentFormular from '../ComponenteTypeFormToPrint/PrintComponentFormular';
import { StyleSheet, View } from 'react-native';
import AfiseazaReteteTreptatIstoric from './AfiseazaReteteTreptatIstoric';
import DeleteGivenPath from './DeleteGivenPath';
import GetInfoIstoricUser from '../FilesThatGetUsersStorageData/GetInfoIstoricUser';
import GeneratePDF from '../PDFgeneratorFormular/PDFgenerator';
import { formularBackground, formularButtonSubmit } from '../color';

const GetDataForUserIstoricMedical = ({prop}:any) => {

    const {chosenPath,changeShowModal,DeleteUserPaths} = prop

    const [ComponentFormularANDRetete, changeFormularANDRetete] = useState<any>({})
    const [DeleteMode, changeDeleteMode] = useState<boolean>(false)

    const DeleteWholeFormularComponent = (pathIdent: string) => {
        const NewComponentFormularANDRetete = ComponentFormularANDRetete.Retete.filter((component: any) => {
            return component.FolderPath !== pathIdent
        })
        changeFormularANDRetete(NewComponentFormularANDRetete)
    }

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
        <View style={{ height: 50}}>
            <View style={{ flex: 1, flexDirection: 'row-reverse'}}>
                <TouchableOpacity style={styles.actionBTN}
                    onPress={() => {
                        changeDeleteMode(!DeleteMode)
                    }}>
                    {DeleteMode === false ? <Image source={require('../icons/trash_icon.jpg')} style={styles.Imgstyle} />
                     : <Image source={require('../icons/cancel_icon.jpg')} style={styles.Imgstyle} />
                     }
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView>
                <View style={{flex:1,flexDirection:'row',paddingRight: 15, paddingLeft: 15 }}>
                    {DeleteMode === true ? <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => {
                            DeleteGivenPath({ Ref: chosenPath, IsFolder: true })
                            DeleteWholeFormularComponent(chosenPath)
                            changeShowModal(false)
                            DeleteUserPaths(chosenPath)
                        }}>
                        <Text style={styles.deleteButtonText}>X</Text>
                    </TouchableOpacity> : <></>}
                    <View style={[styles.FormANDRetete,{ width: (DeleteMode === false ? '100%' : '91%') }]}>
                        <View>
                            <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 30, paddingLeft: 5 }}>
                                <PrintComponentFormular DataToPrint={{ masterInputs: formular}} />
                            </View>

                            {DeleteMode === false?<TouchableOpacity style={styles.PDFbtnstyle} onPress={() => { GeneratePDF(formular) }}>
                                <Image source={require('../icons/pdf_icon.png')} style={{height:30,width:30,alignSelf:'center'}}/>
                            </TouchableOpacity>:<></>}
                        </View>

                        <AfiseazaReteteTreptatIstoric
                            DataToPrint={{ Retete: Retete, DeleteMode: DeleteMode, changeFormularANDRetete: changeFormularANDRetete, ComponentFormularANDRetete: ComponentFormularANDRetete}}
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


export default GetDataForUserIstoricMedical