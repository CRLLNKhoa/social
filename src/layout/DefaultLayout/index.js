import React, { useState, useEffect } from "react";
import { Button, Drawer, Image, Tooltip, Popover, Row, Col } from "antd";
import { doc, serverTimestamp, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db, auth, storage } from "../../services/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  Avatar,
  Layout,
  Input,
  Menu,
  AutoComplete,
  Modal,
  notification,
} from "antd";
import Nav from "../../components/Nav";
import { AiOutlineMenu } from "react-icons/ai";
import {
  UserOutlined,
  LockOutlined,
  BellFilled,
  MessageFilled,
} from "@ant-design/icons";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import images from "../../assets/img";
import { Link } from "react-router-dom";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { Checkbox, Form, InputNumber, Select } from "antd";
import SiderLeft from "../../components/SiderLeft";
import { useAuthState } from "react-firebase-hooks/auth";
const { Option } = Select;

const { Header, Footer, Sider, Content } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const itemst = [
  { label: "Dashboard", key: "/admin" }, // remember to pass the key prop
  { label: "User", key: "/admin-user" }, // which is required
  {
    label: "Products",
    key: "/admin-products",
  },
  {
    label: "Add product",
    key: "/admin-products/add-product",
  },
];

const items = [
  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

function DefaultLayout({ children }) {
  // Menu Mobile
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // Search
  const options = [
    { value: "Burns Bay Road" },
    { value: "Downing Street" },
    { value: "Wall Street" },
  ];

  // Register
  const [file, setFile] = useState("");
  const [data, setData] = useState({
    img: "",
    email: "",
    nickName: "",
    password: "",
    sex: "",
  });
  const [per, setPerc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const showModalRegister = () => {
    setOpenRegister(true);
  };
  const handleOkRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleAdd();
    }, 1000);
  };

  const handleCancelRegister = () => {
    setOpenRegister(false);
  };

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

  const handleAdd = async (e) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      setOpenRegister(false);
      setOpenLogin(true);
      openNotificationWithIcon("success", "true");
    } catch (err) {
      openNotificationWithIcon("error", "true");
      setOpenLogin(false);
    }
  };

  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openLogin, setOpenLogin] = useState(false);
  const showModalLogin = () => {
    setOpenLogin(true);
  };
  const handleOkLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenLogin(false);
      handleLogin();
    }, 1000);
  };
  const handleCancelLogin = () => {
    setOpenLogin(false);
  };

  const handleLogin = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        openNotificationWithIcon("success", "false");
      })
      .catch((error) => {
        openNotificationWithIcon("error", "false");
      });
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, register) => {
    if (type === "success" && register === "false") {
      api[type]({
        message: "Đăng nhập thành công!",
      });
    }
    if (type === "success" && register === "true") {
      api[type]({
        message: "Đăng ký thành công!",
      });
    }
    if (type === "error" && register === "false") {
      api[type]({
        message: "Đăng nhập không thành công!",
      });
    }
    if (type === "error" && register === "true") {
      api[type]({
        message: "Tài khoản đã tồn tại!",
      });
    }
  };

  // Auth
  const [loginAuth, setLoginAuth] = useState(false);
  const [authCurrent, setAuthCurrent] = useState("");
  useEffect(() => {
    const fetchLogin = async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setLoginAuth(true);
          setAuthCurrent(user);
        } else {
          setLoginAuth(false);
          console.log("out");
        }
      });
    };
    fetchLogin();
  }, []);

  const [infoUser, setInfoUser] = useState([]);
  const [user] = useAuthState(auth)
  useEffect(() => {
    const userData = async () => {
      const docRef = doc(db, "users",user.uid);
      onSnapshot(docRef, (doc) => {
        setInfoUser(doc.data())
      })
    };
    userData();
  }, [user]);



  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        alert("not");
      });
  };

  const content = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button type="text">Thông tin cá nhân</Button>
      <Button style={{ margin: "10px 0" }} onClick={handleSignOut}>
        Đăng xuất
      </Button>
    </div>
  );

  return (
    <Layout>
      <Modal
        open={openRegister}
        title="ĐĂNG KÝ"
        onOk={handleOkRegister}
        onCancel={handleCancelRegister}
        footer={[
          <Button key="back" onClick={handleCancelRegister}>
            Trở lại
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOkRegister}
          >
            Đăng ký
          </Button>,
        ]}
      >
        <div className="modal-register">
          <Form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {file === "" ? (
                <Avatar
                  size={128}
                  icon={<UserOutlined />}
                  style={{ margin: "0 0 10px 0" }}
                />
              ) : (
                <Avatar
                  size={128}
                  src={<Image src={URL.createObjectURL(file)} />}
                  style={{ margin: "0 0 10px 0" }}
                />
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
                }}
              >
                Choose avatar
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
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "Không đúng định dạng e-mail!",
                },
                {
                  required: true,
                  message: "Nhập e-mail của bạn!",
                },
              ]}
            >
              <Input
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                type="email"
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: "Nhập mật khẩu của bạn!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                type="password"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu không trùng khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="nickname"
              label="Nickname"
              tooltip="Bạn muốn người khác gọi mình là gì?"
              rules={[
                {
                  required: true,
                  message: "Nhập tên người khác gọi mình!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                value={data.nickName}
                onChange={(e) => setData({ ...data, nickName: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[
                {
                  required: true,
                  message: "Chọn giới tính!",
                },
              ]}
            >
              <Select
                value={data.sex}
                name="sex"
                onChange={(value) => setData({ ...data, sex: value })}
                placeholder="Chọn giới tính"
              >
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      {contextHolder}
      <Modal
        open={openLogin}
        title="ĐĂNG NHẬP"
        onOk={handleOkLogin}
        onCancel={handleCancelLogin}
        footer={[
          <Button key="back" onClick={handleCancelLogin}>
            Trở lại
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOkLogin}
          >
            Đăng nhập
          </Button>,
        ]}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
          style={{ padding: "20px 0" }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/">
              Forgot password
            </a>
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        open={open}
        style={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            width: "100%",
          }}
          items={items}
        />
      </Drawer>
      <Header
        style={{
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Button className="btn-menu--mobile" type="text" onClick={showDrawer}>
          <AiOutlineMenu />
        </Button>
        <div>
          <Link className="logo-header" to="/">
            <Image preview={false} src={images.logo} style={{ height: 40 }} />
          </Link>
          {/* <AutoComplete
            style={{ width: 250 }}
            options={options}
            children={
              <Input.Search size="middle" placeholder="input here" enterButton />
            }
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          /> */}
        </div>
        <Nav />

        {loginAuth === true && (
          <div>
            <Tooltip placement="bottom" title="Thông báo">
              <Avatar
                icon={
                  <BellFilled style={{ color: "black", cursor: "pointer" }} />
                }
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Tin nhắn">
              <Avatar
                icon={<MessageFilled />}
                style={{ margin: "0 10px", color: "black", cursor: "pointer" }}
              />
            </Tooltip>
            <Popover content={content} placement="bottomLeft" trigger="click">
              <Tooltip placement="bottom" title="Tài khoản">
                {infoUser ? <Avatar
                  src={
                    <Image
                      src={infoUser.img}
                      style={{
                        width: 32,
                        cursor: "pointer",
                      }}
                      preview={false}
                    />
                  }
                /> :  <Avatar
                src={
                  <Image
                    style={{
                      width: 32,
                      cursor: "pointer",
                    }}
                    preview={false}
                  />
                }
              />}
               
              </Tooltip>
            </Popover>
          </div>
        )}
        {loginAuth === false && (
          <div className="not-auth">
            <Button
              onClick={showModalRegister}
              icon={<UserAddOutlined />}
              style={{ marginRight: 10 }}
            >
              Register
            </Button>
            <Button
              onClick={showModalLogin}
              type="primary"
              icon={<LoginOutlined />}
            >
              Login
            </Button>
          </div>
        )}
      </Header>
      <Layout>
        <Row style={{ display: "flex" }}>
          <Col span={5}
            className="siderLeft"
          ></Col>
          <Col span={14} xs={24}
          lg={14}
            className="contentBox"
            style={{
              overflow: "auto",
              height: "100vh",
              // padding: "100px 120px 0 120px",
            }}
          >
            {children}
          </Col>
          <Col span={5}
            className="siderRight"
          ></Col>
        </Row>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
