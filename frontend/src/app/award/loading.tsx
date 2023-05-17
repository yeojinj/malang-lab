import styles from '../Loading.module.css';

export default function Loading() {
  return (
    <div className="w-full h-full fixed  top-0 left-0 z-10 flex justify-center items-center rounded-none glass">
      <div>
        <div className={styles.loader}>
          <div className={styles.loadercircle}></div>
          <div className={styles.loaderblob}></div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="hidden"
        >
          <div>
            <filter id="tooltip-filter">
              {/* <feGaussianBlur in="SourceGraphic" stdDeviation={9} result="blur"> */}
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              >
                <feComposite
                  in="SourceGraphic"
                  in2="goo"
                  operator="atop"
                ></feComposite>
              </feColorMatrix>
              {/* </feGaussianBlur> */}
            </filter>
          </div>
        </svg>
      </div>
    </div>
  );
}
