import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPaintRoller,
  FaTruck,
  FaUserTie,
  FaTools,
  FaClipboardCheck,
  FaHeadset,
  FaChartLine,
  FaWarehouse,
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      icon: <FaPaintRoller />,
      title: "Product Supply",
      description:
        "Comprehensive supply of premium construction materials from trusted international brands.",
      color: "from-blue-500 to-blue-600",
      features: [
        "Wide range of construction materials",
        "Imported premium products",
        "Competitive bulk pricing",
        "Quality assurance guaranteed",
      ],
      image:
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
    },
    {
      id: 2,
      icon: <FaTruck />,
      title: "Delivery Services",
      description:
        "Fast and reliable delivery to your project site anywhere in Ethiopia.",
      color: "from-green-500 to-green-600",
      features: [
        "Same-day delivery available",
        "Nationwide coverage",
        "Professional handling",
        "Real-time tracking",
      ],
      image:
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800",
    },
    {
      id: 3,
      icon: <FaUserTie />,
      title: "Expert Consultation",
      description:
        "Professional advice and technical support for your construction projects.",
      color: "from-purple-500 to-purple-600",
      features: [
        "Free project consultation",
        "Material recommendations",
        "Cost estimation support",
        "Technical specifications",
      ],
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
    },
    {
      id: 4,
      icon: <FaTools />,
      title: "Installation Support",
      description:
        "Technical guidance and installation support for all our products.",
      color: "from-orange-500 to-orange-600",
      features: [
        "Installation guidelines",
        "Technical documentation",
        "Expert technicians available",
        "On-site support",
      ],
      image:
        "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800",
    },
    {
      id: 5,
      icon: <FaClipboardCheck />,
      title: "Project Management",
      description:
        "End-to-end project management for large-scale construction projects.",
      color: "from-red-500 to-red-600",
      features: [
        "Material planning",
        "Timeline management",
        "Budget optimization",
        "Quality control",
      ],
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    },
    {
      id: 6,
      icon: <FaHeadset />,
      title: "After-Sales Support",
      description: "Comprehensive customer support even after your purchase.",
      color: "from-pink-500 to-pink-600",
      features: [
        "Warranty support",
        "Product replacement",
        "Technical helpdesk",
        "Customer care team",
      ],
      image: "https://images.unsplash.com/photo-1553775282-20af80779df7?w=800",
    },
    {
      id: 7,
      icon: <FaChartLine />,
      title: "Bulk Orders",
      description:
        "Special pricing and services for contractors and bulk purchasers.",
      color: "from-indigo-500 to-indigo-600",
      features: [
        "Volume discounts",
        "Flexible payment terms",
        "Dedicated account manager",
        "Priority delivery",
      ],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    },
    {
      id: 8,
      icon: <FaWarehouse />,
      title: "Warehousing",
      description: "Secure storage solutions for your construction materials.",
      color: "from-teal-500 to-teal-600",
      features: [
        "Climate-controlled storage",
        "Secure facilities",
        "Inventory management",
        "Flexible storage terms",
      ],
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary-900 to-primary-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920')] bg-cover bg-center"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Our <span className="text-primary-400">Services</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Comprehensive solutions for all your construction material needs.
              From supply to installation support, we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
              What We <span className="text-gradient">Offer</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Professional services designed to make your construction projects
              successful
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Learn More</span>
                    <FaArrowRight className="ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Simple steps to get started with our services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Contact Us",
                description:
                  "Reach out via phone, email, or visit our showroom",
                icon: <FaPhone />,
              },
              {
                step: "02",
                title: "Consultation",
                description: "Discuss your project needs with our experts",
                icon: <FaUserTie />,
              },
              {
                step: "03",
                title: "Get Quote",
                description: "Receive detailed quote and recommendations",
                icon: <FaClipboardCheck />,
              },
              {
                step: "04",
                title: "Delivery",
                description: "Fast delivery and installation support",
                icon: <FaTruck />,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                  <div className="text-6xl font-bold text-primary-100 mb-4">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-secondary-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <FaArrowRight className="text-4xl text-primary-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-6">
                Why Choose Our <span className="text-gradient">Services</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Industry-leading expertise with 15+ years of experience",
                  "Premium quality products from trusted global brands",
                  "Competitive pricing with flexible payment options",
                  "Fast and reliable delivery across Ethiopia",
                  "Dedicated customer support team",
                  "Technical consultation and installation support",
                  "Comprehensive warranty and after-sales service",
                  "Sustainable and eco-friendly product options",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-green-600" />
                    </div>
                    <p className="text-secondary-700 text-lg">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"
                alt="Our Services"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-primary-600 to-orange-600 rounded-2xl -z-10 opacity-20"></div>
            </motion.div>
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
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Contact us today to discuss your project requirements and get a
                free consultation
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2"
                >
                  <FaEnvelope />
                  <span>Request Service</span>
                </Link>
                <a
                  href="tel:+251911234567"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2"
                >
                  <FaPhone />
                  <span>Call Now</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

// Service Modal Component
const ServiceModal = ({ service, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="relative h-64 md:h-80">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors"
          >
            ✕
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <div
              className={`inline-flex w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl items-center justify-center text-white text-2xl mb-4`}
            >
              {service.icon}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {service.title}
            </h2>
          </div>
        </div>

        <div className="p-8">
          <p className="text-xl text-secondary-700 mb-8 leading-relaxed">
            {service.description}
          </p>

          <h3 className="text-2xl font-bold text-secondary-900 mb-6">
            Key Features
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-secondary-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Request This Service
            </Link>
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-secondary-300 text-secondary-700 rounded-lg font-semibold hover:bg-secondary-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Services;
