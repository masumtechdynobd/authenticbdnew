import Image from "next/image";
import React from "react";
import { Product } from "@/types/api";
import Link from "next/link";
import { BASE_URL } from "@/app/config/api";
import SingleAddToCart from "./AddToCartAction/SingleAddToCart";
import WishAdd from "./WishAdd/WishAdd";
import { Star } from "lucide-react";
import CustomImage from "../CustomImage/CustomImage";

const ProductItem: React.FC<Product> = ({
  id,
  discount_text,
  bestseller,
  best_seller_text,
  free_shipping_text,
  freeshipping,
  colors,
  choice_options,
  stocks,
  name,
  slug,
  brand,
  thumbnail_image,
  discount,
  rating,
  totalRating,
  stroked_price,
  main_price,
}) => {
  return (
    <div className="p-1">
      <div className="product_item relative bg-white border px-2 py-2  group overflow-hidden rounded-lg">
        {/* free shipping start */}
        {freeshipping && freeshipping > 0 && (
          <div
            className={`flex flex-col gap-1 absolute overflow-hidden bg-neutral-black rounded-sm z-10 ${
              bestseller > 0 ? "top-[27px] md:top-[35px]" : ""
            }  `}
          >
            <div className="flex flex-row gap-1 rounded-sm px-2 py-0.5 items-center">
              <p className="text-[10px] font-semibold uppercase text-white">
                {free_shipping_text}
              </p>
            </div>
          </div>
        )}
        {/* free shipping end */}
        {/* free shipping start */}
        {bestseller && bestseller > 0 && (
          <div
            className="flex flex-col gap-1 absolute overflow-hidden  rounded-sm z-10 "
            style={{
              backgroundImage:
                "linear-gradient(90deg, #efb5df 0%, #9f1fef 50.52%, rgb(180 122 217) 100%)",
              backgroundColor: "initial",
            }}
          >
            <div className="flex flex-row gap-1 rounded-sm px-2 py-0.5 items-center">
              <p className="text-[10px] font-semibold uppercase text-white">
                {best_seller_text}
              </p>
            </div>
          </div>
        )}
        {/* free shipping end */}
        <WishAdd id={id} />
        <div
          className="product_thumb flex flex-col "
          style={{ flex: "1 1 0%" }}
        >
          <Link href={`/product/${slug}`}>
            <div
              className="tum_image   flex relative items-center justify-center flex-col overflow-hidden "
              style={{ flex: "1 1 0%", width: "100%" }}
            >
              <CustomImage
                style={{ width: "100%", aspectRatio: "1 / 1" }}
                src={`${thumbnail_image && thumbnail_image}`}
                width={200}
                height={200}
                alt={name}
                className="object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110 mx-auto "
              />
              {
                // totalRating > 0  &&

                <div className="review max-w-max absolute bottom-0 left-0  flex items-center justify-start  font-medium  rounded-[4px] px-[10px] py-[2px] sm:py-[3px] text-[12px] sm:text-[12px] gap-1">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M5.35709 1.11705C5.61548 0.321826 6.74051 0.321825 6.99889 1.11705L7.7283 3.36194C7.84385 3.71757 8.17526 3.95836 8.5492 3.95836L10.9096 3.95836C11.7458 3.95836 12.0934 5.02833 11.417 5.5198L9.50735 6.90722C9.20483 7.12701 9.07824 7.51661 9.19379 7.87225L9.9232 10.1171C10.1816 10.9124 9.27141 11.5736 8.59495 11.0822L6.68534 9.69475C6.38282 9.47495 5.97317 9.47495 5.67065 9.69474L3.76103 11.0822C3.08458 11.5736 2.1744 10.9124 2.43279 10.1171L3.16219 7.87225C3.27775 7.51661 3.15116 7.12701 2.84864 6.90722L0.939026 5.5198C0.262566 5.02833 0.610219 3.95836 1.44637 3.95836L3.80678 3.95836C4.18072 3.95836 4.51213 3.71757 4.62768 3.36194L5.35709 1.11705Z" fill="#A020F0" />
              </svg>  */}
                  <Star className="w-[14px] text-primary-light_blue" />
                  <span className="text-sm">{totalRating}</span>
                </div>
              }
            </div>
          </Link>

          <div
            className="flex pt-2 px-1 flex-col gap-3"
            style={{ flex: "1 1 0%" }}
          >
            <h4 className=" text-[12px] sm:text-base text-black font-normal ">
              {brand}
            </h4>

            <h3 className="text-[12px] sm:text-base text-neutral-black  font-medium line-clamp-2 min-h-[50px]">
              <Link href={`/product/${slug}`}> {name}</Link>
            </h3>

            <div className="price  flex items-center gap-1 justify-start">
              <div className="regular_price  text-primary text-base  font-medium">
                {main_price}
              </div>
              <div className="sale_price text-arival_var text-[12px] sm:text-sm relative  line-through ">
                {stroked_price}
              </div>
              {discount > 0 && (
                <div className="offer max-w-max  text-[12px] sm:text-[12px] ">
                  <span>
                    {discount}
                    {discount_text}{" "}
                  </span>
                </div>
              )}
            </div>
            <SingleAddToCart
              isShow={true}
              look={false}
              id={id}
              stocks={stocks}
              choice_options={choice_options}
              colors={colors}
              thumbnail_image={thumbnail_image}
              name={name}
              stroked_price={stroked_price}
              main_price={main_price}
              totalRating={totalRating}
              brand={brand}
              discount={discount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
