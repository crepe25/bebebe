import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({ beeId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(beeId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messagesFirestore = querySnapshot.docs.map(doc => {
          const message = doc.data();
          return {
            _id: doc.id,
            text: message.text,
            createdAt: message.createdAt.toDate(),
            user: message.user,
          };
        });
        setMessages(messagesFirestore);
      });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text, user } = messages[0];
    firestore()
      .collection('chats')
      .doc(beeId)
      .collection('messages')
      .add({ _id, createdAt, text, user });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        name: 'User Test',
      }}
    />
  );
};

export default ChatScreen;