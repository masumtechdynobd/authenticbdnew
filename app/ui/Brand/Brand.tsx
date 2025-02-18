
import { BASE_URL } from '@/app/config/api';
import Heading from '@/app/ui/Section/Heading'
import { getTopBrands } from '@/lib/apiData';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image';
import TranslateHeading from '../TranslateHeading';
import Link from 'next/link';
import Container from '../Container/Container';

export default async function Brand() {
    const brands = await getTopBrands();
    return (
        <Container className='pb-[66px]'>
            <div className='brand_section flex flex-col gap-6  xl:px-[40px]  ' >
                <TranslateHeading translateKey={"shop_by_brands"} />
                <Carousel
                    opts={{
                        align: "center",
                    }}
                    className="w-full hidden lg:block "
                >
                    <CarouselContent>
                        {brands?.data && brands?.data.map((item: any) => (
                            <CarouselItem key={item.id} className="basis-[30%] sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                                <Link href={`/brand/${item.slug}`} >
                                    <div className="brand_item flex items-center justify-center flex-col gap-3 " key={item.id} >
                                        <Image
                                            src={`${BASE_URL}/public/${item.logo}`}
                                            width={262}
                                            height={262}
                                            alt={item.name}
                                            className="object-contain transition-transform duration-300 ease-in-out transform rounded-[25px] "
                                        />
                                        <div className='flex flex-col gap-[6px] sm:gap-[13px] text-center pt-0 sm:pt-3'>
                                            <h3 className=' text-[14px] sm:text-[25px] font-medium text-neutral-black ' >{item.name}</h3>
                                            <h5 className='text-[14px] sm:text-base font-medium text-neutral-black '>{item.discount}% OFF</h5>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='left-[-0px] sm:left-[-17px] lg:top-[40%] ' />
                    <CarouselNext className='right-[-0px] sm:right-[-17px] lg:top-[40%]' />
                </Carousel>

                {/* mobile view  */}
                <div className='  grid grid-cols-2 md:grid-cols-3 gap-2 lg:hidden' >
                    {brands?.data && brands?.data.map((item: any) => (
                        <div key={item.id} >
                            <Link href={`/brand/${item.slug}`} >
                                <div className="brand_item flex items-center justify-center flex-col gap-3 " key={item.id} >
                                    <Image
                                        src={`${BASE_URL}/public/${item.logo}`}
                                        width={160}
                                        height={160}
                                        alt={item.name}
                                        className="object-contain transition-transform duration-300 ease-in-out transform rounded-[25px] "
                                    />
                                    <div className='flex flex-col gap-[6px] sm:gap-[13px] text-center pt-0 sm:pt-3'>
                                        <h3 className=' text-[14px] sm:text-[25px] font-medium text-neutral-black ' >{item.name}</h3>
                                        <h5 className='text-[14px] sm:text-base font-medium text-neutral-black '>{item.discount}% OFF</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </Container>
    )
}
