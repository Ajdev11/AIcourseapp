import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import Colors from "./../../constant/Colors";
import Button from "../../components/Shared/Button";
import {
  GenerateTopicAIModel,
  GenerateCourseAIModel,
} from "../../config/AiModel";
import Prompt from "../../constant/Prompt";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./../../config/firebaseConfig";
import { UserDetailContext } from "./../../context/UserDetailsContext";

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDeatil } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState();
  const [topics, setTopics] = useState([]);
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState([]);
 
 
  const onGenerateTopic = async () => {
    setLoading(true);
    const PROMPT = userInput + Prompt.IDEA;
    const aiResp = await GenerateTopicAIModel.sendMessage(PROMPT);
    const topicIdea = JSON.parse(aiResp.response.text());
    console.log(topicIdea);
    setTopics(topicIdea);
    setLoading(false);
  };


  const onTopicSelect = (topic) => {
    const isAlreadyExist = selectedTopics.find((item) => item == topic);
    if (!isAlreadyExist) {
      setSelectedTopics((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopics.filter((item) => item != topic);
      setSelectedTopics(topics);
    }
  };

  const isTopicSelected = (topic) => {
    const selection = selectedTopics.find((item) => item == topic);
    return selection ? true : false;
  };

  const onGenerateCourse = async () => {
    setLoading(true);
    const PROMPT = selectedTopics + Prompt.COURSE;

    try {
      const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
      const resp = JSON.parse(aiResp.response.text());
      const courses = resp.courses;
      console.log(courses);
      //save course info to DB
      courses?.forEach(async (course) => {
        await setDoc(doc(db, 'Courses', Date.now().toString()), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail?.email,
        });
      });
      router.push("/(tabs)/home");
        // router.push("/auth/signIn");
        // router.push("/auth/signUp");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{
        padding: 50,
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit-bold",
        }}
      >
        Create New Courses
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontFamily: "outfit",
          marginTop: 20,
        }}
      >
        What do you want to learn today?
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit",
          marginTop: 20,
          color: Colors.GRAY,
        }}
      >
        Write what course you would like to create (Ex. learn React Js, Digital
        marketing Guide, Python, MySql)
      </Text>
      <TextInput
        placeholder="(Learn React Native, Python, Digital Courses)"
        style={styles.textInput}
        numberOfLines={3}
        multiline={true}
        onChangeText={(value) => setUserInput(value)}
      />

      <Button
        text={"Generate Topic"}
        type="outline"
        onPress={() => onGenerateTopic()}
        loading={loading}
      />
      {/* display the topics here */}
      <View
        style={{
          marginTop: 20,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit",
          }}
        >
          Select all courses which you want to add in the course
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 6,
          }}
        >
          {topics.map((item, index) => (
            <Pressable key={index} onPress={() => onTopicSelect(item)}>
              <Text
                style={{
                  padding: 10,
                  borderWidth: 0.4,
                  borderRadius: 99,
                  paddingHorizontal: 15,
                  backgroundColor: isTopicSelected(item)
                    ? Colors.PRIMARY
                    : null,
                  color: isTopicSelected(item) ? Colors.WHITE : Colors.PRIMARY,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      {selectedTopics?.length > 0 && (
        <Button
          text={"Generate Course"}
          onPress={() => onGenerateCourse()}
          loading={loading}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 100,
    borderWidth: 1,
    marginTop: 30,
    padding: 15,
    borderRadius: 15,
    alignItems: "flex-start",
    fontSize: 18,
  },
});
