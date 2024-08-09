import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";

const LottieConfetti = () => {
    const animationContainer = useRef(null);
    let animation = null;

    useEffect(() => {
        if (animationContainer.current) {
            animation = Lottie.loadAnimation({
                container: animationContainer.current,
                renderer: "svg",
                loop: false,
                autoplay: true,
                path: '/confetti.json'
            });
        }

        return () => {
            if (animation) {
                animation.destroy();
                animation = null;
            }
        };
    }, []);

    return <div className='absolute top-0 bottom-0 left-0 right-0 z-50 min-w-screen min-h-screen' ref={animationContainer}></div>;
};

export default LottieConfetti;