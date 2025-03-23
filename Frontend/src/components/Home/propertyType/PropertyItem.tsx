import "./PropertyItem.scss";
const propertyItem = ({ logo, title, number }: any) => {
  return (
    <div className="w-[300px] group bg-orage relative p-[20px] rounded-[20px]">
      <div className="bg-blue icon  relative w-[70px] h-[70px] overflow-hidden rounded-full mb-[30px] flex justify-center items-center">
        <img src={logo} alt="" className="w-[100%] h-[100%]" />
      </div>
      <h3 className="title text-[30px] font-moul font-bold ">{title}</h3>
      <p className="number w-full text-[20px] font-moul">
        <span className="font-mono  font-bold pr-3">{number}</span>
        អចលនទ្រព្យ
      </p>
    </div>
  );
};

export default propertyItem;
