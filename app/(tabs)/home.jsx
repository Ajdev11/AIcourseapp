import { View, Text, Platform, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import Colors from "./../../constant/Colors";
import NoCourse from "../../components/Home/NoCourse";
import { db } from "./../../config/firebaseConfig";
import { collection, query, getDocs, where } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailsContext";
import CourseList from "../../components/Home/CourseList";
import PracticeSection from "../../components/Home/PracticeSection";
import CourseProgress from "../../components/Home/CourseProgress";


export default function Home() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log("-------", doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <FlatList
    onRefresh={()=>GetCourseList()}
    refreshing={loading}
      data={[]}
      ListHeaderComponent={
        <View
          style={{
            padding: 25,
            paddingTop: Platform.OS == "ios" && 50,
            flex: 1,
            backgroundColor: Colors.WHITE,
          }}
        >
          <Header />
          {courseList?.length == 0 ? (
            <NoCourse />
          ) : (
            <View>
              <CourseProgress courseList={courseList} />
              <PracticeSection />
              <CourseList courseList={courseList} />
            </View>
          )}
        </View>
      }
    />
  );
}
