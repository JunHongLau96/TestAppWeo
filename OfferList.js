import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {data, Icon} from './Data';
import RadialGradient from 'react-native-radial-gradient';
function OfferList({navigation}) {
  const [searchText, setSearchText] = React.useState('');
  const [searchResult, setSearchResult] = React.useState('');

  const onPress = item => {
    navigation.navigate('OfferDetails', {item: item});
  };

  const search = e => {
    setSearchText(e);
  };

  const clearText = e => {
    setSearchText('');
  };

  React.useEffect(() => {
    if (searchText) {
      searchData(searchText);
    }
  }, [searchText]);

  const searchData = text => {
    let searchText = text?.toLowerCase();
    const resultCategory = data?.filter(item =>
      item?.category?.toLowerCase().includes(searchText),
    );
    const resultName = data?.filter(item =>
      item?.name?.toLowerCase().includes(searchText),
    );
    const resultAuthor = data?.filter(item =>
      item?.author?.toLowerCase().includes(searchText),
    );
    const result1 = resultCategory.concat(resultName);
    const result2 = result1.concat(resultAuthor);
    setSearchResult(result2);
  };

  return (
    <View style={styles.flex}>
      <View style={styles.searchBar}>
        <View style={styles.searchText}>
          <TextInput
            value={searchText}
            onChangeText={e => search(e)}
            placeholder="Search"
          />
        </View>
        {searchText ? (
          <TouchableOpacity style={styles.search} onPress={() => clearText()}>
            <Image source={Icon.clear} style={styles.searchIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.result}>
        Results: {searchText ? searchResult?.length : data?.length}
      </Text>
      <FlatList
        data={searchText ? searchResult : data}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onPress(item)}>
            <View style={styles.card}>
              <View style={styles.image}>
                <RadialGradient
                  style={styles.imageWrapper}
                  colors={['#fff', '#bfc3c7', '#fff', '#e8eaed']}
                  stops={[0.5, 0.6, 0.4, 0.6]}
                  center={[58, 60]}
                  radius={88}>
                  <Image source={item.image} style={styles.icon} />
                </RadialGradient>
              </View>
              <View style={styles.info}>
                <View style={styles.border}>
                  <Text style={styles.titleText}>{item?.name}</Text>
                  <Text style={styles.titleText2}>{item?.author}</Text>
                </View>
                <View style={styles.rowText}>
                  <View style={styles.cardLowerText}>
                    <Text style={styles.infoTitle}>Price</Text>
                    <Text style={styles.infoText}>{item?.price}</Text>
                  </View>
                  <View style={styles.cardLowerText}>
                    <Text style={styles.infoTitle}>Miles</Text>
                    <Text style={styles.infoText}>{item?.miles}</Text>
                  </View>
                  <View style={styles.cardLowerText}>
                    <Text style={styles.infoTitle}>Days</Text>
                    <Text style={styles.infoText}>{item?.days}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#e8eaed',
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#bfc3c7',
    fontSize: 18,
  },
  searchText: {
    flex: 10,
  },
  searchIcon: {
    flex: 1,
  },
  clear: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#bfc3c7',
    backgroundColor: '#e8eaed',
    borderWidth: 1,
  },
  image: {
    flex: 1,
    backgroundColor: '#e8eaed',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imageWrapper: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#fff',
  },
  info: {
    flex: 2,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderColor: '#bfc3c7',
  },
  titleText: {
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleText2: {
    fontWeight: 100,
    fontSize: 14,
  },
  border: {
    flex: 1,
    borderBottomWidth: 2,
    borderRadius: 2,
    borderColor: '#bfc3c7',
    marginBottom: 10,
  },
  rowText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  cardLowerText: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  result: {
    fontWeight: 800,
    fontSize: 14,
    color: 'grey',
  },
  infoTitle: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 14,
    color: '#a3a6a8',
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
  },
  textMiddle: {
    marginHorizontal: 10,
    width: '10%',
  },
  input: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'orange',
    paddingVertical: 20,
    paddingRight: 60,
    borderRadius: 20,
    width: '90%',
  },
  input2: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'orange',
    padding: 24,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'blue',
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
  },
  textPhoneNo2: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 35,
  },
  row: {
    flexDirection: 'row',
  },
});

export default OfferList;
