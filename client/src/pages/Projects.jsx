import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaHome,
  FaIndustry,
  FaHotel,
  FaTimes,
  FaMapMarkerAlt,
  FaCalendar,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: "all", name: "All Projects", icon: <FaBuilding /> },
    { id: "residential", name: "Residential", icon: <FaHome /> },
    { id: "commercial", name: "Commercial", icon: <FaBuilding /> },
    { id: "industrial", name: "Industrial", icon: <FaIndustry /> },
    { id: "hospitality", name: "Hospitality", icon: <FaHotel /> },
  ];

  const projects = [
    {
      id: 1,
      title: "Luxury Villa Complex",
      category: "residential",
      location: "Bole, Addis Ababa",
      date: "2023",
      status: "Completed",
      description:
        "A stunning luxury villa complex featuring premium imported tiles, high-end sanitary ware, and modern lighting solutions. This project showcases our commitment to quality and excellence in residential construction.",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800",
      ],
      materials: [
        "Premium Tiles",
        "Luxury Sanitary Ware",
        "Designer Lighting",
        "Marble Flooring",
      ],
      size: "5,000 sqm",
      client: "Private Developer",
    },
    {
      id: 2,
      title: "Modern Office Tower",
      category: "commercial",
      location: "Kazanchis, Addis Ababa",
      date: "2023",
      status: "Completed",
      description:
        "A 15-story modern office building equipped with state-of-the-art construction materials including energy-efficient lighting, premium glass facades, and advanced HVAC systems.",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
      ],
      materials: [
        "Curtain Wall Glass",
        "Steel Structure",
        "LED Lighting",
        "Acoustic Panels",
      ],
      size: "12,000 sqm",
      client: "Corporate Client",
    },
    {
      id: 3,
      title: "Shopping Mall Development",
      category: "commercial",
      location: "Megenagna, Addis Ababa",
      date: "2024",
      status: "In Progress",
      description:
        "Large-scale shopping mall featuring extensive use of our premium construction materials including decorative tiles, modern lighting systems, and durable flooring solutions.",
      images: [
        "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800",
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      ],
      materials: [
        "Commercial Flooring",
        "Decorative Tiles",
        "LED Systems",
        "Steel Framework",
      ],
      size: "25,000 sqm",
      client: "Retail Group",
    },
    {
      id: 4,
      title: "Luxury Hotel & Spa",
      category: "hospitality",
      location: "Bole, Addis Ababa",
      date: "2023",
      status: "Completed",
      description:
        "Five-star hotel featuring imported Italian marble, designer sanitary ware, premium lighting fixtures, and luxury interior finishes throughout all guest rooms and common areas.",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      ],
      materials: [
        "Italian Marble",
        "Designer Sanitary Ware",
        "Crystal Chandeliers",
        "Premium Paint",
      ],
      size: "8,000 sqm",
      client: "Hotel Chain",
    },
    {
      id: 5,
      title: "Industrial Warehouse Complex",
      category: "industrial",
      location: "Kaliti, Addis Ababa",
      date: "2023",
      status: "Completed",
      description:
        "Large industrial warehouse facility built with durable steel structures, industrial-grade flooring, and efficient lighting systems designed for optimal functionality.",
      images: [
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
        "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800",
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800",
      ],
      materials: [
        "Steel Structures",
        "Industrial Flooring",
        "High-Bay Lighting",
        "Concrete Sealants",
      ],
      size: "15,000 sqm",
      client: "Manufacturing Company",
    },
    {
      id: 6,
      title: "Residential Apartment Complex",
      category: "residential",
      location: "CMC, Addis Ababa",
      date: "2024",
      status: "In Progress",
      description:
        "Modern apartment complex featuring contemporary design with high-quality tiles, energy-efficient windows, and sustainable building materials throughout.",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      ],
      materials: [
        "Ceramic Tiles",
        "Energy-Efficient Glass",
        "Modern Lighting",
        "Premium Paint",
      ],
      size: "10,000 sqm",
      client: "Real Estate Developer",
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary-900 to-primary-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920')] bg-cover bg-center"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Our <span className="text-primary-400">Projects</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover our portfolio of successful construction projects across
              Ethiopia. Quality materials, expert execution, outstanding
              results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg scale-105"
                  : "bg-white text-secondary-700 hover:bg-secondary-50 shadow-md"
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          project.status === "Completed"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-semibold capitalize">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-secondary-600 text-sm">
                        <FaMapMarkerAlt className="mr-2 text-primary-600" />
                        {project.location}
                      </div>
                      <div className="flex items-center text-secondary-600 text-sm">
                        <FaCalendar className="mr-2 text-primary-600" />
                        {project.date}
                      </div>
                    </div>

                    <p className="text-secondary-600 line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    <button className="text-primary-600 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
                      <span>View Details</span>
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaBuilding className="text-6xl text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              No Projects Found
            </h3>
            <p className="text-secondary-600 mb-8">
              No projects in this category yet. Check back soon!
            </p>
          </motion.div>
        )}
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

// Project Modal Component
const ProjectModal = ({
  project,
  currentImageIndex,
  setCurrentImageIndex,
  onClose,
}) => {
  const handlePrevImage = () => {
    setCurrentImageIndex(
      currentImageIndex > 0 ? currentImageIndex - 1 : project.images.length - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      currentImageIndex < project.images.length - 1 ? currentImageIndex + 1 : 0,
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full my-8 overflow-hidden"
      >
        {/* Image Gallery */}
        <div className="relative aspect-video bg-secondary-100">
          <img
            src={project.images[currentImageIndex]}
            alt={`${project.title} ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full text-secondary-900 transition-colors shadow-lg"
          >
            <FaTimes size={20} />
          </button>

          {/* Navigation Arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full text-secondary-900 transition-colors shadow-lg"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full text-secondary-900 transition-colors shadow-lg"
              >
                <FaChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
            {currentImageIndex + 1} / {project.images.length}
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-4 py-2 rounded-full font-semibold ${
                project.status === "Completed"
                  ? "bg-green-500 text-white"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Image Thumbnails */}
        {project.images.length > 1 && (
          <div className="flex gap-2 p-4 bg-secondary-50 overflow-x-auto">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden ${
                  currentImageIndex === index
                    ? "ring-4 ring-primary-600"
                    : "ring-2 ring-secondary-200"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
                {project.title}
              </h2>
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold capitalize">
                {project.category}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                Project Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="mr-3 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-secondary-600">Location</p>
                    <p className="font-semibold text-secondary-900">
                      {project.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaCalendar className="mr-3 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-secondary-600">
                      Completion Year
                    </p>
                    <p className="font-semibold text-secondary-900">
                      {project.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaBuilding className="mr-3 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-secondary-600">Project Size</p>
                    <p className="font-semibold text-secondary-900">
                      {project.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaCheck className="mr-3 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-secondary-600">Client</p>
                    <p className="font-semibold text-secondary-900">
                      {project.client}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                Materials Used
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {project.materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-primary-50 rounded-lg"
                  >
                    <FaCheck className="text-primary-600" />
                    <span className="text-sm text-secondary-900">
                      {material}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-secondary-900 mb-4">
              Description
            </h3>
            <p className="text-secondary-700 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-secondary-100 text-secondary-900 rounded-lg font-semibold hover:bg-secondary-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
