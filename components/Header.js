import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import tw from "tailwind-rn";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  return (
    <View style={tw("p-2 flex-row items-center justify-between")}>
      <View style={tw("flex-row items-center")}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw("p-2")}>
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
      <Text style={tw("text-xl pl-2 font-bold")}>{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity style={tw("rounded-full mr-4 p-2 bg-red-200 ")}>
          <Foundation name="telephone" size={20} style={tw("")} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
