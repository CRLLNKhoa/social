import React from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { Button } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../services/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

function LikePost({ id, likes }) {
  const [user] = useAuthState(auth);
  const likeRef = doc(db, "Posts", id);


  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likeRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unlike");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likeRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("like");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Button
      type="text"
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: 16,
        fontWeight: 500,
        padding: "0px 30px",
      }}
      className={!likes?.includes(user.uid) ? "unlike" : "liked"}
      onClick={handleLike}
    >
      {!likes?.includes(user.uid) ? (
        <AiOutlineLike style={{ marginRight: 5 }} />
      ) : (
        <AiFillLike style={{ marginRight: 5 }} />
      )}
      Thích
    </Button>
  );
}

export default LikePost;
