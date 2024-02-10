import { MdOutlinePhotoCamera } from "react-icons/md";
import { VscTriangleLeft } from "react-icons/vsc";
import { VscTriangleRight } from "react-icons/vsc";
import ModalImage from "react-modal-image";

const Chatting = () => {
  return (
    <div className="relative h-[780px] overflow-y-scroll rounded-lg shadow-lg pt-5 border-2 border-primary px-5">
      <div className="sticky bg-white left-0 top-[-20px] flex gap-5 items-center border-b pb-2 p-2 border-b-primary z-20">
        <div className="h-[80px] w-[80px] rounded-full bg-primary"></div>
        <div>
          <h2 className="text-3xl text-black font-bold capitalize">
            Wakil Hafiz
          </h2>
        </div>
      </div>

      {/* receive message start */}
      <div className="pr-5">
        <div className="text-left relative inline-block rounded-md px-4 py-1 bg-gray-200 my-2">
          <VscTriangleLeft className="text-3xl text-gray-200 absolute left-[-18px] bottom-[-4px]" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing
            elit.kdjfkjfksjfksdfjksfkfhksdhfk
          </p>
        </div>
      </div>
      {/* receive message end */}

      {/* send message start */}
      <div className="pl-5">
        <div className="text-right relative inline-block rounded-md px-4 py-1 bg-primary my-2">
          <VscTriangleRight className="text-3xl text-primary absolute right-[-18px] bottom-[-4px]" />
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing
            elit.hfkhfksdhfksdfkhkhkhkhgkghkhgksghksghkghlkk
          </p>
        </div>
      </div>
      {/* send message end */}

      {/* send img start */}
      <div className="pl-5">
        <div className="text-left relative inline-block rounded-md p-2 bg-gray-200 my-2">
          <VscTriangleLeft className="text-3xl text-gray-200 absolute left-[-18px] bottom-[-4px]" />
          <ModalImage
            className="h-[300px]"
            small="https://static.vecteezy.com/system/resources/thumbnails/025/284/015/small_2x/close-up-growing-beautiful-forest-in-glass-ball-and-flying-butterflies-in-nature-outdoors-spring-season-concept-generative-ai-photo.jpg"
            large="https://static.vecteezy.com/system/resources/thumbnails/025/284/015/small_2x/close-up-growing-beautiful-forest-in-glass-ball-and-flying-butterflies-in-nature-outdoors-spring-season-concept-generative-ai-photo.jpg"
            alt="Hello World!"
          />
        </div>
      </div>
      {/* send img end */}

      {/* receive img start */}
      <div className="pr-5 flex justify-end">
        <div className="relative inline-block rounded-md p-2 bg-primary my-2">
          <VscTriangleRight className="text-3xl text-primary absolute right-[-18px] bottom-[-4px]" />
          <ModalImage
            className="h-[300px]"
            small="https://static.vecteezy.com/system/resources/thumbnails/025/284/015/small_2x/close-up-growing-beautiful-forest-in-glass-ball-and-flying-butterflies-in-nature-outdoors-spring-season-concept-generative-ai-photo.jpg"
            large="https://static.vecteezy.com/system/resources/thumbnails/025/284/015/small_2x/close-up-growing-beautiful-forest-in-glass-ball-and-flying-butterflies-in-nature-outdoors-spring-season-concept-generative-ai-photo.jpg"
            alt="Hello World!"
          />
          ;
        </div>
      </div>
      {/* receive img end */}

      <div className="sticky w-full bg-white flex justify-between gap-2 left-0 bottom-0 py-5 z-20">
        <div className="bg-gray-200 flex justify-between items-center gap-6 w-full rounded-md pr-5 pl-1">
          <input
            type="text"
            className="input border border-primary w-full"
            placeholder="Type a Message"
          />
          <div className="flex gap-2 items-center">
            <MdOutlinePhotoCamera className="text-primary text-5xl cursor-pointer" />
          </div>
        </div>
        <div>
          <button className="button_v_1">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
