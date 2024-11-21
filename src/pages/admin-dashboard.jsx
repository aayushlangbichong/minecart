import React from "react";
import {
  Package,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Box,
  Grid,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "@/components/admin-layout";

const AdminDashboard = () => {
  // Sample data for the chart
  const chartData = [
    { name: "Jan", orders: 65 },
    { name: "Feb", orders: 59 },
    { name: "Mar", orders: 80 },
    { name: "Apr", orders: 81 },
    { name: "May", orders: 56 },
    { name: "Jun", orders: 95 },
    { name: "Jul", orders: 88 },
  ];

  const orderStats = [
    {
      title: "Pending Orders",
      value: 45,
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      trend: "+12%",
      bgColor: "bg-orange-50",
    },
    {
      title: "To Ship",
      value: 32,
      icon: <Package className="h-8 w-8 text-orange-600" />,
      trend: "+8%",
      bgColor: "bg-orange-50",
    },
    {
      title: "Completed",
      value: 156,
      icon: <CheckCircle2 className="h-8 w-8 text-green-600" />,
      trend: "+23%",
      bgColor: "bg-green-50",
    },
    {
      title: "Cancelled",
      value: 12,
      icon: <XCircle className="h-8 w-8 text-red-600" />,
      trend: "-5%",
      bgColor: "bg-red-50",
    },
    {
      title: "Failed",
      value: 8,
      icon: <AlertCircle className="h-8 w-8 text-red-600" />,
      trend: "-2%",
      bgColor: "bg-red-50",
    },
  ];

  const inventoryStats = [
    {
      title: "Total Categories",
      value: 24,
      icon: <Grid className="h-8 w-8 text-orange-600" />,
      description: "Active product categories",
    },
    {
      title: "Total Products",
      value: 1452,
      icon: <Box className="h-8 w-8 text-orange-600" />,
      description: "Products in inventory",
    },
    {
      title: "Total Revenue",
      value: "Rs.45,234",
      icon: <DollarSign className="h-8 w-8 text-orange-600" />,
      description: "Last 30 days",
    },
    {
      title: "Active Users",
      value: 3240,
      icon: <Users className="h-8 w-8 text-orange-600" />,
      description: "Registered customers",
    },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">Welcome back, Admin</p>
          </div>

          {/* Order Statistics Grid */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {orderStats.map((stat) => (
              <Card
                key={stat.title}
                className="transition-shadow hover:shadow-lg"
              >
                <CardContent className={`${stat.bgColor} p-6`}>
                  <div className="flex items-start justify-between">
                    {stat.icon}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.trend}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart and Inventory Stats */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Orders Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="#ea580c"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Stats */}
            <div className="space-y-4">
              {inventoryStats.map((stat) => (
                <Card
                  key={stat.title}
                  className="transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-lg bg-orange-100 p-3">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-500">
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
