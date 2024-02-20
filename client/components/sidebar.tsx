"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout, Button, Avatar, Menu, Dropdown, theme } from "antd";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PaperClipOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { default as Bill } from "@/app/admin/billing/page";
import Report from "@/app/admin/reports/page";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faBell,
  faCircleQuestion,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

const { Header, Sider, Content } = Layout;

function AdminSideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const [navbarOpen, setNavbarOpen] = useState<Boolean>(false);
  useEffect(() => {
    setNavbarOpen(false);
  });

  const [selectedMenuKey, setSelectedMenuKey] = useState<string | null>("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }: { key: React.Key }) => {
    console.log(key);
    setSelectedMenuKey(key.toString());
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: colorBgContainer }}
      >
        <div className="h-16 flex justify-center text-lg font-bold ">
          <h1>Admin</h1>
        </div>
        <Menu
          theme="light"
          mode="inline"
          onClick={handleMenuClick}
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Users",
            },
            {
              key: "2",
              icon: <RiseOutlined />,
              label: "Orders",
            },
          ]}
        />
      </Sider>
      <Layout>
        <div className="relative flex flex-wrap  items-center justify-end px-2 py-3 bg-white ">
          <div className="container px-3 mx-auto flex flex-wrap items-center justify-evenly">
            <div className="w-full relative flex  justify-evenly lg:w-auto lg:static lg:block lg:justify-start">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="text-2xl w-5 h-5"
              />
              <a
                className="ml-14 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-textgrey"
                href="#pablo"
              >
                Bea
              </a>
              <button
                className="text-textgrey cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className={
                "lg:flex flex-grow items-center" +
                (navbarOpen ? " flex" : " hidden")
              }
              id="example-navbar-danger"
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto p-2">
               
                <li className="nav-item">
                  <FontAwesomeIcon
                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                    icon={faEnvelope}
                  />
                </li>
                <li className="nav-item">
                  <FontAwesomeIcon
                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-textgrey hover:opacity-75"
                    icon={faCircleQuestion}
                  />
                </li>
                
                <li className="nav-item">
                  <button className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75">
                    Logout
                  </button>
                </li>
                 
                <li className="nav-item">
                  <div className=" h-8 w-8 rounded-3xl">
                    <Link href={`/adminprofile`}>
                      <img
                        src="https://cdn3.iconfinder.com/data/icons/user-group-black/100/user-process-512.png"
                        className="h-8 w-8 rounded-3xl"
                        width={500}
                        height={500}
                        alt=""
                      />
                    </Link>
                  </div>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
        <Content className="mt-6 mr-4 ml-6 p-10  h-screen min-h-min">
          {selectedMenuKey === "1" && <Bill />}
          {selectedMenuKey === "2" && <Report />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminSideBar;
