import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DimensionContext } from '../contexts/DimensionContext';
//comment
export function Header({ route }) {
    
    const [headerTitle, setHeaderTitle] = useState()
    const [headerButtons, setHeaderButtons] = useState([])

    useEffect(() => {


        if (route.params) {
            console.log(route.params.page)

            switch(route.params.page) {
                case "Hug Info":
                    setHeaderTitle("Hug with " + route.params.data.user);
                    break;
                case "Friend Profile":
                    setHeaderTitle(route.params.data.friendName);    
                    break;
                case "Create Hug":
                    setHeaderTitle(route.params.page);
                    break;
            }
        }
       
            const routeName = getFocusedRouteNameFromRoute(route)
            console.log('routename: ', routeName)

            switch(routeName) {
                case "Home":
                    setHeaderTitle('Home');
                    break;
                case "Friends":
                    setHeaderTitle("Friends");
                    setHeaderButtons(["searchBtn"])
                    break;
                case "Notifications":
                    setHeaderTitle("Notifications");
                    break;
        }
        
    }, [route])
  
    return (
        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent', fontSize: 20, justifyContent: 'center' }}>
            <Text style={{ backgroundColor: 'transparent', fontSize: 30, fontWeight: 'bold' }}>{headerTitle}</Text>
        </View>
    )
}

export function HeaderBackButton({ navigation, onMainNav }) {

    const { windowWidth, windowHeight } = useContext(DimensionContext);
    const style = {
        backgroundColor: '#e4e4e4', 
        height: '100%', 
        width: windowWidth / 8, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
  
    if (onMainNav) {
        return <></>
    } else {
        return (
          <TouchableOpacity style={style} onPress={() => navigation.goBack()}>
              <Text>{"<-"}</Text>
          </TouchableOpacity>
        ) 
    } 
}

export default function headerOptions(onMainNav, navigation, route) {



    return {
        headerTitle: <Header route={route} navigation={navigation}/>,
        headerLeft: (props) => <HeaderBackButton navigation={navigation} onMainNav={onMainNav}/>,
        headerTransparent: onMainNav ? true : false,
    }
}
