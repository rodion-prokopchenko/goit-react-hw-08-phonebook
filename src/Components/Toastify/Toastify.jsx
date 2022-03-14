import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Toastify.module.css";

// LOGIN
const successLoginNotification = (user) => {
  toast.success(`User "${user}" has been logined`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
  });
};

const ErrorLoginPasswordNotification = () => {
  toast.warning(`Password cannot be less than    6 characters`, {
    position: "top-center",
    width: "700px",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    className: s.toastify,

    draggable: true,
  });
};

const errorLoginNotification = () => {
  toast.error("Incorrect login or password", {
    position: "top-center",
    className: s.toastify,
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
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
  });
};

const warningRegisterNameNotification = () => {
  toast.warn("Name input needs to be minimum of 6 symbols", {
    className: s.toastify,
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
  });
};
const warningRegisterEmailNotification = () => {
  toast.warn("Incorrect email", {
    className: s.toastify,
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
  });
};
const warningRegisterPasswordNotification = () => {
  toast.warn("Password input needs to be minimum of 6 symbols", {
    className: s.toastify,
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
  });
};

const errorRegisterNotification = (error) => {
  toast.error(`${error.message}`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
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
  });
};
const warningNameAddNotification = () => {
  toast.warning(`Add name`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
  });
};

const warningNumberAddNotification = () => {
  toast.warning(`Add number`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
  });
};

const errorAddNotification = (contact) => {
  toast.error(`Contact "${contact}" hasn't been added`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
  });
};

// ADD && UPDATE
const errorSameNameNotification = (contact) => {
  toast.error(`Contact "${contact}" is already presented/added in contacts`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,

    draggable: true,
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
  });
};

const successDeletedNotification = (contact) => {
  toast.success(`Contact "${contact}" has been deleted`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
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
  });
};

const errorReturnNotification = (contact) => {
  toast.error(`The deleted contact "${contact}" has been reterned`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
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
  });
};

const errorUpdateNotification = (contact) => {
  toast.error(`Contact "${contact}" hasn't been updated`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,

    draggable: true,
  });
};

export {
  successReturnNotification,
  errorReturnNotification,
  successLoginNotification,
  errorLoginNotification,
  errorRegisterNotification,
  successRegisterNotification,
  warningRegisterNameNotification,
  warningRegisterEmailNotification,
  warningRegisterPasswordNotification,
  successAddNotification,
  warningNameAddNotification,
  warningNumberAddNotification,
  errorSameNameNotification,
  errorAddNotification,
  errorDeletedNotification,
  successDeletedNotification,
  successUpdateNotification,
  errorUpdateNotification,
  ErrorLoginPasswordNotification,
};
