import { useLocation, Link } from 'react-router-dom';
import { useState,useRef,useEffect } from 'react';

const SlideringLinks = () => {
  const location = useLocation();
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const linkRefs = useRef([]);
  const navRef = useRef(null);               

  const links = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Order', path: '/admin/order' },
    { name: 'Table', path: '/admin/table' },
    { name: 'POS', path: '/admin/pos' },
  ];

  function handleSliderLocation(){
    const activeIndex = links.findIndex((link) => link.path === location.pathname);
      console.log("Active index is here" + activeIndex);

      const currentLink = linkRefs.current[activeIndex];
      console.log("current link is: ");
      console.log(linkRefs.current[activeIndex]);

      if (currentLink) {
        setSliderStyle({
          left: currentLink.offsetLeft,
          width: currentLink.offsetWidth,
        });
      }
      else{
        //location is outside of main links, just move slide to the right out of links countainer
        setSliderStyle({
          left: 500,
          width: 100,
        });
      }
  }

  // Observe navbar container for size changes
  useEffect(() => {
    const navbar = navRef.current;
    if (!navbar) return;

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(handleSliderLocation);
    });

    resizeObserver.observe(navbar);

    return () => {
      resizeObserver.disconnect();
    };
  }, [location.pathname]);
  
  // Update slider position when location is chaged
  useEffect(() => {
      handleSliderLocation();
  }, [location.pathname]);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="slider" style={sliderStyle} />
      {links.map((link, index) => (
        <Link
          key={link.path}
          ref={(el) => (linkRefs.current[index] = el)}
          to={link.path}
          className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default SlideringLinks;

