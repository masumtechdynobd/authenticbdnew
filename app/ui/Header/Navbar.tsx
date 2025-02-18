
import * as React from "react"
import Link from "next/link"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import CollectionSection from "./data"
import MobileNav from "./MobileNav"



export default async function Navbar({
    authentic_loves,
    authentic_loves_text,
    authentic_recommends,
    authentic_recommends_text,
    authentic_fresh_drops,
    authentic_fresh_drops_text,
    authentic_brand,
    authentic_brand_text,
    brand_menu,
    languages, offerMenu, menus, translate, setting }: any) {

    return (
        <>
            <div className="bg-primary-light_blue hidden lg:block  " >
                <div className="container mx-auto px-4 sm:px-2 md:px-4 lg:px-6 xl:px-8  flex justify-center items-center gap-4 md:gap-[35px] xl:gap-[37px] flex-wrap  ">

                    <div className="flex items-center justify-center flex-wrap">
                        {
                            menus && menus?.map((item: any) => (
                                <HoverCard key={item.id} openDelay={0} >
                                    <HoverCardTrigger asChild>
                                        <div className="cursor-pointer px-4 py-[1.2rem] transition-all relative   nav_menu_item   duration-300 ease-in-out text-white" >
                                            <div className="flex flex-col  transition-all  hover:translate-y-[-3px]">
                                                <Link href={`/category/${item.slug}`} legacyBehavior passHref className="uppercase text-white text-base font-normal   "   >{item.name}</Link>
                                            </div>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="HoverCardContent"  >
                                        {
                                            item.children.length > 0 &&

                                            <CollectionSection children={item.children} item={item} />
                                        }
                                    </HoverCardContent>
                                </HoverCard>
                            ))
                        }
                        <div className="cursor-pointer px-4 py-[1.2rem] transition-all relative     duration-300 ease-in-out text-white" >
                            <div className="flex flex-col  transition-all bg-[#CC0F99] px-3 py-1 rounded-[30px] hover:scale-[1.1] ">
                                <Link href={`/blog`} className="uppercase text-white text-base font-normal   "   >{translate?.blog}</Link>
                            </div>
                        </div>
                        {
                            offerMenu?.map((item: any, index: any) => (
                                <div key={index} className="cursor-pointer px-4 py-[1.2rem] transition-all relative     duration-300 ease-in-out text-white" >
                                    <div className={`flex flex-col  transition-all ${index === 0 ? 'bg-[#F0A401]' : 'bg-[#601390]'} px-3 py-1 rounded-[30px] hover:scale-[1.1] `}>
                                        <Link href={`/category/${item.slug}`} className="uppercase text-white text-base font-normal   "   >{item?.name} </Link>
                                    </div>
                                </div>
                            ))
                        }

                    </div>

                </div>

            </div>

            <MobileNav
                authentic_loves={authentic_loves}
                authentic_loves_text={authentic_loves_text}
                authentic_recommends={authentic_recommends}
                authentic_recommends_text={authentic_recommends_text}
                authentic_fresh_drops={authentic_fresh_drops}
                authentic_fresh_drops_text={authentic_fresh_drops_text}
                authentic_brand={authentic_brand}
                authentic_brand_text={authentic_brand_text}
                brand_menu={brand_menu}

                languages={languages} blog={translate?.blog} offerMenu={offerMenu} menus={menus} setting={setting} />
        </>
    )
}


