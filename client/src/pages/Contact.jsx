import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaPaperPlane,
} from "react-icons/fa";
import { sendMessage } from "../services/api";
import { COMPANY_INFO, SOCIAL_LINKS } from "../utils/constants";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await sendMessage(formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        type: "general",
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary-900 to-primary-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920')] bg-cover bg-center"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Get In <span className="text-primary-400">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Have a question or ready to start your project? We're here to
              help. Contact us today and let's discuss your construction
              material needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container-custom -mt-16 relative z-10 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaPhone />,
              title: "Phone",
              info: COMPANY_INFO.phone,
              link: `tel:${COMPANY_INFO.phone}`,
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: <FaEnvelope />,
              title: "Email",
              info: COMPANY_INFO.email,
              link: `mailto:${COMPANY_INFO.email}`,
              color: "from-red-500 to-red-600",
            },
            {
              icon: <FaMapMarkerAlt />,
              title: "Location",
              info: COMPANY_INFO.address,
              link: "#map",
              color: "from-green-500 to-green-600",
            },
            {
              icon: <FaClock />,
              title: "Working Hours",
              info: COMPANY_INFO.workingHours,
              link: null,
              color: "from-purple-500 to-purple-600",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.link ? (
                <a
                  href={item.link}
                  className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <ContactCard item={item} />
                </a>
              ) : (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <ContactCard item={item} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="container-custom pb-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-display font-bold text-secondary-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-secondary-600 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible
              </p>

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                >
                  ✓ Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                >
                  ✕ {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-field">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="label-field">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-field">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+251 911 234567"
                    />
                  </div>

                  <div>
                    <label className="label-field">Message Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="quote">Request Quote</option>
                      <option value="support">Technical Support</option>
                      <option value="complaint">Complaint</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label-field">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="label-field">Your Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="textarea-field"
                    placeholder="Tell us more about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-600 to-orange-500 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>
              <div className="space-y-6">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Call Us</p>
                    <p className="font-semibold">{COMPANY_INFO.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Email Us</p>
                    <p className="font-semibold">{COMPANY_INFO.email}</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <FaWhatsapp className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">WhatsApp</p>
                    <p className="font-semibold">Chat With Us</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: "Facebook",
                    icon: <FaFacebookF />,
                    url: SOCIAL_LINKS.facebook,
                    color: "bg-blue-600",
                  },
                  {
                    name: "Twitter",
                    icon: <FaTwitter />,
                    url: SOCIAL_LINKS.twitter,
                    color: "bg-sky-500",
                  },
                  {
                    name: "Instagram",
                    icon: <FaInstagram />,
                    url: SOCIAL_LINKS.instagram,
                    color: "bg-pink-600",
                  },
                  {
                    name: "LinkedIn",
                    icon: <FaLinkedinIn />,
                    url: SOCIAL_LINKS.linkedin,
                    color: "bg-blue-700",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white p-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center space-y-2`}
                  >
                    <div className="text-2xl">{social.icon}</div>
                    <span className="text-sm font-semibold">{social.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Visit Us */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Visit Our Showroom
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-secondary-900">Address</p>
                    <p className="text-secondary-600">{COMPANY_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaClock className="text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-secondary-900">Hours</p>
                    <p className="text-secondary-600">
                      {COMPANY_INFO.workingHours}
                    </p>
                    <p className="text-sm text-secondary-500 mt-1">
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="container-custom pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="aspect-video bg-secondary-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3164449893!2d38.76320631477929!3d9.02497709322478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SunShine Paint Location"
            ></iframe>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

// Contact Card Component
const ContactCard = ({ item }) => (
  <>
    <div
      className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 transition-transform`}
    >
      {item.icon}
    </div>
    <h3 className="text-lg font-bold text-secondary-900 mb-2">{item.title}</h3>
    <p className="text-secondary-600">{item.info}</p>
  </>
);

export default Contact;
