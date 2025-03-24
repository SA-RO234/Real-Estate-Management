import React from "react";

const ContactExpert = () => {
  return (
    <section className="help-Expert flex w-[85%] rounded-[20px] items-center m-auto mt-[100px] bg-orange-50 justify-between p-[50px] ">
      <div className="left w-[60%]">
        <h1 className="text-[40px] font-bold  font-moul text-orage">ត្រូវការជំនួយ? សូមពិភាក្សាជាមួយអ្នកជំនាញរបស់ពួកយើង</h1>
        <p className="text-[18px] text-gray-600 font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus dolorum
          odit tempora facere cumque, atque ut eos a molestiae asperiores
          quaerat quas quisquam ex doloremque. Reprehenderit, corporis expedita!
          Animi, quidem.
        </p>
      </div>
      <div className="right flex gap-[10px]">
        <button type="button" className="btn numberCall bg-red-600">
          +855 77327539
        </button>
        <button type="button" className="btn ">
          ទំនាក់ទំនងឥឡូវនេះ
        </button>
      </div>
    </section>
  );
};

export default ContactExpert;
