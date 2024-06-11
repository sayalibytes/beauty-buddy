import "../NotFoundPage/NotFoundPage.scss";

function NotFoundPage() {
  return (
    <div className="notFound">
      <h1 className="notFound__title">404</h1>
      <p className="notFound__p">Can't find what you're looking for, sorry!</p>
      <img className="notFound__img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNq_no8mzNdfu-TE-u-KhZnk9A6snT08SP2d4oGdeeXqHkMUSWO5nyv8Zj-PY-ynxEl04&usqp=CAU"
        alt="404 error"
      />
    </div>
  );
}

export default NotFoundPage;