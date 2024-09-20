import Formular from "./FormularAnalize";
import React, { useEffect, useState } from "react";
import Prescriptie from "./Prescriptie";
import { View, StyleSheet, TouchableOpacity, Text, Modal, Image } from 'react-native';
import { formularBackground, formularButtonSubmit } from '../color'
import SubmitAnyForm from "./SubmitAnyForm";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FromLinearToNested from "./TransformerFunctions/FromLinearToNested";
import ModalSelectorWithLabels from "./ModalSelector/ModalSelectorWithLabels";
import StoreImportedImages from "./StoreImportedImages";
import ConvertTimeToString from "../ConvertTimeToString";
import { getDatabase, onValue, ref } from "firebase/database";

const GetCurrDate = () => {
    let currTime = new Date()
    const year = currTime.getFullYear().toString();
    const month = (currTime.getMonth() + 1 < 10 ? '0' + (currTime.getMonth() + 1) : (currTime.getMonth() + 1).toString());
    const day = currTime.getDate() < 10 ? '0' + currTime.getDate() : currTime.getDate().toString();

    const date = `${day}/${month}/${year}`;
    return date
}

const ConvertCNPToAge = (CNP: string) => {
    const anul = (CNP[0] === "1" || CNP[0] === "2"?19*100+(parseInt(CNP.substr(1,2))):20*100+(parseInt(CNP.substr(1,2))))
    const luna  = parseInt(CNP.substr(3,2));
    const zi = parseInt(CNP.substr(5,2));

    const datacurr = GetCurrDate()

    const anulcurr = parseInt(datacurr.substr(6,4));
    const lunacurr = parseInt(datacurr.substr(3,2));
    const zicurr = parseInt(datacurr.substr(0,2));

    let varsta = anulcurr-anul;
    let varstaluni = lunacurr-luna
    if(lunacurr<luna)
        {varsta-=1;
        varstaluni = lunacurr
        }
    else if(lunacurr==luna&&zicurr<zi)
        varsta-=1;

    return {varsta:varsta,luni:varstaluni}
}

const ConvertCNPToGender = (CNP: string) => {
    if(CNP[0] == "1" || CNP[0] == "3" || CNP[0] == "5" || CNP[0] == "7")
        return "Barbat"
    return "Femeie"
}

declare global {
    var Listener: () => void;
}

