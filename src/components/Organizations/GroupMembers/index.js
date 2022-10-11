import React, { useState } from 'react';
import Link from 'next/link';
import css from 'styled-jsx/css';
import Highlighter from 'react-highlight-words';
// import MemberLink from 'components/link/Member';
import Box from 'components/Box';
import { bp, color, fontSize } from 'lib/variables';
import Button from 'components/Button';
import RemoveUserConfirm from 'components/Organizations/RemoveUserConfirm';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const { className: boxClassName, styles: boxStyles } = css.resolve`
  .box {
    margin-bottom: 5px;

    .content {
      padding: 5px;
      @media ${bp.tinyUp} {
        display: flex;
      }
    }
  }
`;

const REMOVE_USER_FROM_GROUP = gql`
  mutation removeUserFromGroup($groupName: String!, $email: String!) {
    removeUserFromGroup(input:{
      group:{
        name: $groupName
      }
      user:{
        email: $email
      }
    }){
      name
    }
  }
`;

/**
 * The primary list of members.
 */
const GroupMembers = ({ members = [], groupName }) => {
  const [searchInput, setSearchInput] = useState('');

  const filteredMembers = members.filter(key => {
    const sortByName = key.user.email
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const sortByRole = key.role
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    return ['name', 'role', '__typename'].includes(key)
      ? false
      : (true && sortByName) || sortByRole;
  });

  return (
    <>
      <div className="header">
        <label>Members</label>
        <label></label>
        <input
          aria-labelledby="search"
          className="searchInput"
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Type to search"
          disabled={members.length === 0}
        />
      </div>

    <div className="deployments">
      <div className="data-table">
      {!members.length && <div className="data-none">No members</div>}
      {(searchInput && !filteredMembers.length) && (
          <div className="data-none">No members matching "{searchInput}"</div>
      )}
      {filteredMembers.map(member => (
      <div key={member.user.email} className="data-row" deployment={member.user.email}>
        <div className="name">{member.user.email} {(member.user.comment && member.user.comment.includes("autogenerated user for project") ) && (<label className="system-user-label">system account</label>)}</div>
        <div className="customer"><label className={`${member.role}-label`}>{member.role}</label></div>
        <div className="remove">
        {(member.user.comment && member.user.comment.includes("autogenerated user for project") ) || (
          <>
            <Mutation mutation={REMOVE_USER_FROM_GROUP}>
            {(removeUserFromGroup, { loading, called, error, data }) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              if (called) {
                return <div>Success</div>;
              }
              return (
                <RemoveUserConfirm
                  removeName={member.user.email}
                  onRemove={() =>
                    removeUserFromGroup({
                      variables: {
                        groupName: groupName,
                        email: member.user.email
                      }
                    })
                  }
                />
              );
            }}
          </Mutation>
          </>
        )}
        </div>
      </div>
      ))}
      </div>
    </div>
      <style jsx>{`
        .OWNER-label {
          color: ${color.white};
          background-color: ${color.lightRed};
          margin-left: 10px;
          padding: 5px 10px 5px 10px;
          border-radius: 4px;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
        }
        .MAINTAINER-label {
          color: ${color.white};
          background-color: ${color.lightBlue};
          margin-left: 10px;
          padding: 5px 10px 5px 10px;
          border-radius: 4px;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
        }
        .DEVELOPER-label {
          color: ${color.white};
          background-color: ${color.teal};
          margin-left: 10px;
          padding: 5px 10px 5px 10px;
          border-radius: 4px;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
        }
        .REPORTER-label {
          color: ${color.darkGrey};
          background-color: ${color.midGrey};
          margin-left: 10px;
          padding: 5px 10px 5px 10px;
          border-radius: 4px;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
        }
        .GUEST-label {
          color: ${color.black};
          background-color: ${color.lightGreen};
          margin-left: 10px;
          padding: 5px 10px 5px 10px;
          border-radius: 4px;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
        }
        .system-user-label {
          color: ${color.white};
          background-color: ${color.black};
          margin-left: 10px;
          padding: 5px 10px 5px 10px;
          border-radius: 4px;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
        }
        .remove {
          display:flex; justify-content:flex-end; padding:0;
          width: 10%;
        }
        .name {
          font-family: 'source-code-pro',sans-serif;
          font-size: 0.8125rem;
          padding: 5px 10px 5px 10px;
          width: 60%;
          .comment {
            font-size: 10px;
          }
          font-weight: normal;
        }
        .customer {
          font-family: 'source-code-pro',sans-serif;
          font-size: 0.8125rem;
          padding: 5px 10px 5px 10px;
          width: 30%;
          .comment {
            font-size: 10px;
          }
          font-weight: normal;
        }
        .data-table {
          background-color: ${color.white};
          border: 1px solid ${color.midGrey};
          border-radius: 3px;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
          .data-none {
            border: 1px solid ${color.white};
            border-bottom: 1px solid ${color.lightestGrey};
            border-radius: 3px;
            line-height: 1.5rem;
            padding: 8px 0 7px 0;
            text-align: center;
          }
          .data-row {
            background-position: right 20px center;
            background-repeat: no-repeat;
            background-size: 18px 11px;
            border: 1px solid ${color.white};
            border-bottom: 1px solid ${color.lightestGrey};
            border-radius: 0;
            line-height: 1.5rem;
            padding: 8px 0 7px 0;
            @media ${bp.tinyUp} {
              display: flex;
              justify-content: space-between;
              padding-right: 40px;
            }
            & > div {
              padding-left: 20px;
              @media ${bp.tinyUp} {
                // width: 50%;
              }
            }
            &:hover {
              border: 1px solid ${color.brightBlue};
            }
            &:first-child {
              border-top-left-radius: 3px;
              border-top-right-radius: 3px;
            }
            &:last-child {
              border-bottom-left-radius: 3px;
              border-bottom-right-radius: 3px;
            }
          }
        }
        .header {
          @media ${bp.tinyUp} {
            align-items: center;
            display: flex;
            justify-content: space-between;
            margin: 0 0 14px;
            padding-right: 40px;
          }
          @media ${bp.smallOnly} {
            flex-wrap: wrap;
          }
          @media ${bp.tabletUp} {
            margin-top: 40px;
          }
          .searchInput {
            background: url('/static/images/search.png') 12px center no-repeat
              ${color.white};
            background-size: 14px;
            border: 1px solid hsl(0,0%,80%);
            border-radius: 4px;
            height: 40px;
            padding: 0 12px 0 34px;
            transition: border 0.5s ease;
            @media ${bp.smallOnly} {
              margin-bottom: 20px;
              order: -1;
              width: 100%;
            }
            @media ${bp.tabletUp} {
              width: 30%;
            }
            &::placeholder {
              color: ${color.grey};
            }
            &:focus {
              border: 1px solid ${color.brightBlue};
              outline: none;
            }
          }

          label {
            display: none;
            padding-left: 20px;
            width: 50%;
            @media ${bp.tinyUp} {
              display: block;
            }
          }
        }
      `}</style>
      {boxStyles}
    </>
  );
};

export default GroupMembers;
