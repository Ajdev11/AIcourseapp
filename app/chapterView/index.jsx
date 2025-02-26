import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import * as Progress from "react-native-progress";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import { db } from "../../config/firebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";






export default function ChapterView() {
  const { chapterParams, docid, chapterIndex } = useLocalSearchParams();
  const chapters = JSON.parse(chapterParams);
  const [currentPage, setCurrentPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const GetProgress = (currentPage) => {
    const percentage = currentPage / chapters?.content?.length;
    return percentage;
  };



 const onChapterComplete = async() => {
    //saved chapetr completed
    setLoader(true)
    await updateDoc(doc(db, 'Courses', docid), {
        completedChapter: arrayUnion(chapterIndex)
    })

setLoader(false);

    // Navigate back

router.back();



    }






  return (
    <View
      style={{
        padding: 40,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Progress.Bar
        progress={GetProgress(currentPage)}
        width={Dimensions.get("screen").width * 0.85}
      />
      <View
        style={{
          margintop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 22,
          }}
        >
          {chapters?.content[currentPage]?.topic}
        </Text>

        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
            marginTop: 7,
          }}
        >
          {chapters?.content[currentPage]?.explain}
        </Text>

        {chapters?.content[currentPage]?.code && (
          <Text
            style={[styles.codeExampleText, { backgroundColor: Colors.BLACK }]}
          >
            {chapters?.content[currentPage]?.code}
          </Text>
        )}

        {chapters?.content[currentPage]?.example && (
          <Text style={styles.codeExampleText}>
            {chapters?.content[currentPage]?.example}
          </Text>
        )}
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 15,
          width: "100%",
          left: 40,
        }}
      >
        {chapters?.content?.length - 1 != currentPage ? (
          <Button
            text={"Next"}
            onPress={() => setCurrentPage(currentPage + 1)}
          />
        ) : (
          <Button
            text={"Finish"}
            onPress={() => onChapterComplete()}
            loading={loader}
          />
        )}
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  codeExampleText: {
    padding: 15,
    backgroundColor: Colors.GRAY,
    color: Colors.WHITE,
    borderRadius: 15,
    fontFamily: "outfit",
    fontSize: 18,
    marginTop: 15,
  },
});
