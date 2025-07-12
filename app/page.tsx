import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Recycle, Users, ArrowRight, Star, Heart } from "lucide-react"

export default function LandingPage() {
  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Excellent",
      points: 25,
      category: "Outerwear",
    },
    {
      id: 2,
      title: "Floral Summer Dress",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Good",
      points: 20,
      category: "Dresses",
    },
    {
      id: 3,
      title: "Classic White Sneakers",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Like New",
      points: 30,
      category: "Shoes",
    },
    {
      id: 4,
      title: "Wool Knit Sweater",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Good",
      points: 22,
      category: "Knitwear",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-green-800">ReWear</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/browse" className="text-green-700 hover:text-green-800 font-medium">
              Browse
            </Link>
            <Link href="/how-it-works" className="text-green-700 hover:text-green-800 font-medium">
              How It Works
            </Link>
            <Link href="/about" className="text-green-700 hover:text-green-800 font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-green-700">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-green-600 hover:bg-green-700">Join Now</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
            Sustainable Fashion Through
            <span className="text-green-600 block">Clothing Swaps</span>
          </h1>
          <p className="text-lg md:text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            Give your clothes a second life and discover unique pieces from others. Join our community of eco-conscious
            fashion lovers making a difference, one swap at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8">
                Start Swapping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/browse">
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 text-lg px-8 bg-transparent"
              >
                Browse Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Recycle className="w-12 h-12 mb-4" />
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-green-100">Items Swapped</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 mb-4" />
              <div className="text-3xl font-bold mb-2">5,000+</div>
              <div className="text-green-100">Active Members</div>
            </div>
            <div className="flex flex-col items-center">
              <Leaf className="w-12 h-12 mb-4" />
              <div className="text-3xl font-bold mb-2">2.5 tons</div>
              <div className="text-green-100">CO₂ Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Featured Items</h2>
          <p className="text-green-700 max-w-2xl mx-auto">
            Discover amazing pieces from our community. Each item has been carefully curated and is ready for its next
            adventure.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
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
                  <h3 className="font-semibold text-green-800 mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold">{item.points} points</span>
                    <Link href={`/item/${item.id}`}>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/browse">
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
              View All Items
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Ready to Make a Difference?</h2>
          <p className="text-green-700 mb-8 max-w-2xl mx-auto">
            Join thousands of fashion lovers who are already making sustainable choices. List your items, earn points,
            and discover your next favorite piece.
          </p>
          <Link href="/add-item">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8">
              List an Item
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-800" />
                </div>
                <span className="text-xl font-bold">ReWear</span>
              </div>
              <p className="text-green-200">Making fashion sustainable, one swap at a time.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-green-200">
                <li>
                  <Link href="/browse" className="hover:text-white">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/points" className="hover:text-white">
                    Points System
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-green-200">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability" className="hover:text-white">
                    Sustainability
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-green-200">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
            <p>&copy; 2024 ReWear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
