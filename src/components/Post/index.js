import { Avatar, Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { RiEarthFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { AiTwotoneLike, AiOutlineLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import LikePost from "../LikePost";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { List, Skeleton } from "antd";
import { RiShareForwardLine } from "react-icons/ri";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../services/firebase";

const count = 1;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export default function Post({
  imgAuthor,
  content,
  img,
  timeUp,
  author,
  id,
  likes,
}) {
  // const fireBaseTime = new Date(timeUp * 1000 + timeUp / 1000000);
  // const atTime = fireBaseTime.toLocaleTimeString();
  const [user] = useAuthState(auth);
  const [time, setTime] = useState("");
  const numLike = likes;

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event("resize"));
      });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  useEffect(() => {
    const timeFormat = async () => {
      var timestamp = timeUp,
        date = new Date(timeUp.seconds * 1000 + timeUp.nanoseconds / 1000000);
      setTime(date);
    };
    timeFormat();
  }, [timeUp]);

  const [comments, setComment] = useState([]);
  useEffect(() => {
    const docRef = doc(db, "Posts", id);
    onSnapshot(docRef, (snapshot) => {
      setComment(snapshot.data().comments);
    });
  }, []);

  return (
    <div className="wrapper-post" style={{ backgroundColor: "white" }}>
      <div
        style={{
          padding: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar size="large" src={<Image src={imgAuthor} />} />
          <div
            style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}
          >
            <span style={{ fontSize: 16, fontWeight: 500 }}>{author}</span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <span>{`${time.toLocaleString()}`}</span>
              <RiEarthFill style={{ marginLeft: 10 }} />
            </span>
          </div>
        </div>
        <Button type="text" style={{ fontSize: 20, borderRadius: 9999 }}>
          <BsThreeDots />
        </Button>
      </div>
      {content ? (
        <div style={{ padding: 10 }}>
          <p>{content}</p>
        </div>
      ) : null}
      {img ? (
        <div style={{ height: 350 }}>
          <Image preview={false} height="100%" width="100%" src={img} />
        </div>
      ) : null}
      <div style={{ padding: "0 20px 20px 20px" }}>
        <div
          style={{
            display: "flex",
            padding: "5px 0",
            justifyContent: "space-between",
            borderBottom: "1px solid #BFBFBF",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                borderRadius: 9999,
                backgroundColor: "#149DF5",
                padding: "2px 3px",
                color: "white",
                marginRight: 5,
                fontSize: 12,
              }}
            >
              <AiTwotoneLike />
            </span>
            {numLike && numLike.length}
          </span>
          <span>3 bình luận</span>
        </div>
        <div
          style={{
            display: "flex",
            padding: "2px 0",
            justifyContent: "space-between",
            borderBottom: "1px solid #BFBFBF",
          }}
        >
          {user && <LikePost id={id} likes={likes} />}
          <Button
            type="text"
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 16,
              fontWeight: 500,
              color: "#606266",
              padding: "0px 30px",
            }}
          >
            <BiComment style={{ marginRight: 5 }} /> Bình luận
          </Button>
          <Button
            type="text"
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 16,
              fontWeight: 500,
              color: "#606266",
              padding: "0px 30px",
            }}
          >
            <RiShareForwardLine style={{ marginRight: 5 }} /> Chia sẻ
          </Button>
        </div>
      </div>
      <div>
        {comments !== null && (
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={({ commentId, user, comment, userName }) => (
              <List.Item>
                <Skeleton
                  style={{ display: "flex", flexDirection: "column" }}
                  avatar
                  title={false}
                  active
                >
                  <List.Item.Meta
                    title={<a href="https://ant.design">{userName}</a>}
                  />
                  <div>Hình này xinh qá zậy</div>
                </Skeleton>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
}
