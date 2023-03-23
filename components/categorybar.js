import { useRouter } from "next/router";
import styles from "../styles/Categorybar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faBriefcase,
  faTelevision,
  faBasketball,
  faMicrochip,
} from "@fortawesome/free-solid-svg-icons";

export default function Categorybar() {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <div className={styles.navbar_container}>
        <div className={styles.navbar}>
          <div
            className={styles.list_item}
            onClick={() => router.push("/top-news/1")}
          >
            <FontAwesomeIcon icon={faLayerGroup} className={styles.icon} />
            <span className={styles.list_name}>All</span>
          </div>
          <div
            className={styles.list_item}
            onClick={() => router.push("/category/business")}
          >
            <FontAwesomeIcon icon={faBriefcase} className={styles.icon} />
            <span className={styles.list_name}>Business</span>
          </div>
          <div
            className={styles.list_item}
            onClick={() => router.push("/category/entertainment")}
          >
            <FontAwesomeIcon icon={faTelevision} className={styles.icon} />
            <span className={styles.list_name}>Entertainment</span>
          </div>
          <div
            className={styles.list_item}
            onClick={() => router.push("/category/sports")}
          >
            <FontAwesomeIcon icon={faBasketball} className={styles.icon} />
            <span className={styles.list_name}>Sports</span>
          </div>
          <div
            className={styles.list_item}
            onClick={() => router.push("/category/technology")}
          >
            <FontAwesomeIcon icon={faMicrochip} className={styles.icon} />
            <span className={styles.list_name}>Technology</span>
          </div>
        </div>
      </div>
    </div>
  );
}
