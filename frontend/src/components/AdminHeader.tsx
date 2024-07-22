import React from "react";

interface AdminHeaderProps {
  title: string;
  buttons?: React.ReactNode;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, buttons }) => {

  return (
    <>
      <header id="main-header">
        <div id="main-title">
          <h1>{title}</h1>
        </div>
        <div id="main-menu">
            {buttons}
        </div>
      </header>
    </>
  );
}

export default AdminHeader;