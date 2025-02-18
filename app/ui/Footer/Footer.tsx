
import Link from 'next/link'
import React from 'react'
import { EmailIcon, FacebookIcon, InstagramIcon, LinkedinIcon, LocationIcon, PhoneIcon, TimeIcon, YouTubeIcon } from '@/app/ui/Icons/Icons'
import CustomImage from '../CustomImage/CustomImage'
import { get_setting } from '@/lib/utils'
import Subscriber from './Subscriber'
import { routes } from '@/lib/routes'
import FooterSeo from '../FooterSeo/FooterSeo'

export default async function Footer({ setting, translate }: any) {

    const footer_logo = await get_setting(setting, 'footer_logo')
    const payment_method_images = await get_setting(setting, 'payment_method_images')
    const payment_method_images_mobile = await get_setting(setting, 'payment_method_images_mobile')
    const about_us_description = await get_setting(setting, 'about_us_description')
    const frontend_copyright_text = get_setting(setting, 'frontend_copyright_text')

    const contact_address = get_setting(setting, 'contact_address')
    const contact_email = get_setting(setting, 'contact_email')
    const contact_phone = get_setting(setting, 'contact_phone')
    // social link 
    const facebook_link = get_setting(setting, 'facebook_link')
    const instagram_link = get_setting(setting, 'instagram_link')
    const youtube_link = get_setting(setting, 'youtube_link')
    const linkedin_link = get_setting(setting, 'linkedin_link')
    // console.log(translate)
    // text start 
    const about_authentic_bd = translate?.about_authentic_bd

    const customer_care = translate?.customer_care
    const contact_with_us = translate?.contact_with_us
    const footer_my_account = translate?.footer_my_account

    const footer_about_us = translate?.footer_about_us
    const footer_faq = translate?.footer_faq
    const footer_contact_us = translate?.footer_contact_us
    const footer_shipping_return = translate?.footer_shipping_return
    const footer_privacy_policy = translate?.footer_privacy_policy
    const footer_term_condition = translate?.footer_term_condition
    const be_an_affiliate_partner = translate?.be_an_affiliate_partner
    const footer_order_histroy = translate?.footer_order_histroy
    const footer_my_wishlist = translate?.footer_my_wishlist
    const footer_track_order = translate?.footer_track_order
    const footer_newsletter = translate?.footer_newsletter
    const footer_subscribe = translate?.footer_subscribe
    const timings = translate?.timings
    const footer_email = translate?.footer_email
    const footer_phone = translate?.footer_phone
    const login = translate?.login


    return (
        <div className='footer_section py-[55px] '>
            <div className="block md:hidden">
            
                  <FooterSeo isMobile={true} />
                </div>
            <div className="container mx-auto px-4 sm:px-2 md:px-4 lg:px-6 xl:px-8 flex flex-col gap-[30px] sm:gap-[65px] text-white  ">
                <div className="footer_header flex flex-col gap-3 justify-center items-center text-center text-white ">
                    <div className="footer_logo">

                        <CustomImage
                            src={footer_logo?.value}
                            width={320}
                            height={25}
                            alt={`Logo`}
                        />
                    </div>
                    <div className="footer_content">
                        <div className=' text-sm md:text-base text-white ' dangerouslySetInnerHTML={{
                            __html: about_us_description?.value
                        }} />
                    </div>
                </div>
                <div className="footer_widget_area flex  items-center sm:items-start gap-3 justify-between flex-wrap">
                <div className="hidden sm:flex items-center sm:items-start gap-[30px] sm:gap-[100px] flex-wrap justify-center">
                        <div className="widget_one w-[220px]">
                            <h4 className='font-medium uppercase text-base ' >{about_authentic_bd}</h4>
                            <div>
                                <ul className='flex items-center sm:items-start flex-col gap-[12px] sm:gap-[18px] pt-[16px] sm:pt-[27px] text-sm sm:text-base' >
                                    <li><Link href='/page/about-us' >{footer_about_us}</Link></li>
                                    <li><Link href='/page/faq' >{footer_faq}</Link></li>
                                    <li><Link href='/page/contact-us' >{footer_contact_us}</Link></li>
                                    <li><Link href='/page/returnpolicy' >{footer_shipping_return}</Link></li>
                                    <li><Link href='/page/privacypolicy' >{footer_privacy_policy}</Link></li>
                                    <li><Link href='/page/terms' >{footer_term_condition}</Link></li>
                                    <li><Link href='/affiliate' >{be_an_affiliate_partner}</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="widget_two text-center sm:text-start ">
                            <h4 className='font-medium uppercase text-base '>{customer_care}</h4>
                            <div className='flex items-center sm:items-start flex-col gap-[12px] sm:gap-[18px] pt-[16px] sm:pt-[27px] text-sm sm:text-base'>
                                <div className='flex items-center gap-3'>
                                    <LocationIcon /> <p>{contact_address?.value}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <TimeIcon /> <p>{timings}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <EmailIcon /> <p>{contact_email?.value}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <PhoneIcon /> <p>{contact_phone?.value}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="widget_left flex items-start justify-between gap-0 md:gap-[80px] lg:gap-[80px] xl:gap-[80px]  flex-wrap w-full md:w-auto  ">
                        <div className="widget_three  w-full  md:w-[126px] pt-[30px] sm:pt-[80px] xl:pt-0 text-center sm:text-start ">
                            <h4 className='font-medium uppercase text-base '>{footer_my_account}</h4>
                            <div className='flex items-center sm:items-start flex-col gap-[12px] sm:gap-[18px]  pt-[16px] sm:pt-[27px] text-sm sm:text-base justify-center sm:justify-start '>
                                <div><Link href='/login' >{login}</Link></div>
                                <div><Link href={routes.user_purchase_history} >{footer_order_histroy}</Link></div>
                                <div><Link href={routes.user_wish_list} >{footer_my_wishlist}</Link></div>
                                <div><Link href={routes.track_order} >{footer_track_order}</Link></div>
                            </div>
                        </div>
                        <div className="widget_four pt-[30px] sm:pt-[80px] xl:pt-0 w-full md:w-auto text-center sm:text-start">
                            <h4 className='font-medium uppercase text-base '>{contact_with_us}</h4>
                            <div className="social_link flex items-center sm:items-start gap-4 pt-[16px] sm:pt-[27px] text-sm sm:text-base justify-center sm:justify-start  ">
                                <div className='social bg-primary p-2 rounded-sm' ><Link href={facebook_link?.value} ><FacebookIcon /></Link></div>
                                <div className='social bg-primary p-2 rounded-sm' ><Link href={linkedin_link?.value} ><LinkedinIcon /></Link></div>
                                <div className='social bg-[#B838E5] p-2 rounded-sm' ><Link href={instagram_link?.value} ><InstagramIcon /></Link></div>
                                <div className='social bg-[#E8E8E8] p-2 rounded-sm' ><Link href={youtube_link?.value} ><YouTubeIcon /></Link></div>
                            </div>
                            <div className='flex  flex-col items-center sm:items-start justify-center sm:justify-start ' >
                                <div className=' relative mt-6 max-w-max '>
                                    <div className='absolute top-0 -left-1 '>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" viewBox="0 0 25 16" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M24.657 2.71973L24.657 0.719727L7.62939e-06 0.719726L6.95577e-06 15.7197L2.05478 15.7197L2.05478 2.71973L24.657 2.71973Z" fill="#EBE9E3" />
                                        </svg>
                                    </div>
                                    <h4 className='text-[20px] font-medium ' >{footer_newsletter}</h4>
                                    <div className='absolute bottom-0 -right-1 '>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" viewBox="0 0 25 16" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M-8.9816e-08 13.1162L0 15.1162L24.657 15.1162L24.657 0.116209L22.6022 0.116209L22.6022 13.1162L-8.9816e-08 13.1162Z" fill="#EBE9E3" />
                                        </svg>
                                    </div>
                                </div>
                                <Subscriber footer_subscribe={footer_subscribe || 'Subscribe'} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_payment">
                    {
                        payment_method_images?.value &&
                   
                    <CustomImage
                    className="hidden md:block"
                        src={payment_method_images?.value}
                        width={1436}
                        height={54}
                        alt={`Payment`}
                    />
                }

{
                        payment_method_images_mobile?.value &&
                   
                    <CustomImage
                     className="block md:hidden"
                        src={payment_method_images_mobile?.value}
                        width={600}
                        height={100}
                        alt={`Payment`}
                    />
                }

                </div>
                <div className="copy_right text-center text-[12px] sm:text-base ">
                    <div className=' text-[12px] sm:text-base text-white ' dangerouslySetInnerHTML={{
                        __html: frontend_copyright_text?.value
                    }} />

                </div>
            </div>

        </div>
    )
}
