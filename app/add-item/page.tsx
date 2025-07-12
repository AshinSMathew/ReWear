"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Leaf, Upload, X, Plus, Camera, AlertCircle } from "lucide-react"

export default function AddItem() {
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you'd upload these files and get URLs back
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages].slice(0, 5)) // Max 5 images
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
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
              Dashboard
            </Button>
            <Button variant="ghost" className="text-green-700">
              Browse
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">List a New Item</h1>
          <p className="text-green-700">
            Share your pre-loved fashion items with the community and earn points for sustainable swapping.
          </p>
        </div>

        <form className="space-y-8">
          {/* Image Upload */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Photos</CardTitle>
              <p className="text-sm text-green-600">Add up to 5 photos. The first photo will be your main image.</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg border-2 border-green-200"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    {index === 0 && <Badge className="absolute bottom-2 left-2 bg-green-600">Main</Badge>}
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:border-green-400 transition-colors">
                    <Camera className="w-8 h-8 text-green-500 mb-2" />
                    <span className="text-sm text-green-600">Add Photo</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
              {images.length === 0 && (
                <div className="flex items-center gap-2 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm text-yellow-700">Please add at least one photo of your item.</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-green-700">
                  Item Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Vintage Denim Jacket"
                  className="border-green-200 focus:border-green-500"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-green-700">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item in detail. Include brand, fit, styling tips, or any special features..."
                  rows={4}
                  className="border-green-200 focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-green-700">
                    Category *
                  </Label>
                  <Select>
                    <SelectTrigger className="border-green-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tops">Tops</SelectItem>
                      <SelectItem value="bottoms">Bottoms</SelectItem>
                      <SelectItem value="dresses">Dresses</SelectItem>
                      <SelectItem value="outerwear">Outerwear</SelectItem>
                      <SelectItem value="shoes">Shoes</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="bags">Bags</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type" className="text-green-700">
                    Type *
                  </Label>
                  <Select>
                    <SelectTrigger className="border-green-200">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shirt">Shirt</SelectItem>
                      <SelectItem value="blouse">Blouse</SelectItem>
                      <SelectItem value="sweater">Sweater</SelectItem>
                      <SelectItem value="jacket">Jacket</SelectItem>
                      <SelectItem value="coat">Coat</SelectItem>
                      <SelectItem value="dress">Dress</SelectItem>
                      <SelectItem value="jeans">Jeans</SelectItem>
                      <SelectItem value="pants">Pants</SelectItem>
                      <SelectItem value="skirt">Skirt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size" className="text-green-700">
                    Size *
                  </Label>
                  <Select>
                    <SelectTrigger className="border-green-200">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="xxl">XXL</SelectItem>
                      <SelectItem value="one-size">One Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition" className="text-green-700">
                    Condition *
                  </Label>
                  <Select>
                    <SelectTrigger className="border-green-200">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Tags</CardTitle>
              <p className="text-sm text-green-600">
                Add tags to help others find your item (e.g., vintage, designer, casual, formal)
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="border-green-200 focus:border-green-500"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-green-100 text-green-700">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0 hover:bg-transparent"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Points Estimation */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">Estimated Points Value</h3>
                  <p className="text-sm text-green-600">Based on category, condition, and brand</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-800">20-30</div>
                  <div className="text-sm text-green-600">points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button type="button" variant="outline" className="flex-1 border-green-600 text-green-600 bg-transparent">
              Save as Draft
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              <Upload className="w-4 h-4 mr-2" />
              Submit for Review
            </Button>
          </div>

          <div className="text-center text-sm text-green-600">
            <p>Your item will be reviewed by our team within 24 hours before going live.</p>
          </div>
        </form>
      </div>
    </div>
  )
}
