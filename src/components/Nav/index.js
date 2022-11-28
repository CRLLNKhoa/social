import React from "react";
import { Menu } from "antd";

export default function index() {
  const items = [
    { label: (<span style={{fontWeight: 'bold', textTransform: 'uppercase', userSelect: 'none'}}>Trang chủ</span>), key: "item-1" }, // remember to pass the key prop
    { label: (<span style={{fontWeight: 'bold', textTransform: 'uppercase', userSelect: 'none'}}>tài liệu</span>), key: "item-3" }, // which is required
    {
      label: (<span style={{fontWeight: 'bold', textTransform: 'uppercase', userSelect: 'none'}}>ứng dụng</span>),
      key: "submenu",
      children: [{ label: "item 4", key: "submenu-item-1" }],
    },
    { label: (<span style={{fontWeight: 'bold', textTransform: 'uppercase', userSelect: 'none'}}>about</span>), key: "item-5" }, // which is required
    { label: (<span style={{fontWeight: 'bold', textTransform: 'uppercase', userSelect: 'none'}}>Contact</span>), key: "item-6" }, // which is required
  ];

  return <Menu className="nav-header" mode="horizontal" style={{backgroundColor: 'transparent'}} items={items} />;
}
