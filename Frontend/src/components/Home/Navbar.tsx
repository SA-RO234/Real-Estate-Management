import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import "./Navbar.scss";
const Navbar = () => {
  return (
    <div className="Navbar-container p-[0px_20px] w-[90%] m-auto flex justify-between items-center">
      <a href="#" className="flex  items-end justify-start gap-3  border-orage">
        <img className="w-[100px]" src={logo} alt="" />
      </a>

      <div className="navbar w-full nav-list justify-end flex gap-[50px] items-center">
        <ul className="nav-list flex gap-[50px]">
          <li className="navItem ">
            <a
              href="#"
              className="text-[20px] relative text-orage font-chenla font-bold after:contents-[] after:translate-x-[80%] before:translate-x-[-80%] hover:after:translate-x-0  after:opacity-0 before:opacity-0 hover:after:opacity-[1] hover:before:opacity-[1] hover:before:translate-x-0 after:transition-[0.8s] after:w-[50%] after:absolute after:bottom-[0px] after:bg-orage after:h-[2px] after:right-0 after:contents-[] before:transition-[0.8s] before:bg-orage before:w-[50%] before:absolute before:bottom-[0px] before::bg-orage before:h-[2px] before:left-0"
            >
              ទំព័រដើម
            </a>
          </li>
          <li className="navItem">
            <a
              href="#"
              className="text-[20px] relative text-orage font-chenla font-bold after:contents-[] after:translate-x-[80%] before:translate-x-[-80%] hover:after:translate-x-0  after:opacity-0 before:opacity-0 hover:after:opacity-[1] hover:before:opacity-[1] hover:before:translate-x-0 after:transition-[0.8s] after:w-[50%] after:absolute after:bottom-[0px] after:bg-orage after:h-[2px] after:right-0 after:contents-[] before:transition-[0.8s] before:bg-orage before:w-[50%] before:absolute before:bottom-[0px] before::bg-orage before:h-[2px] before:left-0"
            >
              អំពីពួកយើង
            </a>
          </li>
          <li className="navItem">
            <a
              href="#"
              className="text-[20px] relative text-orage font-chenla font-bold after:contents-[] after:translate-x-[80%] before:translate-x-[-80%] hover:after:translate-x-0  after:opacity-0 before:opacity-0 hover:after:opacity-[1] hover:before:opacity-[1] hover:before:translate-x-0 after:transition-[0.8s] after:w-[50%] after:absolute after:bottom-[0px] after:bg-orage after:h-[2px] after:right-0 after:contents-[] before:transition-[0.8s] before:bg-orage before:w-[50%] before:absolute before:bottom-[0px] before::bg-orage before:h-[2px] before:left-0"
            >
              ការចុះបញ្ជី
            </a>
          </li>
          <li className="navItem">
            <a
              href="#"
              className="text-[20px] relative text-orage font-chenla font-bold after:contents-[] after:translate-x-[80%] before:translate-x-[-80%] hover:after:translate-x-0  after:opacity-0 before:opacity-0 hover:after:opacity-[1] hover:before:opacity-[1] hover:before:translate-x-0 after:transition-[0.8s] after:w-[50%] after:absolute after:bottom-[0px] after:bg-orage after:h-[2px] after:right-0 after:contents-[] before:transition-[0.8s] before:bg-orage before:w-[50%] before:absolute before:bottom-[0px] before::bg-orage before:h-[2px] before:left-0"
            >
              អចលនទ្រព្យ
            </a>
          </li>
          <li className="navItem">
            <a
              href="#"
              className="text-[20px] flex gap-[10px] relative text-orage font-chenla font-bold after:contents-[] after:translate-x-[80%] before:translate-x-[-80%] hover:after:translate-x-0  after:opacity-0 before:opacity-0 hover:after:opacity-[1] hover:before:opacity-[1] hover:before:translate-x-0 after:transition-[0.8s] after:w-[50%] after:absolute after:bottom-[0px] after:bg-orage after:h-[2px] after:right-0 after:contents-[] before:transition-[0.8s] before:bg-orage before:w-[50%] before:absolute before:bottom-[0px] before::bg-orage before:h-[2px] before:left-0"
            >
              គេហទំព័រ
              <FaAngleDown />
              <FaAngleUp className="hidden" />
            </a>
          </li>
          <li className="navItem">
            <a
              href="#"
              className="text-[20px] relative text-orage font-chenla font-bold after:contents-[] after:translate-x-[80%] before:translate-x-[-80%] hover:after:translate-x-0  after:opacity-0 before:opacity-0 hover:after:opacity-[1] hover:before:opacity-[1] hover:before:translate-x-0 after:transition-[0.8s] after:w-[50%] after:absolute after:bottom-[0px] after:bg-orage after:h-[2px] after:right-0 after:contents-[] before:transition-[0.8s] before:bg-orage before:w-[50%] before:absolute before:bottom-[0px] before::bg-orage before:h-[2px] before:left-0"
            >
              ទំនាក់ទំនង
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="register font-chenla font-bold btn text-[20px] bg-blue text-white p-[15px_40px] rounded-[5px]"
        >
          ចុះឈ្មោះ
        </button>
      </div>
    </div>
  );
};

export default Navbar;
