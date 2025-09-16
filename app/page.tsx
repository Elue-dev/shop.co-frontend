"use client";

import Hero from "./components/hero";
import DressStyles from "./components/products/dress-styles";
import NewArrivals from "./components/products/new-arrivals";
import TopSelling from "./components/products/top-selling";

export default function Home() {
  return (
    <section>
      <Hero />
      <NewArrivals />
      <DressStyles />
      <TopSelling />
    </section>
  );
}
