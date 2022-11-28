import { Button, Row, Col, Image, Avatar } from "antd";
import React, { useState } from "react";
import { BsBookFill, BsCollectionPlayFill } from "react-icons/bs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlinePlus } from "react-icons/ai";

export default function Story() {
  const [tab, setTab] = useState(1);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          padding: "10px 10px 0px 10px",
        }}
      >
        <span
          className={tab === 1 ? "tab-active-story-border" : null}
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              fontSize: 15,
              color: "#606266",
              fontWeight: 500,
            }}
            size="large"
            type="text"
            className={tab === 1 && "tab-active-story"}
            onClick={() => setTab(1)}
          >
            <BsBookFill style={{ marginRight: 10, fontSize: 18 }} />
            Tin
          </Button>
        </span>
        <span
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
          className={tab === 2 ? "tab-active-story-border" : null}
        >
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              fontSize: 15,
              color: "#606266",
              fontWeight: 500,
            }}
            size="large"
            type="text"
            onClick={() => setTab(2)}
            className={tab === 2 && "tab-active-story"}
          >
            <BsCollectionPlayFill style={{ marginRight: 10, fontSize: 18 }} />
            Reels
          </Button>
        </span>
      </div>
      {tab === 1 && (
        <Row style={{ padding: "10px", borderTop: "#E4E6E9 1px solid" }}>
          <Col
            span={6}
            style={{
              cursor: "pointer",
              padding: 5,
            }}
            className="story-item"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: 200,
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Image
                style={{ height: 150, width: "100%" }}
                preview={false}
                src="https://scontent.fvca2-1.fna.fbcdn.net/v/t39.30808-6/305994841_3309114279325780_4647173820898967567_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=2fiRB6t2HN0AX9Jcfi2&_nc_ht=scontent.fvca2-1.fna&oh=00_AfBUlLkoUCLAYE1hYiu_Gf48ROXP3HmT8CF3il6cTTTFBQ&oe=638686BE"
              />
              <div
                style={{
                  width: "100%",
                  height: 50,
                  position: "relative",
                  backgroundColor: "white",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#166ADA",
                    position: "absolute",
                    padding: "4px 5px",
                    top: -17,
                    color: "white",
                    borderRadius: 9999,
                    left: "50%",
                    translate: "-50%",
                    border: "solid 4px white",
                  }}
                >
                  <AiOutlinePlus style={{ fontWeight: "bold", fontSize: 20 }} />
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: "60%",
                    left: "50%",
                    translate: "-50% -60%",
                    fontWeight: 500,
                    fontSize: 13,
                  }}
                >
                  Tạo tin
                </span>
              </div>
            </div>
          </Col>
          <Col
            span={6}
            style={{
              cursor: "pointer",
              padding: 5,
            }}
            className="story-item"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: 200,
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                borderRadius: 8,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                style={{ height: 200, width: "100%" }}
                preview={false}
                src="https://scontent.fvca2-1.fna.fbcdn.net/v/t39.30808-6/305994841_3309114279325780_4647173820898967567_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=2fiRB6t2HN0AX9Jcfi2&_nc_ht=scontent.fvca2-1.fna&oh=00_AfBUlLkoUCLAYE1hYiu_Gf48ROXP3HmT8CF3il6cTTTFBQ&oe=638686BE"
              />
              <Avatar
                style={{ position: "absolute", top: 10, left: 10 }}
                size="large"
                src={
                  <Image
                    preview={false}
                    src="https://scontent.fvca2-1.fna.fbcdn.net/v/t1.6435-9/172851611_1096446147519407_7310089696404233945_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4Q0bNRB-F4oAX_FVad2&_nc_ht=scontent.fvca2-1.fna&oh=00_AfAwBm8c44KvyZVJBVu2sMUsmo1bXochJWgIxlURmi9c6w&oe=63A866D6"
                    style={{ width: 39 }}
                  />
                }
              />
              <span
                className="name-story"
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  color: "white",
                  fontWeight: 500,
                }}
              >
                Lương Khoa
              </span>
            </div>
          </Col>
          <Col
            span={6}
            style={{
              cursor: "pointer",
              padding: 5,
            }}
            className="story-item"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: 200,
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                borderRadius: 8,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                style={{ height: 200, width: "100%" }}
                preview={false}
                src="https://scontent.fvca2-1.fna.fbcdn.net/v/t39.30808-6/305994841_3309114279325780_4647173820898967567_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=2fiRB6t2HN0AX9Jcfi2&_nc_ht=scontent.fvca2-1.fna&oh=00_AfBUlLkoUCLAYE1hYiu_Gf48ROXP3HmT8CF3il6cTTTFBQ&oe=638686BE"
              />
              <Avatar
                style={{ position: "absolute", top: 10, left: 10 }}
                size="large"
                src={
                  <Image
                    preview={false}
                    src="https://scontent.fvca2-1.fna.fbcdn.net/v/t1.6435-9/172851611_1096446147519407_7310089696404233945_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4Q0bNRB-F4oAX_FVad2&_nc_ht=scontent.fvca2-1.fna&oh=00_AfAwBm8c44KvyZVJBVu2sMUsmo1bXochJWgIxlURmi9c6w&oe=63A866D6"
                    style={{ width: 39 }}
                  />
                }
              />
              <span
                className="name-story"
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  color: "white",
                  fontWeight: 500,
                }}
              >
                Lương Khoa
              </span>
            </div>
          </Col>
          <Col
            span={6}
            style={{
              cursor: "pointer",
              padding: 5,
            }}
            className="story-item"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: 200,
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                borderRadius: 8,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                style={{ height: 200, width: "100%" }}
                preview={false}
                src="https://scontent.fvca2-1.fna.fbcdn.net/v/t39.30808-6/305994841_3309114279325780_4647173820898967567_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=2fiRB6t2HN0AX9Jcfi2&_nc_ht=scontent.fvca2-1.fna&oh=00_AfBUlLkoUCLAYE1hYiu_Gf48ROXP3HmT8CF3il6cTTTFBQ&oe=638686BE"
              />
              <Avatar
                style={{ position: "absolute", top: 10, left: 10 }}
                size="large"
                src={
                  <Image
                    preview={false}
                    src="https://scontent.fvca2-1.fna.fbcdn.net/v/t1.6435-9/172851611_1096446147519407_7310089696404233945_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4Q0bNRB-F4oAX_FVad2&_nc_ht=scontent.fvca2-1.fna&oh=00_AfAwBm8c44KvyZVJBVu2sMUsmo1bXochJWgIxlURmi9c6w&oe=63A866D6"
                    style={{ width: 39 }}
                  />
                }
              />
              <span
                className="name-story"
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  color: "white",
                  fontWeight: 500,
                }}
              >
                Lương Khoa
              </span>
            </div>
          </Col>
        </Row>
      )}
      {tab === 2 && (
        <Row style={{ padding: "10px", borderTop: "#E4E6E9 1px solid", overflow: "hidden",display: 'flex' }}>
          <Col
            span={6}
            xs={8}
            style={{
              cursor: "pointer",
              padding: 5,
            }}
            className="story-item"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: 200,
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                borderRadius: 8,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                style={{ height: 200, width: "100%" }}
                preview={false}
                src="https://scontent.fvca2-1.fna.fbcdn.net/v/t39.30808-6/305994841_3309114279325780_4647173820898967567_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=2fiRB6t2HN0AX9Jcfi2&_nc_ht=scontent.fvca2-1.fna&oh=00_AfBUlLkoUCLAYE1hYiu_Gf48ROXP3HmT8CF3il6cTTTFBQ&oe=638686BE"
              />
            </div>
          </Col>
          <Col
            span={6}
            xs={8}
            style={{
              cursor: "pointer",
              padding: 5,
            }}
            className="story-item"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: 200,
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                borderRadius: 8,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                style={{ height: 200, width: "100%" }}
                preview={false}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV2fkS381Shay7tjSdSlQAWG8zWPtBdLNw4wv-1xP1iwTq9vcSvNVpfggiFQ8BJ7WCDN4&usqp=CAU"
              />
            </div>
          </Col>
          <Col
            span={6}
            xs={8}
            style={{
              cursor: "pointer",
              padding: 5,
            }}
            className="story-item"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: 200,
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                borderRadius: 8,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                style={{ height: 200, width: "100%" }}
                preview={false}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyYf0omsuJ1zQC6qnZkM85_5OehrKbs7f8oQ&usqp=CAU"
              />
            </div>
          </Col>
          <Col
            span={6}
            xs={8}
            style={{
              cursor: "pointer",
              padding: 5,
            }}
            className="story-item"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: 200,
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                borderRadius: 8,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                style={{ height: 200, width: "100%" }}
                preview={false}
                src="data:image/jpeg;base64,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"
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}
