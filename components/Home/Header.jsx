import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext } from "react";
import { UserDetailContext } from "./../../context/UserDetailsContext";
import Colors from "./../../constant/Colors";
export default function Header() {

const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 24,
            fontFamily: "outfit-bold",
            color: Colors.WHITE,
          }}
        >
          Hello, {userDetail?.name}
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "outfit",
            marginTop: 10,
            color: Colors.WHITE,
          }}
        >
          Let's Get Started
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
}
