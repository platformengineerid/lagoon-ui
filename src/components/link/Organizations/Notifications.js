import Link from 'next/link';

export const getLinkData = (organizationSlug) => ({
  urlObject: {
    pathname: `/organizations/notifications`,
    query: { organizationSlug: organizationSlug },
  },
  asPath: `/organizations/${organizationSlug}/notifications`
});

/**
 * Links to the group page given the project name and the openshift project name.
 */
const OrgNotificationsLink = ({
  organizationSlug,
  children,
  className = null,
  prefetch = false,
}) => {
  const linkData = getLinkData(organizationSlug);
  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default OrgNotificationsLink;

