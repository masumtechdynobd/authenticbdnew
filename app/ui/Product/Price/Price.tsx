"use client"
import { productStore } from '@/lib/hooks/useProductStore';
import React, { useEffect } from 'react'

export default function Price({ productDetails }: any) {
    const { price, setPriceValue } = productStore();

    useEffect(() => {
        setPriceValue(productDetails.main_price)
    }, [productDetails.main_price])



    return (
        <>
            <div className="regular_price text-primary text-sm font-bold max-w-[100px] ">{price}</div>
            <div className="sale_price text-arival_var relative  line-through ">
                {productDetails.stroked_price}
            </div>

        </>
    )
}
