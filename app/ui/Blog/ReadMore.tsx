"use client"
import React from 'react'
import CustomLink from '../CustomLink'
import { cookieStore } from '@/lib/hooks/useCookieStore';

export default function ReadMore({ link }: any) {
    const { heading_title_value } = cookieStore();
    const readMore = heading_title_value?.readMore
    return (
        <div>
            <CustomLink className=' bg-transparent !text-[#404042]  !border-[#404042] uppercase !hover:bg-[#404042] !hover:text-white px-[25px] sm:px-[25px] py-[10px] hover:!text-white  ' href={`/blog/${link}`}   >{readMore}</CustomLink>
        </div>
    )
}
