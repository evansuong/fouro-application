import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import AddFriendPage from './src/pages/AddFriendPage';
import CorkboardPage from './src/pages/CorkboardPage';
import CreateHugPage from './src/pages/CreateHugPage';
import FriendHistoryPage from './src/pages/FriendHistoryPage';
import FriendProfilePage from './src/pages/FriendProfilePage';
import HugInfoPage from './src/pages/HugInfoPage';
import MainNavPage from './src/pages/MainNavPage';

export default function App() {
 /*
  * all routes are pages accessible via button click
  * MainNavPage is the main navigation which contains the swipe view
  */
  return (
    <View style={styles.container}>
      <NativeRouter>
        <View>
          <Switch>
            <Route exact path="/" component={MainNavPage}/> 

            <Route exact path="/corkboard" component={CorkboardPage}/>
            <Route exact path="/hug-info" component={HugInfoPage}/>

            <Route exact path="/create-hug" component={CreateHugPage}/>
            <Route exact path="/add-friend" component={AddFriendPage}/>
            <Route exact path="/friend-history" component={FriendHistoryPage}/>
            <Route exact path="/friend-profile" component={FriendProfilePage}/>
          </Switch>
        </View>
      </NativeRouter>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
