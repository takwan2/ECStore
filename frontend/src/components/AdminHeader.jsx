export default function AdminHeader({ title, buttons }) {

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
