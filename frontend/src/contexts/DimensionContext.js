
import { Dimensions } from 'react-native'
import React, { createContext, useState } from 'react'

const windowDimensions = Dimensions.get('window')

export const DimensionContext = createContext();


export function DimensionContextProvider(props) {


    const dimensions = { 
        windowWidth: windowDimensions.width,
        windowHeight: windowDimensions.height,
    }   
    return (
        <DimensionContext.Provider value={{ ...dimensions }}> 
            {props.children}
        </DimensionContext.Provider>
    )
}
