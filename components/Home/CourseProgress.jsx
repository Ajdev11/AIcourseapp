import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import * as Progress from "react-native-progress";


export default function CourseProgress({ courseList }) {
  
const GetCompletedChapters=(course)=>{
  const completedChapters=course?.completedChapter?.length;
  const perc=completedChapters/course?.chapters?.length;
  return perc;

}



  
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Progress
      </Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              margin: 7,
              padding: 7,
              backgroundColor: Colors.BG_GRAY,
              borderRadius: 15,
              width: 280,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
              }}
            >
              <Image
                source={imageAssets[item?.banner_image]}
                style={{
                  width: 60,
                  height: 80,
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: 19,
                    flexWrap: "wrap",
                  }}
                >
                  {item?.courseTitle}
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit",
                    fontSize: 15,
                  }}
                >
                  {item?.chapters?.length} Chapter
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 7,
              }}
            >
              <Progress.Bar progress={GetCompletedChapters(item)} width={250} />
              <Text
                style={{
                  fontFamily: "outfit",
                  marginTop: 2,
                }}
              >
                {item?.completedChapter?.length ?? 0} Out of {item?.chapters?.length} Chapter completed
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
