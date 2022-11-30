/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchUrl } from "./constants";
import { JobSearchFilter, JobSearchResult } from "./types";
import { toParams } from "./utils/common";
import useFetch from "./utils/use-fetch";

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

function App() {
  const [filter, setFilter] = useState<JobSearchFilter>();
  const [queries, setQueries] = useState<string>();
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [stackedList, setStackedList] = useState<JobSearchResult[]>([]);

  const { data, error } = useFetch<JobSearchResult[]>(queries);

  if (error) console.log("ERR:" + error.message);

  const updateQueries = (page: number, filter?: JobSearchFilter) => {
    setQueries(
      searchUrl +
        toParams({
          page,
          ...(filter || {}),
        })
    );
  };

  const updateStackList = (newList: Array<JobSearchResult>, reset = false) => {
    const filtered = newList.filter((data) => !!data);
    if (reset) {
      setStackedList(filtered);
    } else {
      setLoadMore(false);
      const merged = [...stackedList, ...filtered];
      setStackedList(merged);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    updateQueries(nextPage, filter);
    setLoadMore(true);
  };

  const handleSearch = () => {
    const description: string = (document.getElementById("description") as any)
      .value;
    const location: string = (document.getElementById("location") as any).value;
    const full_time: boolean = (document.getElementById("fulltime") as any)
      .checked;

    const newFilter = { ...filter };
    if (description) {
      newFilter.description = description;
    }
    if (location) {
      newFilter.location = location;
    }
    if (full_time) {
      newFilter.full_time = full_time;
    }

    setPage(1);
    setFilter(newFilter);
    updateQueries(1, newFilter);
  };

  useEffect(() => {
    updateQueries(page);
  }, []);

  useEffect(() => {
    if (data) {
      updateStackList(data, loadMore ? false : true);
    }
  }, [data, loadMore]);

  return (
    <div className="App">
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

          {/* search form */}
          <section id="form" className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="mb-4 min-w-[300px]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  {caption.jobDesc}
                </label>
                <input
                  className="shadow rounded-md appearance-none border h-[50px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  type="text"
                  placeholder={`such as "ruby" or "java"`}
                />
              </div>

              <div className="mb-4 min-w-[300px]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="location"
                >
                  {caption.location}
                </label>
                <input
                  className="shadow rounded-md appearance-none border h-[50px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="location"
                  type="text"
                  placeholder="city name, zip code, or other.."
                />
              </div>

              <div className="flex items-center justify-between md:justify-start">
                <div className="flex items-center mb-4">
                  <input
                    id="fulltime"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="fulltime"
                    className="ml-2 text-sm font-medium text-gray-700 "
                  >
                    {caption.fulltimeOnly}
                  </label>
                </div>

                <button
                  onClick={handleSearch}
                  className="ml-8 min-w-[120px] h-[50px] inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-900"
                >
                  {!data ? <div className="button-loader" /> : null}
                  {caption.search}
                </button>
              </div>
            </div>
          </section>

          {/* search list */}
          <section className="flex flex-col p-4">
            <h2 className="w-full py-4 text-[24px] font-bold text-xs text-gray-700 uppercase">
              {stackedList.length
                ? caption.showingXJobs.replace(
                    "{x}",
                    String(stackedList.length)
                  )
                : caption.jobList}
            </h2>

            {/* space */}
            <div className="w-full h-4" />

            {stackedList.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between py-4 px-1 border-solid border-t-[1px] border-gray-300 hover:bg-gray-100"
              >
                <div className="flex flex-col w-full">
                  <Link
                    to={`/detail/${job.id}`}
                    className="text-blue-600 font-bold"
                  >
                    {job.title}
                  </Link>
                  <div className="text-xs mt-2">
                    {job.company} -{" "}
                    <span className="text-green-500 font-bold">{job.type}</span>
                  </div>
                </div>

                {/* space */}
                <div className="w-full h-4" />

                <div className="flex flex-col text-right w-full">
                  <div className="font-bold">{job.location}</div>
                  <div className="text-gray-400">
                    {new Date(job.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
            {/* load more, when the result contain null hide the load button or i */}

            <button
              onClick={handleLoadMore}
              className="p-4 mt-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
            >
              {!data ? <div className="button-loader" /> : null}
              {caption.loadMore}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
