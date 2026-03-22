import React from 'react';
const Image = React.forwardRef(({ fill, priority, quality, style, ...props }, ref) => {
    let combinedStyle = style || {};
    if (fill) {
        combinedStyle = {
            ...combinedStyle,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        };
    }
    return <img ref={ref} style={combinedStyle} loading={priority ? 'eager' : 'lazy'} {...props}/>;
});
Image.displayName = 'Image';
export default Image;
