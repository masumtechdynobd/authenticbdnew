"use client"
import { productStore } from '@/lib/hooks/useProductStore';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface ChoiceOption {
    name: string;
    title: string;
    options: string[];
}

interface ColorOption {
    id: number;
    name: string;
    code: string;
}

interface ProductOptionsProps {
    id: number;
    choice_options?: ChoiceOption[];
    colors?: ColorOption[];
    stocks?: [];
}
interface ChoiceOption {
    title: string;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ id, choice_options, colors, stocks }: any) => {
    const { sku, setSku, setQty, setPriceValue, combinationName,combinationImage, setCombinationName,setCombinationImage, selectColoreVariant, setSelectColoreVariant } = productStore();
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
    const [selectedColor, setSelectedColor] = useState('');
    const [combination, setCombination] = useState('');
    const [combinationId, setCombinationId] = useState('');
    const [selectedColorId, setSelectedColorId] = useState('');

    const existProduct = () => {
        const exist = selectColoreVariant.find((item: any) => item.id === id)
        return exist;
    }
    useEffect(() => {
        if (colors && colors.length > 0) {
            setSelectedColor(colors[0].name);
            setSelectedColorId(colors[0].id)
        }
        if (choice_options && choice_options.length > 0) {
            const defaultSelected: { [key: string]: string } = {};
            choice_options.forEach((option: any) => {
                if (option.options.length > 0) {
                    defaultSelected[option.title] = option.options[0];
                }
            });
            setSelectedOptions(defaultSelected);

        }
        if (selectColoreVariant.length === 0) {
            setSelectColoreVariant({
                id: id,
                color: colors[0],
                variant: stocks[0]
            })
        }
    }, [choice_options, colors]);

    useEffect(() => {
        const optionCombination = choice_options && choice_options.map((option: ChoiceOption) => selectedOptions[option.title]).filter(Boolean).join('-');
        const stringWithoutSpaces = optionCombination.replace(/\s+/g, "");
        if (optionCombination) {
            
            const combination_name = `${selectedColor ? selectedColor + '-' : ''}${stringWithoutSpaces}`
            setCombination(combination_name);
            setCombinationName(combination_name)
        } else {
            const combination_name = `${selectedColor ? selectedColor : ''}${stringWithoutSpaces}`
            setCombination(combination_name);
            setCombinationName(combination_name)
        }
    }, [selectedOptions, selectedColor]);


    const handleOptionChange = (title: string, option: string) => {
        setSelectedOptions((prevSelected) => ({
            ...prevSelected,
            [title]: option,
        }));
    };
    const handleColorChange = (color: any) => {
        setSelectedColor(color?.name);
        const exist = selectColoreVariant.find((item: any) => item?.color?.name === color?.name)
        if (exist) {
            setSelectColoreVariant({
                ...exist,
            })
        } else {
            setSelectColoreVariant({
                ...exist,
                id: id,
                color: color,
            })
        }

    };

    useEffect(() => {
        if (combination) {
            const variantPrice = stocks && stocks.find((item: any) => item.id === combination) as any
            const variantIndex = stocks?.findIndex((item: any) => item.variant === combination);
                setCombinationImage(variantIndex)

            if (variantPrice) {
                setPriceValue(variantPrice.price);
                setQty(variantPrice.qty);
                setSku(variantPrice.sku);
                setCombinationName(combination)
            }
            const exist = existProduct()
            if (exist) {
                setSelectColoreVariant({
                    ...exist,
                    variant: variantPrice

                })
            } else {
                setSelectColoreVariant({
                    id: id,
                    variant: variantPrice

                })
            }



        }
    }, [combination])


    useEffect(() => {
        if (combination) {
            handleSize()
        }
    }, [combination])

    const handleSize = async () => {
        if (combination) {
            try {
                const response: any = await axios.post(
                    `/api/variant`, {
                    id: id,
                    variants: combination
                });
                // return false
                if (response.data) {
                    setSku(response.data.sku);
                    setCombinationId(response.data.id)
                    setPriceValue(response.data.price_string);
                    setQty(response.data.stock);
                    setCombinationName(response.data.variant)
                    
                }

            } catch (error) {
                console.log(error)
            }


        }
    }

    return (
        <div>
            {choice_options && choice_options.length > 0 && choice_options.map((option: any) => (
                <div key={option.name} className='flex item justify-start   gap-2' >
                    <h4>{option.title}:</h4>
                    <div className='flex shrink-0 gap-1.5 md:px-4 items-center overflow-auto w-full flex-wrap'>
                        {option.options.map((item: any, index: any) => (
                            <div
                                key={index}
                                onClick={() => handleOptionChange(option.title, item)}
                                role="button" title="Size Selector Item" className={`${selectedOptions[option.title] === item ? 'bg-primary text-white' : ''} flex border rounded-full px-4 py-1.5 items-center`} >
                                <p className="text-[12px] font-semibold" >{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {colors && colors.length > 0 && (
                <div className='flex items-center justify-start mt-4 gap-3'>
                    <h4>Color:</h4>
                    <div className='flex gap-2 flex-wrap'>
                        {colors.map((color: any, index: any) => (
                            <div key={index} onClick={() => {
                                setSelectedColorId(color.id)
                                handleColorChange(color)
                            }} className='cursor-pointer' >

                                <div className={`flex gap-1  rounded-full items-center w-full ${selectColoreVariant.some((item: any) => item?.color?.id === color?.id && id === item.id)
                                    ? 'border-2 border-primary'
                                    : 'border border-gray-300'
                                    } `}>
                                    <div className="border rounded-full m-1"><div className="rounded-full overflow-hidden w-[16px] h-[16px]" style={{ backgroundColor: color.code }}></div>
                                    </div>
                                    {
                                        selectColoreVariant.some((item: any) => item?.color?.id === color?.id && id === item.id) &&
                                        <div className="addToCart text-center flex items-center justify-center">
                                            <div className="flex grow pr-1.5 items-center justify-center">
                                                <p className="text-sm font-semibold line-clamp-1">{color?.name}</p>
                                            </div>
                                        </div>
                                    }

                                </div>



                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductOptions;

