
import { Dimensions, Platform } from 'react-native'
import React, { createContext, useState } from 'react'

const windowDimensions = Dimensions.get('screen');
const platform = Platform.OS;

export const DimensionContext = createContext();


export function DimensionContextProvider(props) {


    const dimensions = { 
        windowWidth: windowDimensions.width,
        windowHeight: windowDimensions.height,   
        platform: platform,
    }   
    
    return (
        <DimensionContext.Provider value={{ ...dimensions }}> 
            {props.children}
        </DimensionContext.Provider>
    )
}
