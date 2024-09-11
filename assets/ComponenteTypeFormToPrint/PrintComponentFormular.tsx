import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image } from "react-native"

interface IMGinfo {
    width: number,
    height: number,
}

const PrintComponentFormular = ({ DataToPrint }: any) => {
    const { masterInputs, photosURIs } = DataToPrint
    const { titlu, inputs } = masterInputs

    const [containerWidth, setContainerWidth] = useState(0);
    const [imageSizes, setImageSizes] = useState<IMGinfo[]>([]);

    useEffect(() => {
        const fetchSizes = async () => {
            let aux: IMGinfo[] = [];
            const sizePromises = photosURIs.map((uri: string) => {
                return new Promise<void>((resolve, reject) => {
                    Image.getSize(uri, (width, height) => {
                        aux.push({ height, width });
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

        console.log(imageSizes)
        const aspectRatio = imageSizes[pozPhoto]!==undefined ?imageSizes[pozPhoto].height / imageSizes[pozPhoto].width:0
        return containerWidth > 0 && aspectRatio > 0 ? <Image id={index}
            source={{ uri: photosURIs[pozPhoto] }}
            style={{
                width: containerWidth * 0.9, // 90% of the container width
                height: (containerWidth * 0.9) * aspectRatio,
                alignSelf:'center',
                marginBottom:10
            }}
            resizeMode="contain"
        /> : <Text>loading...</Text>
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
        const { masterText, value, index } = prop
        return <View id={`${index}`} style={{ paddingBottom: 5 }}>
            <Text style={{ paddingBottom: 5 }}>{masterText}:</Text>
            <View style={{ paddingStart: 30 }}>
                {value.map((textobj: any, index: number) => {
                    const { value, id } = textobj;
                    if (id[0] === "1")
                        return <PrintText prop={{ val: value, index: index }} />
                    else if (id[0] === "4")
                        return <PrintLiniar prop={{ value: textobj.value, index: index }} />
                })}
            </View>
        </View>
    }



    return <View style={{ width: '100%', paddingLeft: 5, paddingRight: 5 }} onLayout={handleLayout}>
        <Text style={{ textAlign: 'center' }}>{titlu}</Text>
        {inputs.map((obj: any, index: number) => {
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
        })}
    </View>
}

const styles = StyleSheet.create({
    rowdisplay: {
        flex: 1,
        flexDirection: 'row',
    }

})

export default PrintComponentFormular