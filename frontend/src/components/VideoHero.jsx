import { motion } from 'framer-motion';

const VideoHero = ({ videoSrc, icon: Icon, title, subtitle, bgGradient, iconGradient }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Text Content */}
      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center max-w-4xl mx-auto"
        >
          {Icon && (
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iconGradient} flex items-center justify-center`}>
                <Icon className="text-3xl text-white" />
              </div>
            </div>
          )}
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl text-white leading-relaxed drop-shadow-md">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoHero;
