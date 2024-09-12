import { useState } from "react";
import React,{ Pressable,Image,Text } from "react-native"

const RetetaSelectedDisplay = ({prop}:any) =>{
    
    const { uri, index,URIs,changeURIs,id } = prop

    const [lastTap, setLastTap] = useState<null | number>(null);

    const doubletap = () =>{
        const now = Date.now();
        if (lastTap && (now - lastTap) < 300) { // 300ms threshold for double tap
          const newRetetePhoto = URIs[1].filter((photo:any)=>{ return photo.id !== id })
          changeURIs({0:[...URIs[0]],1:newRetetePhoto})
        }
        setLastTap(now);
    }

    return <Pressable onPress={doubletap} style={{width:'33.333%',backgroundColor:'red'}}>
        <Text>{index+1}</Text>
    <Image source={{ uri: uri }} style={{ width: 100, height: 100}} />
  </Pressable>
}
export default RetetaSelectedDisplay