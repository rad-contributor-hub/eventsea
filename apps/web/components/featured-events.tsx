import Image from "next/image";
import { format } from "date-fns";
import { events } from "@/mock-data";
import { EventSea } from "@/types";

export const metadata = {
  title: "Blog",
};

export default async function FeaturedEvents() {
  const formatDate = (timestamp: number) =>
    format(new Date(timestamp * 1000), "MMM. d");

  const formatEventDate = (dateTime: EventSea.DateTime) => {
    if (typeof dateTime === "number") {
      return formatDate(dateTime);
    } else {
      return `${formatDate(dateTime.start)} - ${formatDate(dateTime.end)}`;
    }
  };

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <h2 className="text-[#09090B] font-semibold text-[28px] mb-4">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 h-[296px] gap-8 md:grid-cols-2 lg:grid-cols-4">
        {events.map((event, index) => (
          <article
            key={event.id}
            className="relative flex flex-col aspect-square group"
          >
            <div className="relative h-full overflow-hidden transition-transform duration-300 ease-in-out origin-top rounded-lg group-hover:scale-y-95 group-hover:scale-x-105">
              <Image
                src={event?.images?.[0] || "/public/images/default.png"}
                alt={event.title}
                objectFit="cover"
                fill={true}
                className="duration-150 origin-center transform rounded-lg group-hover:scale-110 "
              />
            </div>
            <button className="absolute bg-[#C4FF1C] h-10 flex justify-center group-hover:justify-end group-hover:pr-2  transition-all duration-300 ease-in-out items-center w-10 group-hover:w-28 rounded-md right-4 top-4">
              <p className="text-sm absolute whitespace-nowrap opacity-0 text-[#09090B] transition-opacity duration-300  left-2 group-hover:opacity-100">
                Get ticket
              </p>
              <Image
                src="/right-arrow.svg"
                width={16}
                height={16}
                alt="Follow us on Twitter"
              />
            </button>
            <div className="p-4 absolute bottom-0 w-full bg-white left-0 space-y-1 border transition-transform ease-linear duration-300 group-hover:translate-x-4 group-hover:translate-y-4 border-[#E4E4E7] rounded-lg font-semibold h-1/3">
              <h2 className="text-sm text-[#09090B] ">{event.title}</h2>

              <p className="text-xs text-[#52525B]">{event.location.address}</p>
              <p className="text-xs text-[#52525B]">
                {formatEventDate(event.dateTime)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}