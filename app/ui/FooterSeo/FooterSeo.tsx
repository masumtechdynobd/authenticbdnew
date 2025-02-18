import Link from 'next/link';
import React from "react";
import Container from "../Container/Container";
import { API_BASE_URL } from "@/app/config/api";
import { get_setting } from '@/lib/utils';
import { EmailIcon, LocationIcon, PhoneIcon, TimeIcon } from '@/app/ui/Icons/Icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

async function getABout(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/about_page/footerseo`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}
async function getPopular_right_now(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/get-search-suggestions`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}

export default async function FooterSeo({isMobile, translate, setting}:any) {
  const { data, meta_img } = await getABout();
  const search_query = await getPopular_right_now();

  const about_authentic_bd = translate?.about_authentic_bd
  const footer_about_us = translate?.footer_about_us
  const footer_faq = translate?.footer_faq
  const footer_contact_us = translate?.footer_contact_us
  const footer_shipping_return = translate?.footer_shipping_return
  const footer_privacy_policy = translate?.footer_privacy_policy
  const footer_term_condition = translate?.footer_term_condition
  const be_an_affiliate_partner = translate?.be_an_affiliate_partner
  const customer_care = translate?.customer_care
  const contact_address = get_setting(setting, 'contact_address')
  const contact_email = get_setting(setting, 'contact_email')
  const contact_phone = get_setting(setting, 'contact_phone')
  const timings = translate?.timings
  

  return (
    <div className="footerSeo">
      <Container className="pb-[70px]">
        <Accordion type="single" collapsible>

          <AccordionItem value="item-1">
            <AccordionTrigger className={` ${isMobile ? 'text-white' :''} AccordionTrigger`}>
              Popular search query
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-row flex-wrap w-full gap-2">
                {search_query &&
                  search_query.map((item: any, index: any) => (
                    <div className="flex flex-col" key={index}>
                      <a className={` text-sm md:text-base ${isMobile ? '!text-white' :'text-neutral-black'}  `} href={`/search?q=${item.query}`}>{item.query} | </a>
                    </div>
                  ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className={` ${isMobile ? 'text-white' :''} AccordionTrigger`}>
            More information
            </AccordionTrigger>
            <AccordionContent>
            <div
                  className={` mobile_heading text-sm md:text-base ${isMobile ? '!text-white' :'text-neutral-black'}  `}
                  dangerouslySetInnerHTML={{
                    __html: data?.content,
                  }}
                />
                
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="block md:hidden">
            <AccordionTrigger className={` ${isMobile ? 'text-white' :''} AccordionTrigger`}>
            {about_authentic_bd || "About Authentic Bd.com"}
            </AccordionTrigger>
            <AccordionContent>
            
                    <div className="">
                        <div className="">
                            {/* <h4 className='font-medium uppercase text-base text-center text-white mt-6'>{about_authentic_bd || "About Authentic Bd.com"}</h4> */}
                            <div>
                                <ul className='flex items-center text-white sm:items-start flex-col gap-[12px] sm:gap-[18px] pt-[16px] sm:pt-[27px] text-sm sm:text-base' >
                                    <li><Link href='/page/about-us' >{footer_about_us || "About Us"}</Link></li>
                                    <li><Link href='/page/faq' >{footer_faq || "FAQ"}</Link></li>
                                    <li><Link href='/page/contact-us' >{footer_contact_us || "Contact Us"}</Link></li>
                                    <li><Link href='/page/returnpolicy' >{footer_shipping_return || "Shipping & Return"}</Link></li>
                                    <li><Link href='/page/privacypolicy' >{footer_privacy_policy || "Privacy Policy"}</Link></li>
                                    <li><Link href='/page/terms' >{footer_term_condition || "Terms & Condition"}</Link></li>
                                    <li><Link href='/affiliate' >{be_an_affiliate_partner || "Bw an affiliate partner"}</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="widget_two text-center sm:text-start">
                            <h4 className='font-medium uppercase text-base text-white mt-6'>{customer_care || "CUSTOMER CARE"}</h4>
                            <div className='flex items-center text-white sm:items-start flex-col gap-[12px] sm:gap-[18px] pt-[16px] sm:pt-[27px] text-sm sm:text-base'>
                                <div className='flex items-center gap-3'>
                                    <LocationIcon /> <p>{contact_address?.value || "House # 34, Road # 02, Block # L, Banani, Dhaka"}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <TimeIcon /> <p>{timings || "Timings : ( Mon to sat) 8:00 AM to 10:00 PM"}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <EmailIcon /> <p>{contact_email?.value || "info@authentic.com.bd"}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <PhoneIcon /> <p>{contact_phone?.value || "019 4240 6570"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </AccordionContent>
          </AccordionItem>


        </Accordion>
      </Container>
    </div>
  );
}
