"use client";
import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ImageButton } from "./ImageButton";
import "./Gallery.css";
import CustomImage from "@/app/ui/CustomImage/CustomImage";
import { DotButton } from "@/app/ui/Banner/EmblaCarouselDotButton";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { productStore } from "@/lib/hooks/useProductStore";

type Image = {
  variant?: string;
  path?: string;
};

type PropType = {
  id?: number;
  images?: any[];
  options?: EmblaOptionsType;
  handleOptionChange?: (title: string, value: any) => void;
  handleColorChange?: (color: any) => void;
  setSelectedColorId?: (id: number) => void;
  colors?: any[]; // Also pass colors array
};

const GalleryImage: React.FC<PropType> = (props) => {
  const { combinationImage } = productStore();
  const { setResetProduct, resetProduct } = useCartStoreData();
  const { images, options, id, handleOptionChange, handleColorChange, setSelectedColorId, colors = [] } = props;

  const [selectedIndex, setSelectedIndex] = useState(combinationImage || 0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "y", // Vertical axis for thumbnail slider
  });

  useEffect(() => {
    setResetProduct(id);
  }, [id, setResetProduct]);

  const onThumbClick = (index: number) => {
    if (!emblaMainApi) return;

    emblaMainApi.scrollTo(index);
    setSelectedIndex(index);

    const selectedImage = images[index];

    // Auto-select color if applicable
    if (selectedImage.color_id && colors && setSelectedColorId && handleColorChange) {
      const color = colors.find(c => c.id === selectedImage.color_id);
      if (color) {
        setSelectedColorId(color.id);
        handleColorChange(color);
      }
    }

    // Auto-select variant option (e.g., Weight)
    if (selectedImage.weight && handleOptionChange) {
      handleOptionChange("Weight", selectedImage.weight);
    }
  };

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    const index = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(index);

    const selectedThumb = emblaThumbsApi.slideNodes()[index] as HTMLElement;
    const thumbsViewport = emblaThumbsApi.rootNode() as HTMLElement;

    if (selectedThumb && thumbsViewport) {
      const thumbHeight = selectedThumb.offsetHeight;
      const viewportHeight = thumbsViewport.offsetHeight;
      const thumbOffsetTop = selectedThumb.offsetTop;

      const scrollPosition =
        thumbOffsetTop - viewportHeight / 2 + thumbHeight / 2;

      emblaThumbsApi.scrollTo(index, false);
      emblaThumbsApi.containerNode().scrollTop = scrollPosition;
    }
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    if (emblaMainApi && combinationImage !== null && combinationImage !== undefined) {
      emblaMainApi.scrollTo(combinationImage); // Scroll to the specified image index
      setSelectedIndex(combinationImage); // Update the selected index state
    }
  }, [combinationImage, emblaMainApi]);


  return (
    // <div className="gallery relative gap-[15px] flex h-[400px] lg:h-[550px]">
    //   {/* <div className="hidden md:block gallery-thumbs side_image w-[100px] lg:w-[135px] xl:w-[100px] h-[calc(100vh-3rem)]">
    //     <div className="gallery-thumbs__viewport" ref={emblaThumbsRef}>
    //       <div className="gallery-thumbs__container !h-[395px] lg:w-[520px]">
    //         {(images ?? []).map((image: any, index: any) => (
    //           <ImageButton
    //             key={index}
    //             onClick={() => onThumbClick(index)}
    //             selected={index === selectedIndex}
    //             index={index}
    //             image={image}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   </div> */}
    //   <div className="gallery__viewport main_image flex-1" ref={emblaMainRef}>
    //     <div className="gallery__container">
    //       {(images ?? []).map((image: any, index: any) => (
    //         <div className="gallery__slide" key={index + 122}>
    //           <CustomImage
    //             src={image.path}
    //             width={520}
    //             height={520}
    //             alt={`Slide ${index}`}
    //             className="!rounded-lg w-full aspect-square"
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="embla__controls bottom-[20px] lg:hidden">
    //     <div className="embla__dots">
    //       {(images ?? []).map((_: any, index: any) => (
    //         <DotButton
    //           key={index}
    //           onClick={() => onThumbClick(index)}
    //           className={"embla__dot".concat(
    //             index === selectedIndex ? " embla__dot--selected" : ""
    //           )}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <div className="gallery flex flex-col w-full gap-4">
    {/* Main image viewer */}
    <div className="w-full lg:w-[100%]">
      <div className="gallery__viewport" ref={emblaMainRef}>
        <div className="gallery__container">
          {(images ?? []).map((image: any, index: any) => (
            <div className="gallery__slide flex justify-center" key={index}>
              <CustomImage
                src={image.path}
                width={520}
                height={520}
                alt={`Slide ${index}`}
                className="rounded-xl w-full aspect-square object-contain border"
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Thumbnails - horizontal on all devices */}
    <div className="flex flex-row gap-3 justify-center items-center w-full overflow-x-auto">
      {(images ?? []).map((image: any, index: any) => (
        <button
          key={index}
          onClick={() => onThumbClick(index)}
          className={`border-2 rounded-md overflow-hidden transition-all ${
            selectedIndex === index ? "border-accent" : "border-transparent"
          }`}
        >
          <CustomImage
            src={image.path}
            width={80}
            height={80}
            alt={`Thumb ${index}`}
            className="object-cover w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]"
          />
        </button>
      ))}
    </div>

  </div>

  );
};

export default GalleryImage;
