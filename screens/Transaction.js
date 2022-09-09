import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {Camera} from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      bookId:"",
      studentId:"",
    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    if(domState==="bookId"){
      this.setState({
        bookId: data,
        domState: "normal",
        scanned: true
      });
    }
    if(domState==="studentId"){
      this.setState({
        studentId: data,
        domState: "normal",
        scanned: true
      });
    }
  };

  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState !="normal") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.lowerContainer}>
          <View style={styles.textinputContainer}>
            <TextInput style={styles.textinput} placeholder={"Book Id"}/>
            <TouchableOpacity style={styles.scanbutton}
            onPress={()=>this.getCameraPermissions("bookId")}>
              <Text style={styles.scanbuttonText}>
                Scan
                </Text>

            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

  const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#FFFFFF"
 },
 lowerContainer: {
   flex: 0.5,
   alignItems: "center",
 },
 textinputContainer: {
   borderWidth: 2,
   borderRadius: 10,
   flexDirection: "row",
   backgroundColor: "#9DFD24",
   borderColor: "#FFFFFF"
 },
 textinput: {
   width: "57%",
   height: 50,
   padding: 10,
   borderColor: "#FFFFFF",
   borderRadius: 10,
   borderWidth: 3,
   fontSize: 18,
   backgroundColor: "#5653D4",
   color: "#FFFFFF"
 },
 scanbutton: {
   width: 100,
   height: 50,
   backgroundColor: "#9DFD24",
   borderTopRightRadius: 10,
   borderBottomRightRadius: 10,
   justifyContent: "center",
   alignItems: "center"
 },
 scanbuttonText: {
   fontSize: 24,
   color: "#0A0101",
 }

  
});