import { TextInput } from "react-native-gesture-handler"
import { View, Text, StyleSheet } from "react-native"
import { inputsEdges,inputsBackground } from '../../color';
import React from "react"

const NewBooleanInput = ({ prop }:any) => {
    const { valuebool,valuetext,id,handleBooleanChange,handleBooleanTextChange } = prop

    return <View style={styles.container}>
        <TextInput multiline={true} style={styles.text} onChangeText={text=>{handleBooleanTextChange(text,id)}} value={valuetext}/>
        <Text style={[styles.bool,valuebool==1?styles.boolgreen:styles.boolred]} onPress={()=>{handleBooleanChange(!valuebool,id)}}>{valuebool==0?"NU":"DA"}</Text>
        </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        width:'100%',
    },
    text:{
        borderColor: inputsEdges,
        backgroundColor:inputsBackground,
        borderWidth: 2,
        width:'71%',
        marginRight:'16%',
        borderRadius:20,
        paddingStart:10,
        paddingTop:3,
        paddingEnd:10,
    },
    bool:{
        borderColor:inputsEdges,
        borderWidth:2,
        borderRadius:7,
        justifyContent:'center',
        fontSize:20,
        height:30,
        width:'15%',
        textAlign:'center',
        
    },
    boolgreen:{
        backgroundColor:'limegreen',
    },
    boolred:{
        backgroundColor:'red',
    }
})

export default NewBooleanInput