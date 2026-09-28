import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Sparkles, ZoomIn } from 'lucide-react';
import loveConfig from '../config/loveConfig';

export default function Memories() {
  const { memories, memoriesHeading, memoriesSubheading } = loveConfig;
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [failedImageIds, setFailedImageIds] = useState(new Set());

  // Filter out any photo object where image is missing or empty string
  const validMemories = (memories || []).filter(
    (item) => item && item.image && typeof item.image === 'string' && item.image.trim() !== ''
  );

  // Exclude images that fail to load from display
  const displayMemories = validMemories.filter((item) => !failedImageIds.has(item.id));

  const handleImageError = (id) => {
    setFailedImageIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  // Slight tilt angles for polaroid feel
  const rotations = [-1.5, 2, -2, 1.5, -1, 2, -2, 1, -1.5, 2];

  // Lock background scroll when photo preview is open
  useEffect(() => {
    if (selectedMemory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMemory]);

  return (
    <section id="memories" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-28 z-10">
      <div className="max-w-6xl mx-auto w-full text-center">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-500/30 text-rose-300 font-cinzel text-xs tracking-widest uppercase">
            <Camera className="w-3.5 h-3.5 text-rose-400" />
            <span>Captured Moments</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white">
            {memoriesHeading}
          </h2>
          <p className="text-slate-300 font-light text-base sm:text-lg max-w-xl">
            {memoriesSubheading}
          </p>
        </motion.div>

        {/* Gallery Grid (Responsive 1 -> 2 -> 4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {displayMemories.map((item, index) => {
            const rot = rotations[index % rotations.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                style={{ transform: `rotate(${rot}deg)` }}
                onClick={() => setSelectedMemory(item)}
                className="group cursor-pointer bg-[#140b1f] p-4 rounded-2xl border border-rose-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_40px_rgba(225,29,72,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.caption}
                    onError={() => handleImageError(item.id)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-rose-200 font-medium px-3 py-1.5 rounded-full bg-rose-500/40 backdrop-blur-md">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>View Photo</span>
                    </span>
                  </div>
                </div>

                {/* Polaroid Caption */}
                <div className="text-center pt-1 px-1">
                  <p className="font-serif-romantic text-lg sm:text-xl text-rose-100 italic truncate">
                    "{item.caption}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full glass-panel border border-rose-500/30 rounded-3xl overflow-hidden p-6 sm:p-8 bg-[#12081c] shadow-[0_0_60px_rgba(225,29,72,0.4)] z-[110]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-1/2 aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 shadow-lg">
                  <img
                    src={selectedMemory.image}
                    alt={selectedMemory.caption}
                    onError={() => setSelectedMemory(null)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full sm:w-1/2 flex flex-col justify-center text-left space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs text-rose-400 font-cinzel tracking-widest uppercase">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Birthday Gallery Photo #{selectedMemory.id}</span>
                  </div>
                  <h3 className="font-serif-romantic text-2xl sm:text-3xl text-white italic font-medium">
                    "{selectedMemory.caption}"
                  </h3>
                  <div className="pt-3 border-t border-white/10 text-xs text-slate-300 font-light">
                    <span>Celebrated with love ❤️</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
