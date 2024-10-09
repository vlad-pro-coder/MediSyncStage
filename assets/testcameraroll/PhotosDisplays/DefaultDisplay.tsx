import React,{ Pressable,Image, View } from "react-native"

const DefaultDisplay = ({prop}:any) =>{
    const { uri, URIs, changeURIs, AddFormOrReteta, id } = prop

    const SelectionFunc = () =>{
        if(AddFormOrReteta === 0)
            changeURIs({0:[...URIs[0],{id:id,uri:uri}],1:[...URIs[1]]})
        else
            changeURIs({0:[...URIs[0]],1:[...URIs[1],{id:id,uri:uri}]})
    }

    return <Pressable onPress={SelectionFunc} style={{width:'33.333%',marginTop:19}}>
    <Image source={{ uri: uri }} style={{ width: 100, height: 100,alignSelf:"center"}} />
  </Pressable>
}
export default DefaultDisplay