import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-rn";
import useAuth from "../Hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db , storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "@firebase/storage";
import * as ImagePicker from "expo-image-picker";

const ModalScreen = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [age, setAge] = useState(null);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigation = useNavigation();
  const incompleteForm = !image || !job || !age;



  const pickImage = async () => {
    if (loading) return;
    setLoading(true);
    // No permissions request is necessary for launching the image library
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      const uploadUrl = await uploadImageAsync(result.uri);
      setImage(uploadUrl);
      setLoading(false);
    }
  };


  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageRef = ref(storage, `profiles/${user.uid}/image`);
    const result = await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);

    // We're done with the blob, close and release it
    blob.close();

    return downloadURL;
  }



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
      
     
      {image ? (<>
        <Image source={{ uri: image }}  style={tw("h-32 w-32 rounded-full mt-6")}
        resizeMode="cover" />
        <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
        {user.displayName}
        </Text>
        </>
      )
     :( <>
      <Image
        style={tw("h-28 mt-2")}
        resizeMode="contain"
        source={require("../imgs/chat.png")}
      />
     <Text style={tw("text-center text-red-400 p-4 font-bold")}>
        Profile Pic :
      </Text>
      <TouchableOpacity onPress={pickImage} style={tw(
          "h-12 w-40 bg-red-400 rounded-full flex items-center justify-center"
        )}>
        <Text style={tw(
          "text-center text-white font-bold text-xl"
        )}> {loading ? "uploading ..." : "Upload"}</Text>
      </TouchableOpacity>
      </>
      )}
      <Text style={tw("text-center text-red-400 p-4 font-bold")}>
        Enter your job :
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={tw(
          "text-center px-10 py-2 text-xl border-2 border-red-400 rounded-full"
        )}
        placeholder="Enter your occupation"
      />
      <Text style={tw("text-center text-red-400 p-4 font-bold")}>
        Enter your age :
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={tw(
          "text-center px-10 py-2 text-xl border-2 border-red-400 rounded-full"
        )}
        placeholder="Enter your age"
        maxLength={2}
        keyboardType="number-pad"
      />
     
        <KeyboardAvoidingView>
          <TouchableOpacity
            onPress={updateUserProfile}
            disabled={incompleteForm}
            style={[
              tw("w-64 p-3 rounded-full"),
              image ? tw("mt-24") : tw("mt-32"),
              incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
            ]}
          >
            <Text style={tw("text-center text-white text-xl")}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
  );
};

export default ModalScreen;
