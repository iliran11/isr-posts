import React from "react";

function HomePage(props) {
  const [counter, setCounter] = React.useState(1);
  return (
    <div>
      <p>Counter: {counter}</p>
      <p>Date: {props.text}</p>
      <p>Id: {props.id}</p>
      <button onClick={() => console.log("gfffff")}>counter: {counter}</button>
    </div>
  );
}

export async function getStaticPaths() {
  console.log("get static props");
  return {
    paths: [
      { params: { postId: "1" } },
      { params: { postId: "2" } },
      { params: { postId: "3" } },
      { params: { postId: "4" } },
    ],
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  console.log("get static paths", context.params.id);
  return {
    revalidate: 10,
    props: {
      text: new Date().toString(),
      id: context.params.postId,
    }, // will be passed to the page component as props
  };
}

export default HomePage;
