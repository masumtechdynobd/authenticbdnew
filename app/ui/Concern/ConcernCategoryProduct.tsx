"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductItem from "@/app/ui/Product/ProductItem";
import { CategoryFeatured } from "@/types/api";
import { Button } from "../button";
import { useState, useEffect, Suspense } from "react";
import { getProductByCategory } from "@/lib/apiData";
import {
  CategorySkeleton,
  ImageSkeleton,
  ProductSkeleton,
} from "@/app/ui/skeletons";
import CustomImage from "../CustomImage/CustomImage";
import { cookieStore } from "@/lib/hooks/useCookieStore";

interface ConcernCategoryProps {
  category: CategoryFeatured[];
}

export default function ConcernCategoryProduct({
  category,
}: ConcernCategoryProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryFeatured | null>();
  const [loading, setLoading] = useState(false);

  const { heading_title_value } = cookieStore();
  const concern_banner = heading_title_value?.concern_banner;

  const handleSelectCategory = async (categoryId: number) => {
    setLoading(true);
    const fetchedProducts = await getProductByCategory(categoryId);
    setProducts(fetchedProducts);
    setLoading(false);
  };
  useEffect(() => {
    if (category && category?.length > 0) {
      handleSelectCategory(category[0].id);
      setCategoryData(category[0]);
    }
  }, [category]);
  return (
    <>
      <div className="concern_banner">
        <div className="concern_banner w-full rounded-lg overflow-hidden ">
          <CustomImage
            src={concern_banner}
            width={1000}
            height={300}
            alt="Concern"
            className=" w-full h-full transition-transform duration-300 ease-in-out transform"
            loading="lazy"
          />
        </div>
      </div>
      <div className="category flex items-center justify-center flex-wrap gap-[6px] sm:gap-6 flex-row">
        <Suspense
          fallback={Array.from({ length: 6 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        >
          {category &&
            category.slice(0, 3).map((item) => (
              <Button
                onClick={() => {
                  setCategoryData(item);
                  handleSelectCategory(item.id);
                }}
                key={item.id}
                isActive={categoryData?.id === item.id}
                className={`inline-block py-[6px] sm:py-[10px] px-[30px] sm:px-[72px] border-primary border-[1px] rounded-[35px] transition duration-300 ease-in-out uppercase text-[12px] bg-transparent ${
                  categoryData?.id === item.id
                    ? "bg-primary text-white"
                    : "!text-neutral-black hover:bg-primary-hover hover:!text-white"
                }`}
              >
                {item.name}
              </Button>
            ))}
        </Suspense>
      </div>

      <div className="concern_product_area flex items-start gap-[80px]">
        <div className="concern_right flex w-full flex-1 flex-col gap-[15px] sm:gap-6 ">
          <Carousel opts={{ align: "center" }} className="w-full">
            <CarouselContent className="ml-0">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-0 lg:pl-2 basis-[50%] sm:basis-1/3 md:basis-1/3 xl:basis-1/5"
                    >
                      <ProductSkeleton />
                    </CarouselItem>
                  ))
                : products &&
                  products.length > 0 &&
                  products.map((product, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-0 lg:pl-2 basis-[50%] md:basis-[40%]  lg:basis-1/3 xl:basis-1/4"
                    >
                      <ProductItem {...product} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
            {/* <CarouselPrevious className='left-[-0px] sm:left-[-17px]' />
                        <CarouselNext className='right-[-0px] sm:right-[-17px]' /> */}
          </Carousel>
        </div>
      </div>
    </>
  );
}
