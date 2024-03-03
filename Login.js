import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {Icon} from './Data';
import RadialGradient from 'react-native-radial-gradient';

function Login({navigation}) {
  const [phoneNo, setPhoneNo] = React.useState('');
  const [otpSent, setOTPSent] = React.useState('');
  const otp1 = React.useRef();
  const otp2 = React.useRef();
  const otp3 = React.useRef();
  const otp4 = React.useRef();
  const [otp, setOTP] = React.useState('');
  const [otp1Value, setOTP1Value] = React.useState('');
  const [otp2Value, setOTP2Value] = React.useState('');
  const [otp3Value, setOTP3Value] = React.useState('');
  const [otp4Value, setOTP4Value] = React.useState('');

  const [isOTPSent, setisOTPSent] = React.useState(false);
  const [timer, setTimer] = React.useState(15);
  const [resendOTP, setIsResendOTP] = React.useState(false);

  const sendOTP = () => {
    let otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString();
    setOTPSent(otp);
    setisOTPSent(true);
    setTimer(15);
  };

  React.useEffect(() => {
    if (isOTPSent || resendOTP) {
      showOTP();
      timerSetup();
    }
    resendOTP && setIsResendOTP(false);
  }, [isOTPSent, resendOTP]);

  const resendOTPTrigger = () => {
    sendOTP();
    setIsResendOTP(true);
    setOTP('');
  };

  const timerSetup = () => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        if (lastTimerCount == 0) {
          //your redirection to Quit screen
        } else {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        }
      });
      return () => clearInterval(interval);
    }, 1000);
  };

  React.useEffect(() => {
    if (otp1Value) otp2?.current?.focus?.();
    if (otp2Value) otp3?.current?.focus?.();
    if (otp3Value) otp4?.current?.focus?.();
  }, [otp]);

  const showOTP = () => {
    console.log(otpSent);
    Toast.show({
      type: 'otp',
      text1: otpSent,
    });
  };

  const onChangePin = (pin, otpValue) => {
    otpValue === 'otp1' && setOTP1Value(pin);
    otpValue === 'otp2' && setOTP2Value(pin);
    otpValue === 'otp3' && setOTP3Value(pin);
    otpValue === 'otp4' && setOTP4Value(pin);
    let currentOTP = otp;
    currentOTP += pin;
    setOTP(currentOTP);
  };

  const verifyPin = () => {
    if (otp === otpSent) {
      navigation.navigate('OfferList');
    } else {
      setOTP('');
      sendOTP();
    }
  };

  return (
    <View style={styles.flex}>
      <RadialGradient
        style={styles.login}
        colors={['#fff', '#bfc3c7', '#fff', '#e8eaed']}
        stops={[0.5, 0.6, 0.4, 0.6]}
        center={[190, 450]}
        radius={300}>
        {isOTPSent ? (
          <>
            <Toast config={toastConfig} />
            <Text style={styles.textPhoneNo1}>OTP</Text>
            <View style={styles.row}>
              <Text style={styles.textPhoneNo2}>Sent to +91 {phoneNo}</Text>
              <Image source={Icon.pen} style={styles.pen} />
            </View>
            <View style={styles.row}>
              <View style={styles.input2}>
                <TextInput
                  onChangeText={e => onChangePin(e, 'otp1')}
                  value={otp1Value}
                  placeholder="1"
                  autoFocus={true}
                  maxLength={1}
                  ref={otp1}
                />
              </View>
              <View style={styles.input2}>
                <TextInput
                  onChangeText={e => onChangePin(e, 'otp2')}
                  value={otp2Value}
                  placeholder="2"
                  ref={otp2}
                  maxLength={1}
                />
              </View>
              <View style={styles.input2}>
                <TextInput
                  onChangeText={e => onChangePin(e, 'otp3')}
                  value={otp3Value}
                  placeholder="3"
                  ref={otp3}
                  maxLength={1}
                />
              </View>
              <View style={styles.input2}>
                <TextInput
                  onChangeText={e => onChangePin(e, 'otp4')}
                  value={otp4Value}
                  placeholder="4"
                  maxLength={1}
                  ref={otp4}
                />
              </View>
            </View>
            <View>
              <View style={{marginTop: 20}}>
                {timer === 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      resendOTPTrigger();
                    }}>
                    <Text style={{fontSize: 14, color: 'grey'}}>Send OTP</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{fontSize: 14, color: 'grey'}}>
                    Resend OTP in {timer} sec
                  </Text>
                )}
              </View>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.text}>Login</Text>
            <View style={styles.input}>
              <Text style={styles.textMiddle}>+91</Text>
              <TextInput
                value={phoneNo}
                onChangeText={e => setPhoneNo(e)}
                placeholder="Phone Number"
              />
            </View>
          </>
        )}
      </RadialGradient>
      {isOTPSent ? (
        <TouchableOpacity
          style={[styles.button, otp?.length != 4 && styles.opacity]}
          onPress={() => (otp?.length == 4 ? verifyPin() : null)}>
          <Text style={styles.textBottom}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, !phoneNo && styles.opacity]}
          onPress={() => (phoneNo ? sendOTP() : null)}>
          <Text style={styles.textBottom}>Verify</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  flex2: {flex: 1},
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  text: {
    marginTop: 70,
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 50,
  },
  textMiddle: {
    marginHorizontal: 10,
    width: '15%',
  },
  input: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingRight: 60,
    borderRadius: 20,
    width: '90%',
  },
  input2: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#e8eaed',
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#4341ab',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 80,
    borderRadius: 30,
  },
  textBottom: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  textOTP: {
    color: 'white',
    textAlign: 'center',
  },
  textPhoneNo1: {
    marginTop: 70,
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  textPhoneNo2: {
    fontSize: 14,
    paddingBottom: 35,
  },
  row: {
    flexDirection: 'row',
  },
  opacity: {
    opacity: 0.5,
  },
  pen: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
});

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'pink'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  otp: ({text1, props}) => (
    <View
      style={{
        height: 60,
        width: '50%',
        backgroundColor: 'black',
        justifyContent: 'center',
        borderRadius: 20,
      }}>
      <Text style={styles.textOTP}>Your OTP: {text1}</Text>
    </View>
  ),
};

export default Login;
