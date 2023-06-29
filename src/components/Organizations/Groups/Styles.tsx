import { bp, color } from 'lib/variables';
import styled from 'styled-components';

import { sharedTableStyles } from '../SharedStyles';

export const GroupsWrapper = styled.div`
  flex-grow: 1;
  padding: 40px calc((100vw / 16) * 1);

  .content {
    padding: 32px calc((100vw / 16) * 1);
    width: 100%;
  }

  .details {
    width: 100%;
    @media ${bp.xs_smallUp} {
      display: flex;
      flex-wrap: wrap;
      min-width: 100%;
      width: 100%;
    }

    .field-wrapper {
      &::before {
        margin-inline: 14px;
        padding-right: unset;
        width: unset;
      }
      margin: 0px;
      @media ${bp.xs_smallUp} {
        min-width: 50%;
        position: relative;
        width: 50%;
      }
      @media ${bp.wideUp} {
        min-width: 33.33%;
        width: 33.33%;
      }
      @media ${bp.extraWideUp} {
        min-width: 25%;
        width: 25%;
      }

      &.environmentType {
        &::before {
          background-size: 20px 20px;
        }
      }
    }
  }
`;

export const StyledGroups = styled.section`
  .default-group-label {
    color: ${color.white};
    background-color: ${props => (props.theme.colorScheme === 'dark' ? props.theme.borders.tableRow : color.black)};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
    font-size: clamp(0.5rem, 0.65vw, 1.2rem);
    text-align: center;
    display: inline-block;
  }
  .remove {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    width: 20%;
  }
  .group {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;
    width: 50%;
    font-weight: normal;
  }
  .customer {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;
    color: ${props => (props.theme.colorScheme === 'dark' ? color.grey : color.darkGrey)};
    width: 30%;
    font-weight: normal;
  }
  .newGroup {
    background: ${color.midGrey};
    padding: 15px;
  }
  .form-box input,
  textarea {
    display: inline-block;
    width: 50%;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    min-height: 38px;
    border-color: hsl(0, 0%, 80%);
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    color: #5f6f7a;
    padding: 8px;
    box-sizing: border-box;
  }
  input[type='text']:focus {
    border: 2px solid ${color.linkBlue};
    outline: none;
  }
  label {
    padding-left: 20px;
    padding-right: 15px;
  }
  ${sharedTableStyles}
  .description {
    line-height: 24px;
  }
`;
