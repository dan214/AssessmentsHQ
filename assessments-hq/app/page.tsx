/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client"
import axiosApi from "@/helpers/fetch";
import { useEffect, useState } from "react";

const query = `
{
  pageCollection {
    items {
      title
      logo {
        url
      }
    }
  }
}
`

const Home: React.FC = () => {
  // define the initial state
  const [page, setPage] = useState()

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      axiosApi.getContentfulData(query).then((response) => {
        console.log("set department");
        console.log(response.data.data.pageCollection.items[0]);
        setPage(response.data.data.pageCollection.items[0]);

      })
    } catch (error) {
      console.error('An error occurred while fetching parent options', error);
    }
  }

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }


  return (
    <div className="App">
      <header className="App-header">
        {page ? (
          <><img src={page.logo.url} className="App-logo" alt="logo" /><p>{page.title}</p></>
        ) : null}

      </header>
    </div>
  );
}

export default Home;
