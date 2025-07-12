import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Plus, Star, Package, ArrowUpDown, CheckCircle, Clock, TrendingUp, Award } from "lucide-react"

export default function Dashboard() {
  const userItems = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      image: "/placeholder.svg?height=100&width=100",
      status: "Available",
      views: 24,
      likes: 8,
    },
    {
      id: 2,
      title: "Summer Floral Dress",
      image: "/placeholder.svg?height=100&width=100",
      status: "Pending Swap",
      views: 15,
      likes: 5,
    },
    {
      id: 3,
      title: "Designer Handbag",
      image: "/placeholder.svg?height=100&width=100",
      status: "Swapped",
      views: 32,
      likes: 12,
    },
  ]

  const ongoingSwaps = [
    {
      id: 1,
      itemTitle: "Blue Denim Jeans",
      partnerName: "Sarah M.",
      partnerAvatar: "/placeholder.svg?height=40&width=40",
      status: "Waiting for confirmation",
      date: "2 days ago",
    },
    {
      id: 2,
      itemTitle: "Wool Coat",
      partnerName: "Emma K.",
      partnerAvatar: "/placeholder.svg?height=40&width=40",
      status: "In transit",
      date: "1 week ago",
    },
  ]

  const completedSwaps = [
    {
      id: 1,
      itemTitle: "Silk Scarf",
      partnerName: "Lisa R.",
      partnerAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2 weeks ago",
    },
    {
      id: 2,
      itemTitle: "Running Shoes",
      partnerName: "Mike T.",
      partnerAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "1 month ago",
    },
  ]

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
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              List Item
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-green-100 text-green-700">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Welcome back, Jane!</h1>
          <p className="text-green-700">Here's what's happening with your sustainable fashion journey.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Points Balance</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">156</div>
              <p className="text-xs text-green-600">+12 from last week</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Items Listed</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">8</div>
              <p className="text-xs text-green-600">3 available</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Successful Swaps</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">12</div>
              <p className="text-xs text-green-600">4.8★ avg rating</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Impact Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">89</div>
              <Progress value={89} className="mt-2" />
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
                  <Button variant="outline" className="border-green-600 text-green-600 bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Item
                  </Button>
                </div>
                <div className="space-y-4">
                  {userItems.map((item) => (
                    <Card key={item.id} className="border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-green-800">{item.title}</h4>
                            <div className="flex items-center gap-4 mt-2 text-sm text-green-600">
                              <span>{item.views} views</span>
                              <span>{item.likes} likes</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                item.status === "Available"
                                  ? "default"
                                  : item.status === "Pending Swap"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={item.status === "Available" ? "bg-green-100 text-green-700" : ""}
                            >
                              {item.status}
                            </Badge>
                            <div className="mt-2">
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ongoing" className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">Ongoing Swaps</h3>
                <div className="space-y-4">
                  {ongoingSwaps.map((swap) => (
                    <Card key={swap.id} className="border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={swap.partnerAvatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-green-100 text-green-700">
                                {swap.partnerName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
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
                              {swap.status}
                            </Badge>
                            <p className="text-xs text-green-600">{swap.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">Completed Swaps</h3>
                <div className="space-y-4">
                  {completedSwaps.map((swap) => (
                    <Card key={swap.id} className="border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={swap.partnerAvatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-green-100 text-green-700">
                                {swap.partnerName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-green-800">{swap.itemTitle}</h4>
                              <p className="text-sm text-green-600">with {swap.partnerName}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < swap.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <p className="text-xs text-green-600">{swap.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
                    <AvatarFallback className="bg-green-100 text-green-700 text-lg">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-green-800">Jane Doe</h3>
                    <p className="text-sm text-green-600">Member since Jan 2024</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-green-700">4.8 (24 reviews)</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-green-600 text-green-600 bg-transparent">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Eco Warrior</p>
                    <p className="text-xs text-green-600">10 successful swaps</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Trusted Swapper</p>
                    <p className="text-xs text-green-600">4.5+ rating maintained</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  List New Item
                </Button>
                <Button variant="outline" className="w-full border-green-600 text-green-600 bg-transparent">
                  Browse Items
                </Button>
                <Button variant="outline" className="w-full border-green-600 text-green-600 bg-transparent">
                  View Messages
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
