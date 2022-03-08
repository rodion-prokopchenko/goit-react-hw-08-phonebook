import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// LOGIN
const successLoginNotification = (user) => {
  toast.success(`User "${user}" has been logined`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

const errorLoginNotification = (error) => {
  toast.error(`${error.message}`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

// REGISTER
const successRegisterNotification = (user) => {
  toast.success(`User "${user}" has been registered`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

const errorRegisterNotification = (error) => {
  toast.error(`${error.message}`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

// ADD
const successAddNotification = (contact) => {
  toast.success(`Contact "${contact}" has been added`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};
const warningNameAddNotification = () => {
  toast.warning(`Add name`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

const warningNumberAddNotification = () => {
  toast.warning(`Add number`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

const errorAddNotification = (contact) => {
  toast.error(`Contact "${contact}" hasn't been added`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

// ADD && UPDATE
const errorSameNameNotification = (contact) => {
  toast.error(`Contact "${contact}" is already presented/added in contacts`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

// DELETE
const errorDeletedNotification = (contact) => {
  toast.error(`Contact "${contact}" hasn't been deleted`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

const successDeletedNotification = (contact) => {
  toast.success(`Contact "${contact}" has been deleted`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

// RETURN DELETED CONTACT
const successReturnNotification = (contact) => {
  toast.success(`The deleted contact "${contact}" has been reterned`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

const errorReturnNotification = (contact) => {
  toast.error(`The deleted contact "${contact}" has been reterned`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

// UPDATE
const successUpdateNotification = (contact) => {
  toast.success(`Contact "${contact}" has been updated`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

const errorUpdateNotification = (contact) => {
  toast.error(`Contact "${contact}" hasn't been updated`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
    progress: undefined,
  });
};

export {
  successReturnNotification,
  errorReturnNotification,
  successLoginNotification,
  errorLoginNotification,
  errorRegisterNotification,
  successRegisterNotification,
  successAddNotification,
  warningNameAddNotification,
  warningNumberAddNotification,
  errorSameNameNotification,
  errorAddNotification,
  errorDeletedNotification,
  successDeletedNotification,
  successUpdateNotification,
  errorUpdateNotification,
};
