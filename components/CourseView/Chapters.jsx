import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";

export default function Chapters({ course }) {
  const router = useRouter();
  const isChapterCompleted = (index) => {
    const isCompleted = course?.completedChapter?.find((item) => item == index);
    return isCompleted ? true : false;
  };

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          marginTop: 5,
        }}
      >
        Chapters
      </Text>

      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/chapterView",
                params: {
                  chapterParams: JSON.stringify(item),
                  docid: course?.docid,
                  chapterIndex: index,
                },
              });
            }}
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text style={styles.chapterText}>{index + 1}</Text>
              <Text style={styles.chapterText}>{item.chapterName}</Text>
            </View>

            {isChapterCompleted(index) ? (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={Colors.GREEN}
              />
            ) : (
              <Ionicons name="play" size={20} color={Colors.PRIMARY} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chapterText: {
    fontFamily: "outfit",
    fontSize: 19,
  },
});
