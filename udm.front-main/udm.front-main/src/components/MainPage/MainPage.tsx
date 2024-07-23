import React from "react";
import style from "./MainPage.module.scss";

import { zumba, fitness, cigun } from "../../images/activities";
import { Header } from "../Header";
import { main } from "../../images";
import { NavLink } from "react-router-dom";

export function MainPage() {
  return (
    <div>
      <Header />
      <div className={style.mainPage_main}>
        <div className={style.mainPage_main_hero}>
          <img className={style.mainLogo} src={main} alt={""} />
        </div>
        <div className={style.mainPage_main_text}>
          — это бесплатные тренировки по различным оздоровительным направлениям
          под руководством профессиональных тренеров
        </div>
      </div>
      <div>
        <div>
          <div className={style.activityTitle} id={"activities"}>
            Активности
          </div>
        </div>
        <NavLink to={"1"} className={style.activitiesWrapper}>
          <div className={style.activityImage}>
            <img className={style.image} src={zumba} alt="" />
            <div className={style.activityDescription}>Зумба</div>
          </div>
          <NavLink to={"2"} className={style.activity}>
            <div className={style.activityImage}>
              <img className={style.image} src={cigun} alt="" />
              <span className={style.activityDescription}>Цигун</span>
            </div>
          </NavLink>
          <NavLink to={"3"} className={style.activity}>
            <div className={style.activityImage}>
              <img className={style.image} src={fitness} alt="" />
              <div className={style.activityDescription}>Фитнес</div>
            </div>
          </NavLink>
        </NavLink>
      </div>
      <div style={{ height: "400px" }}></div>
    </div>
  );
}
