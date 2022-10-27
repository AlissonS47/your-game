import "./PreLoader.css"

import Preloader from "../img/preloader.svg"

const PreLoader = () => {
  return (
    <div className="preloader flex-row flex-jc flex-ac">
      <img src={Preloader} alt="Spinner preloader" />
    </div>
  )
}

export default PreLoader