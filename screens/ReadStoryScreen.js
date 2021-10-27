import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import db from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';

export default class ReadStoryScr extends React.Component {
  constructor() {
    super();
    this.state = {
      allStories: [],
      dataSource: [],
      search: '',
    };
  }
  componentDidMount() {
    this.retrieveStories();
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  retrieveStories = () => {
    try {
      var allStories = [];
      var stories = db
        .collection('Story')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allStories.push(doc.data());
            console.log('Story', allStories);
          });
          this.setState({ allStories });
        });
    } catch (error) {
      console.log(error);
    }
  };

  SearchFilterFunction(text) {
    const newData = this.state.allStories.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#f3b6c4'}
          centerComponent={{
            text: 'Story Hub',
            style: { color: 'black', fontSize: 30, fontWeight: 'bold' },
          }}
        />

        <View styles={{ height: 20, width: '100%' }}>
          <SearchBar
            style={styles.searchBar}
            placeholder="Write title of your story here."
            onChangeText={(text) => this.SearchFilterFunction(text)}
            onClear={(text) => this.SearchFilterFunction('')}
            value={this.state.search}
          />
        </View>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View>
              {this.state.search === ''
                ? this.state.allStories.map((item) => (
                    <View
                      style={{
                        borderColor: 'black',
                        borderWidth: 3,
                        padding: 10,
                        alignItems: 'center',
                        margin: 10,
                      }}>
                      <TouchableOpacity>
                        <Text style={styles.story}>Title : {item.title}</Text>
                        <Text style={styles.story}>Author : {item.author}</Text>
                        <Text style={styles.story}>
                          Story : {item.storyText}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                : this.state.dataSource.map((item) => (
                    <View
                      style={{
                        borderColor: 'black',
                        borderWidth: 3,
                        padding: 10,
                        alignItems: 'center',
                        margin: 30,
                      }}>
                      <TouchableOpacity>
                        <Text>Title : {item.title}</Text>
                        <Text>Author : {item.author}</Text>
                        <Text>Story : {item.storyText}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    color: 'white',
    padding: 10,
  },
});
