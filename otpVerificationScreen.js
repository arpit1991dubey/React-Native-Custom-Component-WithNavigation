import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, ScrollView, TouchableOpacity, Image, ActivityIndicator, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import axios from 'axios';
//import {connect} from 'react-redux';
//import cred from '../../credentials/cred';
//import AsyncStorage from '@react-native-community/async-storage';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import MaterialButtonDark2 from '../components/MaterialButtonDark2';



var otp_check = async() => {
    try {
        if(auth.otp.toString().length===6){
            const res = await axios.post(cred.url+'/api/customer/verify_otp',{mobile_no:auth.mobile_no,otp: auth.otp})
            if(res.data.message==="otp_verified"){
                if(res.data.status==="registered"){
                    await AsyncStorage.setItem('APP_LIFECYCLE', 'registered');
                    await AsyncStorage.setItem('APP_TOKEN', res.data.token);
                    this.props.navigation.navigate('Main');                        
                }
                else{
                    await AsyncStorage.setItem('APP_LIFECYCLE', 'authenticated')
                    await AsyncStorage.setItem('APP_TOKEN', result.token)
                    this.props.navigation.navigate('Pager');
                }
            }
            else if(result.message==="otp_mismatch"){
                alert("Otp Mismatch")
            }
        }
        else{
            alert("Enter a valid otp");
        }
    } catch (error) {
        console.log(error);
    }
}

class otpVerificationScreen extends React.Component {
    render() {    
        const auth = this.props.auth; 
        return (
            <View style={styles.MainContainer}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                <View style={styles.topView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Ionicons name="ios-arrow-back" size={25} />
                    </TouchableOpacity>  
                    <View style={styles.titleView}>
                        <Text style={styles.titleTextVerify}>Verify mobile number</Text>   
                        <Text style={styles.titleTextDetail}>Enter the OTP sent to your mobile numner</Text>
                    </View>
                </View>
                <View style={styles.form}>
                
                    <Fumi
                        label={'Enter OTP'}
                        iconClass={FontAwesomeIcon}
                        iconName={'key'}
                        iconColor={'#f95a25'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                     />
                    <View style={styles.DidNotResend}>
                        <Text style={styles.didnotText}>Did not recieve OTP?</Text>
                        <Text style={styles.resendLink}>Resend</Text>
                    </View>
                   <MaterialButtonDark2
                    style={styles.button}
                        text="Verify"
                       // color='#1F1F2E'
                        onPress = {async()=>{await otp_check()}}
                    />
                </View>
            </View>
        );
    }
}

  const styles = StyleSheet.create({
    MainContainer:
    {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    topView:{
        backgroundColor: '#ffffff',
        width: "100%",   
        justifyContent: 'flex-start', 
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        paddingTop: 30,
        marginBottom: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.2
    },

    form:{
        marginTop: 150,
        width: '80%',
        marginHorizontal: '10%'
    },

    input:{
        borderBottomColor: '#33334d',
        borderBottomWidth: 2,
        marginBottom: 15,
    },

    button:{
        marginBottom:260,
        width:120,
        height:40,
        marginLeft:80,

    

    },

    titleView:{
        marginLeft: 23,
    },

    EnterOtpText:{
        //fontWeight: 'bold',
        fontSize: 12,
        color: 'gray'
    },

    resendLink:{
        marginLeft:6,
        color: 'blue',
        fontSize: 12,
    },

    DidNotResend:{
        display:'flex',
        justifyContent: 'center',
        flexDirection:'row',
        marginBottom: 110,
    },

    didnotText:{
        color: 'gray',
        fontSize: 12,
    },

    titleTextVerify:{
        fontWeight:'bold',
        fontSize: 15,
    },

    titleTextDetail:{
        color: 'gray',
    }
});
  export default otpVerificationScreen;      