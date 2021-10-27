import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import {Header} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';



export default class WriteStoryScreen extends React.Component{
  constructor(){
    super();
      this.state = {
        title: '',
        author: '',
        story: '',
      }
  }

  submitStory=()=>{
    db.collection("Story").add({
      title: this.state.title,
      author: this.state.author,
      story: this.state.story,
    })
    this.setState({
      title: '',
      author: '',
      story: ''
    })
    ToastAndroid.show("Your story has been submitted !", ToastAndroid.SHORT);
  }
  render(){
    return(
      <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
      <View>
      <Header
            backgroundColor={'#f3b6c4'}
            centerComponent={{text:'Story Hub', style:{color:'black', fontSize:30, fontWeight:'bold'}}}
          />
        
        <TextInput
          style={styles.inputBox}
          placeholder="Story Title"
          onChangeText={(text) => {
                this.setState({
                  title: text
                });
              }}
          />
        <TextInput
          style={styles.inputBox}
          placeholder="Author"
          onChangeText={(text) => {
                this.setState({
                  author: text
                });
              }}
          />
        <TextInput
          style={{
            width: 310,
            height: 200,
            borderWidth: 2,
            fontSize: 15,
            margin: 10}}
          placeholder="Write your Story"
          multiline={true}
          onChangeText={(text) => {
                this.setState({
                  story: text
                });
              }} 
          />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={()=>{
               this.submitStory()
            }}>
          <Text style = {{fontSize: 18, fontWeight: 'bold'}}>Submit</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    inputBox:{
      width: 310,
      height: 40,
      borderWidth: 2,
      fontSize: 15,
      margin: 10
    },
    submitButton:{
      backgroundColor: '#f3b6c4',
      width:80,
      height: 35,
      alignSelf: 'center',
      alignItems: 'center',
    }
  });