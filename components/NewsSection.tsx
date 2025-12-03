"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function NewsSection() {
    const controls = useAnimation();

    const { ref, inView } = useInView({
        threshold: 0.35,
    });

    useEffect(() => {
        if (inView) {
            controls.start({
                y: 0,
                opacity: 1,
                transition: { duration: 0.8, ease: "easeOut" },
            });
        }
    }, [inView]);
    
    return (
        <motion.section
            ref={ref}
            initial={{ y: 150, opacity: 0 }}
            animate={controls}
            className="h-screen bg-white flex items-center justify-center text-5xl font-bold shadow-xl"
        >
            Section Two
        </motion.section>
    )
}