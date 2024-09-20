import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, FlatList, Pressable, Modal } from "react-native"
import ZoomableModal from "../zoomableImageInModal/zoomableModal"

interface IMGinfo {
    width: number,
    height: number,
}

const PrintComponentFormular = ({ DataToPrint }: any) => {
    const { masterInputs, photosURIs } = DataToPrint
    const { titlu, inputs } = masterInputs

    const [containerWidth, setContainerWidth] = useState(0);
    const [imageSizes, setImageSizes] = useState<IMGinfo[]>([]);

    const [showModalZoomable, changeShow] = useState<boolean>(false)
    const [SelectedURI, changeURI] = useState<string>('')

    useEffect(() => {
        const fetchSizes = async () => {
            let aux: any = {}
            const sizePromises = photosURIs.map((uri: string, index: number) => {
                return new Promise<void>((resolve, reject) => {
                    Image.getSize(uri, (width, height) => {
                        aux[index] = { height, width };
                        resolve();
                    }, reject);
                });
            });

            await Promise.all(sizePromises);
            setImageSizes(aux);
        };

        fetchSizes();
    }, [photosURIs]);

    let nrPhotos = -1

    const handleLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
    };

    const PrintImage = ({ prop }: any) => {
        const { index, pozPhoto } = prop

        const aspectRatio = imageSizes[pozPhoto] !== undefined ? imageSizes[pozPhoto].height / imageSizes[pozPhoto].width : 0
        return containerWidth > 0 && aspectRatio > 0 ? <Pressable onPress={() => {
            changeURI(photosURIs[pozPhoto])
            changeShow(true)
        }}><Image id={index}
            source={{ uri: photosURIs[pozPhoto] }}
            style={{
                width: containerWidth * 0.9, // 90% of the container width
                height: (containerWidth * 0.9) * aspectRatio,
                alignSelf: 'center',
                marginBottom: 10
            }}
            resizeMode="contain"
            /></Pressable> : <Text>loading...</Text>
    }

    const PrintText = ({ prop }: any) => {
        const { val, index } = prop
        return <Text key={index} style={{ paddingBottom: 5 }}>{val}</Text>
    }
    const PrintBoolean = ({ prop }: any) => {
        const { valuebool, valuetext, index } = prop
        return <View id={`${index}`} style={[{ paddingBottom: 5 }, styles.rowdisplay]}>
            <Text id="text" style={{ width: '70%' }}>{valuetext}</Text>
            <Text id="bool" >{valuebool == 1 ? 'DA' : 'NU'}</Text>
        </View>
    }

    const PrintLiniar = ({ prop }: any) => {
        const { value, index } = prop;
        return <View id={`${index}`} style={[{ paddingBottom: 5 }, styles.rowdisplay]}>
            {
                value.map((text: string) => {
                    return <Text style={{ width: `${100 / value.length}%`, paddingEnd: 10 }}>{text}</Text>
                })
            }
        </View>
    }

    const PrintParagraf = ({ prop }: any) => {

        const FlatListItemsParagraf = ({ item, index }: any) => {
            const { value, id } = item;
            if (id[0] === "1") {
                return <PrintText prop={{ val: value, index: index }} />;
            } else if (id[0] === "4") {
                return <PrintLiniar prop={{ value: item.value, index: index }} />;
            }
            return null;
        };

        const { masterText, value, index } = prop
        return <View id={`${index}`} style={{ paddingBottom: 5 }}>
            <Text style={{ paddingBottom: 5 }}>{masterText}:</Text>
            <View style={{ paddingStart: 30 }}>
                <FlatList
                    data={value}
                    renderItem={FlatListItemsParagraf}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />
                {/*value.map((textobj: any, index: number) => {
                    const { value, id } = textobj;
                    if (id[0] === "1")
                        return <PrintText prop={{ val: value, index: index }} />
                    else if (id[0] === "4")
                        return <PrintLiniar prop={{ value: textobj.value, index: index }} />
                })*/}
            </View>
        </View>
    }


    const FlatItemsBasePrint = ({ item, index }: any) => {
        const { id } = item;
        if (id[0] === "1")
            return <PrintText prop={{ val: item.value, index: index }} />
        else if (id[0] === "2")
            return <PrintParagraf prop={{ "masterText": item.masterText, "value": item.value, index: index }} />
        else if (id[0] === "3")
            return <PrintBoolean prop={{ "valuebool": item.valuebool, "valuetext": item.valuetext, index: index }} />
        else if (id[0] === "4")
            return <PrintLiniar prop={{ "value": item.value, index: index }} />
        else if (id[0] === "5") {
            nrPhotos += 1
            return <PrintImage prop={{ index: index, pozPhoto: nrPhotos }} />
        }
        return null
    }

    return <View style={{ width: '100%', paddingLeft: 5, paddingRight: 5 }} onLayout={handleLayout}>
        <Modal onRequestClose={() => { changeShow(false) }} visible={showModalZoomable}>
            <ZoomableModal prop={{ uri: SelectedURI }} />
        </Modal>
        <Text style={{ textAlign: 'center', marginBottom: 10, fontSize: 17 }}>{titlu}</Text>
        <FlatList
            data={inputs}
            renderItem={FlatItemsBasePrint}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
        />
        {/*inputs.map((obj: any, index: number) => {
            const { id } = obj
            if (id[0] === "1")
                return <PrintText prop={{ val: obj.value, index: index }} />
            else if (id[0] === "2")
                return <PrintParagraf prop={{ "masterText": obj.masterText, "value": obj.value, index: index }} />
            else if (id[0] === "3")
                return <PrintBoolean prop={{ "valuebool": obj.valuebool, "valuetext": obj.valuetext, index: index }} />
            else if (id[0] === "4")
                return <PrintLiniar prop={{ "value": obj.value, index: index }} />
            else if (id[0] === "5") {
                nrPhotos += 1
                return <PrintImage prop={{ index: index, pozPhoto: nrPhotos }} />
            }
        })*/}
    </View>
}

const styles = StyleSheet.create({
    rowdisplay: {
        flex: 1,
        flexDirection: 'row',
    }

})

export default PrintComponentFormular