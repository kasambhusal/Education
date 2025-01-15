import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Users, Briefcase } from 'lucide-react';

const trustItems = [
  { 
    icon: CheckCircle, 
    title: "Verified Opportunities", 
    description: "All listings are thoroughly vetted for authenticity and value." 
  },
  { 
    icon: Award, 
    title: "Expert-Curated Content", 
    description: "Study materials and guides created by field specialists." 
  },
  { 
    icon: Users, 
    title: "Thriving Community", 
    description: "Connect with peers and mentors for support and collaboration." 
  },
  { 
    icon: Briefcase, 
    title: "Career Advancement", 
    description: "Opportunities that boost your academic and professional profile." 
  }
];

export default function TrustSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-primary mb-4"
              >
                <item.icon size={48} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

