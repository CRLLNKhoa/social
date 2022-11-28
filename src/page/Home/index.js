import { Row, Col, Avatar, Image, Button } from "antd";
import React, { useState, useEffect } from "react";
import Story from "../../components/Story";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { MdOutlineCollections, MdInsertEmoticon } from "react-icons/md";
import Post from "../../components/Post";
import AddPost from "../../components/AddPost";
import { collection, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { query } from "firebase/database";

export default function Home() {
  const [dataPost, setDataPost] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    // const fectPosts = async () => {
    //   const listPosts = [];
    //   const querySnapshot = await getDocs(collection(db, "Posts"));
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     // console.log(doc.id, " => ", doc.data());
    //     listPosts.push({ id: doc.id, ...doc.data() });
    //   });
    //   setDataPost(listPosts);
    // };
    // fectPosts();
    // LISTEN (REALTIME)
    const CollectionRef = collection(db, "Posts");
    const q = query(CollectionRef, orderBy("timeUp", "desc"));
    const unsub = onSnapshot(
      q,
      (snapShot) => {
        let listPosts = [];
        snapShot.docs.forEach((doc) => {
          listPosts.push({ id: doc.id, ...doc.data() });
        });
        setDataPost(listPosts);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  return (
    <div
      style={{
        backgroundColor: "transparent",
        height: 1000,
        padding: "30px 100px",
      }}
    >
      <Row>
        <Col
          span={24}
          style={{
            borderRadius: 8,
            overflow: "hidden",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
        >
          <Story />
        </Col>
      </Row>

      {user && (
        <Row style={{}}>
          <Col span={24}>
            <AddPost />
          </Col>
        </Row>
      )}

      <Row>
        {dataPost.map((item, index) => (
          <Col
            span={24}
            style={{
              margin: "20px 0px",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
            key={index}
          >
            <Post
              imgAuthor={item.imgAuthor}
              img={item.img}
              content={item.content}
              author={item.author}
              timeUp={item.timeUp}
              id={item.id}
              likes={item.likes}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
