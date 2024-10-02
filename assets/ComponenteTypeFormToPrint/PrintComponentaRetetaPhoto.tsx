import React, { useEffect } from "react";
import { useState } from "react";
import { View,Text,StyleSheet, Modal, Pressable,Image as RImage } from "react-native";
import ZoomableModal from "../zoomableImageInModal/zoomableModal";
import {Image} from "expo-image"

interface IMGinfo {
    width: number,
    height: number,
}

const PrintComponentaRetetaPhoto = ({prop}:any) =>{
    const {uri} = prop

    const [containerWidth, setContainerWidth] = useState(0);
    const [imageSizes, setImageSizes] = useState<IMGinfo>({width:0,height:0});

    const [showModalZoomable, changeShow] = useState<boolean>(false)
    const [SelectedURI, changeURI] = useState<string>('')

    useEffect(()=>{
        RImage.getSize(uri, (width, height) => {
            setImageSizes({ height, width })
        });
    },[])

    const getsizes = (event:any) =>{
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
    }

    console.log(imageSizes,containerWidth)

    const aspectRatio = imageSizes.width !==0 ? imageSizes.height / imageSizes.width:0

    return <View style={{width:'100%',alignSelf:'center'}} onLayout={(event:any)=>{getsizes(event)}}>
                <Modal onRequestClose={() => { changeShow(false) }} visible={showModalZoomable}>
            <ZoomableModal prop={{ uri: SelectedURI }} />
        </Modal>
        {
            containerWidth > 0 && aspectRatio > 0 ? <Pressable onPress={() => {
                changeURI(uri)
                changeShow(true)
            }}><Image source={{ uri: uri }}
            style={{
                width: containerWidth * 1+10, // 100% of the container width
                height: (containerWidth * 1+10) * aspectRatio,
            }}
            contentFit="contain" cachePolicy="memory" /></Pressable>:<Text>loading...</Text>
        }
    </View>

}

export default PrintComponentaRetetaPhoto