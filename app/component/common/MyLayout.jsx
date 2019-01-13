import React from "react";
import dayjs from "dayjs";
import "../../public/css/common.pcss";
import "../../public/css/MyLayout.pcss";

class MyLayout extends React.Component {
  render() {
    let copyStr = "copyright©" + dayjs().format("YYYY") + " 苏州伊欧陆系统集成有限公司";
    return (
      <div className="proj-layout">
        <div className="proj-layout__icon">
          <img src={require("../../public/img/pic/logo_iaminhtml.png")} alt="logo" />
        </div>
        <div className="proj-layout__btn">futureD数据管理与数据分析</div>
        <div className="proj-layout__menu" />
        <div className="proj-layout__body">
          <div id="proj-content" style={{ height: "100%" }} />
        </div>
        <div className="proj-layout__copy">{copyStr}</div>
      </div>
    );
  }
}

export default MyLayout;
