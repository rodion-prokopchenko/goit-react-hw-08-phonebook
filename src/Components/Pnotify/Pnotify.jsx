import * as PNotifyMobile from "@pnotify/mobile";
import * as Pnotify from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/Material.css";
import "material-design-icons/iconfont/material-icons.css";

Pnotify.styling = "material";
Pnotify.icons = "material";
Pnotify.defaultModules.set(PNotifyMobile, {});

const errorDeletedNotification = (contact) => {
  Pnotify.error({
    text: `Contact "${contact}" hasn't been deleted`,
    delay: 3300,
    styling: "material",
  });
};

const successDeletedNotification = (contact) => {
  Pnotify.success({
    text: `Contact "${contact}" has been deleted`,
    delay: 3300,
    styling: "material",
  });
};

// UPDATE
const successUpdateNotification = (contact) => {
  Pnotify.success({
    text: `Contact "${contact}" has been updated`,
    delay: 3300,
    styling: "material",
  });
};

const errorUpdateNotification = (contact) => {
  Pnotify.error({
    text: `Contact "${contact}" hasn't been updated`,
    delay: 3300,
    styling: "material",
  });
};

export {
  errorDeletedNotification,
  successDeletedNotification,
  successUpdateNotification,
  errorUpdateNotification,
};
