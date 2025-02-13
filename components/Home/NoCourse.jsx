import { View, Text, Image } from "react-native";
import React from "react";
import Button from "./../Shared/Button";
import { useRouter } from "expo-router";

export default function NoCourse() {

  const router = useRouter();
  return (
    <View
      style={{
        marginTop: 120,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        source={require("./../../assets/images/book.png")}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text
        style={{
          fontSize: 24,
          fontFamily: "outfit-bold",
          marginTop: 20,
          textAlign: "center",
        }}
      >
        You're yet to enroll in any course
      </Text>

      <Button text={" + Create New Course"} onPress={()=>router.push('/addCourse') } />
      <Button text={" + Check Existing Courses"} type="outline"/>
    </View>
  );
}