const ChooseWhich = ({ route }: { route: any }) => {

    let email = route.params.email
    let userID = route.params.userID

    email = 'cineva@gmail.com'
    userID = "qPnCUJFD5qUBBGG6aGucpu5wxb32"

    const nav = useNavigation<NativeStackNavigationProp<any>>();

    const [PrescriptionOrForm, changePrescriptionOrForm] = useState<boolean>(false)
    const [ListaImageUris, changeListaImageUris] = useState<string[]>([])
    const [titlu, changeTitlu] = useState('')
    const [inputsFormular, setInputsFormular] = useState<object[]>([]);
    const [inputsReteta, setInputsReteta] = useState<object[]>([
        { id: 'unitate', val: '' }, { id: 'data', val: GetCurrDate() }, { id: 'serie', val: '' }, { id: 'nr', val: '' }, { id: 'DateP', val: '' }
        , { id: 'varsta', val: '' }, { id: 'CNP', val: '' }, { id: 'diagnostic', val: '' }, { id: 'detalimed', val: '' }
        , { id: 'dencomert', val: '' }, { id: 'concentratia', val: '' }, { id: 'durata', val: '' }, { id: 'numedoc', val: '' }
        , { id: 'codparaf', val: '' }
    ]);
    const [isModalActive, ChangeModalState] = useState<boolean>(false)
    const [pathRetetaStorage, changePath] = useState<string>('')
    const [CNP, changeCNP] = useState<number>(0)


    useEffect(() => {
        const fetchCNP = async () => {
            const dbRef = getDatabase();
            Listener = onValue(ref(dbRef, `users/${userID}/`), (snapshot) => {
                changeCNP(snapshot.val())
            }, { onlyOnce: true })
        }
        fetchCNP()

        return () => {
            globalThis.Listener()
        }
    }, [])

    return <View style={styles.container}>
        <View style={styles.twoOptionsContainer}>
            <TouchableOpacity style={[styles.FormularBTN, (PrescriptionOrForm === false ? styles.Selected : styles.NotSelected)]}
                onPress={() => { changePrescriptionOrForm(false) }}>
                <Text style={styles.textalignment}>Formular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.RetetaBTN, (PrescriptionOrForm === false ? styles.NotSelected : styles.Selected)]}
                onPress={() => { changePrescriptionOrForm(true) }}>
                <Text style={styles.textalignment}>Prescriptie</Text>
            </TouchableOpacity>
        </View>

        <View style={{ height: '82%' }}>
            {PrescriptionOrForm === false ?
                <Formular prop={{
                    InputsLined: inputsFormular
                    , changeInputslined: setInputsFormular
                    , titlu: titlu
                    , changeTitlu: changeTitlu
                    , ListaImageUris: ListaImageUris
                    , changeListaImageUris: changeListaImageUris
                    , varsta:ConvertCNPToAge(CNP.toString())
                    , Gen:ConvertCNPToGender(CNP.toString())
                }} />
                : <Prescriptie prop={{
                    inputs: inputsReteta
                    , setInputs: setInputsReteta
                    , titlu: titlu
                    , changeTitlu: changeTitlu
                }} />}
        </View>

        <View style={{ height: '8%', backgroundColor: formularBackground }}>
            <TouchableOpacity style={styles.submit} onPress={() => {
                if (PrescriptionOrForm === false) {
                    const codForm = ConvertTimeToString()
                    SubmitAnyForm({ inputs: FromLinearToNested(inputsFormular), titlu: titlu, PrescriptionOrForm: PrescriptionOrForm, email: email, cod: codForm })
                    StoreImportedImages({ ListaURIs: ListaImageUris, email, cod: codForm })
                    nav.pop()
                }
                else
                    ChangeModalState(true)
            }}>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Trimite</Text>
            </TouchableOpacity>
        </View>
        <Modal
            visible={isModalActive && PrescriptionOrForm}
            onRequestClose={() => { ChangeModalState(false) }}
        >
            <View>
                <View style={{ height: 40, flexDirection: 'row-reverse', paddingTop: 5 }}>
                    <TouchableOpacity style={styles.leaveModalBTN} onPress={() => { ChangeModalState(false) }}>
                        <Image source={require('../icons/cancel_icon.jpg')} style={styles.Imgstyle} />
                    </TouchableOpacity>
                </View>
                <Text style={{ alignSelf: 'center', fontSize: 16, marginBottom: 5 }}>Selecta-ti carui formular sa i se ataseze reteta</Text>
                <View style={{ height: '81%' }}>
                    <ModalSelectorWithLabels prop={{ email: email, changePath: changePath, pathRetetaStorage: pathRetetaStorage }} />
                </View>
                <TouchableOpacity
                    style={styles.modalBTN}
                    onPress={() => {
                        SubmitAnyForm({ inputs: inputsReteta, titlu: 'PRESCRIPȚIE MEDICALĂ', PrescriptionOrForm: PrescriptionOrForm, email: email, RetetaPathSpecific: pathRetetaStorage })
                        nav.pop()
                    }}
                >
                    <Text style={{ textAlign: 'center', fontSize: 17 }}>Adaugati subscriptia</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    twoOptionsContainer: {
        marginTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    FormularBTN: {
        width: '50%',
        height: 50,
        direction: 'ltr',
    },
    RetetaBTN: {
        width: '50%',
        height: 50,
        direction: 'rtl',
    },
    textalignment: {
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
    },
    Selected: {
        backgroundColor: formularBackground,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    NotSelected: {
        opacity: 0.5,
    },
    submit: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: formularButtonSubmit,
        width: 100,
        height: 40,
        borderRadius: 10,
    },
    spacebetweentop: {
        height: 30
    },
    leaveModalBTN: {
        marginEnd: 10,
        height: 35,
        width: 35,
        backgroundColor: 'lime',
        borderRadius: 10,
        justifyContent: 'center',
    },
    Imgstyle: {
        height: 25,
        width: 25,
        alignSelf: 'center',
    },
    modalBTN: {
        marginTop: 10,
        borderRadius: 10,
        height: 50,
        width: 100,
        backgroundColor: formularButtonSubmit,
        alignSelf: 'center',
    }
})

export default ChooseWhich

