import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import tw from "tailwind-rn";

function MatchedScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { LoggedInProfile, userSwiped } = params;
  return (
    <View style={[tw("h-full bg-red-500 pt-20"), { opacity: 0.89 }]}>
      <View style={tw("justify-center  m-12")}>
        <Image
        style={tw("h-16 w-full")}
          source={{ uri: "https://links.papareact.com/mg9" }} />
      </View>
      <Text style={tw("text-white text-center text-xs font-bold mt-5")}>
        You and {userSwiped.displayName} have liked each other.
      </Text>
      <View style={tw("flex-row justify-evenly mt-5")}>
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={{ uri: LoggedInProfile.photoURL }}
        />
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={{ uri: userSwiped.photoURL }}
        />
      </View>
      <TouchableOpacity
        style={tw("bg-white m-5 px-6 py-6 rounded-full mt-20")}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={tw("text-center")}> Send a message</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MatchedScreen;
