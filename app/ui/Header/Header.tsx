import React from 'react'
import TopHeader from './TopHeader'
import Navbar from './Navbar'
import MiddleNav from './MiddleNav'
import CategoryMobile from '../CategoryMobile/CategoryMobile'
import { fetchData } from '@/lib/dataFetching'
import { API_BASE_URL } from '@/app/config/api'
import { cookies } from 'next/headers'

export async function getMenu(): Promise<any> {
  const lang = cookies().get('lang')?.value || 'en';
  const response = await fetchData<any>(`${API_BASE_URL}/categories/menu?lang=${lang}`, { revalidate: 10 });
  return response as any;
}

export default async function Header({ translate, languages, setting }: any) {

  const menus = await getMenu();
  // console.log(menus?.authentic_loves)
  return (
    <>
      <TopHeader />
      <MiddleNav languages={languages} setting={setting} />
      <Navbar

        authentic_loves={menus?.authentic_loves}
        authentic_loves_text={menus?.translate?.authentic_loves_text}
        authentic_recommends={menus?.authentic_recommends}
        authentic_recommends_text={menus?.translate?.authentic_recommends_text}
        authentic_fresh_drops={menus?.authentic_fresh_drops}
        authentic_fresh_drops_text={menus?.translate?.authentic_fresh_drops_text}
        authentic_brand={menus?.authentic_brand}
        authentic_brand_text={menus?.translate?.authentic_brand}
        brand_menu={menus?.brand_menu}

        languages={languages} offerMenu={menus?.offerMenu} menus={menus?.menu} translate={translate} setting={setting} />
      <CategoryMobile


        menus={menus?.menu} />
    </>
  )
}
