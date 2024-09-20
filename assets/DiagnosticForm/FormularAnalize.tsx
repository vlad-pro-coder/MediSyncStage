import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import NewText from './inputObjects/TextObj';
import NewParagraf from './inputObjects/ParagrafObj';
import NewBooleanInput from './inputObjects/BooleanObj';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { formularBackground, inputsBackground, inputsEdges, formularButtonSubmit } from '../color';
import NewLinearInputsObj from './inputObjects/LinearInputsObj';
import TemplateHematologie from './TemplatesFormulare/TemplateHematologie';
import TemplateBiochimie from './TemplatesFormulare/TemplateBiochimie';
import TemplateExamenUrina from './TemplatesFormulare/TemplateExamenUrina';
import TemplateImunologie from './TemplatesFormulare/TemplateImunologie';
import NewImageObj from './inputObjects/ImageObj';
import ImagePickerfunc from './ImagePickerUri';

const Formular = ({ prop }: any) => {
    const [counter, changeCounter] = useState(0)
    const [ImgCounter,changeImgcounter] = useState(0)
    const [activeBtn, changeBtn] = useState<boolean>(true)

    const { InputsLined, changeInputslined, titlu, changeTitlu, ListaImageUris, changeListaImageUris, agemonth } = prop
    //inputs strcuture[]:
        ///text structure: {id:code,value:string}
        ///paragraf structure: {id:code,masterText:string,value:[]}
        ///boolean structure: {id:code,valuebool:boolean,valuetext:string}
        ///linear inputs structure: {id:code,value:string[]}
        ///image display structure: {id:code, ithURI:number}
    //
    //InputsLined strcuture[]:
        //text structure: {id:code,value:string}
        //boolean structure: {id:code,valuebool:boolean,valuetext:string}
        //linear inputs structure: {id:code,value:string[]}
        //(paragraf impartit in 3 categorii)
            //master structure: {id:mastercode,value:string,childrenlen:number}
            //anyinput structure:{id:mastercode + / + code, IsUltimul:boolean ,...anyinput}
    //
    const addInputHandler = () => {
        changeCounter(counter + 1)
        const code: string = "1" + counter
        changeInputslined([...InputsLined, { id: code, value: '' }]);
    }
    const addParagrafHandler = () => {
        changeCounter(counter + 1)
        const code: string = "2" + counter
        changeInputslined([...InputsLined, { id: code, value: '' , childrenlen:0,IsUltimul:true}]);
    }
    const addBooleanHandler = () => {
        changeCounter(counter + 1)
        const code: string = "3" + counter
        changeInputslined([...InputsLined, { id: code, valuetext: '', valuebool: false }]);
    }
    const addLinearInputsHandler = () => {
        changeCounter(counter + 1)
        const code: string = "4" + counter
        changeInputslined([...InputsLined, { id: code, value: [''] }])
    }
    const addImageHandler = async () =>{
        const uriOfImage:string = await ImagePickerfunc()
        if(uriOfImage === "error try again")
            return 0;
        changeCounter(counter + 1)
        const code: string = "5" + counter
        changeInputslined([...InputsLined,{id:code, ithURI:ImgCounter}])
        changeImgcounter(ImgCounter+1)
        changeListaImageUris([...ListaImageUris,uriOfImage])
    }

    const HandleAddParagrafText = (NewID:string,pozParent:number) =>{
        const NewInputs:any[] = InputsLined
        NewInputs[pozParent].childrenlen+=1
        const index = pozParent + NewInputs[pozParent].childrenlen

        NewInputs.splice(index,0,{id:NewID,IsUltimul:true,value:''})
        NewInputs[index-1].IsUltimul = false

        changeInputslined([...NewInputs])
    }
    const HandleAddParagrafLiniarText = (NewID:string,pozParent:number) =>{
        const NewInputs:any[] = InputsLined
        NewInputs[pozParent].childrenlen+=1
        const index = pozParent + NewInputs[pozParent].childrenlen

        NewInputs.splice(index,0,{id:NewID,IsUltimul:true,value:['']})
        NewInputs[index-1].IsUltimul = false

        changeInputslined([...NewInputs])
    }

    const HandleParagrafAnyInputDeletion = (Poz:number,CodParent:string) =>{
        InputsLined[Poz-1].IsUltimul = InputsLined[Poz].IsUltimul
        InputsLined.splice(Poz,1)

        const NewInputs = InputsLined.map((obj:any)=>{
            if(obj.id===CodParent)
            {
                obj.childrenlen-=1
                return obj
            }
            return obj
        })

        changeInputslined(NewInputs)
    }

    const HandleAddLinearInput = (id: string) => {
        const NewInputs = InputsLined.map((input: any) => {
            if (input.id == id)
                input.value.push('')
            return input
        })
        changeInputslined(NewInputs)
    }
    const HandlePopLastInputLinear = (id: string) => {
        const NewInputs = InputsLined.map((input: any) => {
            if (input.id == id&&input.value.length!==1)
                input.value.pop()
            return input
        })
        changeInputslined(NewInputs)
    }
    const handleAnyLinearInputsChange = (text: string, id: string, poz: number) => {
        const NewInputs = InputsLined.map((input: any) => {
            if (input.id == id)
                input.value[poz] = text
            return input
        })
        changeInputslined(NewInputs)
    }
    const handleBooleanTextChange = (text: string, id: string) => {
        const newinputs = InputsLined.map((input: any) => {
            if (input.id == id)
                return { ...input, valuetext: text }
            return input
        })
        changeInputslined(newinputs)
    }
    const handleBooleanChange = (val: number, id: string) => {
        const newinputs = InputsLined.map((input: any) => {
            if (input.id == id)
                return { ...input, valuebool: val }
            return input
        })
        changeInputslined(newinputs)
    }
    const handleInputChange = (text: string, id: string) => {
        const newInputs = InputsLined.map((input: any) => {
            if (input.id === id) {
                return { ...input, value: text };
            }
            return input;
        });
        changeInputslined(newInputs);
    };

    const deleteInputHandler = (id: string) => {
        changeInputslined(InputsLined.filter((input: any) => {
            let IdParent:string = input.id
            const pozbackslash = IdParent.indexOf('/')
            if(pozbackslash!==-1)
                IdParent = IdParent.substr(0,pozbackslash)
            return IdParent !== id
        }));
    };
    const deleteImageHandler = (id:string,ithElem:number) =>{
        let diff = 0
        const newInputs = InputsLined.map((input:any)=>{
            if(input.id[0] === "5")
                input.ithURI -= diff
            if(input.id === id)
                diff = 1
            return input
        })
        changeInputslined(newInputs)
        ListaImageUris.splice(ithElem,1)
        changeListaImageUris(ListaImageUris)
        changeImgcounter(ImgCounter-1)
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => { changeBtn(!activeBtn) }} style={styles.showBtnstyle}>
                    {activeBtn === false ?
                        <Text style={{ fontSize: 20, alignSelf: 'center'}}>+</Text> :
                        <Text style={{ fontSize: 20, alignSelf: 'center'}}>x</Text>
                    }
                </TouchableOpacity>
                {activeBtn === true ? <ScrollView style={styles.actionBtnContainer} horizontal={true}>
                    <TouchableOpacity onPress={addInputHandler} style={styles.actionBtnstyle}>
                        <Text style={[styles.textCenter,{fontSize:20}]}>Text</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addParagrafHandler} style={styles.actionBtnstyle}>
                        <Text style={[styles.textCenter,{fontSize:18}]}>Paragraph</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addBooleanHandler} style={styles.actionBtnstyle}>
                        <Text style={[styles.textCenter,{fontSize:16}]}>Text Da/Nu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addLinearInputsHandler} style={styles.actionBtnstyle}>
                        <Text style={[styles.textCenter,{fontSize:15}]}>Texte Liniare</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addImageHandler} style={styles.actionBtnstyle}>
                        <Text style={[styles.textCenter,{fontSize:15}]}>Imagine</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        changeCounter(counter + 1)
                        TemplateHematologie("2" + counter,InputsLined, changeInputslined,agemonth.varsta,agemonth.luni)
                    }}
                        style={styles.actionBtnstyle}>
                        <Text style={styles.textCenter}>Schita Hematologie</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        changeCounter(counter + 1)
                        TemplateBiochimie("2" + counter,InputsLined, changeInputslined,agemonth.varsta,agemonth.luni)
                    }}
                        style={styles.actionBtnstyle}>
                        <Text style={styles.textCenter}>Schita BioChimie</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        changeCounter(counter + 1)
                        TemplateExamenUrina("2" + counter,InputsLined, changeInputslined,agemonth.varsta,agemonth.luni)
                    }}
                        style={styles.actionBtnstyle}>
                        <Text style={styles.textCenter}>Schita Examen Urina</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        changeCounter(counter + 1)
                        TemplateImunologie("2" + counter,InputsLined, changeInputslined,agemonth.varsta,agemonth.luni)
                    }}
                        style={styles.actionBtnstyle}>
                        <Text style={styles.textCenter}>Schita Imunologie</Text>
                    </TouchableOpacity>
                </ScrollView> : <></>
                }
            </View>
            <TextInput multiline={true} placeholder="Titlu document" value={titlu} onChangeText={text => { changeTitlu(text) }} style={styles.titlu} />
            <View style={{ width: '100%', height: '78%' }}>
                <FlatList
                    data={InputsLined}
                    renderItem={({index,item}:any) => {
                        //
                        let skipmargin:boolean = true
                        if(item.id[0] === "2")
                            skipmargin = item.IsUltimul
                            
                        
                        //
                        return <View key={item.id} style={[styles.inputContainer,(skipmargin===true?{}:{marginBottom:0})]}>
                            {item.id[0] == "1" ? <NewText prop={{ widthprocentage:'91%',text: item.value, index: index, id: item.id, handleInputChange: handleInputChange }} /> : ''}
                            {item.id[0] == "2" ? <NewParagraf prop={{obj:item,poz:index,handleInputChange:handleInputChange,handleAnyLinearInputsChange:handleAnyLinearInputsChange,HandleAddLinearInput:HandleAddLinearInput,HandlePopLastInputLinear:HandlePopLastInputLinear,HandleAddParagrafText:HandleAddParagrafText,HandleAddParagrafLiniarText:HandleAddParagrafLiniarText,HandleParagrafAnyInputDeletion:HandleParagrafAnyInputDeletion}}/>:''}
                            {item.id[0] == "3" ? <NewBooleanInput prop={{ valuebool: item.valuebool, valuetext: item.valuetext, id: item.id, handleBooleanChange: handleBooleanChange, handleBooleanTextChange: handleBooleanTextChange }} /> : ''}
                            {item.id[0] == "4" ? <NewLinearInputsObj prop={{ index: index, values: item.value, id: item.id, handleAnyLinearInputsChange: handleAnyLinearInputsChange, HandleAddLinearInput: HandleAddLinearInput, HandlePopLastInputLinear: HandlePopLastInputLinear }} /> : ''}
                            {item.id[0] == "5" ? <NewImageObj prop={{index:index, uri:ListaImageUris[item.ithURI]}}/>:''}
                            
                            {item.id.indexOf('/') === -1?<TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => {
                                    if(item.id[0] == "5")
                                        deleteImageHandler(item.id,item.ithURI)
                                    deleteInputHandler(item.id)}}
                            >
                                <Text style={styles.deleteButtonText}>X</Text>
                            </TouchableOpacity>:<></>}
                        </View>
                    }}
                    keyExtractor={(input:any) => input.id}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={20}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: '100%',
        backgroundColor: formularBackground,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
    },
    titlu: {
        marginBottom: 15,
        textAlign: "center",
        marginRight: "10%",
        marginLeft: "10%",
        borderColor: inputsEdges,
        backgroundColor: inputsBackground,
        borderWidth: 2,
        borderRadius: 20,
        paddingStart:10,
        paddingTop:3,
        paddingEnd:10,
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
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15,
        height: 70,
    },
    actionBtnContainer: {
        height: '100%',
    },
    actionBtnstyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: formularButtonSubmit,
        width: 90,
        height: '80%',
        borderRadius: 10,
        marginStart: 10,
    },
    showBtnstyle: {
        backgroundColor: formularButtonSubmit,
        height: 35,
        width: 35,
        borderRadius: 100,
        justifyContent:'center'
    },
    textCenter: {
        textAlign: 'center',
    }
});

export default Formular;