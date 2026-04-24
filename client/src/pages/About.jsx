import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaUsers,
  FaTrophy,
  FaHandshake,
  FaGlobe,
  FaLightbulb,
  FaAward,
  FaHeart,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary-900 to-primary-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920')] bg-cover bg-center"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              About <span className="text-primary-400">SunShine Paint</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Your trusted partner in premium construction materials since 2008.
              Building dreams with quality, innovation, and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-secondary-700 leading-relaxed">
                <p>
                  Founded in 2008, SunShine Paint Construction Materials has
                  grown from a small local supplier to one of Ethiopia's leading
                  importers and distributors of premium construction materials
                  and interior products.
                </p>
                <p>
                  Our journey began with a simple vision: to provide Ethiopian
                  builders, contractors, and homeowners with access to
                  world-class construction materials that meet international
                  quality standards.
                </p>
                <p>
                  Today, we proudly serve thousands of satisfied customers
                  across Ethiopia, offering an extensive range of products from
                  paint and tiles to sanitary ware, lighting, and steel
                  products. Our commitment to quality, reliability, and customer
                  satisfaction has made us a trusted name in the construction
                  industry.
                </p>
                <p>
                  With over 15 years of experience, a team of expert
                  professionals, and partnerships with world-renowned
                  manufacturers, we continue to set new standards of excellence
                  in the Ethiopian construction materials market.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800"
                  alt="Our Story"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-primary-600 to-orange-600 rounded-2xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gradient-to-br from-secondary-900 to-primary-900 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Mission & Vision
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Guiding principles that drive us forward
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mb-6">
                <FaLightbulb className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To provide Ethiopia's construction industry with premium quality
                materials, innovative solutions, and exceptional customer
                service. We are committed to helping builders and homeowners
                create lasting, beautiful spaces that stand the test of time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                <FaGlobe className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To be East Africa's most trusted and preferred supplier of
                construction materials, recognized for our unwavering commitment
                to quality, innovation, and sustainability. We envision a future
                where every construction project in Ethiopia has access to
                world-class materials and expertise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
              Our Core <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              The principles that define who we are and how we work
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaTrophy />,
                title: "Excellence",
                description:
                  "We strive for excellence in everything we do, from product selection to customer service.",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: <FaHandshake />,
                title: "Integrity",
                description:
                  "We conduct business with honesty, transparency, and ethical practices.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: <FaHeart />,
                title: "Customer Focus",
                description:
                  "Our customers are at the heart of everything we do. Their success is our success.",
                color: "from-red-500 to-pink-600",
              },
              {
                icon: <FaLightbulb />,
                title: "Innovation",
                description:
                  "We continuously seek new and better ways to serve our customers and improve our industry.",
                color: "from-purple-500 to-purple-600",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-3xl group-hover:scale-110 transition-transform shadow-lg`}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
              Why Choose <span className="text-gradient">Us</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              What sets us apart from the competition
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality Products",
                description:
                  "All our products are sourced from internationally recognized brands with proven track records.",
              },
              {
                title: "Competitive Pricing",
                description:
                  "We offer the best prices in the market without compromising on quality.",
              },
              {
                title: "Expert Consultation",
                description:
                  "Our team of professionals provides expert advice for your specific project needs.",
              },
              {
                title: "Fast Delivery",
                description:
                  "Reliable and timely delivery to your project site across Ethiopia.",
              },
              {
                title: "Wide Product Range",
                description:
                  "One-stop solution for all your construction and interior material requirements.",
              },
              {
                title: "After-Sales Support",
                description:
                  "Comprehensive support even after purchase to ensure complete satisfaction.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FaCheckCircle className="text-primary-600 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-secondary-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-secondary-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
              Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Meet the dedicated professionals behind SunShine Paint
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alemayehu Bekele",
                role: "Chief Executive Officer",
                image: "https://i.pravatar.cc/300?img=12",
              },
              {
                name: "Sara Tesfaye",
                role: "Operations Manager",
                image: "https://i.pravatar.cc/300?img=45",
              },
              {
                name: "Daniel Girma",
                role: "Sales Director",
                image: "https://i.pravatar.cc/300?img=33",
              },
              {
                name: "Hanna Mekonnen",
                role: "Customer Relations",
                image: "https://i.pravatar.cc/300?img=47",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="relative mb-6">
                  <div className="relative z-10 overflow-hidden rounded-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary-600 to-orange-600 rounded-2xl -z-10"></div>
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-orange-500">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Partner with us for all your construction material needs. Let's
                build something amazing together!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  Get In Touch
                </Link>
                <Link
                  to="/products"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 hover:-translate-y-1"
                >
                  Browse Products
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
