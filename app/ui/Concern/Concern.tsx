
import { getShopByConcernCategory } from '@/lib/apiData';
import ConcernCategoryProduct from './ConcernCategoryProduct';
import TranslateHeading from '../TranslateHeading';

export default async function Concern() {
    const category = await getShopByConcernCategory();


    return (
        <div className="container pb-[18px] md:pb-[65px] mx-auto px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8 ">
            <div className='concern_section  flex flex-col gap-[15px] sm:gap-6   rounded-[26px]  bg-arival py-[20px] md:py-[37px] px-[0px] sm:px-4 ' >
                <TranslateHeading translateKey="shop_by_concern" />

                <ConcernCategoryProduct category={category} />
            </div>
        </div>
    )
}
