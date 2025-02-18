import React, { Suspense } from "react";
import Container from "../Container/Container";
import TranslateHeading from "../TranslateHeading";
import { API_BASE_URL, BASE_URL } from "@/app/config/api";
import { CollectionSkelton } from "../skeletons";
import Link from "next/link";
import Image from "next/image";

async function getFlashCollection(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/flash-deals-recommendation`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data.data as any;
}

export default async function FlashDeal() {
  const collection = await getFlashCollection();
  // console.log(collection)
  return (
    <section className="pb-[18px] md:pb-[70px]">
      <Container>
        <div className=" flex flex-col gap-6">
          <TranslateHeading translateKey={"authentic_recommendation"} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Suspense fallback={<CollectionSkelton />}>
              {collection.map((item: any) => (
                <div key={item.id}>
                  <Link href={`/recommendation/${item.slug}`}>
                    <div className="relative flex items-center  rounded-lg bg-pink-50">
                      <div className="flex-1">
                        <Image
                          width={250}
                          height={220}
                          src={`${BASE_URL}/public/${item.banner}`}
                          alt={item.title}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      <div className="absolute bottom-0 left-0 w-full py-2 px-4 bg-white bg-opacity-70 rounded-b-lg">
                        <h2 className=" text-sm lg:text-lg font-semibold text-gray-800">
                          {item.title}
                        </h2>
                        <p className="text-pink-600 text-sm lg:text-2xl font-bold ">
                          {item?.upto_discount}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}

// import ProductSlider from "@/app/ui/Product/ProductSlider";
// import { API_BASE_URL } from "@/app/config/api";

// async function getFlashCollection(): Promise<any> {
//   const response = await fetch(`${API_BASE_URL}/flash-deals-recommendation`, {
//     cache: "no-store",
//   });
//   if (!response.ok) {
//     return [];
//   }
//   const data: any = await response.json();
//   return data.data as any;
// }

// export default async function FlashDeal() {
//   const collection = await getFlashCollection();

//   return (
//     <ProductSlider
//       products={collection}
//       view_link="recommendation"
//       translateKey="authentic_recommendation"
//       slide_button={false}
//     />
//   );
// }
