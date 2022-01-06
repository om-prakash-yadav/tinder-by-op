import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import tw from "tailwind-rn";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import {db} from "../firebase";
import useAuth from "../Hooks/useAuth";
import ChatRow from "./ChatRow";

const Chatlist = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches"),
        where("usersMatched", "array-contains", user.uid)
      ),
      (snapshot) =>
        setMatches(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, []);

  return matches.length>0 ? (
  <FlatList
  data={matches}
  keyExtractor={(item) => item.id}
  renderItem={({item})=> <ChatRow matchDetails={item} />}
  />
  ):(
      <View style={tw("p-5")}>
          <Text style={tw("text-center text-lg")}>No Matches At This Moment</Text>
      </View>
  )
};

export default Chatlist;
