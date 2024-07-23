import React from "react";

import style from "./MainLayout.module.scss";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return <div className={style.wrapper}>{children}</div>;
}
