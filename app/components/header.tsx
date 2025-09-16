"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import SearchInput from "./ui/custom/search-input";
import { CircleUser, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  return (
    <header className="app-container pt-4">
      <div className="flex items-center justify-between">
        <Image src={Logo} alt="Logo" className="mb-2" />

        <SearchInput
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleChange}
        />

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
