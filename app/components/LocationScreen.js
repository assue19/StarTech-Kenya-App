import React, { Component } from "react";
import { Alert, Platform, View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";


export default class LocationScreen extends Component {

  state = {
   
    locationResult: null,
    loading:false,
    data:[],
    mapRegion: {
      latitude: -1.29883815,
      longitude: 36.79086888735681,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    locationResult: null,
    location: {
      coords: { latitude: -1.29883815, longitude: 36.79086888735681 }
    }
  };
    

  componentDidMount() {
    this._getLocationAsync();
    this.makeRemoteRequest();
  }
  

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  makeRemoteRequest = () => {
    const url = `https://conflicted-app-done-with-db--judymueni.repl.co/devices/location/all`;
    this.setState({
      loading: true
    });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({ 
          data: res,
          error: null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location, });
 };
  
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{ 
            latitude: this.state.location.coords.latitude, 
            longitude: this.state.location.coords.longitude, 
            latitudeDelta: 0.0922, longitudeDelta: 0.0421 
          }}
         // onRegionChange={this._handleMapRegionChange}

         
        >
        {this.state.data.map(marker => (
          <MapView.Marker 
            coordinate={
              {
            latitude: parseFloat(marker.lat), 
            longitude: parseFloat(marker.longt)
          }
            }
            title={"Nduthi"}
          />
        ))} 
        <MapView.Marker
          coordinate={{
            latitude: -1.29883815, 
            longitude: 36.79086888735681
          }}>
            <View style={styles.radius}>
              <View style={styles.marker}/>
            </View>
         
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3, 
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  }
});