import { useState } from "react";
import React, { Pressable, Image,Text } from "react-native"

const FormSelectedDisplay = ({ prop }: any) => {

    const { uri, index,URIs,changeURIs,id } = prop

    const [lastTap, setLastTap] = useState<null | number>(null);

    const doubletap = () =>{
        const now = Date.now();
        if (lastTap && (now - lastTap) < 300) { // 300ms threshold for double tap
          const newFormPhoto = URIs[0].filter((photo:any)=>{ return photo.id !== id })
          changeURIs({0:newFormPhoto,1:[...URIs[1]]})
        }
        setLastTap(now);
    }

    return <Pressable onPress={doubletap} style={{ width: '33.333%',backgroundColor:'lightblue', borderRadius:10 }}>
        <Text style={{textAlign:'center'}}>{index+1}</Text>
        <Image source={{ uri: uri }} style={{ width: 100, height: 100,alignSelf:"center" }} />
    </Pressable>
}
export default FormSelectedDisplay