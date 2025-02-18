
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { API_BASE_URL } from '@/app/config/api';
import CustomImage from '../CustomImage/CustomImage';
import TranslateHeading from '../TranslateHeading';


async function getReviews_home(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/reviews_home`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        ;
        return [];
    }
    const data: any = await response.json();
    return data as any;
}


export default async function CustomerReview() {
    const reviews_home = await getReviews_home() as any;

    return (
        <div className="container pb-[72px] mx-auto px-4 sm:px-2 md:px-4 lg:px-6 xl:px-8 ">
            <div className='review_section  flex flex-col gap-6 ' >
                <TranslateHeading translateKey={"customer_reviews"} />
                <div className='review_item mt-[-30px] sm:mt-[0px] '>

                    <Carousel
                        opts={{
                            align: "center",
                        }}
                        className="w-full  "
                    >
                        <CarouselContent className='pt-[80px] sm:pt-[125px] ml-0' >
                            {reviews_home && reviews_home?.data && reviews_home.data.map((item: any, index: any) => (
                                <CarouselItem key={index} className="pl-2 lg:pl-2 basis-[70%] md:basis-[40%]  lg:basis-1/3 xl:basis-1/4 review_item_basis  ">
                                    <div className={`review_item bg-[#EFB5DF]   xl:mb-0 relative  p-4 rounded-[20px] `} key={index} >
                                        <div className="review_thum top-[-43px] sm:top-[-80px]  xl:top-[-110px] absolute xl:w-[220px] xl:h-[220px]  sm:w-[150px] sm:h-[150px] w-[80px] h-[80px] ">
                                            <CustomImage
                                                src={item?.avatar}
                                                width={200}
                                                height={200}
                                                alt="offer"
                                                className="object-contain transition-transform duration-300 ease-in-out transform w-full "
                                            />
                                        </div>
                                        <div className="review_content flex flex-col gap-[4px] sm:gap-[18px] text-center pt-[28px] xl:pt-[110px] ">
                                            <p className=' text-[12px] sm:text-sm text-neutral-black' >{item?.comment}</p>
                                            <h3 className='text-base text-neutral-black font-bold '>{item?.user_name}</h3>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='left-[-12px] sm:left-[-17px] top-[67%] ' />
                        <CarouselNext className='right-[-12px] sm:right-[-17px] top-[67%]' />
                    </Carousel>

                </div>
            </div>
        </div>
    )
}
