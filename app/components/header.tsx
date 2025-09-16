"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import SearchInput from "./ui/custom/search-input";
import { CircleUser, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(search);

  useEffect(() => {
    setSearchQuery("");
  }, [search]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  }

  return (
    <header className="app-container pt-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src={Logo} alt="Logo" className="mb-2" />
        </Link>
        <form onSubmit={handleSubmit} className="flex-1 mx-6">
          <SearchInput
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleChange}
          />
        </form>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <ShoppingCart />
          </Link>
          <Link href="/profile">
            <CircleUser />
          </Link>
        </div>
      </div>
    </header>
  );
}
