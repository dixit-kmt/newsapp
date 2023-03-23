import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export function Searchbar(props){
  const [searchValue, setSearchValue] = useState(null);
  const [data, setData] = useState([""]);

  const handleSearch = debounce((event) => {
    setSearchValue(event.target.value);
  }, 1000);

  const apiCall = () => {

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    };
    const requestUrl = `https://newsapi.org/v2/everything?q=${searchValue}`;

    fetch(requestUrl, options)
      .then((response) => {
        return response.json();
      })
      .then((datas) => {
        setData(
          datas.articles?.filter((e) => {
            return e.title.toLowerCase().includes(searchValue?.toLowerCase());
          })
        );
      })
      .catch((err) => {
        console.log("There has been an error", err);
      });
  };

  useEffect(() => {
    apiCall();
  }, [searchValue]);

  const onTrigger = (event) => {
    props.parentCall(event);
  };

  return (
    <>
      <div className={styles.searchbar_container}>
        <input
          type="text"
          placeholder="Search for a keywords..."
          onChange={handleSearch}
        />
        <div className={styles.searchbar}></div>
        <div className={styles.results}>
          <div className={styles.rlist}>
            <h4 className={styles.status}>Results...</h4>
            <div>
              {data == "" ? (
                <div className={styles.notfound}>Not Found!</div>
              ) : (
                data?.map((e, i) => {
                  return (
                    <div
                      onClick={() => onTrigger(e.title)}
                      key={i}
                      className={styles.item_container}
                    >
                      <Link href={e.url}>
                        <div>
                          <img
                            src={e.urlToImage}
                            className={styles.item_img}
                            alt="news-img"
                          />
                          <h3 className={styles.item_title}>{e.title}</h3>
                        </div>
                        <div>
                          <p>{e.description}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


