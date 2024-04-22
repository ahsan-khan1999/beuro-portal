import Image from "next/image";
import aggrementIcon from "@/assets/pngs/agreement_icon.png";

export const ThankYouPage = () => {
  return (
    <div className="w-[600px] py-[53px] px-[60px]">
      <div
        style={{
          backgroundImage: `url(@/assets/pngs/thank_you_bg.png)`,
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
        className="flex flex-col items-center justify-center"
      >
        <Image
          src={aggrementIcon}
          alt="aggrementIcon"
          height={100}
          width={100}
        />
        <h1 className="text-[#393939] font-medium md:font-bold text-lg md:text-2xl mb-5 mt-[60px]">
          Thanks for Signing the Contract
        </h1>
      </div>

      <div className="flex flex-col">
        <span className="text-sm md:text-base font-normal text-left">
          Dear Valued Customer,
        </span>
        <p className="text-sm md:text-base font-normal">
          We are thrilled to inform you that we have successfully received your
          signed contract. Your trust in Buro to meet your needs is greatly
          appreciated, and we are committed to delivering excellence every step
          of the way. This marks the beginning of our official partnership, and
          we assure you that our team is dedicated to providing you with
          outstanding service and support. As we proceed, you will receive a
          comprehensive guide on how to maximize the benefits of our services.
          Should you have any questions or need assistance, please feel free to
          reach out to our customer support at any time. Your satisfaction is
          our priority, and we are here to ensure a smooth and beneficial
          experience for you. Thank you for choosing Buro. We look forward to a
          fruitful collaboration and are excited about the opportunities ahead.
        </p>

        <span className="text-sm md:text-base font-normal mt-5">
          Warm Regards,
        </span>
        <span className="text-sm md:text-base font-normal text-primary">
          The Buro Team
        </span>
      </div>
    </div>
  );
};
