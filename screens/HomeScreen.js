import {
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../Hooks/useAuth";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { StatusBar } from "react-native";
import generateId from "../lib/generateId";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
  setDoc,
  query,
  where,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  StatusBar.setHidden(false);
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);
  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(collection(db, "users", user.uid, "passes")).then(
        (snapshot) => snapshot.docs.map((doc) => doc.id)
      );
      const swipes = await getDocs(collection(db, "users", user.uid, "swipes")).then(
        (snapshot) => snapshot.docs.map((doc) => doc.id)
      );

      const passedUserIds = passes.length > 0 ? passes : ["testpass"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["testswipe"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };
    fetchCards();
    return unsub;
  }, []);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    console.log(`you swiped left on ${userSwiped.displayName}`);
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };
  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    const LoggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    // check if the user has swiped on you

    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          //user has matched with you before  you matched with them
          // create a match
          console.log(`Hooray , You matched with ${userSwiped.displayName}`);

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
          // Create a Match

          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: LoggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            LoggedInProfile,
            userSwiped,
          });
        } else {
          // user has swiped as the first interaction between the two  or didn't get swiped on

          console.log(
            `You swiped on ${userSwiped.displayName} (${userSwiped.job})`
          );
        }
      }
    );

    console.log(
      `you swiped right on ${userSwiped.displayName} (${userSwiped.job})`
    );
    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
  };

  return (
    <View style={tw("flex-1 mt-10")}>
      {/* header  */}
      <View style={tw("flex-row  items-center justify-between px-5")}>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            style={tw("h-12 w-12 rounded-full")}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Image source={require("../imgs/chat.png")}  style={tw("h-14 w-14 rounded-full")}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} >
          <Ionicons name="log-out-outline" size={40} color="#ff4000" />
        </TouchableOpacity>
      </View>
      {/* end of Header  */}

      {/* cards  */}
      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("swiped LEFT");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("swiped RIGHT");
            swipeRight(cardIndex);
          }}
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title: "✖",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "✔",
              style: {
                label: {
                  textAlign: "left",
                  color: "green",
                },
              },
            },
          }}
          animateCardOpacity
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                style={tw(" relative bg-white h-3/4 rounded-xl")}
              >
                <Image
                  style={tw("absolute top-0 h-full w-full rounded-xl")}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={[
                    tw(
                      "bg-white absolute bottom-0 w-full h-20 flex-row justify-between px-6 py-2 rounded-b-xl"
                    ),
                    styles.cardShadow,
                  ]}
                >
                  <View>
                    <Text style={tw("text-xl font-bold")}>
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <View>
                    <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tw(
                    "relative bg-white h-3/4 rounded-xl justify-center items-center"
                  ),
                  styles.cardShadow,
                ]}
              >
                <Image
                  style={tw("h-40 w-60")}
                  resizeMode="contain"
                  source={require("../imgs/sad.png")}
                />
                <Text style={tw("text-xl font-bold pb-5")}>
                  {" "}
                  No more Profiles !{" "}
                </Text>
              </View>
            )
          }
        />
      </View>
      <View style={tw("flex flex-row justify-evenly  bottom-6")}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw(
            "items-center justify-center rounded-full bg-red-200 w-16 h-16"
          )}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw(
            "items-center justify-center rounded-full bg-green-200 w-16 h-16"
          )}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

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
