import React from "react";
import { Button } from "@/base-components/ui/button/button";
import diamondIcon from "@/assets/svgs/diamond-plan-icon.svg";
import Image from "next/image";

const Cards = ({ planTime, setPlanTime }:any) => {
  const PricingPlanCards = [
    {
      planName: "Silver",
      planIcon: diamondIcon,

      priceMonth: 0,
      priceYear: 10,
      description: "Lorem ipsum dollar smith sil dolem isplum sumip alpsum.",

      planDetails: [
        {
          icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M6.42934 0.956543C3.31825 0.956543 0.787109 3.48768 0.787109 6.59878C0.787109 9.70987 3.31825 12.241 6.42934 12.241C9.54044 12.241 12.0716 9.70987 12.0716 6.59878C12.0716 3.48768 9.54044 0.956543 6.42934 0.956543ZM9.36574 4.70781L5.71999 9.04799C5.68 9.09563 5.63024 9.13411 5.57408 9.16083C5.51792 9.18756 5.45667 9.2019 5.39448 9.20288H5.38716C5.32632 9.20286 5.26617 9.19005 5.21061 9.16528C5.15505 9.14052 5.10531 9.10434 5.06463 9.05912L3.50216 7.32304C3.46248 7.28096 3.43161 7.23136 3.41137 7.17717C3.39113 7.12299 3.38193 7.0653 3.3843 7.00751C3.38667 6.94971 3.40057 6.89297 3.42519 6.84063C3.4498 6.78828 3.48463 6.74138 3.52763 6.70269C3.57062 6.664 3.62092 6.63429 3.67556 6.61531C3.73021 6.59633 3.78809 6.58847 3.84581 6.59218C3.90354 6.5959 3.95994 6.61111 4.0117 6.63693C4.06346 6.66275 4.10954 6.69866 4.14722 6.74254L5.37576 8.10753L8.70116 4.14956C8.77575 4.06332 8.88128 4.0099 8.99494 4.00084C9.10861 3.99178 9.22127 4.02782 9.30858 4.10116C9.39588 4.17449 9.45082 4.27925 9.46152 4.39277C9.47222 4.50629 9.43781 4.61946 9.36574 4.70781Z"/></svg>',
          text: "20 Requests",
        },
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M12.0714 6.52496C12.0714 9.64102 9.54532 12.1671 6.42925 12.1671C3.31318 12.1671 0.787109 9.64102 0.787109 6.52496C0.787109 3.40889 3.31318 0.882812 6.42925 0.882812C9.54532 0.882812 12.0714 3.40889 12.0714 6.52496Z"  /><path class="group-hover:fill-primary fill-white" fillRule="evenodd" clipRule="evenodd" d="M8.63766 4.31685C8.80051 4.47971 8.80051 4.74376 8.63766 4.90662L4.81122 8.73306C4.64836 8.89592 4.38431 8.89592 4.22145 8.73306C4.05859 8.5702 4.05859 8.30615 4.22145 8.14329L8.04789 4.31685C8.21075 4.154 8.4748 4.154 8.63766 4.31685Z"  /><path class="group-hover:fill-primary fill-white" fillRule="evenodd" clipRule="evenodd" d="M8.63773 8.73287C8.47488 8.89573 8.21083 8.89573 8.04797 8.73287L4.22153 4.90643C4.05867 4.74357 4.05867 4.47953 4.22153 4.31667C4.38439 4.15381 4.64844 4.15381 4.8113 4.31667L8.63773 8.14311C8.80059 8.30596 8.80059 8.57001 8.63773 8.73287Z"  /></svg>',
          text: "0 Managers",
        },
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M12.0714 6.52496C12.0714 9.64102 9.54532 12.1671 6.42925 12.1671C3.31318 12.1671 0.787109 9.64102 0.787109 6.52496C0.787109 3.40889 3.31318 0.882812 6.42925 0.882812C9.54532 0.882812 12.0714 3.40889 12.0714 6.52496Z"  /><path class="group-hover:fill-primary fill-white" fillRule="evenodd" clipRule="evenodd" d="M8.63766 4.31685C8.80051 4.47971 8.80051 4.74376 8.63766 4.90662L4.81122 8.73306C4.64836 8.89592 4.38431 8.89592 4.22145 8.73306C4.05859 8.5702 4.05859 8.30615 4.22145 8.14329L8.04789 4.31685C8.21075 4.154 8.4748 4.154 8.63766 4.31685Z"  /><path class="group-hover:fill-primary fill-white" fillRule="evenodd" clipRule="evenodd" d="M8.63773 8.73287C8.47488 8.89573 8.21083 8.89573 8.04797 8.73287L4.22153 4.90643C4.05867 4.74357 4.05867 4.47953 4.22153 4.31667C4.38439 4.15381 4.64844 4.15381 4.8113 4.31667L8.63773 8.14311C8.80059 8.30596 8.80059 8.57001 8.63773 8.73287Z"  /></svg>',
          text: "0 Accounting Reports",
        },
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M12.0714 6.52496C12.0714 9.64102 9.54532 12.1671 6.42925 12.1671C3.31318 12.1671 0.787109 9.64102 0.787109 6.52496C0.787109 3.40889 3.31318 0.882812 6.42925 0.882812C9.54532 0.882812 12.0714 3.40889 12.0714 6.52496Z"  /><path class="group-hover:fill-primary fill-white" fillRule="evenodd" clipRule="evenodd" d="M8.63766 4.31685C8.80051 4.47971 8.80051 4.74376 8.63766 4.90662L4.81122 8.73306C4.64836 8.89592 4.38431 8.89592 4.22145 8.73306C4.05859 8.5702 4.05859 8.30615 4.22145 8.14329L8.04789 4.31685C8.21075 4.154 8.4748 4.154 8.63766 4.31685Z"  /><path class="group-hover:fill-primary fill-white" fillRule="evenodd" clipRule="evenodd" d="M8.63773 8.73287C8.47488 8.89573 8.21083 8.89573 8.04797 8.73287L4.22153 4.90643C4.05867 4.74357 4.05867 4.47953 4.22153 4.31667C4.38439 4.15381 4.64844 4.15381 4.8113 4.31667L8.63773 8.14311C8.80059 8.30596 8.80059 8.57001 8.63773 8.73287Z"  /></svg>',
          text: "0 Customize Emails",
        },
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M12.0714 6.52496C12.0714 9.64102 9.54532 12.1671 6.42925 12.1671C3.31318 12.1671 0.787109 9.64102 0.787109 6.52496C0.787109 3.40889 3.31318 0.882812 6.42925 0.882812C9.54532 0.882812 12.0714 3.40889 12.0714 6.52496Z"  /><path class="group-hover:fill-primary fill-white" fillRule="evenodd" clipRule="evenodd" d="M8.63766 4.31685C8.80051 4.47971 8.80051 4.74376 8.63766 4.90662L4.81122 8.73306C4.64836 8.89592 4.38431 8.89592 4.22145 8.73306C4.05859 8.5702 4.05859 8.30615 4.22145 8.14329L8.04789 4.31685C8.21075 4.154 8.4748 4.154 8.63766 4.31685Z"  /><path class="group-hover:fill-primary fill-white" fillRule="evenodd" clipRule="evenodd" d="M8.63773 8.73287C8.47488 8.89573 8.21083 8.89573 8.04797 8.73287L4.22153 4.90643C4.05867 4.74357 4.05867 4.47953 4.22153 4.31667C4.38439 4.15381 4.64844 4.15381 4.8113 4.31667L8.63773 8.14311C8.80059 8.30596 8.80059 8.57001 8.63773 8.73287Z"  /></svg>',
          text: "With Watermark",
        },
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M12.0714 6.52496C12.0714 9.64102 9.54532 12.1671 6.42925 12.1671C3.31318 12.1671 0.787109 9.64102 0.787109 6.52496C0.787109 3.40889 3.31318 0.882812 6.42925 0.882812C9.54532 0.882812 12.0714 3.40889 12.0714 6.52496Z"  /><path class="group-hover:fill-primary fill-white" fillRule="evenodd" clipRule="evenodd" d="M8.63766 4.31685C8.80051 4.47971 8.80051 4.74376 8.63766 4.90662L4.81122 8.73306C4.64836 8.89592 4.38431 8.89592 4.22145 8.73306C4.05859 8.5702 4.05859 8.30615 4.22145 8.14329L8.04789 4.31685C8.21075 4.154 8.4748 4.154 8.63766 4.31685Z"  /><path class="group-hover:fill-primary fill-white" fillRule="evenodd" clipRule="evenodd" d="M8.63773 8.73287C8.47488 8.89573 8.21083 8.89573 8.04797 8.73287L4.22153 4.90643C4.05867 4.74357 4.05867 4.47953 4.22153 4.31667C4.38439 4.15381 4.64844 4.15381 4.8113 4.31667L8.63773 8.14311C8.80059 8.30596 8.80059 8.57001 8.63773 8.73287Z"  /></svg>',
          text: "No API Feature",
        },
      ],
    },
    {
      planName: "Gold",
      planIcon: diamondIcon,

      priceMonth: 29,
      priceYear: 40,
      description: "Lorem ipsum dollar smith sil dolem isplum sumip alpsum.",

      planDetails: [
        {
          icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M6.42934 0.956543C3.31825 0.956543 0.787109 3.48768 0.787109 6.59878C0.787109 9.70987 3.31825 12.241 6.42934 12.241C9.54044 12.241 12.0716 9.70987 12.0716 6.59878C12.0716 3.48768 9.54044 0.956543 6.42934 0.956543ZM9.36574 4.70781L5.71999 9.04799C5.68 9.09563 5.63024 9.13411 5.57408 9.16083C5.51792 9.18756 5.45667 9.2019 5.39448 9.20288H5.38716C5.32632 9.20286 5.26617 9.19005 5.21061 9.16528C5.15505 9.14052 5.10531 9.10434 5.06463 9.05912L3.50216 7.32304C3.46248 7.28096 3.43161 7.23136 3.41137 7.17717C3.39113 7.12299 3.38193 7.0653 3.3843 7.00751C3.38667 6.94971 3.40057 6.89297 3.42519 6.84063C3.4498 6.78828 3.48463 6.74138 3.52763 6.70269C3.57062 6.664 3.62092 6.63429 3.67556 6.61531C3.73021 6.59633 3.78809 6.58847 3.84581 6.59218C3.90354 6.5959 3.95994 6.61111 4.0117 6.63693C4.06346 6.66275 4.10954 6.69866 4.14722 6.74254L5.37576 8.10753L8.70116 4.14956C8.77575 4.06332 8.88128 4.0099 8.99494 4.00084C9.10861 3.99178 9.22127 4.02782 9.30858 4.10116C9.39588 4.17449 9.45082 4.27925 9.46152 4.39277C9.47222 4.50629 9.43781 4.61946 9.36574 4.70781Z"/></svg>',
          text: "200 Requests",
        },
        {
          icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M6.42934 0.956543C3.31825 0.956543 0.787109 3.48768 0.787109 6.59878C0.787109 9.70987 3.31825 12.241 6.42934 12.241C9.54044 12.241 12.0716 9.70987 12.0716 6.59878C12.0716 3.48768 9.54044 0.956543 6.42934 0.956543ZM9.36574 4.70781L5.71999 9.04799C5.68 9.09563 5.63024 9.13411 5.57408 9.16083C5.51792 9.18756 5.45667 9.2019 5.39448 9.20288H5.38716C5.32632 9.20286 5.26617 9.19005 5.21061 9.16528C5.15505 9.14052 5.10531 9.10434 5.06463 9.05912L3.50216 7.32304C3.46248 7.28096 3.43161 7.23136 3.41137 7.17717C3.39113 7.12299 3.38193 7.0653 3.3843 7.00751C3.38667 6.94971 3.40057 6.89297 3.42519 6.84063C3.4498 6.78828 3.48463 6.74138 3.52763 6.70269C3.57062 6.664 3.62092 6.63429 3.67556 6.61531C3.73021 6.59633 3.78809 6.58847 3.84581 6.59218C3.90354 6.5959 3.95994 6.61111 4.0117 6.63693C4.06346 6.66275 4.10954 6.69866 4.14722 6.74254L5.37576 8.10753L8.70116 4.14956C8.77575 4.06332 8.88128 4.0099 8.99494 4.00084C9.10861 3.99178 9.22127 4.02782 9.30858 4.10116C9.39588 4.17449 9.45082 4.27925 9.46152 4.39277C9.47222 4.50629 9.43781 4.61946 9.36574 4.70781Z"/></svg>',
          text: "2 Managers",
        },
        {
          icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M6.42934 0.956543C3.31825 0.956543 0.787109 3.48768 0.787109 6.59878C0.787109 9.70987 3.31825 12.241 6.42934 12.241C9.54044 12.241 12.0716 9.70987 12.0716 6.59878C12.0716 3.48768 9.54044 0.956543 6.42934 0.956543ZM9.36574 4.70781L5.71999 9.04799C5.68 9.09563 5.63024 9.13411 5.57408 9.16083C5.51792 9.18756 5.45667 9.2019 5.39448 9.20288H5.38716C5.32632 9.20286 5.26617 9.19005 5.21061 9.16528C5.15505 9.14052 5.10531 9.10434 5.06463 9.05912L3.50216 7.32304C3.46248 7.28096 3.43161 7.23136 3.41137 7.17717C3.39113 7.12299 3.38193 7.0653 3.3843 7.00751C3.38667 6.94971 3.40057 6.89297 3.42519 6.84063C3.4498 6.78828 3.48463 6.74138 3.52763 6.70269C3.57062 6.664 3.62092 6.63429 3.67556 6.61531C3.73021 6.59633 3.78809 6.58847 3.84581 6.59218C3.90354 6.5959 3.95994 6.61111 4.0117 6.63693C4.06346 6.66275 4.10954 6.69866 4.14722 6.74254L5.37576 8.10753L8.70116 4.14956C8.77575 4.06332 8.88128 4.0099 8.99494 4.00084C9.10861 3.99178 9.22127 4.02782 9.30858 4.10116C9.39588 4.17449 9.45082 4.27925 9.46152 4.39277C9.47222 4.50629 9.43781 4.61946 9.36574 4.70781Z"/></svg>',
          text: "Accounting Reports",
        },
        {
          icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M6.42934 0.956543C3.31825 0.956543 0.787109 3.48768 0.787109 6.59878C0.787109 9.70987 3.31825 12.241 6.42934 12.241C9.54044 12.241 12.0716 9.70987 12.0716 6.59878C12.0716 3.48768 9.54044 0.956543 6.42934 0.956543ZM9.36574 4.70781L5.71999 9.04799C5.68 9.09563 5.63024 9.13411 5.57408 9.16083C5.51792 9.18756 5.45667 9.2019 5.39448 9.20288H5.38716C5.32632 9.20286 5.26617 9.19005 5.21061 9.16528C5.15505 9.14052 5.10531 9.10434 5.06463 9.05912L3.50216 7.32304C3.46248 7.28096 3.43161 7.23136 3.41137 7.17717C3.39113 7.12299 3.38193 7.0653 3.3843 7.00751C3.38667 6.94971 3.40057 6.89297 3.42519 6.84063C3.4498 6.78828 3.48463 6.74138 3.52763 6.70269C3.57062 6.664 3.62092 6.63429 3.67556 6.61531C3.73021 6.59633 3.78809 6.58847 3.84581 6.59218C3.90354 6.5959 3.95994 6.61111 4.0117 6.63693C4.06346 6.66275 4.10954 6.69866 4.14722 6.74254L5.37576 8.10753L8.70116 4.14956C8.77575 4.06332 8.88128 4.0099 8.99494 4.00084C9.10861 3.99178 9.22127 4.02782 9.30858 4.10116C9.39588 4.17449 9.45082 4.27925 9.46152 4.39277C9.47222 4.50629 9.43781 4.61946 9.36574 4.70781Z"/></svg>',
          text: "Customize Email ",
        },
        {
          icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M6.42934 0.956543C3.31825 0.956543 0.787109 3.48768 0.787109 6.59878C0.787109 9.70987 3.31825 12.241 6.42934 12.241C9.54044 12.241 12.0716 9.70987 12.0716 6.59878C12.0716 3.48768 9.54044 0.956543 6.42934 0.956543ZM9.36574 4.70781L5.71999 9.04799C5.68 9.09563 5.63024 9.13411 5.57408 9.16083C5.51792 9.18756 5.45667 9.2019 5.39448 9.20288H5.38716C5.32632 9.20286 5.26617 9.19005 5.21061 9.16528C5.15505 9.14052 5.10531 9.10434 5.06463 9.05912L3.50216 7.32304C3.46248 7.28096 3.43161 7.23136 3.41137 7.17717C3.39113 7.12299 3.38193 7.0653 3.3843 7.00751C3.38667 6.94971 3.40057 6.89297 3.42519 6.84063C3.4498 6.78828 3.48463 6.74138 3.52763 6.70269C3.57062 6.664 3.62092 6.63429 3.67556 6.61531C3.73021 6.59633 3.78809 6.58847 3.84581 6.59218C3.90354 6.5959 3.95994 6.61111 4.0117 6.63693C4.06346 6.66275 4.10954 6.69866 4.14722 6.74254L5.37576 8.10753L8.70116 4.14956C8.77575 4.06332 8.88128 4.0099 8.99494 4.00084C9.10861 3.99178 9.22127 4.02782 9.30858 4.10116C9.39588 4.17449 9.45082 4.27925 9.46152 4.39277C9.47222 4.50629 9.43781 4.61946 9.36574 4.70781Z"/></svg>',
          text: "Without Watermark",
        },
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M12.0714 6.52496C12.0714 9.64102 9.54532 12.1671 6.42925 12.1671C3.31318 12.1671 0.787109 9.64102 0.787109 6.52496C0.787109 3.40889 3.31318 0.882812 6.42925 0.882812C9.54532 0.882812 12.0714 3.40889 12.0714 6.52496Z"  /><path class="group-hover:fill-primary fill-white" fillRule="evenodd" clipRule="evenodd" d="M8.63766 4.31685C8.80051 4.47971 8.80051 4.74376 8.63766 4.90662L4.81122 8.73306C4.64836 8.89592 4.38431 8.89592 4.22145 8.73306C4.05859 8.5702 4.05859 8.30615 4.22145 8.14329L8.04789 4.31685C8.21075 4.154 8.4748 4.154 8.63766 4.31685Z"  /><path class="group-hover:fill-primary fill-white" fillRule="evenodd" clipRule="evenodd" d="M8.63773 8.73287C8.47488 8.89573 8.21083 8.89573 8.04797 8.73287L4.22153 4.90643C4.05867 4.74357 4.05867 4.47953 4.22153 4.31667C4.38439 4.15381 4.64844 4.15381 4.8113 4.31667L8.63773 8.14311C8.80059 8.30596 8.80059 8.57001 8.63773 8.73287Z"  /></svg>',
          text: "No API Feature",
        },
      ],
    },
    {
      planName: "Diamond",
      planIcon: diamondIcon,

      priceMonth: 49,
      priceYear: 60,
      description: "Lorem ipsum dollar smith sil dolem isplum sumip alpsum.",

      planDetails: [
        {
          icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M6.42934 0.956543C3.31825 0.956543 0.787109 3.48768 0.787109 6.59878C0.787109 9.70987 3.31825 12.241 6.42934 12.241C9.54044 12.241 12.0716 9.70987 12.0716 6.59878C12.0716 3.48768 9.54044 0.956543 6.42934 0.956543ZM9.36574 4.70781L5.71999 9.04799C5.68 9.09563 5.63024 9.13411 5.57408 9.16083C5.51792 9.18756 5.45667 9.2019 5.39448 9.20288H5.38716C5.32632 9.20286 5.26617 9.19005 5.21061 9.16528C5.15505 9.14052 5.10531 9.10434 5.06463 9.05912L3.50216 7.32304C3.46248 7.28096 3.43161 7.23136 3.41137 7.17717C3.39113 7.12299 3.38193 7.0653 3.3843 7.00751C3.38667 6.94971 3.40057 6.89297 3.42519 6.84063C3.4498 6.78828 3.48463 6.74138 3.52763 6.70269C3.57062 6.664 3.62092 6.63429 3.67556 6.61531C3.73021 6.59633 3.78809 6.58847 3.84581 6.59218C3.90354 6.5959 3.95994 6.61111 4.0117 6.63693C4.06346 6.66275 4.10954 6.69866 4.14722 6.74254L5.37576 8.10753L8.70116 4.14956C8.77575 4.06332 8.88128 4.0099 8.99494 4.00084C9.10861 3.99178 9.22127 4.02782 9.30858 4.10116C9.39588 4.17449 9.45082 4.27925 9.46152 4.39277C9.47222 4.50629 9.43781 4.61946 9.36574 4.70781Z"/></svg>',
          text: "1000 Requests",
        },
        {
          icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M6.42934 0.956543C3.31825 0.956543 0.787109 3.48768 0.787109 6.59878C0.787109 9.70987 3.31825 12.241 6.42934 12.241C9.54044 12.241 12.0716 9.70987 12.0716 6.59878C12.0716 3.48768 9.54044 0.956543 6.42934 0.956543ZM9.36574 4.70781L5.71999 9.04799C5.68 9.09563 5.63024 9.13411 5.57408 9.16083C5.51792 9.18756 5.45667 9.2019 5.39448 9.20288H5.38716C5.32632 9.20286 5.26617 9.19005 5.21061 9.16528C5.15505 9.14052 5.10531 9.10434 5.06463 9.05912L3.50216 7.32304C3.46248 7.28096 3.43161 7.23136 3.41137 7.17717C3.39113 7.12299 3.38193 7.0653 3.3843 7.00751C3.38667 6.94971 3.40057 6.89297 3.42519 6.84063C3.4498 6.78828 3.48463 6.74138 3.52763 6.70269C3.57062 6.664 3.62092 6.63429 3.67556 6.61531C3.73021 6.59633 3.78809 6.58847 3.84581 6.59218C3.90354 6.5959 3.95994 6.61111 4.0117 6.63693C4.06346 6.66275 4.10954 6.69866 4.14722 6.74254L5.37576 8.10753L8.70116 4.14956C8.77575 4.06332 8.88128 4.0099 8.99494 4.00084C9.10861 3.99178 9.22127 4.02782 9.30858 4.10116C9.39588 4.17449 9.45082 4.27925 9.46152 4.39277C9.47222 4.50629 9.43781 4.61946 9.36574 4.70781Z"/></svg>',
          text: "5 Managers",
        },
        {
          icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M6.42934 0.956543C3.31825 0.956543 0.787109 3.48768 0.787109 6.59878C0.787109 9.70987 3.31825 12.241 6.42934 12.241C9.54044 12.241 12.0716 9.70987 12.0716 6.59878C12.0716 3.48768 9.54044 0.956543 6.42934 0.956543ZM9.36574 4.70781L5.71999 9.04799C5.68 9.09563 5.63024 9.13411 5.57408 9.16083C5.51792 9.18756 5.45667 9.2019 5.39448 9.20288H5.38716C5.32632 9.20286 5.26617 9.19005 5.21061 9.16528C5.15505 9.14052 5.10531 9.10434 5.06463 9.05912L3.50216 7.32304C3.46248 7.28096 3.43161 7.23136 3.41137 7.17717C3.39113 7.12299 3.38193 7.0653 3.3843 7.00751C3.38667 6.94971 3.40057 6.89297 3.42519 6.84063C3.4498 6.78828 3.48463 6.74138 3.52763 6.70269C3.57062 6.664 3.62092 6.63429 3.67556 6.61531C3.73021 6.59633 3.78809 6.58847 3.84581 6.59218C3.90354 6.5959 3.95994 6.61111 4.0117 6.63693C4.06346 6.66275 4.10954 6.69866 4.14722 6.74254L5.37576 8.10753L8.70116 4.14956C8.77575 4.06332 8.88128 4.0099 8.99494 4.00084C9.10861 3.99178 9.22127 4.02782 9.30858 4.10116C9.39588 4.17449 9.45082 4.27925 9.46152 4.39277C9.47222 4.50629 9.43781 4.61946 9.36574 4.70781Z"/></svg>',
          text: "Accounting Reports",
        },
        {
          icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M6.42934 0.956543C3.31825 0.956543 0.787109 3.48768 0.787109 6.59878C0.787109 9.70987 3.31825 12.241 6.42934 12.241C9.54044 12.241 12.0716 9.70987 12.0716 6.59878C12.0716 3.48768 9.54044 0.956543 6.42934 0.956543ZM9.36574 4.70781L5.71999 9.04799C5.68 9.09563 5.63024 9.13411 5.57408 9.16083C5.51792 9.18756 5.45667 9.2019 5.39448 9.20288H5.38716C5.32632 9.20286 5.26617 9.19005 5.21061 9.16528C5.15505 9.14052 5.10531 9.10434 5.06463 9.05912L3.50216 7.32304C3.46248 7.28096 3.43161 7.23136 3.41137 7.17717C3.39113 7.12299 3.38193 7.0653 3.3843 7.00751C3.38667 6.94971 3.40057 6.89297 3.42519 6.84063C3.4498 6.78828 3.48463 6.74138 3.52763 6.70269C3.57062 6.664 3.62092 6.63429 3.67556 6.61531C3.73021 6.59633 3.78809 6.58847 3.84581 6.59218C3.90354 6.5959 3.95994 6.61111 4.0117 6.63693C4.06346 6.66275 4.10954 6.69866 4.14722 6.74254L5.37576 8.10753L8.70116 4.14956C8.77575 4.06332 8.88128 4.0099 8.99494 4.00084C9.10861 3.99178 9.22127 4.02782 9.30858 4.10116C9.39588 4.17449 9.45082 4.27925 9.46152 4.39277C9.47222 4.50629 9.43781 4.61946 9.36574 4.70781Z"/></svg>',
          text: "Customize Email ",
        },
        {
          icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M6.42934 0.956543C3.31825 0.956543 0.787109 3.48768 0.787109 6.59878C0.787109 9.70987 3.31825 12.241 6.42934 12.241C9.54044 12.241 12.0716 9.70987 12.0716 6.59878C12.0716 3.48768 9.54044 0.956543 6.42934 0.956543ZM9.36574 4.70781L5.71999 9.04799C5.68 9.09563 5.63024 9.13411 5.57408 9.16083C5.51792 9.18756 5.45667 9.2019 5.39448 9.20288H5.38716C5.32632 9.20286 5.26617 9.19005 5.21061 9.16528C5.15505 9.14052 5.10531 9.10434 5.06463 9.05912L3.50216 7.32304C3.46248 7.28096 3.43161 7.23136 3.41137 7.17717C3.39113 7.12299 3.38193 7.0653 3.3843 7.00751C3.38667 6.94971 3.40057 6.89297 3.42519 6.84063C3.4498 6.78828 3.48463 6.74138 3.52763 6.70269C3.57062 6.664 3.62092 6.63429 3.67556 6.61531C3.73021 6.59633 3.78809 6.58847 3.84581 6.59218C3.90354 6.5959 3.95994 6.61111 4.0117 6.63693C4.06346 6.66275 4.10954 6.69866 4.14722 6.74254L5.37576 8.10753L8.70116 4.14956C8.77575 4.06332 8.88128 4.0099 8.99494 4.00084C9.10861 3.99178 9.22127 4.02782 9.30858 4.10116C9.39588 4.17449 9.45082 4.27925 9.46152 4.39277C9.47222 4.50629 9.43781 4.61946 9.36574 4.70781Z"/></svg>',
          text: "Without Watermark",
        },
        {
          icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path class="fill-[#393939] group-hover:fill-white" d="M6.42934 0.956543C3.31825 0.956543 0.787109 3.48768 0.787109 6.59878C0.787109 9.70987 3.31825 12.241 6.42934 12.241C9.54044 12.241 12.0716 9.70987 12.0716 6.59878C12.0716 3.48768 9.54044 0.956543 6.42934 0.956543ZM9.36574 4.70781L5.71999 9.04799C5.68 9.09563 5.63024 9.13411 5.57408 9.16083C5.51792 9.18756 5.45667 9.2019 5.39448 9.20288H5.38716C5.32632 9.20286 5.26617 9.19005 5.21061 9.16528C5.15505 9.14052 5.10531 9.10434 5.06463 9.05912L3.50216 7.32304C3.46248 7.28096 3.43161 7.23136 3.41137 7.17717C3.39113 7.12299 3.38193 7.0653 3.3843 7.00751C3.38667 6.94971 3.40057 6.89297 3.42519 6.84063C3.4498 6.78828 3.48463 6.74138 3.52763 6.70269C3.57062 6.664 3.62092 6.63429 3.67556 6.61531C3.73021 6.59633 3.78809 6.58847 3.84581 6.59218C3.90354 6.5959 3.95994 6.61111 4.0117 6.63693C4.06346 6.66275 4.10954 6.69866 4.14722 6.74254L5.37576 8.10753L8.70116 4.14956C8.77575 4.06332 8.88128 4.0099 8.99494 4.00084C9.10861 3.99178 9.22127 4.02782 9.30858 4.10116C9.39588 4.17449 9.45082 4.27925 9.46152 4.39277C9.47222 4.50629 9.43781 4.61946 9.36574 4.70781Z"/></svg>',
          text: "API Feature",
        },
      ],
    },
  ];
  return (
    <div className="grid xl:grid-cols-3 xl:gap-x-5 xl:gap-y-0 gap-y-8 mt-8">
      {PricingPlanCards.map((item, index) => {
        return (
          <div
            key={index}
            className=" mx-auto cursor-pointer rounded-[14px] transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
          >
            <div className="pricing-card-shadow rounded-[14px] group bg-white  hover:bg-gradient-pricingCards">
              <div className=" px-8 pt-8 pb-5 rounded-t-[14px]  ">
                <div className="flex items-center mb-5">
                  <Image
                    src={item.planIcon}
                    alt={item.planName + "Icon"}
                    className="mr-2"
                  />
                  <h2
                    className={
                      "font-medium text-lg text-[#000000]  group-hover:text-white"
                    }
                  >
                    {item.planName}
                  </h2>
                </div>

                <div className=" group-hover:text-white mb-3">
                  <span className="text-[#000000] text-lg font-medium group-hover:text-white">
                    CHF
                    <span className=" text-[26px]  group-hover:text-white">
                      {planTime.includes("Monthly")
                        ? item.priceMonth
                        : item.priceYear}
                    </span>
                  </span>
                   <span className="font-medium text-sm text-[#8F8F8F] group-hover:text-white">
                    {planTime.includes("Monthly")
                      ? "/" + "Month"
                      : "/" + "Year"}
                  </span>
                </div>
                <p className="text-dark text-xs group-hover:text-white mb-8">
                  {item.description}
                </p>

                <ul className=" mt-5 space-y-2 ">
                  {item.planDetails.map((it, ind) => {
                    return (
                      <div key={index} className="flex items-center space-x-4">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: it.icon,
                          }}
                        />
                        <li className="text-dark text-xs group-hover:text-white">
                          {it.text}
                        </li>
                      </div>
                    );
                  })}
                </ul>
                <Button
                  inputType="button"
                  text="Choose Plan"
                  className="border border-primary bg-white   mt-4  min-w-full  text-primary hover:bg-none mt-6"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
