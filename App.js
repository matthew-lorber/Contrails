import React, { Component } from 'react';
import { StyleSheet, View, Text, Span } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// export

export default

// landing

class App extends React.Component {
  render() {
    return (
      <MapView
        style={{flex:1}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: 40.7357,
          longitude: -74.1724,
          latitudeDelta: 0.1,
          longitudeDelta: 0.7
        }}
      />
    );
  }
}

// initialization

const firebaseConfig = {
  apiKey: "AIzaSyD1QWL_t_cYgYM4ZCREyCZItzvQbLFoqIk",
  authDomain: "contrails-b97bd.firebaseapp.com",
  databaseURL: "https://contrails-b97bd.firebaseio.com",
  projectId: "contrails-b97bd",
  storageBucket: "contrails-b97bd.appspot.com",
  messagingSenderId: "197137720394",
  appId: "1:197137720394:web:c14f8bd14403a5eee5b2b3"
};
//firebase.initializeApp(firebaseConfig);

/* xxxxxxxxxxxx todo: add dependency to build.gradle -->  implementation 'com.google.firebase:firebase-database:19.2.0' */


// get user location
componentDidMount = () => {
  this.getLocation();
}

// on location change
componentDidUpdate = (prevProps, prevState) => {
  // If prevState changes
  if (prevState.newLatitude !== this.state.newLatitude) {
      // calculate the distance between initial and new coordinates
      this.getDistance();
  }
}

// clear listeners
componentWillUnmount = () => {
  navigator.geolocation.clearWatch(this.watcher);
}

getLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, () => {
        this.sendToFirebase();
        this.watchUserPosition(); 
      });
  },
  (error) => {
  },
  { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
  );
}

getDistance = () => {
  let initial = {latitude: this.state.latitude, longitude: this.state.longitude};
  let newCoord = {latitude: this.state.newLatitude, longitude: this.state.newLongitude};
  // const distance = some way to calculate distance (initial, newCoord)
  this.sendToFirebase();
}

watchUserPosition = () => {
  this.watcher = navigator.geolocation.watchPosition(
    (position) => {
      this.setState({
        newLatitude: position.coords.latitude,
        newLongitude: position.coords.longitude,
        error: null,
      });
    },
    (error) => this.setState({ error: error.message }),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
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

// ReactDOM.render(element, document.getElementById('root'));
