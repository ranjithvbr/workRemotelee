import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import "./header.scss";

export default function Headers() {
    const { t } = useTranslation();
    return(
        <header className="headerStyle">
            <h3 className="title">WORK REMOTELEE</h3>
            <div className="headerBtn">
                <Button title={t("Create job alert")} />
                <Button title={t("Post a job")} />
            </div>
        </header>
    );
};
