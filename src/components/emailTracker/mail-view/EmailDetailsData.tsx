import { useTranslation } from "next-i18next";
import React from "react";

const EmailDetailsData = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="bg-white rounded-md px-5 pt-5 pb-10">
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-[2rem] leading-8 font-medium">
          {translate("email_tracker.email_detail_heading")}
        </h2>
      </div>

      <div className="my-5 flex flex-col gap-y-5">
        <p className="text-base text-[#4D4D4D] font-normal">Hi Rahal,</p>
        <p className="text-base text-[#4D4D4D] font-normal ">
          Hope you are healthy and doing well.
        </p>
        <p className="text-base text-[#4D4D4D] font-normal">
          I am Neha Kamat, currently studying MA in Mass Communication from XYZ
          College. I came to know via LinkedIn that there are openings in the
          Journalism department in ABC News Agency and I think I would be able
          to do justice to this role because of my experiences in the related
          field.
        </p>
        <p className="text-base text-[#4D4D4D] font-normal ">
          I have worked as a full-time journalist in a news agency, wherein I
          was assigned to a promising project regarding Indian education. My
          role included Covering news from the villages in India focusing on the
          education aspect, Editing, Developing, and Curating content for their
          website. As an English major, I am used to writing and reading a
          variety of articles and essays. I am a voracious reader and have read
          books from various genres.
        </p>
        <p className="text-base text-[#4D4D4D] font-normal ">
          I have my own blog where I generally write all my creative stuff.
          Another major thing that I have in my basket is that I’ve interned as
          a content writer in a firm. My job was to take telephonic interviews
          with influential people from the endangered tribes of India and curate
          an article based on that. This internship gave me an opportunity to
          hone my communication skills and receive information in an empathetic
          way. My education in the English field and the work I have done have
          helped me get in-depth knowledge about mass media as well. Please find
          attached my CV below for your reference. If I'm hired, I would give my
          best to help ABC News Agency reach greater heights.
        </p>
        <p className="text-base text-[#4D4D4D] font-normal ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit
          totam culpa maiores aut reiciendis! Neque expedita voluptate, debitis
          aliquid praesentium deleniti et nesciunt sequi eligendi magnam
          suscipit quam reprehenderit facere, veritatis totam odit iusto nostrum
          harum libero. 
        </p>
        <p className="text-base text-[#4D4D4D] font-normal ">
          Hoping to hear from you soon.
        </p>

        <p className="text-base text-[#4D4D4D] font-normal ">
          Thanks and Regards, <br/>
          Neha kamat
        </p>
      </div>
    </div>
  );
};

export default EmailDetailsData;
