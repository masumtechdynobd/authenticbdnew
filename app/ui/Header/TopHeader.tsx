
"use client"
import { GiftIcon, TakaIcon } from "@/app/ui/Icons/Icons";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import { routes } from "@/lib/routes";
import Link from "next/link";

export default function TopHeader() {

  const { translateValue } = cookieStore();
  const notice = translateValue?.notice
  const authentic_rewards = translateValue?.authentic_rewards
  const authentic_rewards_value = translateValue?.authentic_rewards_value
  const referral = translateValue?.referral
  return (
    <div className="bg-accent-lightPink py-[14px] " >
      <div className="container mx-auto px-4 sm:px-2 md:px-4 lg:px-6 xl:px-8 flex-col lg:flex-row md:flex-row xl:flex-row  flex justify-between items-center text-primary-light flex-wrap gap-3 ">
        <div className="top_left_text  text-sm flex-1">
          <div className="bounce">
            <p>{notice}</p>
          </div>


        </div>
        <div className="top_right_text flex gap-3 text-sm ">
          <Link href={routes.rewards}>
          <div className="flex items-center gap-9 "  >
            <TakaIcon /> <span><span className=" uppercase " >{authentic_rewards}</span> {authentic_rewards_value}</span>
          </div>
          </Link>
          <div className="flex items-center gap-9">
            <GiftIcon /><span  >  {referral}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
