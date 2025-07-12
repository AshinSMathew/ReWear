"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Plus, Package, ArrowUpDown, CheckCircle, Clock, TrendingUp, Award } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

interface DashboardData {
  user: {
    id: string;
    name: string;
    email: string;
    pointsBalance: number;
    memberSince: string;
  };
  stats: {
    pointsBalance: number;
    itemsListed: number;
    availableItems: number;
    completedSwaps: number;
  };
  items: Array<{
    id: string;
    title: string;
    status: string;
    createdAt: string;
    pointsValue: number;
  }>;
  ongoingSwaps: Array<{
    id: string;
    itemTitle: string;
    partnerName: string;
    status: string;
    createdAt: string;
  }>;
  completedSwaps: Array<{
    id: string;
    itemTitle: string;
    partnerName: string;
    completedAt: string;
  }>;
}

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-green-800">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <p className="mt-4 text-red-600">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-green-600 hover:bg-green-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-green-800">ReWear</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/add-item">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                List Item
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50"
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Link href="#">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-green-100 text-green-700">
                  {data.user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Welcome back, {data.user.name.split(' ')[0]}!
          </h1>
          <p className="text-green-700">
            Here's what's happening with your sustainable fashion journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Points Balance</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{data.stats.pointsBalance}</div>
              <p className="text-xs text-green-600">Available for swaps</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Items Listed</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{data.stats.itemsListed}</div>
              <p className="text-xs text-green-600">{data.stats.availableItems} available</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Successful Swaps</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{data.stats.completedSwaps}</div>
              <p className="text-xs text-green-600">Total completed swaps</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Impact Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">
                {Math.min(100, Math.floor(data.stats.completedSwaps * 5 + data.stats.itemsListed * 2))}
              </div>
              <Progress 
                value={Math.min(100, Math.floor(data.stats.completedSwaps * 5 + data.stats.itemsListed * 2))} 
                className="mt-2" 
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="items" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-green-100">
                <TabsTrigger value="items" className="data-[state=active]:bg-white">
                  My Items
                </TabsTrigger>
                <TabsTrigger value="ongoing" className="data-[state=active]:bg-white">
                  Ongoing Swaps
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-white">
                  Completed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="items" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-green-800">Your Listed Items</h3>
                  <Link href="/add-item">
                    <Button variant="outline" className="border-green-600 text-green-600 bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Item
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {data.items.length === 0 ? (
                    <Card className="border-green-200">
                      <CardContent className="p-8 text-center">
                        <Package className="mx-auto h-8 w-8 text-green-600" />
                        <h4 className="mt-4 font-medium text-green-800">No items listed yet</h4>
                        <p className="mt-2 text-sm text-green-600">
                          List your first item to start swapping
                        </p>
                        <Link href="/add-item">
                          <Button className="mt-4 bg-green-600 hover:bg-green-700">
                            List Your First Item
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ) : (
                    data.items.map((item) => (
                      <Card key={item.id} className="border-green-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Image
                              src="/placeholder.svg?height=100&width=100"
                              alt={item.title}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-green-800">{item.title}</h4>
                              <div className="mt-2 text-sm text-green-600">
                                {item.pointsValue} points • Listed {formatDate(item.createdAt)}
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge
                                variant={
                                  item.status === "available"
                                    ? "default"
                                    : item.status === "pending"
                                      ? "secondary"
                                      : "outline"
                                }
                                className={item.status === "available" ? "bg-green-100 text-green-700" : ""}
                              >
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              </Badge>
                              <div className="mt-2">
                                <Link href={`/items/${item.id}/edit`}>
                                  <Button size="sm" variant="outline">
                                    Edit
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="ongoing" className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">Ongoing Swaps</h3>
                <div className="space-y-4">
                  {data.ongoingSwaps.length === 0 ? (
                    <Card className="border-green-200">
                      <CardContent className="p-8 text-center">
                        <Clock className="mx-auto h-8 w-8 text-green-600" />
                        <h4 className="mt-4 font-medium text-green-800">No ongoing swaps</h4>
                        <p className="mt-2 text-sm text-green-600">
                          Start swapping to see your active exchanges here
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    data.ongoingSwaps.map((swap) => (
                      <Card key={swap.id} className="border-green-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                <AvatarFallback className="bg-green-100 text-green-700">
                                  {swap.partnerName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-green-800">{swap.itemTitle}</h4>
                                <p className="text-sm text-green-600">with {swap.partnerName}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="secondary" className="mb-2">
                                <Clock className="w-3 h-3 mr-1" />
                                {swap.status.split('_').map(word => 
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
                              </Badge>
                              <p className="text-xs text-green-600">
                                Started {formatDate(swap.createdAt)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">Completed Swaps</h3>
                <div className="space-y-4">
                  {data.completedSwaps.length === 0 ? (
                    <Card className="border-green-200">
                      <CardContent className="p-8 text-center">
                        <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
                        <h4 className="mt-4 font-medium text-green-800">No completed swaps yet</h4>
                        <p className="mt-2 text-sm text-green-600">
                          Your completed swaps will appear here
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    data.completedSwaps.map((swap) => (
                      <Card key={swap.id} className="border-green-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                <AvatarFallback className="bg-green-100 text-green-700">
                                  {swap.partnerName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-green-800">{swap.itemTitle}</h4>
                                <p className="text-sm text-green-600">with {swap.partnerName}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-green-600">
                                Completed {formatDate(swap.completedAt)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="bg-green-100 text-green-700 text-lg">
                      {data.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-green-800">{data.user.name}</h3>
                    <p className="text-sm text-green-600">
                      Member since {new Date(data.user.memberSince).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </p>
                  </div>
                </div>
                <Link href="#">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 bg-transparent">
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.stats.completedSwaps >= 10 && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Eco Warrior</p>
                      <p className="text-xs text-green-600">10+ successful swaps</p>
                    </div>
                  </div>
                )}
                {data.stats.itemsListed >= 5 && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Active Lister</p>
                      <p className="text-xs text-green-600">5+ items listed</p>
                    </div>
                  </div>
                )}
                {data.stats.itemsListed < 5 && data.stats.completedSwaps < 10 && (
                  <p className="text-sm text-green-600 text-center py-4">
                    Complete more swaps to unlock achievements
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/add-item">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    List New Item
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 bg-transparent">
                    Browse Items
                  </Button>
                </Link>
                <Link href="/messages">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 bg-transparent">
                    View Messages
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}