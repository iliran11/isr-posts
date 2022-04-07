import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import React from "react";

function HomePage(props) {
  const [counter, setCounter] = React.useState(1);
  const { t } = useTranslation();
  return (
    <div>
      <p>Translation: {t("hello")}</p>
      <p>Counter: {counter}</p>
      <p>Date: {props.text}</p>
      <p>Id: {props.id}</p>
      <button onClick={() => console.log("gfffff")}>counter: {counter}</button>
    </div>
  );
}

export async function getStaticPaths(ctx) {
  console.log("get static props");
  return {
    paths: [
      { params: { postId: "1" }, locale: "en" },
      { params: { postId: "2" }, locale: "en" },
      { params: { postId: "3" }, locale: "en" },
      { params: { postId: "4" }, locale: "en" },
      { params: { postId: "1" }, locale: "de" },
      { params: { postId: "2" }, locale: "de" },
      { params: { postId: "3" }, locale: "de" },
      { params: { postId: "4" }, locale: "de" },
    ],
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(ctx) {
  console.log("get static paths", ctx.params.id);
  return {
    revalidate: 10,
    props: {
      text: new Date().toString(),
      id: ctx.params.postId,
      ...(await serverSideTranslations(ctx.locale, ["common"])),
    }, // will be passed to the page component as props
  };
}

export default HomePage;
