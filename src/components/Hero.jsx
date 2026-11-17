
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import heroImage from '../assets/hero img1.jpeg';
import heroImage2 from '../assets/hero img2.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative grid min-h-[570px] grid-cols-[0.8fr_1fr_1.1fr] items-center gap-8 overflow-hidden bg-[#F5DABF] px-[7%] pt-0 pb-8 max-[1000px]:grid-cols-[0.8fr_1.2fr] max-[1000px]:px-[5%] max-[650px]:grid-cols-1 max-[650px]:gap-7 max-[650px]:px-[5%] max-[650px]:pt-5 max-[650px]:pb-10"
    >
      {/* Left image */}
      <motion.div
        className="relative h-[350px] self-center overflow-hidden max-[1000px]:h-[310px] max-[650px]:hidden"
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={heroImage}
          alt="A collection of vintage stamps and paper collectibles"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-start px-1 text-left max-[650px]:order-1 max-[650px]:px-0">
        {/* <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6C151E]"
        >
          VIBGYOR EQUATOR
        </motion.p> */}

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.08 }}
          className="mb-5 font-[Cinzel] text-[clamp(38px,4.2vw,62px)] font-normal leading-[1.12] tracking-[-0.025em] text-[#0F3D3A] max-[650px]:text-[clamp(45px,12vw,65px)]"
        >
          Where rare
          <br />
          meets <em className="font-normal text-[#6C151E]">rare.</em>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.16 }}
          className="mb-7 max-w-[340px] text-[12px] leading-[1.9] text-[#43534B]"
        >
          Discover pieces that hold value, carry stories, and become
          personal in ways only you can see.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.23 }}
        >
          <Link
            to="/rare-finds/coins"
            className="inline-flex items-center gap-3 bg-[#6C151E] px-6 py-4 text-[10px] tracking-wide text-[#F5DABF] transition-colors duration-300 hover:bg-[#0F3D3A]"
          >
            Explore our collection
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="mt-10 flex w-full max-w-[340px] items-center justify-between border-t border-[#0F3D3A]/25 pt-4 text-[8px] tracking-[0.13em] text-[#52645A] max-[650px]:mt-8"
        >
          <span>19°04' N · 72°50' E</span>
          <span>MUMBAI, INDIA</span>
        </motion.div>
      </div>

      {/* Right image */}
      <motion.div
        className="relative h-[430px] min-w-0 overflow-hidden max-[1000px]:h-[380px] max-[650px]:order-2 max-[650px]:h-[340px]"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <img
          src={heroImage2}
          alt="An antique artwork with intricate details"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent px-5 pb-5 pt-16">
          <span className="text-[8px] tracking-[0.17em] text-white">
            VIBGYOR EQUATOR · CURATED FINDS
          </span>
        </div>
      </motion.div>
    </section>
  );
}
