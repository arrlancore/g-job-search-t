/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { detailUrl } from "./constants";
import { JobSearchResult } from "./types";
import useFetch from "./utils/use-fetch";
import { Link, useParams } from "react-router-dom";

const caption = {
  title: "Github Jobs",
  signIn: "Sign In",

  jobDesc: "Job Description",
  location: "Location",
  jobList: "Job List",
  search: "Search",
  fulltimeOnly: "Full Time Only",
  loadMore: "More Jobs",
  showingXJobs: "Showing {x} jobs",
};

function JobDetail() {
  let { id } = useParams();
  const { data } = useFetch<JobSearchResult>(detailUrl + id);

  return (
    <div className="JobDetail">
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* header */}
          <header>
            <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="#" className="flex items-center">
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                    alt=""
                  />
                  <h1 className="text-md ml-2">
                    <b>{caption.title}</b>
                  </h1>
                </a>
              </div>

              <div className="items-center justify-end">
                <a
                  href="#"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  {caption.signIn}
                </a>
              </div>
            </div>
          </header>

          {/* detail */}
          <section id="job-detail" className="mt-5">
            {!data ? (
              <div className="button-loader w-[40px] h-[40px]" />
            ) : (
              <div>
                <Link to="/">
                  <b className="text-blue-600">{"← Back"}</b>
                </Link>

                <div className="flex p-4 mt-4 flex-col shadow-md w-full h-auto">
                  <small>{`${data.type} / ${data.location}`}</small>
                  <h2 className="font-bold text-[24px]">{data.title}</h2>
                  <hr className="my-4" />
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-[2]">
                      <div
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />
                    </div>
                    <div className="flex-[1] mt-6 md:mt-0">
                      <a
                        href={data.company_url || "#"}
                        rel="noreferrer"
                        className="text-blue-600 font-bold"
                        target="_blank"
                      >
                        {data.company}
                      </a>
                      <img
                        alt="company logo"
                        className="min-w-[100px] my-6 bg-black min-h-[40px]"
                        src={data.company_logo}
                      />

                      <hr className="my-4" />

                      <div className="block overflow-hidden">
                        <h3 className="font-bold text-xl">How to apply</h3>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.how_to_apply,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
