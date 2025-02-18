import React from 'react'
import Container from '../Container/Container'
import CustomImage from '../CustomImage/CustomImage'
import ProductCard from './ProductCard'
import TranslateHeading from '../TranslateHeading'
import AddToLook from './AddToLook'
import { API_BASE_URL, BASE_URL } from '@/app/config/api'
import Points from './Points'
import ShopLookProduct from './ShopLookProduct'

async function getFlashIngredients(): Promise<{
  id: number,
  title?: string,
  short_description?: string,
  description?: string,
  banner?: string,
}[]> {
  const response = await fetch(`${API_BASE_URL}/get-look-points`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}

export default async function ShopByLook() {
  const data = await getFlashIngredients() as any;

  return (
    <Container>
      <div className="bg-arival  md:p-8 rounded-[26px] mb-[70px] ">
        <TranslateHeading translateKey={"shop_by_looks"} />
        <div className="flex  gap-2 pt-4  flex-col lg:flex-row  ">
          <div className="flex justify-center">
            <div id="look-image-container " className='relative  ' style={{
              position: "relative",
              width: "557px",
            }} >
              <img id="look-image" src={`${BASE_URL}/public/${data?.look?.url}`} className='w-full h-auto' alt="Look Image" />

              <Points data={data} />


            </div>
          </div>

          <ShopLookProduct products={data?.products?.data ?? []} />
        </div>

      </div>
    </Container>

  )
}
