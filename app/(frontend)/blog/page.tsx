
import { API_BASE_URL } from '@/app/config/api';
import AllBlogList from '@/app/ui/Blog/AllBlogList';
import BlogSearch from '@/app/ui/Blog/BlogSearch';
import Container from '@/app/ui/Container/Container'
import CustomLink from '@/app/ui/CustomLink';
import { BlogSkeletonGrid } from '@/app/ui/skeletons';
import React, { Suspense } from 'react'
async function getCategory(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/all_category`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

export default async function Page({ searchParams }: any) {
    const category = await getCategory();

    const currentPage = Number(searchParams?.page) || 1;
    const query = searchParams?.query || "";
    const category_search = searchParams?.category || "";

    return (
        <Container>

            <div className="flashDeal_product  py-[40px] ">
                <div className="blog_search flex justify-center items-center p-10 md:mb-10 ">
                    <BlogSearch currentPage={currentPage} />
                </div>
                <div className="all_category flex gap-3 items-center justify-center mb-3 flex-wrap ">
                    {
                        category?.data?.map((item: any, index: any) => (

                            <CustomLink key={index} className='text-neutral-black' href={`?page=${currentPage}&query=${query}&category=${item?.id}`} > {item?.category_name} </CustomLink>
                        ))
                    }
                </div>
                <Suspense key={JSON.stringify(currentPage + query + category_search)} fallback={<BlogSkeletonGrid count={4} />} >
                    <AllBlogList currentPage={currentPage} query={query} category_search={category_search} />
                </Suspense>
            </div>
        </Container>
    )
}
