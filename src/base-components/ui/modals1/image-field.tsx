import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { uploadMultiFileToFirebase } from "@/api/slices/globalSlice/global";
import { useAppDispatch } from "@/hooks/useRedux";
import { Attachement } from "@/types/global";
import { getFileNameFromUrl } from "@/utils/utility";
import imgDelete from "@/assets/svgs/img_delete.svg";
import { Slider } from "../slider/slider";

export const ImageField = ({
  id,
  text,
  fileSupported,
  isOpenedFile,
  attachements,
  setAttachements,
  isAttachement,
}: {
  id: string;
  text?: string;
  fileSupported?: string;
  isOpenedFile?: boolean;
  attachements: Attachement[];
  setAttachements?: (attachement?: Attachement[]) => void;
  isAttachement?: boolean;
}) => {
  const [isZoomed, setIsZoomed] = useState({
    zoomed: false,
    currentImage: "",
    sliderImageData: [],
    currentIndex: 0,
  });

  const toggleZoom = (image: string, index: number) => {
    const imageList = [
      { imageSrc: image },
      ...attachements?.map((item) => ({ imageSrc: item.value })),
    ] as unknown[];
    setIsZoomed({
      zoomed: !isZoomed.zoomed,
      currentImage: image,
      sliderImageData: imageList as never[],
      currentIndex: ++index,
    });
  };

  const router = useRouter();
  const formdata = new FormData();
  const dispatch = useAppDispatch();
  const handleFileInput = async (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>
  ) => {
    e.preventDefault();

    let file: any = [];
    console.log(e, "event");

    if (e instanceof DragEvent && e.dataTransfer) {
      for (let item of e.dataTransfer.files) {
        formdata.append("files", item);
      }

      file.push(e.dataTransfer.files);
    } else if (e.target instanceof HTMLInputElement && e.target.files) {
      for (let item of e.target.files) {
        formdata.append("files", item);
      }
      file.push(e.target.files);
    }

    const response = await dispatch(uploadMultiFileToFirebase(formdata));

    let newAttachement = (attachements && [...attachements]) || [];
    if (response?.payload) {
      response?.payload?.forEach((element: any) => {
        newAttachement.push({
          name: getFileNameFromUrl(element),
          value: element,
        });
      });
      setAttachements && setAttachements(newAttachement);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    for (let item of e.dataTransfer.files) {
      formdata.append("files", item);
    }

    const response = await dispatch(uploadMultiFileToFirebase(formdata));
    let newAttachement = (attachements && [...attachements]) || [];
    if (response?.payload) {
      response?.payload?.forEach((element: any) => {
        newAttachement.push({
          name: getFileNameFromUrl(element),
          value: element,
        });
      });
      setAttachements && setAttachements(newAttachement);
    }
  };

  const handleDeleteFile = (index: number) => {
    const list = attachements && [...attachements];
    list?.splice(index, 1);
    setAttachements && setAttachements(list);
    // field.onChange();
  };

  const SLIDER_IMAGES_DATA = {
    noOfThumbNails: 8,
    images: attachements?.map((item) => ({ imageSrc: item?.value })),
  };

  return (
    <>
      <label
        htmlFor={id}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center border border-[#8F8F8F] border-dashed rounded-lg w-full h-auto cursor-pointer px-[25px] py-6"
      >
        <div className="flex flex-col items-center gap-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="43"
            viewBox="0 0 48 43"
            fill="none"
          >
            <path
              d="M17.9352 17.7351C19.7292 17.7351 21.1835 16.2807 21.1835 14.4867C21.1835 12.6926 19.7292 11.2383 17.9352 11.2383C16.1411 11.2383 14.6868 12.6926 14.6868 14.4867C14.6868 16.2807 16.1411 17.7351 17.9352 17.7351Z"
              fill="#4A13E7"
            />
            <path
              d="M44.6001 26.4422C43.0661 24.9984 41.1261 24.051 39.0056 23.7803V7.26767C39.0056 5.50813 38.2838 3.92905 37.1558 2.75602C35.9828 1.583 34.4037 0.90625 32.6442 0.90625H6.47665C4.71711 0.90625 3.13804 1.62811 1.96501 2.75602C0.791981 3.92905 0.115234 5.50813 0.115234 7.26767V28.0664V30.0064V34.2022C0.115234 35.9617 0.837098 37.5408 1.96501 38.7138C3.13804 39.8869 4.71711 40.5636 6.47665 40.5636H31.787C33.4563 41.9171 35.5316 42.7743 37.8326 42.7743C40.4945 42.7743 42.8856 41.6915 44.6001 39.9771C46.3145 38.2627 47.3973 35.8715 47.3973 33.2096C47.3973 30.5478 46.3145 28.1566 44.6001 26.4422ZM2.50641 7.26767C2.50641 6.18487 2.95757 5.19231 3.67943 4.51557C4.4013 3.7937 5.39386 3.34254 6.47665 3.34254H32.6442C33.727 3.34254 34.7196 3.7937 35.4414 4.51557C36.1633 5.23743 36.6144 6.22999 36.6144 7.31279V21.3891L29.9372 14.7119C29.486 14.2607 28.7191 14.2156 28.2228 14.7119L18.1618 24.818L11.3492 17.9603C10.8981 17.5091 10.1311 17.464 9.63481 17.9603L2.50641 25.1789V7.26767ZM6.43154 38.2627V38.1724C5.34874 38.1724 4.35618 37.7213 3.63432 36.9994C2.95757 36.2775 2.50641 35.285 2.50641 34.2022V30.0064V28.6077L10.492 20.577L17.3046 27.3896C17.7558 27.8408 18.5227 27.8408 19.019 27.3896L29.08 17.2835L35.667 23.9156C35.5317 23.9608 35.3963 24.0059 35.261 24.051C35.0805 24.0961 34.9 24.1412 34.6744 24.2315C34.494 24.2766 34.3135 24.3668 34.133 24.4119C33.9977 24.457 33.9075 24.5022 33.7721 24.5924C33.5916 24.6826 33.4563 24.7277 33.3209 24.818C33.0954 24.9533 32.8698 25.0887 32.6442 25.224C32.5088 25.3142 32.4186 25.3594 32.2833 25.4496C32.193 25.4947 32.1479 25.5398 32.0577 25.5849C31.6516 25.8556 31.2907 26.1715 30.9749 26.5324C29.2605 28.2468 28.1777 30.638 28.1777 33.2999C28.1777 33.9766 28.2679 34.6082 28.4032 35.285C28.4484 35.4654 28.4935 35.6008 28.5386 35.7813C28.6739 36.2324 28.8093 36.6836 28.9898 37.1348V37.1799C29.1702 37.5408 29.3507 37.9469 29.5763 38.2627H6.43154ZM42.8405 38.2627C41.5321 39.571 39.7726 40.338 37.7875 40.338C35.8926 40.338 34.133 39.571 32.8698 38.3529C32.6893 38.1724 32.5088 37.9469 32.3284 37.7664C32.193 37.631 32.0577 37.4506 31.9223 37.3152C31.7419 37.0896 31.6065 36.8189 31.4712 36.5482C31.3809 36.3678 31.2907 36.2324 31.2005 36.052C31.1102 35.8264 31.02 35.5557 30.9749 35.285C30.9298 35.1045 30.8395 34.8789 30.7944 34.6985C30.7042 34.2473 30.6591 33.751 30.6591 33.2547C30.6591 31.2696 31.4712 29.5101 32.7344 28.2017C33.9977 26.8933 35.8023 26.1263 37.7875 26.1263C39.7726 26.1263 41.5321 26.9384 42.8405 28.2017C44.1489 29.5101 44.9159 31.2696 44.9159 33.2547C44.9159 35.1947 44.1038 36.9543 42.8405 38.2627Z"
              fill="#4A13E7"
            />
            <path
              d="M38.6447 28.3824C38.5545 28.2922 38.4191 28.202 38.2386 28.1117C38.1033 28.0666 37.9679 28.0215 37.8326 28.0215C37.7875 28.0215 37.7875 28.0215 37.7875 28.0215C37.7424 28.0215 37.7424 28.0215 37.7424 28.0215C37.607 28.0215 37.4717 28.0666 37.3363 28.1117C37.201 28.1568 37.0656 28.2471 36.9303 28.3824L34.1331 31.1796C33.6819 31.6308 33.6819 32.3978 34.1331 32.8941C34.5842 33.3452 35.3512 33.3452 35.8475 32.8941L36.5693 32.1722V37.135C36.5693 37.8118 37.1107 38.3532 37.7875 38.3532C38.4642 38.3532 39.0056 37.8118 39.0056 37.135V32.1722L39.7275 32.8941C40.1787 33.3452 40.9456 33.3452 41.4419 32.8941C41.8931 32.4429 41.8931 31.6759 41.4419 31.1796L38.6447 28.3824Z"
              fill="#4A13E7"
            />
          </svg>
          <span className="text-[#4B4B4B] text-center font-medium text-[10px] mt-3 mb-2">
            {text}
          </span>
          <span className="text-[#8F8F8F] font-normal text-center text-[12px]">
            {fileSupported}
          </span>
        </div>

        <input
          id={id}
          type="file"
          className="hidden"
          onChange={handleFileInput}
          multiple
        />
      </label>

      <div className="col-span-2 mt-5">
        <div className="grid mlg:grid-cols-5 xLarge:grid-cols-5 gap-x-4 gap-y-3">
          {attachements &&
            attachements?.map((item, index) => (
              <div
                className={`relative flex flex-col gap-3 h-fit border border-[#EBEBEB] rounded-md px-3 py-2 break-all ${
                  isOpenedFile ? "cursor-pointer" : "cursor-default"
                }`}
                key={index}
                onClick={() =>
                  isOpenedFile && router.push("/content/pdf-preview")
                }
              >
                <div className="flex items-center gap-3">
                  <div style={{ position: "relative" }}>
                    <Image
                      src={item?.value}
                      width={100}
                      height={100}
                      alt="Uploaded Preview"
                      style={{ height: "80px", width: "80px" }}
                      onClick={() => toggleZoom(item.value, index)}
                      className="cursor-pointer"
                    />
                    <div
                      className="absolute top-[5px] right-[5px] cursor-pointer"
                      onClick={(e) => handleDeleteFile(index)}
                    >
                      <Image src={imgDelete} alt="imgDelete" />
                    </div>
                    {isZoomed.zoomed && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 9999,
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => toggleZoom(item.value, index)}
                      >
                        <Slider
                          {...SLIDER_IMAGES_DATA}
                          images={isZoomed?.sliderImageData}
                          activeIndex={isZoomed?.currentIndex}
                          containerClasses="w-[80%]"
                          mainImgSliderClasses="w-full h-[615px]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
