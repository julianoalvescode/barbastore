import { api } from "@/data/api";
import { Products } from "@/data/types/products";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

async function getFeaturedProducts(): Promise<Products[]> {
  const response = await api("/products/featured", {
    next: {
      revalidate: 60 * 60, // 1h
    },
  });

  const products = await response.json();

  return products;
}

export default async function Home() {
  const [hightlightedProduct, ...otherProducts] = await getFeaturedProducts();

  return (
    <>
      <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
        <Link
          href={`/product/${hightlightedProduct.slug}`}
          className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
        >
          <Image
            src={hightlightedProduct.image}
            width={920}
            height={920}
            alt={hightlightedProduct.description}
            quality={100}
            className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div
            className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5
          "
          >
            <span className="text-sm truncate">
              {hightlightedProduct.title}
            </span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {hightlightedProduct.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
        {otherProducts.map((product) => (
          <>
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
            >
              <Image
                src={product.image}
                width={920}
                height={920}
                alt={product.description}
                quality={100}
                className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <div
                className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5
          "
              >
                <span className="text-sm truncate">{product.title}</span>
                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
}
