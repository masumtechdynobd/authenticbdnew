
import React from 'react'
import Heading from '@/app/ui/Section/Heading'
import { getBlogs } from '@/lib/apiData'
import CustomImage from '../CustomImage/CustomImage'
import ViewAll from '../ViewAll/ViewAll'
import ReadMore from './ReadMore'
import TranslateHeading from '../TranslateHeading'
import Container from '../Container/Container'


export default async function Blog() {
    const blogs = await getBlogs() as any;

    return (
        <Container className='pb-[70px]'>
            <div className='blog  flex flex-col gap-6   ' >
                <TranslateHeading translateKey={"lates_blog"} />
                <div className="blog_area grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
                    {blogs?.data?.map((item: any) => (

                        <div className="ingredients_item " key={item.id} >
                            <div className="blog_thumbnail  overflow-hidden ">
                                <CustomImage
                                    src={item.banner}
                                    width={400}
                                    height={368}
                                    alt="offer"
                                    className="w-full h-full object-contain transition-transform duration-300 ease-in-out transform"
                                />
                            </div>
                            <div className="blog_content flex flex-col md:gap-[15px] bg-[#E2BAFA] text-[#231F20] p-[20px] ">
                                <p className='text-[18px] md:text-[25px]  line-clamp-2 '>{item.title}</p>
                                <p className='text-base mb-2 md:mb-0   '>{item.created_at}</p>
                                <ReadMore link={item.slug} />
                            </div>
                        </div>

                    ))}
                </div>
                <ViewAll link='/blog' />

            </div>
        </Container>
    )
}
