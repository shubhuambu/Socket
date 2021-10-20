import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import io from 'socket.io-client';

const socket = io("http://192.168.1.111:1234")

export default function App() {

  const [chatMessage, setChatMessage] = useState('');
  const [userId, setUserId] = useState(1);
  const [typing, setTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  // useEffect(function () {
  //   // socket
  //   // socket.emit("hello", "world");
  //   socket.on('test', arg => {
  //     setChatMessages([...chatMessages, arg])
  //   })
  // }, [])

  const onSend = (message = []) => {
    const newMessages = GiftedChat.append(chatMessages, message)
    socket.on('test', newMessages => { setChatMessages(newMessages) });
    socket.emit('test', newMessages);
  }
  const timeoutFunction = () => {
    socket.emit("typing", false);
  }
  const onChangeTextChat = (e) =>{
    socket.emit('typing',userId);
    socket.on('typing', e => { const setTime = userId == e.userId ? false : true; console.log(setTime); setTyping(e.false || setTime)} );
   clearTimeout(timeout)
  const timeout = setTimeout(timeoutFunction, 2000)
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#FFCCD2',
            borderWidth: StyleSheet.hairlineWidth,
            elevation: 2
          },
          right: {
            backgroundColor: '#FDA65D',
            borderWidth: StyleSheet.hairlineWidth,
            elevation: 2
          }
        }}
      />
    );
  }
  
  // const onSend = async (messages) => {
  //   console.log("->", chatMessage);
  //   socket.emit('test',chatMessage);
  //   socket.on('newMsg', msg => {
  //     setChatMessages(GiftedChat.append(chatMessages, msg))
  //   })
  //   // socket.emit('test2',message);
  //   setChatMessage('')
  // }

  return (
    <View style={styles.container}>
        <TextInput
            placeholder="ID"
            value={userId}
            onChangeText={e => setUserId(e)}
            style={{
              backgroundColor: '#fff',
              width: '10%',
              height: 40,
              borderRadius: 20,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#aaa',
              elevation: 5,
              padding: 12,
              marginTop: 10,
            }}
          />
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
     
        <View style={{ flex: 1, width: 400, }}>
          <GiftedChat
            messages={chatMessages}
            onSend={messages => onSend(messages)}
            user={{
              _id: userId,
              avatar: 'https://placeimg.com/140/140/any'
            }}
            isTyping={userId == userId ? typing : !typing}
            onInputTextChanged={ e => onChangeTextChat(e)}
            renderBubble={renderBubble}
            showAvatarForEveryMessage={true}
          />
        </View>

        {/* <View style={{ width: 500, height: 500, borderRadius: 500 / 2, backgroundColor: '#fff', position: 'absolute', left: -120, top: -20 }} />
        {chatMessages.map(chatMessage => (
          <Text style={{ fontSize: 22 }}>{chatMessage}</Text>
        ))}
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <TextInput
            placeholder="Idhar Likhe..."
            value={chatMessage}
            onChangeText={e => setChatMessage(e)}
            style={{
              backgroundColor: '#fff',
              width: '78%',
              height: 40,
              borderRadius: 20,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#aaa',
              elevation: 2,
              paddingLeft: 5
            }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              elevation: 2,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: 'lightgreen'
            }}
            onPress={onSend}
          >
            <Text style={{ fontSize: 18 }}>send</Text>
          </TouchableOpacity>

        </View> */}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'flex-end',

  },
});
