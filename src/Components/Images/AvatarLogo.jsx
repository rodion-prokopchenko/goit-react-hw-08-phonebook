import s from "./Logo.module.css";

const AvatarLogo = () => {
  return (
    <>
      <svg
        className={s.logo}
        width="15px"
        height="20px"
        version="1.1"
        id="Layer_1_1_"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 16 16"
        fill="#1976d2"
        // style="enable-background:new 0 0 16 16;"
        // xml:space="preserve"
      >
        <path d="M12,9H8H4c-2.209,0-4,1.791-4,4v3h16v-3C16,10.791,14.209,9,12,9z" />

        <path d="M12,5V4c0-2.209-1.791-4-4-4S4,1.791,4,4v1c0,2.209,1.791,4,4,4S12,7.209,12,5z" />
      </svg>
      <span className={s.afterLogo}>:</span>
    </>
  );
};
export default AvatarLogo;
