import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div className="col-8 col-md-5">
            <h5 className={styles.title}>Status:</h5>
            <p className={styles.description}>
              This website is under construction
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
