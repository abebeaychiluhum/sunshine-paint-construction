import { motion } from "framer-motion";
import {
  FaPaintBrush,
  FaHammer,
  FaTools,
  FaLightbulb,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
  FaPhoneAlt,
  FaPlay,
} from "react-icons/fa";

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ahmed Mohammed",
      role: "Construction Manager",
      company: "Alpha Builders",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      text: "SunShine Paint has been our go-to supplier for all construction materials. Their quality is unmatched, and the customer service is exceptional. Highly recommended!",
    },
    {
      name: "Sara Teklu",
      role: "Interior Designer",
      company: "Elite Interiors",
      image: "https://i.pravatar.cc/150?img=45",
      rating: 5,
      text: "The variety of products and the quality they offer is outstanding. Their team helped me find exactly what I needed for my projects. Professional and reliable!",
    },
    {
      name: "Daniel Assefa",
      role: "Property Developer",
      company: "Skyline Properties",
      image: "https://i.pravatar.cc/150?img=33",
      rating: 5,
      text: "We've completed multiple projects with materials from SunShine Paint. The consistency in quality and timely delivery has made them our trusted partner.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-6xl text-primary-100">
                <FaQuoteLeft />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-secondary-600 mb-6 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-primary-100"
                />
                <div>
                  <div className="font-bold text-secondary-900 text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-secondary-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-primary-600 font-semibold">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
