"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import SearchInput from "./ui/custom/search-input";
import { CircleUser, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../store/auth";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(search);
  const { account } = useAuthStore();

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

  if (pathname.includes("auth")) return null;

  return (
    <header className="app-container pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-14">
          <Link href="/">
            <Image src={Logo} alt="Logo" className="mb-2" />
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/products">Shop</Link>
            <Link href="/sellers">Brands</Link>
            <Link href="/chats">Chats</Link>
            <p>{account?.user.first_name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mx-6">
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
