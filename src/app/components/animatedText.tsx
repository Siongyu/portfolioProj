import { on } from "events";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

type AnimatedTextProps = {
    text: string | string[];
    element?: keyof JSX.IntrinsicElements;
    className?: string;
    once?: boolean;
    repeatDelay?: number;
    onComplete?: () => void;
    onExit?: () => void;
}

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
        }
    },
}


export const AnimatedText = ({
    text,
    element: Wrapper = "p",
    className,
    once,
    repeatDelay,
    onComplete,
    onExit,
} : AnimatedTextProps & { onComplete?: () => void; onExit?: () => void }) => {
    const controls = useAnimation();
    const textArray = Array.isArray(text) ? text : [text];
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once });

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const show = () => {
            controls.start("visible").then(() => {
                if (onComplete) {
                    onComplete();
                }
            });
            if (repeatDelay) {
                timeout = setTimeout(async () => {
                    await controls.start("hidden");
                    controls.start("visible");
                }, repeatDelay);
            }
        }

        if (isInView) {
            show();
        } else {
            controls.start("hidden");
            if (onExit) {
                onExit();
            }
        }
        
        return () => clearTimeout(timeout);
    }, [isInView, onComplete])

    return (
        <Wrapper className={className}>
            <span className="sr-only">{text}</span>
            <motion.span 
                ref={ref}
                initial="hidden" 
                animate={controls}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 }},
                    hidden: {}
                }} 
                aria-hidden
            > 
                {textArray.map((line)=> (
                    <span className="block">
                        {line.split(" ").map((word) => (
                            <span className="inline-block">
                                {word.split('').map((char) => (
                                    <motion.span className="inline-block" variants={defaultAnimations}>
                                        {char}
                                    </motion.span>
                                ))}
                                <span className="inline-block">&nbsp;</span>
                            </span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </Wrapper>
    )
}

export default AnimatedText;