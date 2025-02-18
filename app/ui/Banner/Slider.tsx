"use client"
import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Card, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { Slider } from '@/types/api'
import { BASE_URL } from '@/app/config/api'
import Link from 'next/link'

type PropType = {
  banners: Slider[]
  options?: EmblaOptionsType
}

const BannerSlider: React.FC<PropType> = (props) => {
  const { banners, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop
    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  return (
    <section className="embla pb-4 md:pb-[70px] pt-[15px] md:pt-[30px] px-2 lg:px-4 ">
      <div className="embla__viewport w-full aspect-[2.64/1] rounded-lg overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {banners.map((banner, index) => (
            <div className="embla__slide" key={index}>
              <Card className="w-full h-full">
                <CardContent className="flex items-center justify-center p-0 w-full h-full">
                  <AspectRatio ratio={2.64}>
                    <Link href={banner?.link as any}>
                      <Image
                        src={`${banner.photo !== "" ? BASE_URL + '/public/' + banner.photo : '/slider/1.webp'}`}
                        alt={`Banner ${index + 1}`}
                        width={1470}
                        height={555}
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                        loading="lazy"
                      />
                    </Link>
                  </AspectRatio>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BannerSlider