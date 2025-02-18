"use client";
import { Button } from '@/app/ui/button';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { getCart } from '@/lib/cartApi';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import ProductOptions from '../ProductOptions';
import CustomImage from '../../CustomImage/CustomImage';
import { productStore } from '@/lib/hooks/useProductStore';
import { CartIcon } from '../../Icons/Icons';

export default function SingleAddToCart({
    isShow = true,
    color_variant = false,
    look,
    id,
    stocks,
    choice_options,
    colors, thumbnail_image,
    name, stroked_price, main_price, totalRating, brand, discount
}: any) {


    const { heading_title_value } = cookieStore();
    const addToCart = heading_title_value?.addToCart
    const { combinationName, setCombinationName, setOpenCart, selectColoreVariant, setPriceValue, price } = productStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [qty, setQty] = useState<number>(1);
    const [temp_user, setTemp_user] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to control the dialog
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null); // State to store selected variant
    const cookieValue = cookieStore((state) => state.cookieValue);
    const { setCartData, setTempUserId, temp_user_id, cartData, totalQuantity } = useCartStoreData((state) => ({
        setCartData: state.setCartData,
        setTempUserId: state.setTempUserId,
        cartData: state.cartData,
        totalQuantity: state.totalQuantity,
        temp_user_id: state.temp_user_id,
    }));

    const addToCartHandler = async () => {
        setLoading(true);
        const isLoggedIn = !!cookieValue?.user?.id;
        let team_id = null;
        if (!isLoggedIn && !temp_user_id) {
            team_id = setTempUserId();
            setTemp_user(team_id);
        }
        const userId = isLoggedIn ? cookieValue?.user?.id : team_id || temp_user_id;

        try {
            const cartDataPost = {
                id: id,
                quantity: qty,
                user_id: cookieValue?.user?.id || null,
                temp_user_id: userId || null,
            } as any;
            if (combinationName) {
                const exist = stocks.find((item: any) => item.variant == combinationName)
                if (exist) {

                    cartDataPost.variant = combinationName
                }
            }

            const response = await axios.post('/api/cart/add', cartDataPost);

            const data = response.data;
            const cartData: any = await getCart(userId);
            setCartData(cartData.data, cartData.totalQuantity);
            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
                setOpenCart(true)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    let findSelect = selectColoreVariant.find((item: any) => item.id === id)
    return (
        <>
            <div className="addToCart text-center flex items-center justify-center">
                {color_variant &&
                    <div onClick={() => setIsDialogOpen(!isDialogOpen)} className="flex grow pr-1.5 items-center justify-center">
                        <p className="text-sm font-semibold line-clamp-1">
                            {findSelect?.variant?.variant}
                        </p>
                        <ChevronDown />
                    </div>
                }
                {
                    isShow && <>

                        {!look && <>

                            {
                                stocks && stocks.length > 1 ?
                                    <Button className="w-full text-center font-normal justify-center rounded-[25px] py-[6px] sm:py-[10px] !text-[12px] uppercase bg-primary"
                                        disabled={loading}
                                        onClick={() => setIsDialogOpen(!isDialogOpen)}>
                                        {addToCart}  {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                                    </Button> :
                                    <Button className="w-full text-center font-normal justify-center rounded-[25px] py-[6px] sm:py-[10px] !text-[12px] uppercase bg-primary"
                                        disabled={loading}
                                        onClick={addToCartHandler}>
                                        {addToCart}  {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                                    </Button>

                            }</>

                        }

                        {
                            look && <>
                                {
                                    stocks && stocks.length > 1 ?
                                        <div onClick={() => setIsDialogOpen(!isDialogOpen)}><CartIcon /></div> :
                                        <div onClick={addToCartHandler}> <CartIcon /> </div>

                                }</>

                        }

                    </>
                }




            </div>

            {/* Dialog for variant selection */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className=" w-[96%] sm:max-w-[470px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg ">

                    <div className='w-full p-4'>
                        <div className="flex items-center justify-start gap-4 mb-4">
                            <div className="w-[100px] h-[100px]" >
                                <CustomImage width={80} height={80} src={thumbnail_image} alt="Product" className="w-[80px] h-[80px] object-cover rounded-md mr-4" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">{brand}</h2>
                                <p className="text-sm text-gray-600">{name}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-primary-500 text-lg font-semibold">{price} </span>
                                    <span className="text-gray-400 text-sm ml-2 line-through">{stroked_price}</span>
                                    <span className="text-green-500 text-sm ml-2">{discount}% off</span>
                                </div>
                            </div>
                        </div>
                        <ProductOptions id={id} choice_options={choice_options as []} colors={colors as []} stocks={stocks} />

                        <DialogFooter>
                            <div className='flex item justify-center w-full mt-3 '>
                                <Button className="  w-full text-center font-normal justify-center rounded-[25px] py-[6px] sm:py-[10px] !text-[12px] uppercase bg-primary"
                                    disabled={loading}
                                    onClick={addToCartHandler}>
                                    {addToCart}  {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                                </Button>
                            </div>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    );
}
