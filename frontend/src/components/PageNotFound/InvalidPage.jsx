import { Link } from "react-router-dom";

export default function InvalidPage() {
  return (
    <div>
      <h1>Sorry, this page isn't available.</h1>
      <p>
        The link you followed may be broken, or the page may have been removed.{" "}
        <Link to="/">Go back to HostePBX.</Link>{" "}
      </p>
    </div>
  );
}
