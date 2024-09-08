import React from "react"
import {Text, View,StyleSheet } from "react-native"
import {formularBackground} from '../color'

/*[
    {id:'unitate',val:''},{id:'serie',val:''},{id:'nr',val:''},{id:'DateP',val:''}
    ,{id:'varsta',val:''},{id:'CNP',val:''},{id:'diagnostic',val:''},{id:'detalimed',val:''}
    ,{id:'dencomert',val:''},{id:'concentratia',val:''},{id:'durata',val:''},{id:'numedoc',val:''}
    ,{id:'codparaf',val:''}
]*/

const PrintComponentReteta = ({ DataToPrint }: any) => {

    const { masterInputs} = DataToPrint
    const {titlu,inputs} = masterInputs

    return <View style={[styles.container,{width:'80%',alignSelf:'center'}]}>
        <View id="Unitate Sanitara && Data" style={{flex:1,flexDirection:'row'}}>
            <View id="Unitate Sanitara" style={{width:'50%'}}>
                <Text id="1" style={styles.deffont}>Unitate Sanitară:</Text>
                <Text id="2" style = {[{width:'80%'}]}>{inputs[0].val}</Text>
            </View>   
            <View id="Data" style={{width:'50%',flex:1}}>
                <Text id="3" style={[styles.deffont,{alignSelf:'flex-end'}]}>Data:</Text>
                <Text id="4" style = {[{width:'80%',alignSelf:'flex-end',textAlign:'right'}]}>{inputs[1].val}</Text>
            </View>
        </View>
        <View id="titlu" style={[, styles.sameline, styles.middlealign]}>
            <Text id="5" style={[styles.titlu]}>{titlu}</Text>
        </View>
        <View id="seria nr" style={[styles.sameline, styles.middlealign]}>
            <Text id="6" style={{ paddingRight: 5 }}>Seria</Text>
            <Text id="7" style={[styles.input]}>{inputs[2].val}</Text>
            <View id="8" style={{ width: 10 }}></View>
            <Text id="9" style={{ paddingRight: 5 }}>Nr.</Text>
            <Text id="10" style={[styles.input]}>{inputs[3].val}</Text>
        </View>
        <View id="date pacient" style={[styles.sameline]}>
            <Text id="11" style={styles.deffont}>Datele Pacientului:</Text>
            <Text id="12" style={[styles.input,{width:'50%'}]}>{inputs[4].val}</Text>
        </View>
        <View id="varsta" style={[styles.sameline]}>
            <Text id="13" style={styles.deffont}>Varsta:</Text>
            <Text id="14" style={[styles.input,{width:'80%'}]}>{inputs[5].val}</Text>
        </View>
        <View id="cnp" style={[styles.sameline]}>
            <Text id="15" style={styles.deffont}>CNP:</Text>
            <Text id="16" style={[styles.input,{width:'80%'}]}>{inputs[6].val}</Text>
        </View>
        <View id="diagnostic" style={[styles.sameline]}>
            <Text id="17" style={styles.deffont}>Diagnostic:</Text>
            <Text id="18" style={[styles.input,{width:'70%'}]}>{inputs[7].val}</Text>
        </View>
        <View id="detalii medicale" style={[styles.sameline]}>
            <Text id="19" style={styles.deffont}>Detalii medicament:</Text>
            <Text id="20" style={[styles.input,{width:'48%'}]}>{inputs[8].val}</Text>
        </View>
        <View id="denumirea comerciala" >
            <Text id="21" style={styles.deffont}>Denumirea comercială și/sau denumirea comună internațională:</Text>
            <Text id="22" style={[styles.input,{width:'98%'}]}>{inputs[9].val}</Text>
        </View>
        <View id="concentratia" style={[styles.sameline]}>
            <Text id="23" style={styles.deffont}>Cantitatea:</Text>
            <Text id="24" style={[styles.input,{width:'70%'}]}>{inputs[10].val}</Text>
        </View>
        <View id="durata" style={[styles.sameline]}>
            <Text id="25" style={styles.deffont}>Durata tratamentului:</Text>
            <Text id="26" style={[styles.input,{width:'45%'}]}>{inputs[11].val}</Text>
        </View>
        <View id="numele doctorului" style={[styles.sameline]}>
            <Text id="27" style={styles.deffont}>Numele medicului prescriptor:</Text>
            <Text id="28" style={[styles.input,{width:'18%'}]}>{inputs[12].val}</Text>
        </View>
        <View id="codul de parafa" style={[styles.sameline]}>
            <Text id="29" style={styles.deffont}>Codul de parafă:</Text>
            <Text id="30" style={[styles.input,{width:'58%'}]}>{inputs[13].val}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container:{
        paddingLeft:7,
        paddingBottom:10,
        paddingTop:10,
        backgroundColor:'white',
    },
    sameline:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:2,
    },
    middlealign:{
        justifyContent:'center',
    },
    titlu:{
    },
    deffont:{
        alignSelf:'flex-start',
    },
    input: {
    }
    })

export default PrintComponentReteta