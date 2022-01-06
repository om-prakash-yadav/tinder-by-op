import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-rn";
import useAuth from "../Hooks/useAuth";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/core";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  StatusBar.setHidden(true);
  const navigation = useNavigation();

  return (
    <View style={tw("flex-1 justify-center")}>
      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1")}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          style={[
            tw("absolute bottom-28 left-4 bg-white py-3 px-5 rounded-2xl"),
            { marginHorizontal: "25%" },styles.cardShadow,
          ]}
          onPress={signInWithGoogle}
        >
          <Text style={tw("font-bold text-center ")}>Login or Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CV")}
          style={tw("absolute bottom-1 left-16 p-1 rounded-2xl")}
        >
          <Text style={tw("text-xs text-white")}>
            Created with 💛 by - OM PRAKASH YADAV
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
