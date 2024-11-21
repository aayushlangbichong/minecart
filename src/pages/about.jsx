import React from "react";
import { ArrowRight, Globe, ShoppingBag, Users } from "lucide-react";
import Layout from "@/components/layout";

const AboutPage = () => {
  return (
    <Layout>
      {" "}
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-orange-600">
              Our Story
            </h1>
            <p className="mx-auto max-w-2xl text-gray-600">
              Founded with a passion for delivering exceptional products and
              unparalleled customer experience.
            </p>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <img
                src="https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg"
                alt="Company"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="mb-4 text-3xl font-semibold text-orange-700">
                Who We Are
              </h2>
              <p className="mb-4 text-gray-700">
                We are more than just an online store. We're a team dedicated to
                bringing you high-quality products that make your life easier,
                more beautiful, and more enjoyable.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Globe, text: "Global Reach, Local Touch" },
                  { icon: ShoppingBag, text: "Curated Product Selection" },
                  { icon: Users, text: "Customer-Centric Approach" },
                ].map(({ icon: Icon, text }, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon className="text-orange-500" size={24} />
                    <span className="text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-lg bg-orange-50 p-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-orange-600">
              Our Mission
            </h2>
            <p className="mx-auto max-w-3xl text-gray-700">
              To provide an unmatched shopping experience by offering premium
              products, exceptional customer service, and creating meaningful
              connections with our customers.
            </p>
            <button className="mx-auto mt-6 flex items-center rounded-lg bg-orange-600 px-6 py-3 text-white transition-colors hover:bg-orange-700">
              Learn More <ArrowRight className="ml-2" size={20} />
            </button>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { number: "5+", label: "Years in Business" },
              { number: "100K+", label: "Happy Customers" },
              { number: "500+", label: "Products Offered" },
            ].map(({ number, label }, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-5xl font-bold text-orange-600">
                  {number}
                </div>
                <div className="text-gray-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
