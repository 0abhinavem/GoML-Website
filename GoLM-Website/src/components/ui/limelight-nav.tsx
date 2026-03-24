'use client';
import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';

// --- Internal Types and Defaults ---

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>;
const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" /></svg>;
const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>;

export type NavItem = {
  id: string | number;
  icon?: React.ReactElement;
  label?: string;
  onClick?: () => void;
};

const defaultNavItems: NavItem[] = [
  { id: 'default-home', icon: <DefaultHomeIcon />, label: 'Home' },
  { id: 'default-explore', icon: <DefaultCompassIcon />, label: 'Explore' },
  { id: 'default-notifications', icon: <DefaultBellIcon />, label: 'Notifications' },
];

export type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 */
export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[displayIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [displayIndex, isReady, items]);

  if (items.length === 0) {
    return null; 
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-16 rounded-lg bg-transparent text-foreground px-2 ${className}`} onMouseLeave={() => setHoveredIndex(null)}>
      {items.map(({ id, icon, label, onClick }, index) => (
          <a
            key={id}
            ref={el => (navItemRefs.current[index] = el)}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-5 ${iconContainerClassName}`}
            onClick={() => handleItemClick(index, onClick)}
            onMouseEnter={() => setHoveredIndex(index)}
            aria-label={label}
          >
            {icon ? cloneElement(icon, {
              className: `w-6 h-6 transition-opacity duration-100 ease-in-out ${
                activeIndex === index ? 'opacity-100' : 'opacity-40'
              } ${icon.props.className || ''} ${iconClassName || ''}`,
            }) : <span className={`text-sm tracking-wide transition-opacity duration-300 font-display ${activeIndex === index ? 'opacity-100 font-medium' : 'opacity-60 hover:opacity-100 font-light'}`}>{label}</span>}
          </a>
      ))}

      <div 
        ref={limelightRef}
        className={`absolute bottom-2 z-10 w-16 h-[2px] rounded-full bg-white shadow-[0_5px_15px_rgba(255,255,255,1)] ${
          isReady ? 'transition-[left] duration-300 ease-in-out' : ''
        } ${limelightClassName}`}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-20%] top-[-10px] w-[140%] h-8 bg-white/20 blur-md pointer-events-none rounded-full" />
      </div>
    </nav>
  );
};
