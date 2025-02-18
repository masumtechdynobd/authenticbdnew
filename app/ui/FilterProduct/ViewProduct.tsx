import React from "react";
import ProductItem from "../Product/ProductItem";
import PaginationFilter from "./PaginationFilter";
import { API_BASE_URL } from "@/app/config/api";
import ProductNotFound from "../Product/ProductNotFound/ProductNotFound";

async function getProducts(
  apiUrl: string,
  page: number = 1,
  perPage: number = 20
): Promise<any> {
  console.log("currentPage", page);
  console.log("items per page", perPage);

  const url = new URL(`${API_BASE_URL}/${apiUrl}`);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("per_page", perPage.toString()); // Pass the perPage value to the API

  const response = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const data: any = await response.json();
  return data as any;
}

export default async function ViewProduct({ query }: any) {
  const { apiUrl, currentPage } = query;
  const perPage = 20; // Set this to a dynamic value based on user preference
  const result = await getProducts(apiUrl, currentPage, perPage);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 pt-4 lg:gap-2">
        {result?.data?.length > 0 &&
          result.data.map((item: any) => (
            <ProductItem {...item} key={item.id} />
          ))}
      </div>
      {result?.data?.length === 0 && (
        <div className="product_not_found">
          <ProductNotFound />
        </div>
      )}

      {result?.data?.length > 0 && <PaginationFilter meta={result.meta} />}
    </>
  );
}
