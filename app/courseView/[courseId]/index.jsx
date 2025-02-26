import { View, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Intro from "../../../components/CourseView/Intro";
import Chapters from "../../../components/CourseView/Chapters";
import Colors from "../../../constant/Colors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./../../../config/firebaseConfig";
import { useEffect, useState} from "react";


export default function CourseView() {
    const { courseParams, courseId } = useLocalSearchParams();
    // const course = JSON.parse(courseParams);
    // console.log(courseId);
    const [course, setCourse] = useState([]);



  useEffect(() => {
    if(!courseParams) {   
    GetCourseById();
    }else{
      setCourse(JSON.parse(courseParams
      ));
    }

  }
  ,[courseId]);



   const GetCourseById=async()=>{
     const docRef = await getDoc(doc(db, 'Courses', courseId));
     const courseData = docRef.data();
     setCourse(courseData);
  }


  return course&&(
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
          }}
        >
          <Intro course={course} />
          <Chapters course={course} />
        </View>
      }
    />
  );
}
