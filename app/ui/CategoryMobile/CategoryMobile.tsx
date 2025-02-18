import React from 'react'
import CustomImage from '../CustomImage/CustomImage';
import Link from 'next/link';

export default function CategoryMobile({ menus }: any) {
    return (
        <div id="main_category_show_home" className='flex md:hidden w-full flex-row overflow-x-scroll scrollbar-hide  gap-x-2 pb-0 pt-[10px] px-4  '>
            {
                menus.map((item: any, index: any) => (
                    <Link key={index} href={`/category/${item?.slug}`} >
                        <div className='flex grow items-center justify-center flex-col gap-y-1'>
                            <div className='rounded-lg overflow-hidden' style={{ height: "64px", width: "64px" }}>
                                <CustomImage width={64} height={64} src={item?.icon} alt={item?.name} className="" loading="eager" />
                            </div>
                            <p className=" body6 font-semibold">{item?.name}</p>
                        </div></Link>

                ))
            }



        </div>
    )
}
