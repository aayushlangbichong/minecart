import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, User, MessageCircle } from "lucide-react";
import Layout from "@/components/layout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          </div>
        </header>

        {/* Contact Content */}
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
          {/* Contact Information */}
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Get In Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-700">Email</h3>
                  <p className="text-gray-600">support@minecart.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-700">Phone</h3>
                  <p className="text-gray-600">(+977) 9819213847</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="h-8 w-8 text-red-600" />
                <div>
                  <h3 className="font-semibold text-gray-700">Address</h3>
                  <p className="text-gray-600">Paanga Buspark,Kirtipur-5</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Embedded Map (Placeholder) */}
            <div className="mt-8 flex h-64 items-center justify-center rounded-lg bg-gray-200">
              <p className="text-gray-600">Google Maps Location</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative">
                  <label htmlFor="name" className="mb-2 block text-gray-700">
                    Full Name
                  </label>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-8">
                    <User className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="email" className="mb-2 block text-gray-700">
                    Email Address
                  </label>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-8">
                    <Mail className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative">
                  <label htmlFor="phone" className="mb-2 block text-gray-700">
                    Phone Number
                  </label>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-8">
                    <Phone className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="subject" className="mb-2 block text-gray-700">
                    Subject
                  </label>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-8">
                    <MessageCircle className="text-gray-400" size={20} />
                  </div>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Subject</option>
                    <option value="support">Customer Support</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="returns">Returns</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="message" className="mb-2 block text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message here..."
                  rows={5}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center space-x-2 rounded-md bg-blue-600 py-3 text-white transition hover:bg-blue-700"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
              Frequently Asked Questions
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                  How can I track my order?
                </h3>
                <p className="text-gray-600">
                  You can track your order by logging into your account and
                  visiting the 'Order Status' section.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                  What is your return policy?
                </h3>
                <p className="text-gray-600">
                  We offer returns within 30 days of purchase. Items must be
                  unused and in original packaging.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                  Do you ship internationally?
                </h3>
                <p className="text-gray-600">
                  Currently, we only ship within Nepal. International shipping
                  options are coming soon!
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                  How do I contact customer support?
                </h3>
                <p className="text-gray-600">
                  You can reach our support team via email, phone, or by filling
                  out the contact form on this page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
