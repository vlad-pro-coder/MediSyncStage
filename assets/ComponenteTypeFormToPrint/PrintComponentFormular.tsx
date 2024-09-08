import React from "react"
import { View, Text, StyleSheet } from "react-native"

const PrintComponentFormular = ({ DataToPrint }: any) => {
    const { masterInputs} = DataToPrint
    const { titlu, inputs } = masterInputs

    const PrintText = ({prop}: any) => {
        const {val,index} = prop
        return <Text key={index} style={{paddingBottom:5}}>{val}</Text>
    }
    const PrintBoolean = ({ prop }: any) => {
        const { valuebool, valuetext,index } = prop
        return <View id={`${index}`} style={[{paddingBottom:5},styles.rowdisplay]}>
            <Text id="text" style={{width:'70%'}}>{valuetext}</Text>
            <Text id="bool" >{valuebool == 1 ? 'DA' : 'NU'}</Text>
        </View>
    }

    const PrintLiniar = ({prop}:any) =>{
        const {value,index} = prop;
        return <View id={`${index}`} style={[{paddingBottom:5},styles.rowdisplay]}>
            {
                value.map((text:string)=>{
                    return <Text style={{width:`${100/value.length}%`,paddingEnd:10}}>{text}</Text>
                })
            }
        </View>
    }
    const PrintParagraf = ({ prop }: any) => {
        const { masterText, value, index } = prop
        return <View id={`${index}`} style={{paddingBottom:5}}>
            <Text style={{paddingBottom:5}}>{masterText}:</Text>
            <View style={{paddingStart:30}}>
            {value.map((textobj: any,index:number) => {
                const {value,id} = textobj;
                if(id[0]==="1")
                    return <PrintText prop={{val:value,index:index}}/>
                else if(id[0]==="4")
                    return <PrintLiniar prop={{ value: textobj.value,index:index }}/>
            })}
            </View>
        </View>
    }

    

    return <View style={{ width: '100%',paddingLeft:5,paddingRight:5}}>
        <Text style={{textAlign:'center'}}>{titlu}</Text>
        {inputs.map((obj: any,index:number) => {
            const {id} = obj
            if (id[0] === "1")
                return <PrintText prop={{val:obj.value,index:index}} />
            else if (id[0] === "2")
                return <PrintParagraf prop={{ "masterText": obj.masterText, "value": obj.value,index:index }} />
            else if(id[0] === "3")
                return <PrintBoolean prop={{ "valuebool": obj.valuebool, "valuetext": obj.valuetext,index:index }} />
            else if(id[0]=== "4")
                return <PrintLiniar prop={{ "value": obj.value,index:index }}/>
        })}
    </View>
}

const styles = StyleSheet.create({
    rowdisplay:{
        flex:1,
        flexDirection:'row',
    }

})

export default PrintComponentFormular