import { useInView } from 'react-intersection-observer';

const FadeInSection = ({ children,playTime,delay}) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.1,    // Trigger when 10% of the element is visible
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate(0)' : 'translate(0,-12px)',
        transition: `opacity 0.6s ease-out ${delay + 0.15}s, transform ${playTime}s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;