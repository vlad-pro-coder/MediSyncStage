import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import React, { Dimensions, Image } from 'react-native'

const ZoomableModal = ({ prop }: any) => {
    const { uri } = prop;
    const screenWidth = Dimensions.get('window').width;

    return <ReactNativeZoomableView
        maxZoom={5}
        minZoom={0.9}
        zoomStep={0.1}
        initialZoom={1}
        bindToBorders={true}>
        <Image source={{ uri: uri }}
            style={{ width: screenWidth, height: undefined, aspectRatio: 1 }}
            resizeMode="contain" />
    </ReactNativeZoomableView>
}

export default ZoomableModal