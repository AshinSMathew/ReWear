"use client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, Search, Filter, Heart, Star } from "lucide-react"

export default function BrowsePage() {
  const router = useRouter();
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
  const items = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Excellent",
      points: 25,
      category: "Outerwear",
      size: "M",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      title: "Floral Summer Dress",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Good",
      points: 20,
      category: "Dresses",
      size: "S",
      location: "Los Angeles, CA",
    },
    {
      id: 3,
      title: "Classic White Sneakers",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Like New",
      points: 30,
      category: "Shoes",
      size: "9",
      location: "New York, NY",
    },
    {
      id: 4,
      title: "Wool Knit Sweater",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Good",
      points: 22,
      category: "Knitwear",
      size: "L",
      location: "Chicago, IL",
    },
    {
      id: 5,
      title: "Designer Handbag",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Excellent",
      points: 45,
      category: "Accessories",
      size: "One Size",
      location: "Miami, FL",
    },
    {
      id: 6,
      title: "Leather Boots",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Good",
      points: 35,
      category: "Shoes",
      size: "8",
      location: "Seattle, WA",
    },
  ]

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
              <Link href="/dashboard" className="text-green-700 hover:text-green-800 font-medium">
                Dashboard
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Browse Items</h1>
          <p className="text-green-700">Discover unique, pre-loved fashion pieces from our community</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-green-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
              <Input placeholder="Search items..." className="pl-10 border-green-200 focus:border-green-500" />
            </div>
            <Select>
              <SelectTrigger className="border-green-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tops">Tops</SelectItem>
                <SelectItem value="bottoms">Bottoms</SelectItem>
                <SelectItem value="dresses">Dresses</SelectItem>
                <SelectItem value="outerwear">Outerwear</SelectItem>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="border-green-200">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="xs">XS</SelectItem>
                <SelectItem value="s">S</SelectItem>
                <SelectItem value="m">M</SelectItem>
                <SelectItem value="l">L</SelectItem>
                <SelectItem value="xl">XL</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-green-600 hover:bg-green-700">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow border-green-100">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Badge className="absolute top-2 left-2 bg-green-600 text-white">{item.points} pts</Badge>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{item.condition}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-green-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-green-600 mb-3">
                    Size {item.size} • {item.location}
                  </p>
                  <Link href={`/item/${item.id}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
            Load More Items
          </Button>
        </div>
      </div>
    </div>
  )
}
