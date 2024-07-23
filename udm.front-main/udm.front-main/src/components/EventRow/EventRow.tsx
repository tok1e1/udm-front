import React from "react";
import { TbPlus } from "react-icons/tb";

import style from "./EventRow.module.scss";
import { format } from "date-fns";
import ru from "date-fns/locale/ru";
import { Event } from "../../api";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { RouteMatch } from "react-router-dom";
import { cigun, fitness, zumba } from "../../images/activities";

function getImageForActivity(id?: string) {
  switch (id) {
    case "1":
      return zumba;
    case "2":
      return cigun;
    case "3":
    default:
      return fitness;
  }
}

interface EventRowProps {
  event: Event;
  eventId?: string;
  inProfile?: boolean
  handleClickRegistration?: (event: Event) => void;
}

export function EventRow({
  event,
  handleClickRegistration,
  eventId,
  inProfile
}: EventRowProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={style.eventWrapper} key={event.id}>
      <img
        src={getImageForActivity(eventId)}
        width={100}
        style={{ borderRadius: "16px", backgroundColor: "white" }}
        alt={""}
      />
      <div className={style.eventInfo}>
        <div className={style.time}>
          {format(Number(event.start_time) * 1000, "dd MMMM H:mm", {
            locale: ru,
          })}
        </div>
        <div className={style.address}>{event.place ?? "ул. Пушкина"}</div>
        <div>Тренер: {event.coach ?? "Иван Иванов Иванович"} </div>
      </div>
      {isAuthenticated && !event.is_registered && (
        <div
          id={event.id.toString()}
          className={style.registerButton}
          onClick={() => handleClickRegistration?.(event)}
        >
          Записаться <TbPlus size={20} color={"#ff045c"} />
        </div>
      )}
      {isAuthenticated && event.is_registered && inProfile &&(
        <div
          className={style.registerButton}
          onClick={() => handleClickRegistration?.(event)}
        >
          Отписаться от тренировки
        </div>
      )}
      {isAuthenticated && event.is_registered && !inProfile &&(
        <div
          className={style.registerButton}
          onClick={() => navigate("/profile")}
        >
          Вы записаны на тренировку
        </div>
      )}
    </div>
  );
}
