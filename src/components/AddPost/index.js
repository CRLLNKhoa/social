import React, { useState,useEffect } from "react";
import { Avatar, Image, Button } from "antd";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { MdOutlineCollections, MdInsertEmoticon } from "react-icons/md";
import { Modal } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { Input } from "antd";
import { db, auth, storage } from "../../services/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, serverTimestamp, setDoc, getDoc, onSnapshot } from "firebase/firestore";
const { TextArea } = Input;

export default function AddPost() {
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    handleAdd()
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const countDown = () => {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Chức năng đang được xây dựng!",
      content: `Thông báo sẽ đóng sau ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `Thông báo sẽ đóng sau ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };

const [infoUser, setInfoUser] = useState({})

  useEffect(() => {
    const userData = async () => {
      const docRef = doc(db, "users",user.uid);
      onSnapshot(docRef, (doc) => {
        setInfoUser(doc.data())
      })
    };
    userData();
  }, []);

  const [file, setFile] = useState("");
  const [data, setData] = useState({
    img: "",
  });
  const [per, setPerc] = useState(null);
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const [idPost, setIdPost] = useState(makeid(20))

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleAdd = async (e) => {
    try {
      await setDoc(doc(db, "Posts",idPost), {
        ...data,
        timeUp: serverTimestamp(),
        content: `${value}`,
        imgAuthor: `${infoUser.img}`,
        author: `${infoUser.nickName}`,
      });
      setIdPost(makeid(20))
      setFile('')
      setData({img: ''})
      setValue('')
    } catch (err) {

    }
  };


  return (
    <div
      style={{
        margin: "20px 0",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
    >
      <Modal
        title="Thêm bài viết"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div style={{flexDirection: 'column' , display: 'flex'}}>
          {/* <div style={{ display: "flex", alignItems: "center"}}>
            <Avatar
              src={
                <Image
                  preview={false}
                  src="https://scontent.fvca2-1.fna.fbcdn.net/v/t39.30808-6/305994841_3309114279325780_4647173820898967567_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=2fiRB6t2HN0AX9Jcfi2&_nc_ht=scontent.fvca2-1.fna&oh=00_AfBUlLkoUCLAYE1hYiu_Gf48ROXP3HmT8CF3il6cTTTFBQ&oe=638686BE"
                />
              }
            />
            <span style={{ fontWeight: "bold", marginLeft: 10 }}>
              {" "}
              Lương Khoa{" "}
            </span>
          </div> */}
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Bạn muốn đăng gì nào..."
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
            style={{margin: '10px 0'}}
          />
           {file === "" ? (
                null
              ) : (
                <Image style={{width: '100%', height: 300}} src={URL.createObjectURL(file)} />
              )}
               <label
                htmlFor="input-avatar-register"
                style={{
                  border: "1px solid #4096FF",
                  padding: "2px 20px",
                  borderRadius: 4,
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "white",
                  backgroundColor: "#4096FF",
                  margin: "10px 0",
                  textAlign: 'center'
                }}
              >
                Choose pic
              </label>
              <input
                id="input-avatar-register"
                type="file"
                style={{ margin: "10px 0px", display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
        </div>
      </Modal>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <Avatar
          style={{ width: 40, height: 40, marginRight: 10 }}
          src={
            <Image
              src="https://joeschmoe.io/api/v1/random"
              style={{ width: 40 }}
              preview={false}
            />
          }
        />
        <Button
          className="btn-add-post"
          type="text"
          style={{
            backgroundColor: "#F0F2F5",
            flex: 1,
            borderRadius: 40,
            textAlign: "left",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            padding: "20px",
          }}
          onClick={showModal}
        >
          <span style={{ opacity: 0.6 }}>Khoa ơi! bạn đang nghĩ gì thế?</span>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #E4E6E9",
          paddingTop: 10,
        }}
      >
        <Button
          type="text"
          style={{
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            padding: "20px",
          }}
          onClick={countDown}
        >
          <AiOutlineVideoCameraAdd
            style={{ marginRight: 10, color: "red", fontSize: 25 }}
          />
          <span>Video trực tiếp</span>
        </Button>
        <Button
          type="text"
          style={{
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            padding: "20px",
          }}
          onClick={showModal}
        >
          <MdOutlineCollections
            style={{ marginRight: 10, color: "green", fontSize: 25 }}
          />
          <span>Ảnh/video</span>
        </Button>
        <Button
          type="text"
          style={{
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <MdInsertEmoticon
            style={{ marginRight: 10, color: "orange", fontSize: 25 }}
          />
          <span>Feeling</span>
        </Button>
      </div>
    </div>
  );
}
