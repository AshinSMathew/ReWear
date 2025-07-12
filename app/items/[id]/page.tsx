"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
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
import Link from "next/link"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

interface ItemDetailProps {
  item: {
    id: string;
    title: string;
    description: string;
    category: string;
    itemType: string;
    size: string;
    condition: string;
    pointsValue: number;
    status: string;
    images: string[];
    tags: string[];
    views: number;
    likes: number;
    uploadDate: string;
  };
  uploader: {
    id: string;
    name: string;
    location: string;
    totalSwaps: number;
    memberSince: string;
  };
}

export default function ItemDetail() {
  const params = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [data, setData] = useState<ItemDetailProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(`/api/items/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch item data')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchItemData()
  }, [params.id])

  const nextImage = () => {
    if (!data) return
    setCurrentImageIndex((prev) => (prev + 1) % data.item.images.length)
  }

  const prevImage = () => {
    if (!data) return
    setCurrentImageIndex((prev) => (prev - 1 + data.item.images.length) % data.item.images.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton height={500} />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} height={80} width={80} />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton height={40} width="80%" />
              <Skeleton count={4} />
              <Skeleton height={200} />
              <Skeleton height={100} />
            </div>
          </div>
        </div>
      </div>
    )
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
    )
  }

  if (!data) {
    return null
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
            <Link href="/browse">
              <Button variant="ghost" className="text-green-700">
                Browse
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={data.item.images[currentImageIndex] || "/placeholder.svg"}
                alt={data.item.title}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
                priority
              />
              {data.item.images.length > 1 && (
                <>
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
                </>
              )}
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
            {data.item.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {data.item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-green-600" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${data.item.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-green-800 mb-2">{data.item.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-green-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {data.item.uploadDate}
                    </span>
                    <span>{data.item.views} views</span>
                    <span>{data.item.likes} likes</span>
                  </div>
                </div>
                <Badge
                  className={`${
                    data.item.status === "available" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {data.item.status}
                </Badge>
              </div>

              <p className="text-green-700 leading-relaxed mb-6">{data.item.description}</p>

              {/* Item Specifications */}
              <Card className="border-green-200 mb-6">
                <CardHeader>
                  <CardTitle className="text-green-800 text-lg">Item Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-green-600">Category</span>
                      <p className="font-medium text-green-800">{data.item.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-green-600">Type</span>
                      <p className="font-medium text-green-800">{data.item.itemType}</p>
                    </div>
                    <div>
                      <span className="text-sm text-green-600">Size</span>
                      <p className="font-medium text-green-800">{data.item.size}</p>
                    </div>
                    <div>
                      <span className="text-sm text-green-600">Condition</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-green-800">{data.item.condition}</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm text-green-600">Tags</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {data.item.tags.map((tag) => (
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
                    <span className="text-2xl font-bold text-green-800">{data.item.pointsValue} points</span>
                    <p className="text-sm text-green-600">Required for redemption</p>
                  </div>
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/swap/request/${data.item.id}`} className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Request Swap
                    </Button>
                  </Link>
                  <Link href={`/redeem/${data.item.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-green-600 text-green-600 bg-transparent">
                      Redeem with Points
                    </Button>
                  </Link>
                </div>
                <Link href={`/messages/new?user=${data.uploader.name}`}>
                  <Button variant="ghost" className="w-full mt-2 text-green-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Owner
                  </Button>
                </Link>
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
                <AvatarFallback className="bg-green-100 text-green-700 text-lg">
                  {data.uploader.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-green-800 mb-1">{data.uploader.name}</h3>
                <div className="flex items-center gap-4 text-sm text-green-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{data.uploader.location}</span>
                  </div>
                  <span>Member since {data.uploader.memberSince}</span>
                </div>
                <div className="flex gap-3">
                  <Link href={`/profile/${data.uploader.id}`}>
                    <Button variant="outline" className="border-green-600 text-green-600 bg-transparent">
                      View Profile
                    </Button>
                  </Link>
                  <Link href={`/messages/new?user=${data.uploader.name}`}>
                    <Button variant="outline" className="border-green-600 text-green-600 bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}