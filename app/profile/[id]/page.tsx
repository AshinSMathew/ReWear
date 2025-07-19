"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Leaf, MapPin, Calendar, Package, ArrowUpDown, MessageCircle, Edit } from 'lucide-react'

interface UserProfile {
  id: number
  name: string
  email: string
  location: string
  joinedAt: string
  pointsBalance: number
  isAdmin: boolean
  stats: {
    itemsListed: number
    successfulSwaps: number
  }
}

interface UserItem {
  id: number
  title: string
  imageUrl: string
  category: string
  condition: string
  pointsValue: number
  status: string
  createdAt: string
}

export default function UserProfile() {
  const params = useParams()
  const userId = params.id as string

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [userItems, setUserItems] = useState<UserItem[]>([])
  const [activeTab, setActiveTab] = useState("items")

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/profile/${userId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch user profile")
      }

      const data = await response.json()
      setProfile(data.profile)
      setUserItems(data.items)
    } catch (error) {
      console.error("Error fetching user profile:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchUserProfile()
    }
  }, [userId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "swapped":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-800 mb-2">User Not Found</h1>
          <p className="text-green-600 mb-4">The user profile you're looking for doesn't exist.</p>
          <Link href="/browse">
            <Button className="bg-green-600 hover:bg-green-700">Browse Items</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-green-800">ReWear</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50">
              <Link href="/browse" className="text-green-700 hover:text-green-800 font-medium">
                Browse Items
              </Link>
            </Button>
            <Button
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50">
              <Link href="/dashboard" className="text-green-700 hover:text-green-800 font-medium">
                Dashboard
              </Link>
            </Button>
            <Link href={`/messages/new?user=${profile.name}`}>
              <Button className="bg-green-600 hover:bg-green-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="border-green-200 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="bg-green-100 text-green-700 text-4xl">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-green-800 mb-2">{profile.name}</h1>
                    {profile.isAdmin && (
                      <Badge className="bg-purple-100 text-purple-800 mb-2">Admin</Badge>
                    )}
                    <div className="flex items-center gap-4 text-green-600 mb-2">
                      {profile.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {formatDate(profile.joinedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-800">{profile.pointsBalance}</div>
                    <div className="text-sm text-green-600">Points</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-800">{profile.stats.itemsListed}</div>
                    <div className="text-sm text-green-600">Items Listed</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-800">{profile.stats.successfulSwaps}</div>
                    <div className="text-sm text-green-600">Successful Swaps</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-green-100">
            <TabsTrigger value="items" className="data-[state=active]:bg-white">
              Items ({userItems.length})
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-white">
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow border-green-100">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className={`absolute top-2 right-2 ${getStatusColor(item.status)}`}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {item.category}
                        </Badge>
                        <div className="text-sm text-gray-600">{item.condition}</div>
                      </div>
                      <h3 className="font-semibold text-green-800 mb-2">{item.title}</h3>
                      <div className="text-sm text-green-600 mb-3">
                        <span>{item.pointsValue} points</span>
                      </div>
                      <Link href={`/item/${item.id}`}>
                        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {userItems.length === 0 && (
              <div className="text-center py-8 text-green-600">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No items listed yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Listed a new item</p>
                      <p className="text-sm text-green-600">Recently</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <ArrowUpDown className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Completed a swap</p>
                      <p className="text-sm text-green-600">Recently</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}