"use client";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Heart,
  Languages,
  Menu,
  PackageSearch,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import SearchContainer from "./SearchContainer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CartIcon, LoveIcon, ProfileIcon } from "../Icons/Icons";
import SideCart from "../SideCart/SideCart";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { get_setting } from "@/lib/utils";
import CustomImage from "../CustomImage/CustomImage";
import Link from "next/link";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import SignOutForm from "../SignOutForm";
import { routes, routes_with_out_slash } from "@/lib/routes";
import axios from "axios";
import toast from "react-hot-toast";
import AuthenticLoves from "./AuthenticLoves";
import BrandList from "./BrandList";
import BeautyApp from "./BeautyApp";
import AccountMenu from "./AccountMenu";

interface MenuItem {
  id: number;
  slug: string;
  name: string;
  icon_menu?: string;
  children?: MenuItem[]; // Optional property for nested menu items
}

const MobileNav = ({
  authentic_loves,
  authentic_loves_text,
  authentic_recommends,
  authentic_recommends_text,
  authentic_fresh_drops,
  authentic_fresh_drops_text,
  authentic_brand,
  authentic_brand_text,
  brand_menu,
  languages,
  blog,
  offerMenu,
  menus,
  setting,
}: any) => {
  const [activeTab, setActiveTab] = useState("categories");
  const { totalQuantity, wishlist, setLanguage } = useCartStoreData();
  const [mounted, setMounted] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const cookieValue = cookieStore((state) => state.cookieValue);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const menu_data: any[] = menus;
  const user_data = [
    {
      id: 1,
      name: "Sign In",
      slug: "/login",
      children: [
        {
          id: 1,
          slug: "login",
          name: "Sign In",
        },
        {
          id: 2,
          name: "Register",
          slug: "register",
        },
        {
          id: 3,
          name: "Track Order",
          slug: "track-order",
        },
      ],
    },
  ];
  const profile_data = [
    {
      id: 1,
      name: "Account",
      slug: routes_with_out_slash.user_dashboard,
      children: [
        {
          id: 1,
          name: "Dashboard",
          slug: routes_with_out_slash.user_dashboard,
        },
        {
          id: 1,
          name: "Purchase history",
          slug: routes_with_out_slash.user_purchase_history,
        },
        {
          id: 2,
          name: "Wish list",
          slug: routes_with_out_slash.user_wish_list,
        },
        {
          id: 3,
          name: "Profile",
          slug: routes_with_out_slash.user_profile,
        },
        {
          id: 3,
          name: "Address",
          slug: routes_with_out_slash.user_address,
        },
      ],
    },
  ];

  const lang_data = [
    {
      id: 1,
      name: "Language",
      slug: "/language",
      children: [
        {
          id: 1,
          slug: "bn",
          name: "Bangla",
        },
        {
          id: 2,
          name: "English",
          slug: "/english",
        },
      ],
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [labelMenu, setLabelMenu] = useState<number>(1);
  const [langValue, setLangValue] = useState<boolean>(false);
  const [labelMenuData2, setLabelMenuData2] = useState<MenuItem[]>([]);
  const [labelMenuData3, setLabelMenuData3] = useState<MenuItem[]>([]);
  const [label1, setLabel1] = useState<MenuItem | null>(null);
  const [label2, setLabel2] = useState<MenuItem | null>(null);
  const header_logo = get_setting(setting, "header_logo");
  const handCloseMenu = () => {
    setOpenMenu(false);
    setLabelMenu(1);
    return true;
  };

  const handleBackMenu = (val: number) => {
    setLabelMenu(val);
  };
  const handleLanguage = async (item: any) => {
    setLanguage(item);
    // console.log("handleLanguage", item)
    // return false
    try {
      let langData = {
        lang: item,
      };
      const response: any = await axios.post("/api/languages-change", langData);

      toast.success(response.data.massage, {
        style: { color: "#404042", fontWeight: 600 },
        iconTheme: { primary: "#A020F0", secondary: "#fff" },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const stickyThreshold = 50;
      if (window.scrollY > stickyThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`block md:hidden sticky top-0 z-[999999] bg-white py-2  ${
          isSticky ? "py-4 bg-white shadow-md" : ""
        }`}
      >
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-[10px] ">
            <Button
              className=" items-center justify-end border-0 p-0"
              variant="outline"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <Menu className="text-sm w-[18px] " />
            </Button>
            <div className="search  flex items-center">
              <SearchContainer />
            </div>
          </div>

          <div className="logo w-[180px] h-[25px] flex items-center justify-center ">
            <Link href="/">
              <CustomImage
                src={header_logo?.value}
                width={180}
                height={25}
                alt={`Logo`}
              />
            </Link>
          </div>
          <div className="flex items-center gap-[20px]">
            <div className="star relative">
              <Link
                className="flex items-center gap-1 text-base capitalize"
                href="/wishlist"
              >
                <LoveIcon />

                <span className="mini_cart__qty">
                  {(mounted && wishlist.length) || 0}
                </span>
              </Link>
            </div>
            <div className="shoppingCart relative pr-3 ">
              <Dialog open={openCart} onOpenChange={setOpenCart}>
                <DialogTrigger>
                  <div
                    className="flex items-center gap-1 text-base capitalize"
                    onClick={() => setOpenCart(!openCart)}
                  >
                    <CartIcon />
                  </div>
                  <span className="mini_cart__qty">
                    {(mounted && totalQuantity) || 0}
                  </span>
                </DialogTrigger>
                <DialogContent className="border-0 max-w-[500px] flex grow flex-col repeat-1 duration-300 animate-in bottom-0 top-0 right-0 slide-in-from-right fixed z-[9999999999999999999999999] ">
                  <SideCart />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div
        id="main-navigation"
        className={`b-menu_panel ${openMenu ? "m-active" : ""}`}
      >
        <div
          className={`b-menu_panel-inner ${openMenu ? "m-opened" : "m-closed"}`}
        >
          <div className={`b-menu_subpanel m-active_level_${labelMenu}`}>
            {/* label 1 start  */}
            <div className="b-menu_subpanel-container m-level_1">
              <div className="b-menu_panel-head">
                <div className="flex items-center justify-start gap-2 text-primary font-medium uppercase ">
                  <CircleUserRound />
                  <Link href={"/login"} onClick={handCloseMenu}>
                    Login
                  </Link>
                  <PackageSearch />
                  <Link href={"/track-order"} onClick={handCloseMenu}>
                    Track Order
                  </Link>
                </div>
                <button
                  className="b-menu_panel-close"
                  title="Close"
                  type="button"
                  onClick={handCloseMenu}
                >
                  <X />
                </button>
              </div>
              <div className="tab_menu">
                <div className="flex mb-4">
                  <button
                    onClick={() => setActiveTab("categories")}
                    className={`flex-1 py-3 text-sm font-medium relative ${
                      activeTab === "categories"
                        ? "text-primary"
                        : "text-gray-500"
                    }`}
                  >
                    CATEGORIES
                    {activeTab === "categories" && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("brands")}
                    className={`flex-1 py-3 text-sm font-medium relative ${
                      activeTab === "brands" ? "text-primary" : "text-gray-500"
                    }`}
                  >
                    BRANDS
                    {activeTab === "brands" && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                    )}
                  </button>
                </div>
              </div>
              {activeTab === "brands" && <BrandList brands={brand_menu} />}
              {activeTab === "categories" && (
                <div className="b-menu_bar">
                  <nav className="b-menu_bar-container">
                    <BeautyApp
                      handCloseMenu={handCloseMenu}
                      menu_data={menu_data}
                    />
                    <div className="w-full  flex items-center justify-center gap-2 py-4 ">
                      <div className="cursor-pointer  transition-all relative     duration-300 ease-in-out text-white">
                        <div className="flex flex-col max-w-max   transition-all bg-[#CC0F99] px-2 py-1 rounded-[30px] hover:scale-[1.1] ">
                          <Link
                            onClick={handCloseMenu}
                            href={`/blog`}
                            className="uppercase text-white text-[12px] font-normal   "
                          >
                            {blog}
                          </Link>
                        </div>
                      </div>
                      {offerMenu?.map((item: any, index: any) => (
                        <div
                          key={index}
                          className="key={item.id} cursor-pointer  transition-all relative     duration-300 ease-in-out text-white"
                        >
                          <div
                            className={`flex flex-col max-w-max  transition-all ${
                              index === 0 ? "bg-[#F0A401]" : "bg-[#601390]"
                            } px-2 py-1 rounded-[30px] hover:scale-[1.1] `}
                          >
                            <Link
                              onClick={handCloseMenu}
                              href={`/category/${item.slug}`}
                              className="uppercase text-white text-[10px] font-normal   "
                            >
                              {item?.name}{" "}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* authentic_loves  */}
                    <AuthenticLoves
                      authentic_loves={authentic_loves}
                      authentic_loves_text={authentic_loves_text}
                    />

                    <AuthenticLoves
                      authentic_loves={authentic_fresh_drops}
                      authentic_loves_text={authentic_fresh_drops_text}
                    />

                    <AuthenticLoves
                      authentic_loves={authentic_recommends}
                      authentic_loves_text={authentic_recommends_text}
                    />

                    <AuthenticLoves
                      brand={true}
                      authentic_loves={authentic_brand}
                      authentic_loves_text={authentic_brand_text}
                    />

                    <div>
                      {/* user data  */}
                      {cookieValue?.user ? (
                        <>
                          <AccountMenu
                            sign_out={<SignOutForm sign_out={"Sign out"} />}
                            profile_data={profile_data}
                          />
                        </>
                      ) : (
                        <>
                          <AccountMenu profile_data={user_data} />
                        </>
                      )}
                      {/* <AccountMenu profile_data={lang_data} /> */}
                    </div>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
