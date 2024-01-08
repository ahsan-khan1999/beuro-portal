import { SVGIconProp } from "@/types";
import { combineClasses } from "@/utils/utility";

export const PdfIcon = ({ className, pathClass }: SVGIconProp) => {
    const classes = combineClasses("text-primary", className);

    return (
        <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg" className={classes}>
            <rect x="0.933594" y="1.44531" width="26.2781" height="26.1353" rx="6.5" stroke={pathClass} />
            <path d="M17.2767 16.9609H16.4691C16.1717 16.9609 15.9307 17.202 15.9307 17.4994V20.7299C15.9307 21.0273 16.1717 21.2684 16.4691 21.2684H17.2767C18.1674 21.2684 18.892 20.5437 18.892 19.6531V18.5762C18.892 17.6856 18.1674 16.9609 17.2767 16.9609ZM17.8152 19.6531C17.8152 19.95 17.5736 20.1915 17.2767 20.1915H17.0075V18.0378H17.2767C17.5736 18.0378 17.8152 18.2793 17.8152 18.5762V19.6531Z" fill={pathClass} />
            <path d="M21.5878 16.9609H19.9725C19.6751 16.9609 19.4341 17.202 19.4341 17.4994V20.7299C19.4341 21.0273 19.6751 21.2684 19.9725 21.2684C20.2699 21.2684 20.5109 21.0273 20.5109 20.7299V19.6531H21.0494C21.3467 19.6531 21.5878 19.412 21.5878 19.1147C21.5878 18.8173 21.3467 18.5762 21.0494 18.5762H20.5109V18.0378H21.5878C21.8852 18.0378 22.1262 17.7967 22.1262 17.4994C22.1262 17.202 21.8852 16.9609 21.5878 16.9609Z" fill={pathClass} />
            <path d="M14.0455 16.9609H12.9686C12.6712 16.9609 12.4302 17.202 12.4302 17.4994V20.7299C12.4302 21.0273 12.6712 21.2684 12.9686 21.2684C13.266 21.2684 13.507 21.0273 13.507 20.7299V19.6531H14.0455C14.7877 19.6531 15.3915 19.0492 15.3915 18.307C15.3915 17.5648 14.7877 16.9609 14.0455 16.9609ZM14.0455 18.5762H13.507V18.0378H14.0455C14.1939 18.0378 14.3147 18.1586 14.3147 18.307C14.3147 18.4555 14.1939 18.5762 14.0455 18.5762Z" fill={pathClass} />
            <path d="M18.9504 10.8724L15.7202 7.64213C15.7142 7.63815 15.5737 7.48438 15.3394 7.48438H9.95513C9.06446 7.48438 8.33984 8.20899 8.33984 9.09966V19.6529C8.33984 20.5435 9.06446 21.2681 9.95513 21.2681H11.032C11.3294 21.2681 11.5704 21.0271 11.5704 20.7297C11.5704 20.4323 11.3294 20.1913 11.032 20.1913H9.95513C9.65824 20.1913 9.4167 19.9497 9.4167 19.6529V9.09966C9.4167 8.80277 9.65824 8.56123 9.95513 8.56123H14.801V10.1765C14.801 11.0672 15.5256 11.7918 16.4163 11.7918H18.0316V15.5608C18.0316 15.8582 18.2726 16.0992 18.57 16.0992C18.8674 16.0992 19.1084 15.8582 19.1084 15.5608V11.2533C19.1084 11.112 19.0507 10.9722 18.9504 10.8724ZM16.4163 10.7149C16.1194 10.7149 15.8778 10.4734 15.8778 10.1765V9.32268L17.2701 10.7149H16.4163Z" fill={pathClass} />
            <path d="M15.7871 14.3774H14.9905L14.1115 12.855L14.5098 12.1651C14.6728 11.8828 14.6728 11.5457 14.5098 11.2634C14.3468 10.9811 14.0549 10.8125 13.7289 10.8125C13.4029 10.8125 13.111 10.981 12.948 11.2634C12.785 11.5457 12.785 11.8828 12.948 12.1651L13.3463 12.855L12.4673 14.3774H11.6707C11.3447 14.3774 11.0528 14.546 10.8898 14.8283C10.7268 15.1106 10.7268 15.4477 10.8898 15.73C11.0528 16.0123 11.3447 16.1808 11.6707 16.1808H11.6707C11.9967 16.1808 12.2887 16.0123 12.4516 15.73L12.85 15.0401H14.6079L15.0062 15.73C15.1692 16.0123 15.4612 16.1808 15.7871 16.1808C16.1131 16.1808 16.405 16.0123 16.568 15.73C16.731 15.4477 16.731 15.1106 16.568 14.8283C16.405 14.546 16.1131 14.3774 15.7871 14.3774ZM11.8778 15.3987C11.8155 15.5065 11.7122 15.5182 11.6707 15.5182C11.6292 15.5182 11.526 15.5066 11.4637 15.3987C11.4014 15.2908 11.443 15.1955 11.4637 15.1596C11.4845 15.1237 11.5461 15.0401 11.6707 15.0401H12.0848L11.8778 15.3987ZM13.5219 11.5947C13.5426 11.5588 13.6044 11.4752 13.7289 11.4752C13.8535 11.4752 13.9152 11.5587 13.936 11.5947C13.9567 11.6306 13.9983 11.7259 13.936 11.8338L13.7289 12.1923L13.5219 11.8338C13.4596 11.7259 13.5012 11.6306 13.5219 11.5947ZM13.2325 14.3774L13.7289 13.5177L14.2253 14.3774H13.2325ZM15.9942 15.3987C15.9319 15.5065 15.8286 15.5182 15.7871 15.5182C15.7456 15.5182 15.6424 15.5066 15.5801 15.3987L15.3731 15.0401H15.7871C15.9117 15.0401 15.9734 15.1237 15.9942 15.1596C16.0149 15.1955 16.0564 15.2908 15.9942 15.3987Z" fill={pathClass} />
        </svg>

    );
};
