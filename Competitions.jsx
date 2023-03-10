import React, { useEffect, useState } from "react";
// import Filter from "./CompUtils/Filter";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CompetitionCard from "./CompUtils/CompetitionCard";
// import { Button } from "@headlessui/react";
import { compDetails } from "../constants/competition";
import {
  logo,
  biz,
  dance,
  fashion,
  lit,
  music,
  special,
  sports,
} from "../assets/index";
// import Paginator from "./CompUtils/Paginator";

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [filterCompetitions, setFilterCompetitions] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Categories");
  const [showMore, setShowMore] = useState(false);

  const buttonText = showMore ? "Show Less" : "Show More";
  const coins = [logo, biz, dance, fashion, lit, music, special, sports];
  // const [currentPage, setCurrentPage] = useState(1)
  // const [postsPerPage, setPostsPerPage] = useState(2)

  useEffect(() => {
    setCompetitions(compDetails);
    setFilterCompetitions(compDetails);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Categories");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
    setTimeout(() => {
      if (item === "All Categories") {
        setFilterCompetitions(competitions);
      } else {
        setFilterCompetitions(
          competitions.filter((competitions) => competitions.category == item)
        );
      }
    }, 500);
    toggleDropdown();
  };

  const handleCompetitionFilter = (item) => {
    setActiveFilter(item);

    setTimeout(() => {
      setSelectedOption(item);
      if (item === "All Categories") {
        setFilterCompetitions(competitions);
      } else {
        setFilterCompetitions(
          competitions.filter((competitions) => competitions.category == item)
        );
      }
    }, 500);
  };

  // implementing Paginator

  // const lastPostIndex = currentPage * postsPerPage;
  // const firstPostIndex = lastPostIndex - postsPerPage;
  // const currentPosts = competitions.slice(firstPostIndex, lastPostIndex)

  return (
    <section id="competitions">
      <h1 className="flex-1 font-poppins font-semibold text-[45px] text-primary leading-[80px] justify-center">
        Competitions
      </h1>

      {/* For coins */}
      <div className="hidden md:block md:transition-all md:duration-100 md:flex flex-wrap md:flex-row md:space-x-9 md:justify-center md:items-center flex items-center justify-center">
        <div className="w-auto text-white font-bold py-2 px-4 border-b-4 border-[#d4a152] flex flex-row justify-evenly p-1 space-x-1">
          {[
            "All Categories",
            "Biz",
            "Dance",
            "Fashion",
            "Lit",
            "Music",
            "Special",
            "Sports",
          ].map((item, index) => (
            <button key={index} className="max-w-[144px]">
              <img
                src={coins[index]}
                alt=""
                onClick={() => handleCompetitionFilter(item)}
                className={`font-bold p-2 hover:scale-[1.05]`}
                key={index}
              />
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* For dropdown */}
      <div className="md:hidden relative w-full min-w-max">
        <div className="flex justify-center">
          <button
            // removed the following
            // transform translate-y-1/2
            className={`text-center py-2 flex items-center justify-center px-4 px-4 py-2 rounded-lg text-[#1A2328] bg-primary border border-[#89352a] focus:outline-none focus:shadow-outline hover:border-[#672c1a] shadow-2 shadow-inner shadow-[#672c1a] ${
              isOpen ? "w-full" : "w-fit"
            }`}
            onClick={toggleDropdown}
          >
            <div className="flex justify-center">
              <h3>{selectedOption}</h3>
            </div>
            <ChevronDownIcon
              className={`-mr-1 ml-1 h-5 w-5 ${isOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
        {isOpen && (
          <div className="{`absolute z-20 mt-3 text-center origin-top-right rounded-md shadow-lg overflow-y-auto shadow-10 shadow-black">
            <div className="bg-secondary rounded-md shadow-xs shadow-2 shadow-inner shadow-[#1A2328]">
              <div className="py-1">
                {[
                  "All Categories",
                  "Biz",
                  "Dance",
                  "Fashion",
                  "Lit",
                  "Music",
                  "Special",
                  "Sports",
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-4 py-2 text-sm leading-5 text-[#1A2328] hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 my-1 "
                    onClick={() => {
                      handleCompetitionFilter(item);
                      toggleDropdown();
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* for desktop */}
      <div className="flex flex-wrap sm:flex-row md:flex-row justify-center">
        {filterCompetitions.map(
          (competitions, index) =>
            (showMore || (!showMore && index < 3)) && (
              <div>
                <div
                  className="w-full rounded-lg overflow-hidden flex-initial justify-center"
                  id={competitions.id}
                >
                  <CompetitionCard
                    key={competitions.id}
                    index={index}
                    title={competitions.title}
                    details={competitions.details}
                    date={competitions.date}
                    poc={competitions.poc}
                    image={competitions.image}
                  />
                </div>
              </div>
            )
        )}
      </div>

      <div className="flex justify-center">
        <button
          className="m-2 p-2 font-poppins bg-gradient-to-r from-[#9f793eff]
          via-[#d4a152ff] to-[#dcb270ff] border-2 border-primary rounded-md font-medium text-black transition-all duration-150 md:hover:scale-105"
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {buttonText}
        </button>
      </div>

      {/* for mobile and tablet */}
      {/* <div className="flex flex-wrap">
        {currentPosts.map((competitions, index) => (
          <div className="w-full">
            <div
              className="w-full rounded-lg overflow-hidden flex-initial justify-center"
              id={competitions.id}
            >
              
              <CompetitionCard
                key={competitions.id}
                index={index}
                title={competitions.title}
                details={competitions.details}
                date={competitions.date}
                poc={competitions.poc}
                image={competitions.image}
              />

            </div>
             
          </div>
        ))}
      </div> */}
    </section>
  );
};
export default Competitions;
