import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// LOGIN
const successLoginNotification = (user) => {
  toast.success(`User "${user}" has been logined`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const errorLoginNotification = (error) => {
  toast.error(`${error.message}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// REGISTER
const successRegisterNotification = (user) => {
  toast.success(`User "${user}" has been registered`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const errorRegisterNotification = (error) => {
  toast.error(`${error.message}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// function a() {
//   return (
//     <>
//       <div>
//         <button>НАЖИМАЙ СЮДА</button>
//       </div>
//     </>
//   );
// }

// ADD
const successAddNotification = (contact) => {
  toast.success(`Contact "${contact}" has been added`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const errorAddNotification = (contact) => {
  toast.error(`Contact "${contact}" hasn't been added`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// ADD && UPDATE
const errorSameNameNotification = (contact) => {
  toast.error(`Contact "${contact}" is already presented/added in contacts`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// DELETE
const errorDeletedNotification = (contact) => {
  toast.error(`Contact "${contact}" hasn't been deleted`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const successDeletedNotification = (contact) => {
  toast.success(`Contact "${contact}" has been deleted`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// UPDATE
const successUpdateNotification = (contact) => {
  toast.success(`Contact "${contact}" has been updated`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const errorUpdateNotification = (contact) => {
  toast.error(`Contact "${contact}" hasn't been updated`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
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

////////////////////////////////////////////////////
