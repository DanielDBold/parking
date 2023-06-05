import { CircularProgress, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../assets/bold-parking.svg";
import styles from "./App.module.css";
import Bar from "./components/Bar/Bar";

const BASE_URL = "http://localhost:3000";
const DEFAULT_TOTAL_PLACES = 12;
const DEFAULT_REFETCH_TIME = 30000;

function App() {
  const [error, setError] = useState(false);
  const [freePlaces, setFreePlaces] = useState<number | undefined>();

  const fetchFreePlaces = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/parks`);
      const { freePlaces } = response.data;
      setFreePlaces(freePlaces);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchFreePlaces();
    const interval = setInterval(fetchFreePlaces, DEFAULT_REFETCH_TIME);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const connected = !error;
  const appReady = freePlaces !== undefined;
  const hasFreePlaces = !!(freePlaces && freePlaces > 0);
  const showBar = hasFreePlaces && freePlaces! <= DEFAULT_TOTAL_PLACES;

  return (
    <div
      className={`${styles.container} ${
        !hasFreePlaces && connected && styles.noFreePlaces
      }`}
    >
      {appReady ? (
        <div className={styles.app}>
          <img className={styles.logo} src={logo} alt="Logo" />
          <div className={styles.parkingSpots}>
            {hasFreePlaces
              ? `parking spots: ${freePlaces}`
              : "no free places available"}
          </div>
          {showBar && <Bar freePlaces={freePlaces!} />}
          <div className={styles.line}>
            {connected && (
              <div className={styles.connectedToServer}>
                <p className={styles.connectedText}>Connected to server</p>
                <Skeleton
                  variant="circular"
                  width={9}
                  height={9}
                  sx={{ bgcolor: "green" }}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <CircularProgress size={150} className={styles.appLoader} />
      )}
    </div>
  );
}

export default App;
