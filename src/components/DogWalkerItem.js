export function DogWalkerItem({ walker }) {
  return (
    <>
      <div className="card">
        <div className="card-header">{walker?.first_name} {walker?.last_name}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{walker?.email}</li>
          <li className="list-group-item">{walker?.age}</li>
          <li className="list-group-item">{walker?.gender}</li>
        </ul>
      </div>
    </>
  );
}
