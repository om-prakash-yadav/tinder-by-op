import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-rn";
import useAuth from "../Hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db } from "../firebase";

const ModalScreen = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [age, setAge] = useState(null);
  const [job, setJob] = useState(null);
  const navigation = useNavigation();
  const incompleteForm = !image || !job || !age;
  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <View style={tw("flex-1 items-center pt-1 top-5")}>
      <Image
        style={tw("h-20 w-full")}
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />
      <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
        Welcome {user.displayName}
      </Text>
      <Text style={tw("text-center text-red-400 p-4 font-bold")}>
        Step 1:The Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        style={tw("text-center px-10 py-2 text-xl border-2 border-red-400 rounded-full")}
        placeholder="Enter a Profile Pic URL"
      />
      <Text style={tw("text-center text-red-400 p-4 font-bold")}>
        Step 2: The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={tw("text-center px-10 py-2 text-xl border-2 border-red-400 rounded-full")}
        placeholder="Enter your occupation"
      />
      <Text style={tw("text-center text-red-400 p-4 font-bold")}>
        Step 3: The Age
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={tw("text-center px-10 py-2 text-xl border-2 border-red-400 rounded-full")}
        placeholder="Enter your age"
        maxLength={2}
        keyboardType="number-pad"
      />
      <ScrollView>
        <KeyboardAvoidingView>
          <TouchableOpacity
            onPress={updateUserProfile}
            disabled={incompleteForm}
            style={[
              tw("w-64 p-3 rounded-full mt-32"),
              incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
            ]}
          >
            <Text style={tw("text-center text-white text-xl")}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default ModalScreen;
