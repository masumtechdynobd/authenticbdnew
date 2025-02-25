import Image from 'next/image'
import React from 'react'
import CustomLink from '../CustomLink'
import ViewCollection from './ViewCollection'
import CustomImage from '../CustomImage/CustomImage'

export default function IngredientItem({ data, desk }: any) {
    return (
        <div className={`ingredients_item ${desk ? '' : 'basis-[296px]'}  `}  >
            <div className={` ${desk ? '' : 'w-[296px]'}  h-auto '`} >
                <CustomImage
                    src={data?.banner}
                    width={desk ? 435 : 296}
                    height={desk ? 339 : 339}
                    alt="offer"
                    className="object-contain transition-transform duration-300 ease-in-out transform rounded-lg"
                />
            </div>
            <div className='p-3 sm:p-0 flex flex-col items-center justify-center '>
                <h3 className='text-base  pb-[10px] border-b-[2px] border-black  pt-3 text-center w-full  ' >{data.title}</h3>
                <p className='text-sm   py-[15px]  text-center'>{data?.short_description}</p>
                <ViewCollection link={`/ingredient/${data?.slug}`} />

            </div>
        </div>
    )
}
