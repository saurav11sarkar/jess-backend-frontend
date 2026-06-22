// src/components/home/categories.tsx
"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────
interface Category {
  image: string;
  _id: string;
  name: string;
  findCareUser: string[];
  findJobUser: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  image: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Category[];
}

// ─── Fetch Function ───────────────────────────────────────────────────────
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  const json: ApiResponse = await response.json();

  if (!json.success || !Array.isArray(json.data)) {
    throw new Error(json.message || "Invalid API response format");
  }

  return json.data;
};

// ─── Skeleton ─────────────────────────────────────────────────────────────
const CategorySkeleton = () => (
  <div className="shadow-[0_4px_24px_#0000003D] rounded-xl bg-white animate-pulse overflow-hidden">
    <div className="relative w-full aspect-[4/3] bg-gray-200" />
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 bg-gray-300 rounded" />
        <div className="h-5 w-5 bg-gray-300 rounded-full" />
      </div>
    </div>
  </div>
);

export default function Categories() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const router = useRouter();

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  const handleCategoryClick = (categoryId: string) => {
    if (!session) {
      router.push("/login");
      return;
    }
    if (role === "find care") {
      router.push(`/all-find-jobs?id=${categoryId}`);
    } else if (role === "find job") {
      router.push(`/all-find-care?id=${categoryId}`);
    }
  };

  return (
    <section id="categories">
      <div className="container mx-auto space-y-10  px-4 md:px-6 lg:px-8">
        <div>
          <h1 className="text-center text-3xl md:text-4xl font-bold tracking-tight lg:max-w-3xl mx-auto opacity-85">
            More than a booking. Real peace of mind.
          </h1>
          <p className="lg:max-w-4xl mx-auto text-md opacity-60 text-center mt-2">
            JetSet Cares was built for families who need trusted childcare in
            places that are not always fully familiar. We focus on safety,
            reliability, professionalism, and the kind of confidence parents
            need when they are traveling, relocating, living abroad, or staying
            in hotels across Asia
          </p>
        </div>

        {error && (
          <div className="text-center text-red-600 py-8">
            Failed to load categories: {error.message}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 lg:gap-8 max-w-[1400px] mx-auto">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <CategorySkeleton key={i} />
            ))
          ) : categories.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No categories available at the moment.
            </div>
          ) : (
            categories.map((cat) => (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => handleCategoryClick(cat._id)}
                  className="group text-left shadow-[0_4px_24px_rgba(0,0,0,0.15)] rounded-xl transition-all duration-200 bg-white border hover:scale-[1.02] hover:shadow-xl hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary border-gray-100 relative overflow-hidden flex flex-col"
                >
                  {/* Image Container - Fixed aspect ratio */}
                  <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <Image
                      src={cat?.image}
                      alt={`${cat.name} category`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                      priority={false}
                    />
                  </div>

                  {/* Content - Fixed height for consistency */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base font-semibold transition-colors line-clamp-1 text-gray-900 group-hover:text-primary">
                        {cat.name}
                      </span>
                      <MoveRight className="w-4 h-4 transition-all flex-shrink-0 text-gray-500 group-hover:text-primary group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              ))
          )}

        </div>
      </div>
    </section>
  );
}
