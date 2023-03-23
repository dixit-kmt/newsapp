import { useRouter } from "next/router";
import Categorybar from "../../components/categorybar";

import noImage from "../../public/noimage.png";
import Image from "next/image";

import styles from "../../styles/News.module.css";
import Head from "next/head";

export function Category({ articles,cat }){
  const router = useRouter();
  cat = cat.charAt(0).toUpperCase() + cat.slice(1);
  return articles.length ? (
    <>
    <Head>
      <title>NewsApp | {cat}</title>
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

export const getServerSideProps = async (pageContext) => {
  const cat = pageContext.query.slug;

  if (!cat) {
    return {
      props: {
        articles: [],
        cat: "",
      },
    };
  }

  const data = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&category=${cat}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  ).then((res) => res.json());

  const { articles } = data;

  return {
    props: {
      articles: articles,
      cat: cat,
    },
  };
};

export default Category;
