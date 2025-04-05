import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="container mx-auto px-4 relative z-10">{children}</div>
      <div
        className="w-full h-screen absolute top-0 left-0 z-0 "
        style={{
          backgroundImage:
            "url('https://static.schumacherhomes.com/umbraco/media/wvflutbh/image4.jpg?format=webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          filter: "blur(4px)",
        }}
      ></div>
    </div>
  );
};

export default AuthLayout;
