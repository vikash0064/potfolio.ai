import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
const Link = React.forwardRef(({ href, children, passHref, legacyBehavior, ...props }, ref) => {
    return (<RouterLink to={href} ref={ref} {...props}>
        {children}
      </RouterLink>);
});
Link.displayName = 'Link';
export default Link;
