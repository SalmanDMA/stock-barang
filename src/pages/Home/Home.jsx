import Layout from "../../global/Layout";
import CardComponent from "./Card";

export default function Home({ username }) {
  return (
    <>
      <Layout>
        <div className="mb-5 py-5">
          <h1>
            Welcome, <span style={{ color: "Highlight" }}>{username}</span> to
            the King Salman Management Apps
          </h1>
        </div>
        <div className="d-flex justify-content-between gap-2">
          <CardComponent />
          <CardComponent />
        </div>
      </Layout>
    </>
  );
}
