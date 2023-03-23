import { useRouter } from 'next/router';
import Categorybar from "../../components/categorybar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import styles from '../../styles/News.module.css';
import noImage from "../../public/noimage.png";
import Image from 'next/image';
import Head from 'next/head';

export function TopNews({ articles, pageNumber }){
  const router = useRouter();
  return articles.length ? (
    <>
      <Head>
        <title>NewsApp | Top News</title>
      </Head>
      <div className="page-container">
        <div className={styles.main}>
          <Categorybar />
          <div className={styles.grid__container}>
            <div className={styles.grid}>
              {articles.map((article, index) => (
                <div key={index} className={styles.grid__item}>
                  <div className={styles.card}>
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        className={styles.card__img}
                        alt={article.urlToImage}
                      />
                    ) : (
                      <Image
                        src={noImage}
                        className={styles.card__img}
                        alt="Image not available"
                      ></Image>
                    )}
                    <div className={styles.card__content}>
                      <h1 className={styles.card__header}>{article.title}</h1>
                      <p className={styles.card__text}>{article.description}</p>
                      <button
                        className={styles.card__btn}
                        onClick={() => (window.location.href = article.url)}
                      >
                        Explore <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.paginator}>
          <div
            className={pageNumber === 1 ? styles.disabled : styles.active}
            onClick={() => {
              if (pageNumber > 1) {
                router.push(`/top-news/${pageNumber - 1}`);
              }
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} className={styles.icon} />
          </div>

          <div className={styles.pageno}>{pageNumber}</div>

          <div
            className={pageNumber === 7 ? styles.disabled : styles.active}
            onClick={() => {
              if (pageNumber < 7) {
                router.push(`/top-news/${pageNumber + 1}`);
              }
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} className={styles.icon} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="page-container">
      <div className={styles.main}>
        <h1>Oops! Not found anything.</h1>
      </div>
    </div>
  );
};

export const getServerSideProps = async pageContext => {
  const pageNumber = pageContext.query.slug;
  if (!pageNumber || pageNumber < 1 || pageNumber > 7) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }
  const data = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&pageSize=6&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY2}`,
      },
    },
  ).then(res => res.json());

  const { articles } = data;

  return {
    props: {
      articles: articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

export default TopNews;
