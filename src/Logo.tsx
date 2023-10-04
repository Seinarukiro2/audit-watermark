import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const Logo: React.FC<SvgIconProps> = (props) => {
    return (
        <SvgIcon {...props}>

            <svg xmlns="http://www.w3.org/2000/svg" width="290" height="345" version="1.1" viewBox="0 0 76.728 91.282">
                <g transform="matrix(.2857 0 0 .2857 71.408 28.262)" fill="white">
                    <path d="m-33.599 218.73v-22.192h-15.256c-26.315 0-38.393-15.643-38.393-38.665v-232.6h4.5246c49.283 0 80.582 32.707 80.582 80.797v4.3092h18.745v-107.3h-264.58v107.3h18.745v-4.3092c0-48.09 31.298-80.797 80.582-80.797h4.5246v232.6c0 23.022-12.078 38.665-38.393 38.665h-15.256v22.192z"/>
                    <path d="m16.603 111.43h-62.914v-63.129h62.914z"/>
                    <path d="m-185.07 111.43h-62.914v-63.129h62.914z"/>
                </g>
            </svg>

        </SvgIcon>
    );
};

export default Logo;
