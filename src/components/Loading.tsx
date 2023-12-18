import loading from "../assets/img/loading.gif";

export function Loading () {
  return (
    <div className="loading">
      <img src={loading} width={80} height={80} alt="loading" />
    </div>
  )
}