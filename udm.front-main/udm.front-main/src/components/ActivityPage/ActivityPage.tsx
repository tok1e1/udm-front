import React from "react";
import { TbPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ru } from "date-fns/esm/locale";
import style from "./ActivityPage.module.scss";
import { Header } from "../Header";
import { cigunActivity, zumbaActivity, fitnessActivity } from "../../images";
import { useParams } from "react-router-dom";
import { apiService } from "../../services";
import { Activity, Event } from "../../api";
import { useAuth } from "../../hooks";
import { EventRow } from "../EventRow/EventRow";

function getImageForActivity(id?: string) {
  switch (id) {
    case "1":
      return zumbaActivity;
    case "2":
      return cigunActivity;
    case "3":
    default:
      return fitnessActivity;
  }
}

export function ActivityPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activity, setActivity] = React.useState<Activity>();
  const [events, setEvents] = React.useState<Event[] | null>(null);

  React.useEffect(() => {
    const fetch = () => {
      if (!slug) return;

      apiService.getActivityInfo(slug).then((activity) => {
        setActivity(activity);
        setEvents(activity.events);
      });
    };

    fetch();
  }, [slug]);

  const handleClickRegistrationButton = async (event: Event) => {
    apiService.registerEvent(event.id.toString()).then(() => {
      const index = events?.indexOf(event);
      setEvents((prevState) => {
        return [
          ...(prevState ?? []).slice(0, index),
          { ...event, is_registered: true },
          ...(prevState ?? []).slice((index ?? 0) + 1),
        ];
      });
    });
  };

  return (
    <div className={style.body}>
      <Header />
      <div className={style.main}>
        <div className={style.mainHero}>
          <img src={getImageForActivity(slug)} alt="" />
        </div>
      </div>
      <div className={style.container}>
        <div className={style.trainingAbout}>
          <div className={style.traningAboutItem}>
            <div className={style.traningAboutInfo}>
              <div className={style.traningAboutName}>Длительность</div>
              <div className={style.traningAboutDescription}>60 минут</div>
            </div>
          </div>
          <div className={style.traningAboutItem}>
            <div className={style.traningAboutInfo}>
              <div className={style.traningAboutName}>Инвентарь</div>
              <div className={style.traningAboutDescription}>
                Коврик для йоги
              </div>
            </div>
          </div>
          <div className={style.traningAboutItem}>
            <div className={style.traningAboutInfo}>
              <div className={style.traningAboutName}>Экипировка</div>
              <div className={style.traningAboutDescription}>
                Удобная одежда
              </div>
            </div>
          </div>
        </div>
        <div className={style.activityDescription}>{activity?.description}</div>
      </div>
      <div className={style.scheduleWork}>
        <div>
          <div className={style.h2}>Расписание</div>
          <div className={style.scheduleWrapper}>
            {events?.map((event) => (
              <EventRow
                event={event}
                eventId={slug}
                inProfile = {false}
                handleClickRegistration={handleClickRegistrationButton}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
