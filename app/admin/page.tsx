"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Leaf, Search, Check, X, Eye, AlertTriangle, Clock, CheckCircle, XCircle, Filter } from "lucide-react"

export default function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState("")

  const pendingItems = [
    {
      id: 1,
      title: "Designer Silk Blouse",
      image: "/placeholder.svg?height=100&width=100",
      uploader: "Emma Wilson",
      uploaderAvatar: "/placeholder.svg?height=40&width=40",
      category: "Tops",
      condition: "Excellent",
      submittedDate: "2 hours ago",
      estimatedPoints: 35,
    },
    {
      id: 2,
      title: "Vintage Leather Boots",
      image: "/placeholder.svg?height=100&width=100",
      uploader: "Michael Chen",
      uploaderAvatar: "/placeholder.svg?height=40&width=40",
      category: "Shoes",
      condition: "Good",
      submittedDate: "4 hours ago",
      estimatedPoints: 28,
    },
    {
      id: 3,
      title: "Summer Floral Dress",
      image: "/placeholder.svg?height=100&width=100",
      uploader: "Sarah Johnson",
      uploaderAvatar: "/placeholder.svg?height=40&width=40",
      category: "Dresses",
      condition: "Like New",
      submittedDate: "6 hours ago",
      estimatedPoints: 32,
    },
  ]

  const flaggedItems = [
    {
      id: 4,
      title: "Questionable Brand Bag",
      image: "/placeholder.svg?height=100&width=100",
      uploader: "Anonymous User",
      uploaderAvatar: "/placeholder.svg?height=40&width=40",
      reason: "Potential counterfeit",
      reportedBy: "Community",
      flaggedDate: "1 day ago",
    },
    {
      id: 5,
      title: "Inappropriate Content",
      image: "/placeholder.svg?height=100&width=100",
      uploader: "John Doe",
      uploaderAvatar: "/placeholder.svg?height=40&width=40",
      reason: "Spam listing",
      reportedBy: "Auto-detection",
      flaggedDate: "2 days ago",
    },
  ]

  const recentActions = [
    {
      id: 1,
      action: "Approved",
      itemTitle: "Vintage Denim Jacket",
      admin: "Admin User",
      timestamp: "10 minutes ago",
    },
    {
      id: 2,
      action: "Rejected",
      itemTitle: "Damaged Sneakers",
      admin: "Admin User",
      timestamp: "25 minutes ago",
    },
    {
      id: 3,
      action: "Removed",
      itemTitle: "Spam Listing",
      admin: "Admin User",
      timestamp: "1 hour ago",
    },
  ]

  const handleApprove = (itemId: number) => {
    console.log(`Approved item ${itemId}`)
    // In a real app, this would make an API call
  }

  const handleReject = (itemId: number) => {
    console.log(`Rejected item ${itemId}`)
    // In a real app, this would make an API call
  }

  const handleRemove = (itemId: number) => {
    console.log(`Removed item ${itemId}`)
    // In a real app, this would make an API call
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
            <span className="text-xl font-bold text-green-800">ReWear Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              Admin Panel
            </Badge>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-green-100 text-green-700">AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Pending Review</p>
                  <p className="text-2xl font-bold text-green-800">12</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Approved Today</p>
                  <p className="text-2xl font-bold text-green-800">28</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Flagged Items</p>
                  <p className="text-2xl font-bold text-green-800">5</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Rejected Today</p>
                  <p className="text-2xl font-bold text-green-800">3</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
            <Input
              placeholder="Search items, users, or reasons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-500"
            />
          </div>
          <Button variant="outline" className="border-green-600 text-green-600 bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-green-100">
            <TabsTrigger value="pending" className="data-[state=active]:bg-white">
              Pending Review ({pendingItems.length})
            </TabsTrigger>
            <TabsTrigger value="flagged" className="data-[state=active]:bg-white">
              Flagged Items ({flaggedItems.length})
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-white">
              Recent Actions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-green-800">Items Pending Review</h3>
              <p className="text-sm text-green-600">Review items submitted by users</p>
            </div>
            <div className="space-y-4">
              {pendingItems.map((item) => (
                <Card key={item.id} className="border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-green-800 text-lg">{item.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={item.uploaderAvatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                                  {item.uploader
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-green-600">{item.uploader}</span>
                            </div>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-700">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-green-600">Category:</span>
                            <p className="font-medium text-green-800">{item.category}</p>
                          </div>
                          <div>
                            <span className="text-green-600">Condition:</span>
                            <p className="font-medium text-green-800">{item.condition}</p>
                          </div>
                          <div>
                            <span className="text-green-600">Submitted:</span>
                            <p className="font-medium text-green-800">{item.submittedDate}</p>
                          </div>
                          <div>
                            <span className="text-green-600">Est. Points:</span>
                            <p className="font-medium text-green-800">{item.estimatedPoints}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-600 text-green-600 bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(item.id)}
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(item.id)}>
                            <X className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="flagged" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-green-800">Flagged Items</h3>
              <p className="text-sm text-green-600">Items reported by community or auto-detection</p>
            </div>
            <div className="space-y-4">
              {flaggedItems.map((item) => (
                <Card key={item.id} className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-red-800 text-lg">{item.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={item.uploaderAvatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-red-100 text-red-700 text-xs">
                                  {item.uploader
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-red-600">{item.uploader}</span>
                            </div>
                          </div>
                          <Badge className="bg-red-100 text-red-700">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Flagged
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-red-600">Reason:</span>
                            <p className="font-medium text-red-800">{item.reason}</p>
                          </div>
                          <div>
                            <span className="text-red-600">Reported by:</span>
                            <p className="font-medium text-red-800">{item.reportedBy}</p>
                          </div>
                          <div>
                            <span className="text-red-600">Flagged:</span>
                            <p className="font-medium text-red-800">{item.flaggedDate}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-600 text-green-600 bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Investigate
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Check className="w-4 h-4 mr-2" />
                            Clear Flag
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRemove(item.id)}>
                            <X className="w-4 h-4 mr-2" />
                            Remove Item
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-green-800">Recent Admin Actions</h3>
              <p className="text-sm text-green-600">Latest moderation activities</p>
            </div>
            <Card className="border-green-200">
              <CardContent className="p-0">
                <div className="divide-y divide-green-100">
                  {recentActions.map((action) => (
                    <div key={action.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            action.action === "Approved"
                              ? "bg-green-100"
                              : action.action === "Rejected"
                                ? "bg-red-100"
                                : "bg-gray-100"
                          }`}
                        >
                          {action.action === "Approved" && <Check className="w-4 h-4 text-green-600" />}
                          {action.action === "Rejected" && <X className="w-4 h-4 text-red-600" />}
                          {action.action === "Removed" && <AlertTriangle className="w-4 h-4 text-gray-600" />}
                        </div>
                        <div>
                          <p className="font-medium text-green-800">
                            <span
                              className={`${
                                action.action === "Approved"
                                  ? "text-green-600"
                                  : action.action === "Rejected"
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {action.action}
                            </span>{" "}
                            "{action.itemTitle}"
                          </p>
                          <p className="text-sm text-green-600">by {action.admin}</p>
                        </div>
                      </div>
                      <span className="text-sm text-green-600">{action.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
