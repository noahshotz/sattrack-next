import * as React from "react";

interface SattrackIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const SattrackIcon: React.FC<SattrackIconProps> = ({ size = 24, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 892 892"
        {...props}
    >
        <path
            fill="#fff"
            d="M628.621 121.622H827.621V320.622H628.621z"
            transform="rotate(45 628.621 121.622)"
        ></path>
        <path
            fill="#fff"
            d="M325.979 181.019H870.066V386.019H325.979z"
            transform="rotate(45 325.979 181.019)"
        ></path>
        <path
            fill="#fff"
            d="M262.34 487.904H461.34V686.904H262.34z"
            transform="rotate(45 262.34 487.904)"
        ></path>
    </svg>
);

export default SattrackIcon;
