import Image from "next/image";
import Link from "next/link";

export const SocialMedia = () => {
  return (
    <div className="flex items-center space-x-5 mt-4">
      <Link href="/">
        <Image
          src="/assets/twitter.png"
          alt="twitter icon"
          width={18}
          height={15}
        />
      </Link>
      <Link href="/">
        <Image
          src="/assets/facebook.png"
          alt="twitter icon"
          width={9}
          height={20}
        />
      </Link>
      <Link href="/">
        <Image
          src="/assets/instagram.png"
          alt="twitter icon"
          width={18}
          height={18}
        />
      </Link>
      <Link href="/">
        <Image
          src="/assets/pinterest.png"
          alt="twitter icon"
          width={15}
          height={20}
        />
      </Link>
    </div>
  );
};
