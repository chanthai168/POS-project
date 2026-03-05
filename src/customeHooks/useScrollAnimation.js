import { useInView } from "react-intersection-observer";
const useScrollAnimation = (options = {}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    ...options
  });
  
  const animationClass = inView ? 'animate-visible' : 'animate-hidden';
  
  return { ref, inView, animationClass };
};
