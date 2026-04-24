import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendar,
  FaUser,
  FaClock,
  FaTag,
  FaSearch,
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaTimes,
  FaShare,
} from "react-icons/fa";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "tips", name: "Construction Tips" },
    { id: "trends", name: "Industry Trends" },
    { id: "guides", name: "How-to Guides" },
    { id: "products", name: "Product Reviews" },
    { id: "news", name: "Company News" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Construction Material Trends for 2024",
      category: "trends",
      excerpt:
        "Discover the latest trends in construction materials that are shaping the industry this year. From sustainable options to innovative technologies.",
      content: `The construction industry is constantly evolving, and 2024 brings exciting new trends in materials and technologies. Here are the top trends to watch:

1. **Sustainable Materials**: Eco-friendly options are becoming mainstream, with recycled materials and low-carbon alternatives leading the way.

2. **Smart Building Materials**: Integration of IoT technology into construction materials for improved monitoring and efficiency.

3. **3D-Printed Components**: Additive manufacturing is revolutionizing how we create building components.

4. **Self-Healing Concrete**: Advanced concrete mixtures that can repair their own cracks automatically.

5. **Transparent Wood**: A sustainable alternative to glass and plastic with excellent insulation properties.

These trends are not just innovations—they represent the future of sustainable, efficient construction. At SunShine Paint, we're committed to bringing these cutting-edge materials to Ethiopia.`,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
      author: "Alemayehu Bekele",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["Trends", "Innovation", "Sustainability"],
    },
    {
      id: 2,
      title: "How to Choose the Right Paint for Your Project",
      category: "guides",
      excerpt:
        "A comprehensive guide to selecting the perfect paint type, finish, and color for different surfaces and environments.",
      content: `Choosing the right paint can make or break your project. Here's everything you need to know:

**Understanding Paint Types:**

- **Emulsion Paint**: Perfect for interior walls and ceilings. Water-based, easy to clean, and comes in various finishes.
- **Enamel Paint**: Oil-based paint ideal for high-traffic areas and surfaces requiring durability.
- **Textured Paint**: Adds dimension and can hide wall imperfections.

**Choosing the Right Finish:**

- **Matte**: Non-reflective, hides imperfections, perfect for low-traffic areas.
- **Eggshell**: Slight sheen, easy to clean, great for living rooms and bedrooms.
- **Satin**: More durable and washable, ideal for kitchens and bathrooms.
- **Gloss**: Highly reflective and durable, perfect for trim and doors.

**Color Considerations:**

Consider lighting, room size, and purpose when selecting colors. Light colors make rooms feel larger, while dark colors create intimacy.`,
      image:
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
      author: "Sara Tesfaye",
      date: "2024-01-10",
      readTime: "6 min read",
      tags: ["Guide", "Paint", "Interior Design"],
    },
    {
      id: 3,
      title: "The Benefits of Imported Construction Materials",
      category: "products",
      excerpt:
        "Why investing in quality imported materials can save you money and headaches in the long run.",
      content: `Quality matters in construction, and here's why imported materials are worth the investment:

**Superior Quality Control:**
International manufacturers adhere to strict quality standards and certifications that ensure consistency and reliability.

**Advanced Technology:**
Imported materials often incorporate the latest technological innovations, offering better performance and durability.

**Longer Lifespan:**
While the initial cost might be higher, premium imported materials typically last longer, reducing replacement and maintenance costs.

**Warranty and Support:**
Reputable international brands offer comprehensive warranties and technical support.

**Aesthetic Appeal:**
Access to contemporary designs and finishes that aren't available in local markets.

At SunShine Paint, we carefully select our imported products from trusted manufacturers to ensure you get the best value for your investment.`,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      author: "Daniel Girma",
      date: "2024-01-05",
      readTime: "5 min read",
      tags: ["Products", "Quality", "Import"],
    },
    {
      id: 4,
      title: "Sustainable Building Practices for Ethiopian Climate",
      category: "tips",
      excerpt:
        "Learn how to build sustainably while adapting to Ethiopia's unique climate conditions.",
      content: `Building sustainably in Ethiopia requires understanding our unique climate and available resources:

**Climate Considerations:**

Ethiopia's diverse climate zones require adaptive building strategies. From the cool highlands to warmer lowlands, material selection is crucial.

**Sustainable Material Choices:**

- **Thermal Mass Materials**: Use materials that regulate temperature naturally
- **Local Stone**: Abundant and durable, perfect for Ethiopia's climate
- **Insulated Roofing**: Essential for temperature control
- **Natural Ventilation**: Design for cross-ventilation to reduce cooling needs

**Water Management:**

- Rainwater harvesting systems
- Permeable paving materials
- Efficient plumbing fixtures

**Energy Efficiency:**

- Solar-ready installations
- LED lighting systems
- Energy-efficient windows and doors

These practices not only help the environment but also reduce long-term operational costs.`,
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
      author: "Hanna Mekonnen",
      date: "2024-01-01",
      readTime: "7 min read",
      tags: ["Sustainability", "Climate", "Tips"],
    },
    {
      id: 5,
      title: "SunShine Paint Expands Showroom to Serve You Better",
      category: "news",
      excerpt:
        "Exciting news! We've expanded our showroom to display more products and provide better service.",
      content: `We're thrilled to announce the expansion of our main showroom in Addis Ababa!

**What's New:**

- **3x Larger Display Area**: Browse our complete range of products in person
- **Interactive Design Studio**: Work with our experts to visualize your project
- **Material Testing Lab**: See and feel product samples before purchasing
- **Dedicated Consultation Rooms**: Private spaces for project discussions
- **On-Site Parking**: Convenient parking for all visitors

**Grand Opening Celebration:**

Join us for our grand opening on February 1st! Special discounts, refreshments, and expert consultations will be available throughout the day.

**Location:**
Our expanded showroom is located at our main address in Bole, Addis Ababa.

We look forward to welcoming you and helping with all your construction material needs!`,
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
      author: "SunShine Paint Team",
      date: "2023-12-28",
      readTime: "4 min read",
      tags: ["Company News", "Announcement"],
    },
    {
      id: 6,
      title: "Marble vs Granite: Which is Right for Your Project?",
      category: "guides",
      excerpt:
        "A detailed comparison of marble and granite to help you make the best choice for your kitchen, bathroom, or flooring project.",
      content: `Choosing between marble and granite? Here's a comprehensive comparison:

**Marble:**

**Pros:**
- Timeless elegance and luxury appearance
- Cooler surface, ideal for baking
- Unique veining patterns
- Available in wide range of colors

**Cons:**
- More porous and prone to staining
- Softer, scratches more easily
- Requires regular sealing
- More expensive than granite

**Best For:** Bathrooms, low-traffic areas, decorative features

**Granite:**

**Pros:**
- Extremely durable and heat-resistant
- Lower maintenance requirements
- Wide variety of colors and patterns
- Better value for money
- Resistant to scratches and stains

**Cons:**
- Limited color options compared to marble
- Can have a more uniform appearance
- Requires periodic sealing

**Best For:** Kitchen countertops, high-traffic areas, outdoor applications

**Making Your Decision:**

Consider your budget, maintenance commitment, and usage patterns. Both are excellent choices when properly cared for.

Visit our showroom to see samples and speak with our experts!`,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      author: "Sara Tesfaye",
      date: "2023-12-20",
      readTime: "10 min read",
      tags: ["Guide", "Marble", "Granite", "Comparison"],
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const recentPosts = blogPosts.slice(0, 5);
  const popularTags = [
    "Construction",
    "Paint",
    "Interior Design",
    "Sustainability",
    "Tips",
    "Guide",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary-900 to-primary-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920')] bg-cover bg-center"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Our <span className="text-primary-400">Blog</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Expert insights, tips, and updates from the construction materials
              industry. Stay informed and inspired!
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search & Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedCategory === category.id
                        ? "bg-primary-600 text-white"
                        : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts */}
            <div className="space-y-8">
              <AnimatePresence>
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="md:flex">
                      <div className="md:w-2/5 relative overflow-hidden aspect-video md:aspect-auto">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-semibold capitalize">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="md:w-3/5 p-6">
                        <h2 className="text-2xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                          {post.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <FaUser />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaCalendar />
                            <span>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaClock />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <p className="text-secondary-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-semibold"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <button className="text-primary-600 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
                          <span>Read More</span>
                          <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>

              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-32 h-32 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaSearch className="text-6xl text-secondary-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                    No Posts Found
                  </h3>
                  <p className="text-secondary-600 mb-8">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Recent Posts */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Recent Posts
              </h3>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="flex space-x-4 cursor-pointer group"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-secondary-900 line-clamp-2 group-hover:text-primary-600 transition-colors mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-secondary-600">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-primary-100 hover:text-primary-700 transition-colors font-semibold"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-primary-600 to-orange-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="mb-6 text-white/90">
                Get the latest articles and updates delivered to your inbox
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg text-secondary-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-white text-primary-600 rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  Subscribe Now
                </button>
              </form>
            </motion.div>
          </aside>
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <BlogPostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

// Blog Post Modal Component
const BlogPostModal = ({ post, onClose }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } else {
      window.open(shareUrls[platform], "_blank");
    }
    setShowShareMenu(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.article
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 overflow-hidden"
      >
        {/* Header Image */}
        <div className="relative h-96">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full text-secondary-900 transition-colors shadow-lg"
          >
            <FaTimes size={20} />
          </button>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 bg-primary-600 text-white rounded-full font-semibold capitalize">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 pb-6 mb-6 border-b border-secondary-200">
            <div className="flex items-center space-x-2 text-secondary-600">
              <FaUser />
              <span className="font-semibold">{post.author}</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-600">
              <FaCalendar />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-600">
              <FaClock />
              <span>{post.readTime}</span>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors font-semibold"
              >
                <FaShare />
                <span>Share</span>
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute right-8 mt-2 bg-white rounded-lg shadow-xl p-4 z-10">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShare("facebook")}
                      className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <FaFacebookF />
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
                    >
                      <FaTwitter />
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                    >
                      <FaLinkedinIn />
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      <FaWhatsapp />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Article Content */}
          <div className="prose max-w-none mb-8">
            <div className="text-xl text-secondary-700 mb-6 font-semibold">
              {post.excerpt}
            </div>
            <div className="text-secondary-700 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-semibold flex items-center space-x-2"
              >
                <FaTag />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-secondary-200">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-secondary-100 text-secondary-900 rounded-lg font-semibold hover:bg-secondary-200 transition-colors"
            >
              Close
            </button>
            <Link
              to="/contact"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

export default Blog;
