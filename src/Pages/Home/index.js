import { useTranslation } from "react-i18next";
import "./home.scss";

function Home() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <div className="mainContainer">
        <h1>WORK REMOTELEE</h1>
      </div>
    </div>
  );
}

export default Home;
