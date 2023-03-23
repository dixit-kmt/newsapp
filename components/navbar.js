import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faNewspaper} from "@fortawesome/free-solid-svg-icons";

export function Navbar(){
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.navbar_container}>
        <div className={styles.navbar}>
          <li className={styles.list_item} onClick={() => router.push("/")}>
            <FontAwesomeIcon icon={faHouse} className={styles.icon} />
            <span className={styles.list_name}>Home</span>
          </li>
          <li
            className={styles.list_item}
            onClick={() => router.push("/top-news/1")}
          >
            <FontAwesomeIcon icon={faNewspaper} className={styles.icon} />
            <span className={styles.list_name}>Top News</span>
          </li>
        </div>
      </div>
    </div>
  );
};
