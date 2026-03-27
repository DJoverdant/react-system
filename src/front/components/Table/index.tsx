import "./styles.css";

const Table = () => {
  return (
    <div className="box">
      <div className="table">
        <div className="card">
          <div className="item">id</div>
          <div className="item">name</div>
          <div className="item">date</div>
          <div className="item">active</div>
        </div>
        <div className="card">
          <div className="item">int</div>
          <div className="item">varchar</div>
          <div className="item">datetime</div>
          <div className="item">boolean</div>
        </div>
      </div>
    </div>
  );
};

export default Table;
