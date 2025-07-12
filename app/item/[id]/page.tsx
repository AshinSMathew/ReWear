"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Leaf,
  Heart,
  Share2,
  Star,
  MapPin,
  Calendar,
  Package,
  ArrowUpDown,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function ItemDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const images = [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  const item = {
    title: "Vintage Denim Jacket",
    description:
      "Beautiful vintage denim jacket in excellent condition. This classic piece features authentic distressing and a perfect fit. Originally from a premium brand, it's been well-maintained and is ready for its next adventure. Perfect for layering and adds a timeless touch to any outfit.",
    category: "Outerwear",
    type: "Jacket",
    size: "Medium",
    condition: "Excellent",
    points: 25,
    tags: ["Vintage", "Denim", "Classic", "Unisex"],
    availability: "Available",
    uploadDate: "3 days ago",
    views: 47,
    likes: 12,
  }

  const uploader = {
    name: "Sarah Mitchell",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    totalSwaps: 23,
    location: "San Francisco, CA",
    memberSince: "Jan 2023",
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
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
            <Button variant="ghost" className="text-green-700">
              Browse
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">Dashboard</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={item.title}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 hover:bg-white"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? "border-green-600" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${item.title} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-green-800 mb-2">{item.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-green-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.uploadDate}
                    </span>
                    <span>{item.views} views</span>
                    <span>{item.likes} likes</span>
                  </div>
                </div>
                <Badge
                  className={`${
                    item.availability === "Available" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.availability}
                </Badge>
              </div>

              <p className="text-green-700 leading-relaxed mb-6">{item.description}</p>

              {/* Item Specifications */}
              <Card className="border-green-200 mb-6">
                <CardHeader>
                  <CardTitle className="text-green-800 text-lg">Item Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-green-600">Category</span>
                      <p className="font-medium text-green-800">{item.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-green-600">Type</span>
                      <p className="font-medium text-green-800">{item.type}</p>
                    </div>
                    <div>
                      <span className="text-sm text-green-600">Size</span>
                      <p className="font-medium text-green-800">{item.size}</p>
                    </div>
                    <div>
                      <span className="text-sm text-green-600">Condition</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-green-800">{item.condition}</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm text-green-600">Tags</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-green-100 text-green-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Points and Actions */}
              <div className="bg-white rounded-lg p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-green-800">{item.points} points</span>
                    <p className="text-sm text-green-600">Required for redemption</p>
                  </div>
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Request Swap
                  </Button>
                  <Button variant="outline" className="flex-1 border-green-600 text-green-600 bg-transparent">
                    Redeem with Points
                  </Button>
                </div>
                <Button variant="ghost" className="w-full mt-2 text-green-600">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Owner
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Uploader Profile */}
        <Card className="mt-8 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">About the Owner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={uploader.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-green-100 text-green-700 text-lg">
                  {uploader.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-green-800 mb-1">{uploader.name}</h3>
                <div className="flex items-center gap-4 text-sm text-green-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>
                      {uploader.rating} ({uploader.totalSwaps} swaps)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{uploader.location}</span>
                  </div>
                  <span>Member since {uploader.memberSince}</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-green-600 text-green-600 bg-transparent">
                    View Profile
                  </Button>
                  <Button variant="outline" className="border-green-600 text-green-600 bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
