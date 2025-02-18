"use client"
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import { cookieStore } from '@/lib/hooks/useCookieStore'
import { get_setting } from '@/lib/utils'
import CustomImage from '../CustomImage/CustomImage'
import TranslateHeading from '../TranslateHeading'


export default function ResonShop() {
    const { settingValue } = cookieStore();
    const reson_to_shop_images = get_setting(settingValue, 'reson_to_shop_images')?.value || [];

    return (
        <div className="container pb-[25px] md:pb-[70px] mx-auto px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8 ">
            <div className='reason bg-[#EFB5DF] rounded-[16px] py-[10px] md:p-[20px] sm:p-[35px] flex flex-col gap-1 md:gap-6 ' >
                <TranslateHeading translateKey={"reason_to_shop"} className="" />
                <div className="reason_item">

                    <Carousel
                        opts={{
                            align: "center",
                            loop: true
                        }}
                        plugins={[
                            Autoplay({
                                delay: 2000,
                            }),
                        ]}
                        className="w-full "
                    >
                        <CarouselContent>
                            {reson_to_shop_images.map((item: any, index: any) => (
                                <CarouselItem key={index} className="basis-[33%] sm:basis-1/3 md:basis-1/3 xl:basis-1/5  ">
                                    <div className="resons_item sm:mb-7 xl:mb-0 flex items-center justify-center flex-col md:gap-3 " key={index} >
                                        <div className=' w-[80px] h-[70px] sm:w-[175px]  sm:h-[125px]' >
                                            <CustomImage
                                                src={item?.url}
                                                width={175}
                                                height={137}
                                                alt={item?.title}
                                                className="object-contain transition-transform duration-300 ease-in-out transform w-full "
                                            />
                                        </div>
                                        {
                                            item?.title &&
                                            <h3 className='text-[14px] font-medium text-neutral-black ' >{item.title}</h3>
                                        }
                                    </div>
                                </CarouselItem>
                            ))}

                        </CarouselContent>
                        {/* <CarouselPrevious className=' top-[50px] left-[-12px] sm:left-[-17px]' />
                        <CarouselNext className='top-[50px] right-[-12px] sm:right-[-17px]' /> */}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}
