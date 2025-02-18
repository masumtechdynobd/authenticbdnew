import Heading from '@/app/ui/Section/Heading';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ProductItem from '@/app/ui/Product/ProductItem';
import CustomLink from '@/app/ui/CustomLink';
import clsx from 'clsx';
import { Product } from '@/types/api';
import ViewAll from './ViewAll/ViewAll';
import TranslateHeading from '../TranslateHeading';


type Props = {
    children?: React.ReactNode;
    products?: Product[];
    title?: string;
    sub_title?: string;
    view_link?: string;
    className?: string;
    ContainerClassName?: string;
    translateKey?: string;
    view_all_button?: boolean;
    slide_button?: boolean;
};

export default function ProductSlider({
    products = [],
    view_link = "/",
    title = "",
    sub_title = "",
    className,
    ContainerClassName,
    translateKey,
    view_all_button = true,
    slide_button = true
}: Props) {

    return (
        <div className={clsx("container pb-[18px] md:pb-[66px] mx-auto px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8", ContainerClassName)}>
            <div className={clsx('arrival_section bg-arival flex flex-col gap-[15px] sm:gap-6 py-[20px] md:py-[37px] px-[0px] sm:px-4 rounded-[26px]', className)}>
                <TranslateHeading translateKey={translateKey} />
                <Carousel
                    opts={{
                        align: 'center',
                    }}
                    className="w-full"
                >
                    <CarouselContent className='ml-0'>
                        {products.map((product, index) => (
                            <CarouselItem key={index} className="pl-0 lg:pl-2 basis-[50%] md:basis-[40%]  lg:basis-1/3 xl:basis-1/4">
                                <ProductItem {...product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {
                        slide_button && <>
                            <CarouselPrevious className="left-[0px] sm:left-[-17px]" />
                            <CarouselNext className="right-[-0px] sm:right-[-17px]" /></>

                    }

                </Carousel>
                {
                    view_all_button &&

                    <div className="view_all flex justify-center items-center">
                        <CustomLink href={view_link} className="text-neutral-black">
                            <ViewAll />
                        </CustomLink>
                    </div>
                }
            </div>
        </div>
    );
}
