import React from 'react'
import Link from 'next/link'

export default function Breadcrumb({ link = '/', name = '' }) {
    const dataArray = [
        {
            link: '/',
            name: 'Home'
        },
        {
            link: link,
            name: ' / ' + name
        },
    ]
    return (
        <div className='breadcrumb py-[20px]'>
            {
                dataArray.map((item, index) => (<Link key={index} href={item.link}>{item.name}</Link>))
            }

        </div>
    )
}
