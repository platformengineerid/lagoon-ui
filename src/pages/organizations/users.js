import React from 'react';

import Head from 'next/head';
import { withRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationBreadcrumb from 'components/Breadcrumbs/Organizations/Organization';
import OrgNavTabs from 'components/Organizations/NavTabs';
import OrgNavTabsSkeleton from 'components/Organizations/NavTabs/OrgNavTabsSkeleton';
import { OrganizationsWrapper } from 'components/Organizations/SharedStyles';
import Users from 'components/Organizations/Users';
import { UsersWrapper } from 'components/Organizations/Users/Styles';
import UsersSkeleton from 'components/Organizations/Users/UsersSkeleton';
import MainLayout from 'layouts/MainLayout';
import UsersByOrganization, { getOrganization } from 'lib/query/organizations/UsersByOrganization';

import QueryError from '../../components/errors/QueryError';

/**
 * Displays the users page
 */
export const PageUsers = ({ router }) => {
  const { data, error, loading, refetch } = useQuery(UsersByOrganization, {
    variables: { id: parseInt(router.query.organizationSlug, 10) },
  });

  const {
    data: orgData,
    error: orgErr,
    loading: orgLoading,
  } = useQuery(getOrganization, {
    variables: { id: parseInt(router.query.organizationSlug, 10) },
  });

  const handleRefetch = async () => await refetch({ id: parseInt(router.query.organizationSlug, 10) });

  if (loading || orgLoading) {
    return (
      <>
        <Head>
          {router.query.organizationName ? `${router.query.organizationName} | Organization` : 'Organization'}
        </Head>
        <MainLayout>
          <Breadcrumbs>
            <OrganizationBreadcrumb
              organizationSlug={router.query.organizationSlug}
              organizationName={router.query.organizationName || ''}
            />
          </Breadcrumbs>
          <OrganizationsWrapper>
            <OrgNavTabsSkeleton activeTab="users" />
            <UsersWrapper>
              <UsersSkeleton />
            </UsersWrapper>
          </OrganizationsWrapper>
        </MainLayout>
      </>
    );
  }

  if (error || orgErr) {
    return <QueryError error={error} />;
  }

  const organization = orgData.organization;
  const allUsers = data.users;

  return (
    <>
      <Head>
        <title>{`${organization.name} | Organization`}</title>
      </Head>
      <MainLayout>
        <Breadcrumbs>
          <OrganizationBreadcrumb organizationSlug={organization.id} organizationName={organization.name} />
        </Breadcrumbs>
        <OrganizationsWrapper>
          <OrgNavTabs activeTab="users" organization={organization} />
          <UsersWrapper>
            <Users
              refetch={handleRefetch}
              users={allUsers}
              organization={organization}
              organizationId={router.query.organizationSlug}
              organizationName={organization.name}
            />
          </UsersWrapper>
        </OrganizationsWrapper>
      </MainLayout>
    </>
  );
};

export default withRouter(PageUsers);
