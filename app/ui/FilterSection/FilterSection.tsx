"use client";
import React, { useEffect, useState } from "react";
import { Filter, Minus, Plus, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import PriceFilter from "./PriceFilter";
import { productStore } from "@/lib/hooks/useProductStore";

const FilterSection = ({
  title,
  items = [],
  expanded,
  onToggle,
  onFilterChange,
  selectedFilters,
  minPrice,
  maxPrice
}: any) => {
  return (
    <div className="mb-4">
      <button
        className={`flex justify-between items-center w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200  ${expanded ? 'bg-blue_light text-primary ' : 'bg-filter_light'} `}
        onClick={onToggle}
      >
        <span className="font-medium">{title}</span>
        {expanded ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      {expanded && (
        <div className="mt-2 pl-4">
          {items.map((item: any, index: any) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`${title}-${index}`}
                className="mr-2"
                checked={selectedFilters.includes(item.id)}
                onChange={() => onFilterChange(item.id)}
              />
              <label htmlFor={`${title}-${index}`} className="text-sm">
                {item.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterSidebar = ({ discount_data, translate_data, brand_id, category_id, minPrice, maxPrice, subcategories, filter_categories, filter_brand, attributes = [] }: any) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { setSidebarOpen, isSidebarOpen } = productStore();
  // Parse the `categories` and `subCategory` search params to get default selected values
  const defaultSelectedCategories = searchParams
    .get("categories")
    ?.split(",")
    .map(Number) || [];


  const defaultSelectedBrands = searchParams
    .get("brands")
    ?.split(",")
    .map(Number) || [];
  const defaultSelectedDiscount = searchParams
    .get("discount")
    ?.split(",")
    .map(Number) || [];

  const defaultSelectedAttributeValues =
    searchParams.get("attribute_values")?.split(",") || [];

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    subCategories: true,
    discount: true,
    brands: true,
    price: true,
    attributes: {} as { [key: number]: boolean },
  });

  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    defaultSelectedCategories
  );

  const [selectedBrands, setSelectedBrands] = useState<number[]>(
    defaultSelectedBrands || []
  );
  const [selectedDiscount, setSelectedDiscount] = useState<number[]>(
    defaultSelectedDiscount
  );

  const [attribute_values, setSelectedAttribute_values] = useState<string[]>(
    defaultSelectedAttributeValues
  );

  const toggleSection = (section: string | number, isAttribute: boolean = false) => {
    setExpandedSections((prev: any) => {
      if (isAttribute) {
        return {
          ...prev,
          attributes: {
            ...prev.attributes,
            [section]: !prev.attributes[section],
          },
        };
      }
      return {
        ...prev,
        [section]: !prev[section],
      };
    });
  };

  const handleFilterChange = useDebouncedCallback(
    (filterType: string, selectedFilters: number[]) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (filterType === "categories") {
        if (selectedFilters.length > 0) {
          params.set("categories", selectedFilters.join(","));
        } else {
          params.delete("categories");
        }
      }

      if (filterType === "subCategories") {
        if (selectedFilters.length > 0) {
          params.set("subCategory", selectedFilters.join(","));
        } else {
          params.delete("subCategory");
        }
      }
      if (filterType === "brands") {
        if (selectedFilters.length > 0) {
          params.set("brands", selectedFilters.join(","));
        } else {
          params.delete("brands");
        }
      }
      if (filterType === "discount") {
        if (selectedFilters.length > 0) {
          params.set("discount", selectedFilters.join(","));
        } else {
          params.delete("discount");
        }
      }
      if (filterType === "attribute_values") {
        if (attribute_values.length > 0) {
          params.set("attribute_values", selectedFilters.join(","));
        } else {
          params.delete("attribute_values");
        }
      }
      replace(`${pathname}?${params.toString()}`);
    },
    100
  );


  useEffect(() => {
    if (category_id) {
      onCategoryChange(category_id)
    }
    if (brand_id) {
      onBrandsChange(brand_id)
    }
  }, [category_id, brand_id])



  const onCategoryChange = (categoryId: number) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updatedCategories);
    handleFilterChange("categories", updatedCategories);
  };

  // onBrandsChange
  const onBrandsChange = (value: number) => {
    const updatedBrands = selectedBrands.includes(value)
      ? selectedBrands.filter((id) => id !== value)
      : [...selectedBrands, value];
    setSelectedBrands(updatedBrands);
    handleFilterChange("brands", updatedBrands);
  };
  // onDiscountChange
  const onDiscountChange = (discountValue: number) => {
    const updatedDiscount = selectedDiscount.includes(discountValue)
      ? selectedDiscount.filter((id) => id !== discountValue)
      : [...selectedDiscount, discountValue];
    setSelectedDiscount(updatedDiscount);
    handleFilterChange("discount", updatedDiscount);
  };

  // onAttribute_valuesChange
  const onAttribute_valuesChange = (value: string) => {
    const updated = attribute_values.includes(value)
      ? attribute_values.filter((id) => id !== value)
      : [...attribute_values, value];
    setSelectedAttribute_values(updated);
    handleFilterChange("attribute_values", updated as any);
  };

  const categories = filter_categories.map((item: any) => ({
    name: item?.name,
    slug: item?.slug,
    id: item?.id,
  }));

  const brands = filter_brand.map((item: any) => ({
    name: item?.name,
    slug: item?.slug,
    id: item?.id,
  }));

  // Set all attributes to true by default
  // useEffect(() => {
  //   const initialAttributesState: { [key: number]: boolean } = {};
  //   attributes.forEach((_: any, index: number) => {
  //     initialAttributesState[index] = true;
  //   });
  //   setExpandedSections((prev) => ({
  //     ...prev,
  //     attributes: initialAttributesState,
  //   }));
  // }, [attributes]);


  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className=" xl:w-[300px]" >
      <div
        className={`aiz-filter-sidebar collapse-sidebar-wrap sidebar-xl sidebar-right z-[999999999] ${isSidebarOpen ? 'active' : ''} `}
      >

        <div className="overlay overlay-fixed dark c-pointer" onClick={toggleSidebar}> </div>
        <div className="collapse-sidebar c-scrollbar-light text-left">


          <div className="flex items-center pb-4 border-b-[1px] justify-between pt-2 xl:pt-0 pl-2 xl:pl-0 " >
            <div className="flex items-center " >
              <Filter size={20} className="mr-2" /> <span>{translate_data?.filter_by}</span>
            </div>
            <button className="xl:hidden flex items-center p-2" onClick={toggleSidebar}>
              <X size={20} className="mr-2" /> <span>{translate_data?.close}</span>
            </button>
          </div>
          <div className={` bg-white p-4 rounded-lg shadow-sm`}>

            <FilterSection
              title={`${translate_data.filter_by} ${translate_data.categories} `}
              items={categories}
              expanded={expandedSections.categories}
              onToggle={() => toggleSection("categories")}
              onFilterChange={onCategoryChange}
              selectedFilters={selectedCategories}
            />

            {

              !category_id && subcategories && <FilterSection
                title={`${translate_data.filter_by} ${translate_data.sub_categories}`}
                items={subcategories}
                expanded={expandedSections.subCategories}
                onToggle={() => toggleSection("subCategories")}
                onFilterChange={onCategoryChange}
                selectedFilters={selectedCategories}
              />
            }

            {
              attributes.map((parentItem: any, index: any) => (
                <FilterSection
                  key={index}
                  title={`Filter By ${parentItem?.name}`}
                  items={parentItem.attribute_values.map((item: any) => ({
                    id: item.value,
                    name: item.value,
                  }))}
                  expanded={expandedSections.attributes[index]}
                  onToggle={() => toggleSection(index, true)}
                  onFilterChange={onAttribute_valuesChange}
                  selectedFilters={attribute_values}
                />
              ))
            }


            <FilterSection
              title={`${translate_data.filter_by} ${translate_data.discount} `}
              items={discount_data}
              expanded={expandedSections.discount}
              onToggle={() => toggleSection("discount")}
              onFilterChange={onDiscountChange}
              selectedFilters={selectedDiscount}
            />
            {/* PriceFilter  */}
            <PriceFilter minPrice={minPrice} maxPrice={maxPrice} translate_data={translate_data} />
            <FilterSection
              title={`${translate_data.filter_by} ${translate_data.brand}`}
              items={brands}
              expanded={expandedSections.brands}
              onToggle={() => toggleSection("brands")}
              onFilterChange={onBrandsChange}
              selectedFilters={selectedBrands}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
