import { useState } from 'react';
import React,{Dimensions, Image} from 'react-native'

const NewImageObj = ({prop}:any) =>{
const {index,uri} = prop

    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    if(imageDimensions.height === 0 || imageDimensions.width === 0)
    {Image.getSize(uri, (width, height) => {
        setImageDimensions({ width, height });
      });
    }

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const maxImageWidth = screenWidth * 0.8; // 80% of screen width
  const maxImageHeight = screenHeight * 0.8; // 80% of screen height

  let displayWidth = imageDimensions.width;
  let displayHeight = imageDimensions.height;

  if (displayWidth > maxImageWidth || displayHeight > maxImageHeight) {
    const widthRatio = maxImageWidth / displayWidth;
    const heightRatio = maxImageHeight / displayHeight;
    const minRatio = Math.min(widthRatio, heightRatio);

    displayWidth = displayWidth * minRatio;
    displayHeight = displayHeight * minRatio;
  }

    return <Image id={index} source={{uri:uri}} style={{width: displayWidth, height: displayHeight}}/>

}

export default NewImageObj