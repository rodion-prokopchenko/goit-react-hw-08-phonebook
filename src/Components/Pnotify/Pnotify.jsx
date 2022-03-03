import { error, alert, defaultModules } from "@pnotify/core";
import * as Pnotify from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/Material.css";
import "material-design-icons/iconfont/material-icons.css";

Pnotify.icons = "material";
defaultModules.set(PNotifyMobile, {});

// LOGIN
const successLoginNotification = (user) => {
  Pnotify.success({
    text: `User "${user}" has been logined`,
    delay: 3300,
    styling: "material",
  });
};

const errorLoginNotification = (error) => {
  Pnotify.error({
    text: `${error.message}`,
    delay: 3300,
    styling: "material",
  });
};

// REGISTER
const successRegisterNotification = (user) => {
  Pnotify.success({
    text: `User "${user}" has been registered`,
    delay: 3300,
    styling: "material",
  });
};

const errorRegisterNotification = (error) => {
  Pnotify.error({
    text: `${error.message}`,
    delay: 3300,
    styling: "material",
  });
};

// ADD
const successAddNotification = (contact) => {
  Pnotify.success({
    text: `Contact "${contact}" has been added`,
    delay: 3300,
    styling: "material",
  });
};

// ADD && UPDATE
const errorSameNameNotification = (contact) => {
  Pnotify.error({
    text: `Contact "${contact}" is already presented/added in contacts`,
    delay: 3300,
    styling: "material",
  });
};

const errorAddNotification = (contact) => {
  Pnotify.error({
    text: `Contact "${contact}" hasn't been added`,
    delay: 3300,
    styling: "material",
  });
};

// DELETE
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
  successLoginNotification,
  errorLoginNotification,
  errorRegisterNotification,
  successRegisterNotification,
  successAddNotification,
  errorSameNameNotification,
  errorAddNotification,
  errorDeletedNotification,
  successDeletedNotification,
  successUpdateNotification,
  errorUpdateNotification,
};
