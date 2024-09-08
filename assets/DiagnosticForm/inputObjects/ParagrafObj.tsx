import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { formularButtonSubmit } from '../../color';
import NewText from './TextObj';
import NewLinearInputsObj from './LinearInputsObj';

const parseIDs = (ID: string) => {

    const pozbackslash = ID.indexOf('/');
    if (pozbackslash == -1) {   //este un masterText
        return { cod1: ID, cod2: '' }
    }
    else {
        //este un any input
        return { cod1: ID.substr(0, pozbackslash), cod2: ID.substr(pozbackslash + 1, ID.length - pozbackslash - 1) }
    }
}

const NewParagraf = ({ prop }: any) => {
    const { obj, poz, handleInputChange, handleAnyLinearInputsChange, HandleAddLinearInput, HandlePopLastInputLinear, HandleAddParagrafText, HandleAddParagrafLiniarText, HandleParagrafAnyInputDeletion } = prop
    const [counter, changeCounter] = useState(0)
    const { id } = obj;

    const { cod1, cod2 } = parseIDs(id) //cod parinte, cod componenta
    if (cod2 === '') {   //mastertext
        const { value, IsUltimul } = obj
        return <View style={[styles.MasterStyle, (IsUltimul === true ? styles.lastItem : styles.noChange)]}>
            <NewText prop={{ text: value, id: id, handleInputChange: handleInputChange, widthprocentage: '100%' }} />
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <TouchableOpacity style={styles.btnStyle} onPress={() => {
                    changeCounter(counter + 1)
                    HandleAddParagrafText(cod1 + '/' + "1" + counter, poz)
                }}>
                    <Text style={styles.textstyle}>Text</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnStyle} onPress={() => {
                    changeCounter(counter + 1)
                    HandleAddParagrafLiniarText(cod1 + '/' + "4" + counter, poz)
                }}>
                    <Text style={styles.textstyle}>Text Liniar</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 7 }}></View>
        </View>
    }
    else if (cod2[0] === '1') {
        const { value, IsUltimul } = obj
        return <View style={[styles.childrenStyle, (IsUltimul === true ? styles.lastItem : styles.noChange)]}>
            <View style={{ height: 7 }}></View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <NewText prop={{ text: value, id: id, handleInputChange: handleInputChange, widthprocentage: '91%' }} />
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => HandleParagrafAnyInputDeletion(poz, cod1)}
                >
                    <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 7 }}></View>
        </View>
    }
    else if (cod2[0] === '4') {
        const { value, IsUltimul } = obj
        return <View style={[styles.childrenStyle, (IsUltimul === true ? styles.lastItem : styles.noChange)]}>
            <View style={{ height: 7 }}></View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <NewLinearInputsObj prop={{ values: value, id: id, handleAnyLinearInputsChange: handleAnyLinearInputsChange, HandleAddLinearInput: HandleAddLinearInput, HandlePopLastInputLinear: HandlePopLastInputLinear }} />
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => HandleParagrafAnyInputDeletion(poz, cod1)}
                >
                    <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 7 }}></View>
        </View >
    }

    return <View><Text>Error Invalid React Component</Text></View>
}

const styles = StyleSheet.create({
    MasterStyle: {
        width: '93%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
    },
    lastItem: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingBottom:10,
    },
    noChange: {

    },
    childrenStyle: {
        width: '93%',
        backgroundColor: 'white',
        paddingStart: 10,
    },
    btnStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: formularButtonSubmit,
        width: 80,
        height: 30,
        borderRadius: 10,
        marginStart: 10,
    },
    textstyle: {
        textAlign: 'center',
    },
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
});

export default NewParagraf