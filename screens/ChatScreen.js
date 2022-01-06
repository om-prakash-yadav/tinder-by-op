import { View } from 'react-native'
import React from 'react'
import Header from "../components/Header"
import tw from "tailwind-rn"
import Chatlist from '../components/Chatlist'

const ChatScreen = () => {
    return (
        <View style={tw("mt-5")}>
            <Header title="Chat"/>
            <Chatlist/>
        </View>
    )
}

export default ChatScreen
