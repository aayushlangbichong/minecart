import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  GamepadIcon,
  Laptop,
  ShoppingBag,
} from "lucide-react";
import Layout from "@/components/layout";
import ProductsShowCase from "@/components/modules/products-showcase";
import PopularProductsShowCase from "@/components/modules/popular-products-showcase";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderData = [
    {
      id: 1,
      title: "Summer Sale",
      description: "Up to 50% off on selected items",
      image: "/api/placeholder/1200/400",
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest products",
      image: "/api/placeholder/1200/400",
    },
    {
      id: 3,
      title: "Free Shipping",
      description: "On orders above $50",
      image: "/api/placeholder/1200/400",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Gaming",
      icon: <GamepadIcon className="h-6 w-6" />,
      products: [
        {
          id: 1,
          name: "PlayStation 5",
          price: 499.99,
          image: "/api/placeholder/200/200",
        },
        {
          id: 2,
          name: "Xbox Series X",
          price: 499.99,
          image: "/api/placeholder/200/200",
        },
        {
          id: 3,
          name: "Nintendo Switch",
          price: 299.99,
          image: "/api/placeholder/200/200",
        },
      ],
    },
    {
      id: 2,
      name: "Electronics",
      icon: <Laptop className="h-6 w-6" />,
      products: [
        {
          id: 1,
          name: "MacBook Pro",
          price: 1299.99,
          image: "/api/placeholder/200/200",
        },
        {
          id: 2,
          name: "iPad Air",
          price: 599.99,
          image: "/api/placeholder/200/200",
        },
        {
          id: 3,
          name: "iPhone 15",
          price: 799.99,
          image: "/api/placeholder/200/200",
        },
      ],
    },
    {
      id: 3,
      name: "Groceries",
      icon: <ShoppingBag className="h-6 w-6" />,
      products: [
        {
          id: 1,
          name: "Fresh Fruits Pack",
          price: 29.99,
          image: "/api/placeholder/200/200",
        },
        {
          id: 2,
          name: "Organic Vegetables",
          price: 24.99,
          image: "/api/placeholder/200/200",
        },
        {
          id: 3,
          name: "Daily Essentials",
          price: 49.99,
          image: "/api/placeholder/200/200",
        },
      ],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData?.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData?.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderData?.length) % sliderData?.length,
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Slider */}
        <div className="relative h-96 overflow-hidden">
          <div className="relative h-full">
            {sliderData.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute h-full w-full transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="text-center text-white">
                    <h2 className="mb-4 text-4xl font-bold">{slide.title}</h2>
                    <p className="text-xl">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="container mx-auto my-20 grid gap-10">
          <PopularProductsShowCase />
          <ProductsShowCase category="gaming" heading="Latest Gaming Drops!!" />
          <ProductsShowCase category="groceries" heading="Fresh Groceries!!" />
          <ProductsShowCase
            category="cosmetics"
            heading="New Cosmetic Arrivals!!"
          />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
