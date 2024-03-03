import * as React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {data, Icon} from './Data';
import PieChart from 'react-native-pie-chart';
import CheckBox from '@react-native-community/checkbox';

function OfferDetails({route, navigation}) {
  const {item} = route.params;
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  const goBack = () => {
    navigation.goBack();
  };
  const widthAndHeight = 300;
  const sliceColor = [
    '#4db504',
    '#d4d5d6',
    '#4f4dd6',
    '#d4d5d6',
    '#e3174d',
    '#d4d5d6',
  ];
  let separator =
    ((item.collectingAmount + item.miles + item.days) / 100) * 0.01;
  return (
    <View style={styles.flex}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.left} onPress={() => goBack()}>
          <Image source={Icon.back} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.center}>Collect Offer</Text>
        </View>
      </View>
      <View style={styles.row2}>
        <View style={styles.row3}>
          <Image source={Icon.collecting} style={styles.collecting} />
          <Image source={Icon.collecting} style={styles.collecting} />
          <Image source={Icon.collecting} style={styles.collecting} />
          <View style={{paddingLeft: 5}}>
            <Text style={styles.center}>{item.collectingAmount}</Text>
            <Text style={styles.headerText}>Collecting</Text>
          </View>
        </View>
        <View style={styles.row3}>
          <Image source={Icon.clock} style={styles.clock} />
          <View style={{paddingLeft: 5}}>
            <Text style={styles.center}>{item.amountLeft}</Text>
            <Text style={styles.headerText}>Left</Text>
          </View>
        </View>
        <View style={styles.row4}>
          <View style={{paddingLeft: 5}}>
            <Text style={styles.center}>{item.shares}</Text>
          </View>
          <Image source={Icon.share} style={styles.share} />
        </View>
      </View>
      <View style={styles.flex2}>
        <View style={styles.flex3}>
          <View
            style={{
              padding: 5,
              borderRadius: 300,
              backgroundColor: '#d4d5d6',
            }}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={[20, 0.1, item.days, 0.1, item.miles, 0.1]}
              sliceColor={sliceColor}
              coverRadius={0.9}
              coverFill={'#fff'}
            />
          </View>
          <View style={styles.centerContent}>
            <Image source={item.image} style={styles.roundImage} />
          </View>
          <View style={styles.leftPieValue}>
            <Text style={styles.value3}>{item.miles}</Text>
            <Text style={styles.headerText}>Miles</Text>
          </View>
          <View style={styles.topPieValue}>
            <Text style={styles.value1}>${item.value}</Text>
            <Text style={styles.headerText}>
              ${(item?.value / 12)?.toFixed(2)}/Month
            </Text>
          </View>
          <View style={styles.rightPieValue}>
            <Text style={styles.value2}>{item.days}</Text>
            <Text style={styles.headerText}>Days</Text>
          </View>
          <View style={styles.bottomPieValue}>
            <View style={{paddingLeft: 7}}>
              <Image source={Icon.circle} />
            </View>
            <Text style={styles.shares}>{item?.shares}</Text>
          </View>
          <View style={styles.pieBottom}>
            <Text style={styles.value}>{item?.name}</Text>
            <Text style={styles.description}>{item?.description}</Text>
          </View>
          <View
            style={[
              {
                backgroundColor: '#fff',
                borderWidth: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingTop: 10,
                borderColor: '#d4d5d6',
                paddingHorizontal: 10,
                width: '100%',
              },
              styles.shadowProps,
            ]}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                textAlign: 'center',
                paddingBottom: 10,
              }}>
              OFFER DETAILS
            </Text>
            <View>
              <Text style={{color: 'grey', paddingBottom: 5}}>Payment</Text>
              <Text style={{marginBottom: 10, fontSize: 16}}>
                {item.paymentType}
              </Text>
            </View>
            <View>
              <Text style={{color: 'grey', paddingBottom: 5}}>
                Validity Date
              </Text>
              <Text style={{marginBottom: 10, fontSize: 16}}>
                {item.validity}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          {
            backgroundColor: '#fff',
            paddingHorizontal: 30,
            paddingVertical: 15,
          },
          styles.shadowProps,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{transform: [{scaleX: 0.5}, {scaleY: 0.5}]}}>
            <CheckBox
              boxType="square"
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
          </View>
          <Text style={{paddingLeft: 5}}>I agree to these </Text>
          <TouchableOpacity onPress={null}>
            <Text style={{color: '#403de3'}}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, !toggleCheckBox && styles.opacity]}
          onPress={null}>
          <Text style={styles.textBottom}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  row: {
    flexDirection: 'row',
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderColor: '#d4d5d6',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  row3: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  row4: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  left: {
    flex: 3,
  },
  title: {flex: 5},
  collecting: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  clock: {
    width: 20,
    height: 20,
  },
  share: {
    width: 20,
    height: 20,
  },
  center: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 12,
  },
  flex2: {
    flex: 1,
    backgroundColor: '#d4d5d6',
    paddingHorizontal: 20,
  },
  flex3: {
    backgroundColor: '#fff',
    paddingTop: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  centerContent: {
    padding: 90,
    position: 'absolute',
  },
  roundImage: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  topPieValue: {
    paddingTop: 40,
    position: 'absolute',
  },
  bottomPieValue: {
    justifyContent: 'center',
    paddingTop: 255,
    position: 'absolute',
  },
  leftPieValue: {
    paddingRight: 200,
    paddingTop: 150,
    position: 'absolute',
  },
  rightPieValue: {
    paddingLeft: 200,
    paddingTop: 150,
    position: 'absolute',
  },
  value1: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4db504',
    fontWeight: 'bold',
  },
  value2: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4f4dd6',
    fontWeight: 'bold',
  },
  value3: {
    fontSize: 18,
    textAlign: 'center',
    color: '#e3174d',
    fontWeight: 'bold',
  },
  shares: {
    fontSize: 18,
    textAlign: 'center',
  },
  value: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pieBottom: {
    paddingVertical: 20,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
    textAlign: 'center',
    color: 'grey',
    paddingHorizontal: 40,
  },
  shadowProps: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  button: {
    backgroundColor: '#4341ab',
    padding: 15,
    borderRadius: 30,
  },
  textBottom: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
});

export default OfferDetails;
