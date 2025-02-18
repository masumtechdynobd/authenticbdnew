import { API_BASE_URL, BASE_URL } from "@/app/config/api";
import { ApiResponse, ProductDetails } from "@/types/api";
import Breadcrumb from "@/app/ui/Breadcrumb/Breadcrumb";
import Container from "@/app/ui/Container/Container";
import RatingSection from "@/app/ui/Product/DeteilsPage/CustomerReview/RatingSection";
import Description from "@/app/ui/Product/DeteilsPage/Description";
import GalleryImage from "@/app/ui/Product/DeteilsPage/GalleryImage/GalleryImage";
import SocialLink from "@/app/ui/Product/DeteilsPage/SocialLink";
import Summary from "@/app/ui/Product/DeteilsPage/Summary";
import Frequently from "@/app/ui/Product/Frequently";
import RecentlyProduct from "@/app/ui/Product/RecentlyProduct";
import SimilarProduct from "@/app/ui/Product/SimilarProduct";
import StarRating from "@/app/ui/StarRating/StarRating";

import type { Metadata, NextPage } from "next";
import AddToCartAction from "@/app/ui/Product/AddToCartAction/AddToCartAction";
import ProductOptions from "@/app/ui/Product/ProductOptions";
import Price from "@/app/ui/Product/Price/Price";
import Stock from "@/app/ui/Product/Stock/Stock";
import AddWishlist from "@/app/ui/Product/WishAdd/AddWishlist";
import BuyNow from "@/app/ui/Product/AddToCartAction/BuyNow";
import { Rate } from "antd";

const options = {
  loop: true,
  speed: 10,
};
interface PageProps {
  params: {
    slug: string;
  };
}
async function getProductDetails(slug: string): Promise<ProductDetails[]> {
  const response = await fetch(`${API_BASE_URL}/products/${slug}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    // throw new Error('Failed to fetch product details');
    return [];
  }
  const data: ApiResponse = await response.json();

  return data.data as any;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const product = await getProductDetails(params.slug);
  const productDetails = product[0];
  return {
    title: productDetails?.meta_title,
    description: productDetails?.meta_description,
    openGraph: {
      title: productDetails?.meta_title,
      description: productDetails?.meta_description,
      images: [
        {
          url: `${BASE_URL}/public/${productDetails?.meta_img}`,
          width: 800,
          height: 600,
          alt: `${productDetails?.meta_title} image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: productDetails?.meta_title,
      description: productDetails?.meta_description,
      images: [`${BASE_URL}/public/${productDetails?.meta_img}`],
    },
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { slug } = params;
  const product = (await getProductDetails(slug)) as any;

  if (!product || product.length === 0) {
    return <p>No product details found.</p>;
  }
  const productDetails = product[0];
  // await RecentView(productDetails.id || null)

  return (
    <section className="product_details">
      <Container>
        <Breadcrumb
          link={`/product/${productDetails?.slug}`}
          name={productDetails?.name}
        />
        <div className="product_content_area">
          <div className="product_content flex flex-col xl:grid grid-cols-2 gap-4 lg:gap-24  ">
            <div className="image_area col-span-1 aspect-[0] xl:aspect-[1.2/1]  ">
              <GalleryImage
                images={productDetails.photos}
                options={options}
                id={productDetails.id}
              />
            </div>
            <div className="product_info flex flex-col gap-4 md:gap-[25px] ">
              <div>
                <h4 className="brand_name text-neutral-black text-base  ">
                  {productDetails.brand.name}
                </h4>
                <h2 className="title  text-neutral-black font-semibold text-2xl ">
                  {productDetails.name}
                </h2>
              </div>

              {/* price section  */}
              <div className="price_area flex items-center gap-2 justify-between border-b-[2px] pb-4 border-neutral-black ">
                <div className="price flex items-center gap-2 justify-center">
                  <Price productDetails={productDetails} />
                  {productDetails.has_discount && (
                    <div className="offer max-w-max bg-accent-lightPink mx-auto rounded-[12px] px-[15px] py-[6px] text-[12px] ">
                      <span>
                        {productDetails.discount}
                        {productDetails?.discount_off_text}{" "}
                      </span>
                    </div>
                  )}
                </div>
                <div className="review text-center flex items-center justify-center">
                  <Rate
                    disabled
                    value={productDetails?.rating}
                    className="text-[#9F1FEF]"
                  />
                  <span className="text-sm">
                    ({productDetails.rating_count})
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-[10px] md:gap-[20px] ">
                {/* sort description  */}
                {productDetails?.short_description && (
                  <div className="short_des">
                    <div
                      className=" text-sm md:text-base text-neutral-black "
                      dangerouslySetInnerHTML={{
                        __html: productDetails?.short_description,
                      }}
                    />
                  </div>
                )}
                {/* Quantity  */}
                <AddToCartAction {...productDetails} />
                {/* stock  */}
                <ProductOptions
                  id={productDetails?.id}
                  choice_options={productDetails.choice_options}
                  colors={productDetails.colors}
                  stocks={productDetails.stocks}
                />
                
                <Stock productDetails={productDetails} />

                {/* Display SKU */}
                {/* {productDetails?.stocks?.length > 0 &&
                  productDetails.stocks[0]?.sku && (
                    <div className="product-sku">
                      <span>SKU: {productDetails.stocks[0].sku}</span>
                    </div>
                  )} */}

                <div className="button_area flex items-center gap-3 ">
                  <BuyNow id={productDetails.id} />
                  <AddWishlist id={productDetails.id} />
                </div>
                {/* share button start */}
                <SocialLink slug={productDetails.slug} />
                {/* share button end */}
              </div>

              <Summary {...productDetails} />
            </div>
          </div>
        </div>

        {/* product description  start  */}
        <Description data={productDetails} />
        {/* product description  end */}
        {/* customer review start */}
        <RatingSection {...productDetails} slugData={slug} />
        {/* customer review end */}
      </Container>
      {/* Frequently product  */}
      <Frequently id={productDetails.id} />
      {/* SimilarProduct product  */}
      <SimilarProduct id={productDetails.id} />
      {/* Recently product  */}
      <RecentlyProduct id={productDetails.id} />
    </section>
  );
};
export default Page;
