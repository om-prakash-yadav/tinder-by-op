import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import tw from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Portfolio = () => {
  return (
    <View style={tw(" h-full w-full bg-gray-800")}>
      <LinearGradient
        colors={["#6a3093", "#DE3163", "#6a3093"]}
        style={tw("flex-col justify-between h-full w-full bg-gray-800")}
      >
        <View style={tw("bg-white bg-opacity-20 h-32 rounded-2xl mx-3  mt-2")}>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/om-prakash-yadav/links/main/Untitled.png",
            }}
            style={tw("h-20 w-20 rounded-full absolute top-6 left-4")}
          />
          <Text
            style={tw("absolute left-28 top-6 text-xl font-bold text-white ")}
          >
            OM PRAKASH YADAV
          </Text>
          <Text
            style={tw("absolute left-28 top-16 text-xs font-bold text-white  ")}
          >
            Full stack web & App developer
          </Text>
          <Text
            style={tw("absolute left-28 top-20 text-xs font-bold text-white")}
          >
            Undergrad student at NIT Durgapur
          </Text>
        </View>
        <View style={tw("bg-white bg-opacity-20 h-28 rounded-2xl mx-3 flex justify-center items-center ")}>
          <Text
            style={tw(
              " text-xs font-bold text-white p-2"
            )}
          >
            Creative web and app developer dedicated to building and optimizing the
            performance of user-centric, high-impact applications & websites.
             Analytical and
            problem-solving skills to create dynamic, high-speed websites, apps
            and platforms fueling competitive advantage and revenue growth.
          </Text>
        </View>
        <View
          style={tw("bg-white bg-opacity-20   rounded-2xl mx-3 ")}
          height={210}
        >
          <Text style={tw("absolute left-4 top-1 font-bold text-white ")}>
            Technologies:
          </Text>
          <View
            style={tw("flex flex-row  mt-8 ml-5  flex-wrap justify-center")}
            width={300}
            height={150}
          >
            <View
              style={tw(
                "p-1 bg-yellow-400 flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Ionicons
                name="logo-html5"
                style={tw(" font-bold  text-white text-sm text-center pr-1")}
              />
              <Text style={tw(" font-bold  text-white text-xs text-center")}>
                HTML
              </Text>
            </View>
            <View
              style={tw(
                "p-1 bg-blue-400 flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Ionicons
                name="logo-css3"
                style={tw(" font-bold  text-white text-sm text-center pr-1")}
              />
              <Text style={tw(" font-bold  text-white text-xs text-center")}>
                CSS
              </Text>
            </View>
            <View
              style={tw(
                "p-1 bg-green-400  flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Ionicons
                name="logo-javascript"
                style={tw(" font-bold  text-white text-sm text-center pr-1")}
              />
              <Text style={tw(" font-bold  text-white text-xs text-center")}>
                JAVASCRIPT
              </Text>
            </View>
            <View
              style={tw(
                "p-1 bg-green-400 flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Ionicons
                name="logo-react"
                style={tw(" font-bold  text-white text-sm text-center pr-1")}
              />
              <Text style={tw(" font-bold  text-white text-xs  text-center")}>
                REACT.JS
              </Text>
            </View>
            <View
              style={tw(
                "p-1 bg-blue-400   flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Ionicons
                name="logo-react"
                style={tw(" font-bold  text-white text-sm text-center pr-1")}
              />
              <Text style={tw(" font-bold  text-white text-xs text-center")}>
                NEXT.JS
              </Text>
            </View>
            <View
              style={tw(
                "p-1 bg-blue-400  flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Ionicons
                name="logo-react"
                style={tw(" font-bold  text-white text-xs text-center pr-1")}
              />
              <Text style={tw(" font-bold  text-white text-xs text-center")}>
                REACT-NATIVE
              </Text>
            </View>
            <View
              style={tw(
                "p-1 bg-yellow-400  flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Ionicons
                name="code-slash"
                style={tw(" font-bold  text-white text-sm text-center pr-1")}
              />
              <Text style={tw(" font-bold  text-white text-xs text-center")}>
                TAILWINDCSS
              </Text>
            </View>
            <View
              style={tw(
                "p-1 bg-red-400  flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Ionicons
                name="logo-firebase"
                style={tw(" font-bold  text-white text-sm text-center pr-1")}
              />
              <Text style={tw(" font-bold  text-white text-xs text-center")}>
                FIREBASE
              </Text>
            </View>
            <View
              style={tw(
                "p-1 bg-yellow-400 flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Text style={tw(" font-bold  text-white text-xs text-center")}>
                C
              </Text>
            </View>
            <View
              style={tw(
                "p-1 bg-red-400  flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Ionicons
                name="logo-python"
                style={tw(" font-bold  text-white text-xs text-center pr-1")}
              />
              <Text style={tw(" font-bold  text-white text-xs text-center")}>
                PYTHON
              </Text>
            </View>
            <View
              style={tw(
                "p-1 bg-yellow-400  flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Text style={tw(" font-bold  text-white text-xs text-center")}>
                C++
              </Text>
            </View>

            <View
              style={tw(
                "p-1 bg-green-400  flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Ionicons
                name="terminal-sharp"
                style={tw(" font-bold  text-white text-xs text-center pr-1")}
              />
              <Text style={tw(" font-bold  text-white text-xs text-center")}>
                SQL
              </Text>
            </View>
            <View
              style={tw(
                "p-1 bg-yellow-400  flex-row items-center justify-center m-1 rounded-xl "
              )}
            >
              <Ionicons
                name="logo-python"
                style={tw(" font-bold  text-white text-xs text-center pr-1")}
              />
              <Text style={tw(" font-bold  text-white text-xs text-center")}>
                DJANGO
              </Text>
            </View>
          </View>
        </View>
        <View
          style={tw(
            "bg-white bg-opacity-20 h-36    rounded-2xl mx-3 flex-col items-center justify-between mb-2"
          )}
          width={335}
        >
          <View style={tw("flex-row  h-10 justify-center items-center mt-2")}>
            <Ionicons
              name="logo-linkedin"
              style={tw("text-white  text-3xl px-1")}
            />
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.linkedin.com/in/om-prakash-yadav-9ba8341ba/").catch(
                  (err) => console.error("Error", err)
                )
              }
            >
              <Text style={tw(" text-white p-1 rounded-xl text-xs")}>
              https://www.linkedin.com/om-praka...
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw("flex-row  h-10 justify-center items-center  ")}>
            <Ionicons
              name="logo-github"
              style={tw("text-white text-3xl px-1")}
            />
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://github.com/om-prakash-yadav/").catch(
                  (err) => console.error("Error", err)
                )
              }
            >
              <Text style={tw(" text-white p-1   rounded-xl text-xs")}>
                https://github.com/om-prakash-yadav
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw("flex-row  h-10 justify-between items-center mb-2 ")}>
            <Ionicons
              name="logo-facebook"
              style={tw("text-white text-3xl px-1")}
            />
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.facebook.com/profile.php?id=100010635520844").catch(
                  (err) => console.error("Error", err)
                )
              }
            >
              <Text style={tw(" text-white p-1    rounded-xl text-xs")}>
              https://www.facebook.com/om-prak..
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Portfolio;
