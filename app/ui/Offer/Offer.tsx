import Image from "next/image";
import React from "react";
import { getOffer } from "@/lib/apiData";
import { BASE_URL } from "@/app/config/api";
import Link from "next/link";
import TranslateHeading from "../TranslateHeading";
export default async function Offer() {
  const brands = await getOffer();
  return (
    <div className="container pb-[18px] md:pb-[70px] mx-auto px-4 sm:px-2 md:px-4 lg:px-6 xl:px-8 ">
      <div className="offer  flex flex-col gap-6 ">
        <TranslateHeading translateKey="special_offers" />
        <div className="offer_item grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 ">
          {brands?.data?.map((item: any) => (
            <Link href={`/flash-deal/${item.slug}`} key={item.id}>
              <div className="offer_item">
                <Image
                  src={`${BASE_URL}/public/${item.banner}`}
                  width={365}
                  height={220}
                  alt="offer"
                  className="object-contain transition-transform duration-300 ease-in-out transform rounded-lg"
                />
                <h3 className="mt-2 text-lg font-semibold text-center text-neutral-black">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// import ProductSlider from "@/app/ui/Product/ProductSlider";
// import { getOffer } from "@/lib/apiData";

// export default async function Offer() {
//   const result = await getOffer();
//   const brands = result.data as any;

//   return (
//     <ProductSlider
//       products={brands}
//       view_link="flash-deal"
//       translateKey={"special_offers"}
//       slide_button={false}
//     />
//   );
// }
