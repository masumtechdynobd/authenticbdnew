
import ArriVal from "@/app/ui/Arrival/Arrival";
import Offer from "@/app/ui/Offer/Offer";
import Trending from "@/app/ui/Trending/Trending";
import Concern from "@/app/ui/Concern/Concern";
import CustomerReview from "@/app/ui/CustomerReview/CustomerReview";
import ResonShop from "@/app/ui/ResonShop/ResonShop";
import Ingredients from "@/app/ui/Ingredients/Ingredients";
import Brand from "@/app/ui/Brand/Brand";
import Blog from "@/app/ui/Blog/Blog";
import BannerSliderWrapper from "@/app/ui/Banner/BannerSliderWrapper";
import CategoryWrapper from "@/app/ui/Category/CategoryWrapper";
import ShopByLook from "@/app/ui/ShopByLook/ShopByLook";
import FlashDeal from "@/app/ui/FlashDeal/FlashDeal";
import FooterSeo from "@/app/ui/FooterSeo/FooterSeo";



export default function Page() {

  return (
    <main className="">

      <BannerSliderWrapper />
      <CategoryWrapper />
      <ArriVal />
      <ResonShop />
      <Offer />
      <Trending />
      <Concern />
      <FlashDeal />
      <Ingredients />
      <Brand />
      <ShopByLook />
      <CustomerReview />
      {/* <Recommendation /> */}
      <Blog />

    <div className="hidden md:block">

      <FooterSeo />
    </div>

    </main>
  );
}
