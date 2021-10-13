import React from "react";
import styles from "./footer.module.css";

export default function Footer(props) {
  const { counter } = props;
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div className="col-8 col-md-5">
            <h5 className={styles.title}>Status:</h5>
            <p className={styles.description}>
              Currently in production, number of visitors: <font size="6" color="#00FFFF">{counter}</font>
            </p>
          </div>
          <div className="col-2">
            <ul className="list-unstyled">
              <li>
                <a className={styles.footerlink} href="https://bsd405.org/nhs/">
                  School
                </a>
              </li>
              <li>
                <a className={styles.footerlink} href="https://github.com/diamondseaturtle/ProductionWeb">
                  GitHub
                </a>
              </li>
              <li>
                <a className={styles.footerlink} href="https://www.youtube.com/channel/UCxe4BmIHCR2zF6AO1-oMlgw">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
