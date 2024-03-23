"use client";
import classNames from "classnames";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useMemo } from "react";

interface MenuItem {
  id: number;
  label: string;
  link: string;
}

const menuItems: MenuItem[] = [
  { id: 2, label: "Dashboard", link: "/admin/dashboard" },
  { id: 3, label: "Users", link: "/admin/Users" },
  { id: 4, label: "Orders", link: "/admin/reports" },
];

const Sidebar: React.FC = () => {
  const [toggleCollapse, setToggleCollapse] = useState<boolean>(false);
  const [isCollapsible, setIsCollapsible] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === pathname),
    [pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-white shadow-md rounded-md border text-black flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu: MenuItem) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-gray-100"]: activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <>
      <div
        className={wrapperClasses}
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouseOver}
        style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      >
        <div className="flex flex-col ">
          <div className="flex items-center justify-between relative">
            <div className=" flex ml-11">
              <span
                className={classNames(
                  "  text-xl font-bold text-text items-center  ",
                  {
                    hidden: toggleCollapse,
                  }
                )}
              >
                Bea
              </span>
            </div>
            {isCollapsible && (
              <button
                className={collapseIconClasses}
                onClick={handleSidebarToggle}
              >
                {/* Replace with your actual CollapsIcon component */}
                {/* <CollapsIcon /> */}
              </button>
            )}
          </div>

          <div className="flex flex-col  items-start mt-24">
            {menuItems.map(({ id, label, link }) => {
              const classes = getNavItemClasses({ id, label, link });
              return (
                <div className={classes} key={id}>
                  <Link
                    href={link}
                    className="flex py-4 px-3 items-center w-full h-full"
                  >
                    <div style={{ width: "2.5rem" }}></div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {label}
                      </span>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`${getNavItemClasses({
            id: 0,
            label: "",
            link: "",
          })} px-3 py-4`}
        >
          <div style={{ width: "2.5rem" }}>
            
          </div>
          {!toggleCollapse && (
            <span className={classNames("text-md  bg-black p-2 border rounded  font-medium text-white")}>
              Logout
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
