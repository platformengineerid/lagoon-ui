import React from "react";
import Head from "next/head";
import MainLayout from "layouts/MainLayout";
import Me from "lib/query/Me";
import SshKeys from "../../components/SshKeys";
import AddSshKey from "../../components/SshKeys/AddSshKey";
import { CommonWrapper } from "../../styles/commonPageStyles";
import QueryError from "../../components/errors/QueryError";
import { useQuery } from "@apollo/react-hooks";
import useTranslation from "lib/useTranslation";

/**
 * Displays the user settings page.
 */
const SettingsPage = () => {
  const t = useTranslation();
  const { data, loading, error } = useQuery(Me, {
    displayName: "Me",
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    return <QueryError error={error} />;
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <MainLayout>
        <CommonWrapper>
          <h2>{t("settings.title")}</h2>
          <div className="content">
            <SshKeys me={data?.me || {}} loading={loading} />
            <AddSshKey me={data?.me || {}} />
          </div>
        </CommonWrapper>
      </MainLayout>
    </>
  );
};

export default SettingsPage;
