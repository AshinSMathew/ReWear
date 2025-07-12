"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Leaf, Search, Check, X, Eye, AlertTriangle, Clock, CheckCircle, XCircle, Filter, Loader2 } from "lucide-react"
import Link from "next/link"

interface AdminStats {
  pendingItems: number
  approvedToday: number
  flaggedItems: number
  rejectedToday: number
}

interface PendingItem {
  id: number
  title: string
  imageUrl: string
  uploader: string
  uploaderAvatar: string
  category: string
  condition: string
  createdAt: string
  pointsValue: number
}

interface FlaggedItem {
  id: number
  title: string
  imageUrl: string
  uploader: string
  uploaderAvatar: string
  reason: string
  reportedBy: string
  flaggedAt: string
}

interface RecentAction {
  id: number
  action: string
  itemTitle: string
  adminName: string
  createdAt: string
}

export default function AdminPanel() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("pending")
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)

  const [stats, setStats] = useState<AdminStats>({
    pendingItems: 0,
    approvedToday: 0,
    flaggedItems: 0,
    rejectedToday: 0,
  })
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([])
  const [flaggedItems, setFlaggedItems] = useState<FlaggedItem[]>([])
  const [recentActions, setRecentActions] = useState<RecentAction[]>([])

  const fetchData = async (status = "pending") => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin?status=${status}&limit=20&offset=0`)

      if (!response.ok) {
        throw new Error("Failed to fetch admin data")
      }

      const data = await response.json()

      setStats(data.stats)

      switch (status) {
        case "pending":
          setPendingItems(data.items)
          break
        case "flagged":
          setFlaggedItems(data.items)
          break
        case "recent":
          setRecentActions(data.items)
          break
      }
    } catch (error) {
      console.error("Error fetching admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (itemId: number, action: string) => {
    try {
      setActionLoading(itemId)

      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, action }),
      })

      if (!response.ok) {
        throw new Error("Failed to perform action")
      }

      await fetchData(activeTab)

      console.log(`${action} action completed successfully`)
    } catch (error) {
      console.error("Error performing action:", error)
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return "1 day ago"
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  useEffect(() => {
    fetchData(activeTab)
  }, [activeTab])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    fetchData(value)
  }
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
            <Button
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50">
              <Link href="/browse" className="text-green-700 hover:text-green-800 font-medium">
                Browse
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50"
              onClick={handleLogout}
            >Logout</Button>
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
                  <p className="text-2xl font-bold text-green-800">{stats.pendingItems}</p>
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
                  <p className="text-2xl font-bold text-green-800">{stats.approvedToday}</p>
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
                  <p className="text-2xl font-bold text-green-800">{stats.flaggedItems}</p>
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
                  <p className="text-2xl font-bold text-green-800">{stats.rejectedToday}</p>
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

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-green-100">
            <TabsTrigger value="pending" className="data-[state=active]:bg-white">
              Pending Review ({stats.pendingItems})
            </TabsTrigger>
            <TabsTrigger value="flagged" className="data-[state=active]:bg-white">
              Flagged Items ({stats.flaggedItems})
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

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
              </div>
            ) : (
              <div className="space-y-4">
                {pendingItems.map((item) => (
                  <Card key={item.id} className="border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
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
                              <p className="font-medium text-green-800">{formatDate(item.createdAt)}</p>
                            </div>
                            <div>
                              <span className="text-green-600">Est. Points:</span>
                              <p className="font-medium text-green-800">{item.pointsValue}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <Link href={`/admin/item/${item.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-600 text-green-600 bg-transparent"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleAction(item.id, "approve")}
                              disabled={actionLoading === item.id}
                            >
                              {actionLoading === item.id ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4 mr-2" />
                              )}
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleAction(item.id, "reject")}
                              disabled={actionLoading === item.id}
                            >
                              {actionLoading === item.id ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              ) : (
                                <X className="w-4 h-4 mr-2" />
                              )}
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {pendingItems.length === 0 && (
                  <div className="text-center py-8 text-green-600">No pending items to review</div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="flagged" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-green-800">Flagged Items</h3>
              <p className="text-sm text-green-600">Items reported by community or auto-detection</p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
              </div>
            ) : (
              <div className="space-y-4">
                {flaggedItems.map((item) => (
                  <Card key={item.id} className="border-red-200 bg-red-50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
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
                              <p className="font-medium text-red-800">{formatDate(item.flaggedAt)}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <Link href={`/admin/investigate/${item.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-600 text-green-600 bg-transparent"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Investigate
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleAction(item.id, "clear_flag")}
                              disabled={actionLoading === item.id}
                            >
                              {actionLoading === item.id ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4 mr-2" />
                              )}
                              Clear Flag
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleAction(item.id, "remove")}
                              disabled={actionLoading === item.id}
                            >
                              {actionLoading === item.id ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              ) : (
                                <X className="w-4 h-4 mr-2" />
                              )}
                              Remove Item
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {flaggedItems.length === 0 && (
                  <div className="text-center py-8 text-green-600">No flagged items to review</div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-green-800">Recent Admin Actions</h3>
              <p className="text-sm text-green-600">Latest moderation activities</p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
              </div>
            ) : (
              <Card className="border-green-200">
                <CardContent className="p-0">
                  <div className="divide-y divide-green-100">
                    {recentActions.map((action) => (
                      <div key={action.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              action.action === "approved"
                                ? "bg-green-100"
                                : action.action === "rejected"
                                  ? "bg-red-100"
                                  : "bg-gray-100"
                            }`}
                          >
                            {action.action === "approved" && <Check className="w-4 h-4 text-green-600" />}
                            {action.action === "rejected" && <X className="w-4 h-4 text-red-600" />}
                            {(action.action === "removed" || action.action === "cleared_flag") && (
                              <AlertTriangle className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-green-800">
                              <span
                                className={`${
                                  action.action === "approved"
                                    ? "text-green-600"
                                    : action.action === "rejected"
                                      ? "text-red-600"
                                      : "text-gray-600"
                                }`}
                              >
                                {action.action.charAt(0).toUpperCase() + action.action.slice(1)}
                              </span>{" "}
                              "{action.itemTitle}"
                            </p>
                            <p className="text-sm text-green-600">by {action.adminName}</p>
                          </div>
                        </div>
                        <span className="text-sm text-green-600">{formatDate(action.createdAt)}</span>
                      </div>
                    ))}
                    {recentActions.length === 0 && (
                      <div className="text-center py-8 text-green-600">No recent actions</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
