
"use client"
import { cookieStore } from '@/lib/hooks/useCookieStore';
import CustomLink from '../CustomLink'

export default function ViewAll({ link }: any) {
  const { heading_title_value } = cookieStore();
  const view_all = heading_title_value?.view_all
  return (
    <div className="view_all flex justify-center items-center ">
      <CustomLink
        href={link} className=' text-neutral-black ' >{view_all || 'View ALl'}</CustomLink>

    </div>
  )
}
