import React, { useState } from 'react';
import Image from 'next/image';

interface ImageMagnifierProps {
    src: string;
    className?: string;
    width?: number | undefined;
    height?: number | undefined;
    alt?: string;
    magnifierHeight?: number;
    magnifierWidth?: number;
    zoomLevel?: number;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
    src,
    className = '',
    width,
    height,
    alt = '',
    magnifierHeight = 150,
    magnifierWidth = 150,
    zoomLevel = 3
}) => {
    const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
    const [[imgWidth, imgHeight], setSize] = useState<[number, number]>([0, 0]);
    const [[x, y], setXY] = useState<[number, number]>([0, 0]);

    const mouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const { width, height } = el.getBoundingClientRect();
        setSize([width, height]);
        setShowMagnifier(true);
    };

    const mouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowMagnifier(false);
    };

    const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const { top, left } = el.getBoundingClientRect();

        const x = e.pageX - left - window.scrollX;
        const y = e.pageY - top - window.scrollY;

        setXY([x, y]);
    };

    return (
        <div className={"relative inline-block h-[60dvh] m-auto aspect-square " + className} style={{ width: width ?? "100%", height: height ?? "100%" }}>
            <div
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                onMouseMove={mouseMove}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={width ?? 800}  // Adjust width as needed
                    height={height ?? 600} // Adjust height as needed
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                    priority
                />
            </div>
            <div
                style={{
                    display: showMagnifier ? '' : 'none',
                    position: 'absolute',
                    pointerEvents: 'none',
                    height: `${magnifierHeight}px`,
                    width: `${magnifierWidth}px`,
                    opacity: '1',
                    border: '1px solid lightgrey',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    backgroundImage: `url('${src}')`,
                    backgroundRepeat: 'no-repeat',
                    top: `${y - magnifierHeight / 2}px`,
                    left: `${x - magnifierWidth / 2}px`,
                    backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
                    backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
                    backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
                }}
            />
        </div>
    );
};

export default ImageMagnifier;