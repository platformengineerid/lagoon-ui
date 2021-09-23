import React from 'react';
import { bp, color, fontSize, lineHeight } from 'lib/variables';

/**
 * Applies styles globally to any component nested inside it.
 */
const GlobalStyles = ({ children }) => (
  <>
    { children }
    <style jsx global>{`
    :global(#__next) {
      * {
        box-sizing: border-box;
      }

      body {
        color: ${color.black};
        font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
        font-size: ${fontSize(16)};
        background-color: ${color.almostWhite};
        height: 100%;
        line-height: 1.25rem;
        overflow-x: hidden;
      }

      .main {
        padding-top: 50px;
      }

      footer {
        position: absolute;
        bottom: 0;
        width: 100%;
      }

       .content-wrapper {
        background-color: ${color.almostWhite};
        flex: 1;
        flex-direction: column;
        padding: 1em 4em;
        height: 100vH;
      }

      .content-wrapper-full-width {
        min-width: 85%;
      }

      .content-wrapper-full-width-centered {
        justify-content: flex-start;
        text-align: center;
        min-height: calc(100vH - 48px);

        .content {
          margin-top: 50px;
          @media ${bp.wideUp} {
            margin: 100px;
          }
          @media ${bp.extraWideUp} {
            margin: 100px;
          }
        }
      }

      .loading-wrapper {
        padding: 4em;
      }

      .filters-wrapper {
        padding: 0em 1em;
        
        .select-filters {
          display: flex;
          flex-direction: column;

          @media ${bp.wideUp} {
            flex-flow: row;
          }

          .stackable {
            width: 100%;
          }

          &:first-child {
            padding-bottom: 1em;
          }
        }
      }

      .text-large {
        font-size: 1.4em;
      }

      // Colours

      .red {
        color: ${color.red};
      }

      .blue {
        color: ${color.blue};
      }

      .yellow {
        color: ${color.lightestBlue};
      }

      .grey {
        color: ${color.grey};
      }

      input#filter {
        width: 100%;
        border: none;
        padding: 10px 20px;
        margin: 0;
      }

      .button-sort {
        color: #5f6f7a;
        font-family: 'source-code-pro',sans-serif;
        font-size: 12px;
        font-size: 0.8125rem;
        line-height: 1.4;
        text-transform: uppercase;
        text-align: center;
        border: none;
        background: none;
        cursor: pointer;
        padding: 0;
        width: calc(100% / 6);

        &.identifier {
          text-align: left;
        }

        &.ascending:after {
          content: ' \\25B2';
        }

        &.descending:after {
          content: ' \\25BC';
        }
      }

      .data-none {
        border: 1px solid ${color.white};
        border-bottom: 1px solid ${color.lightestGrey};
        border-radius: 3px;
        line-height: 1.5rem;
        padding: 8px 0 7px 0;
        text-align: center;
      }

      img.ui.image.lagoon-logo {
        font-size: 0.6em;
        margin-right: 5px;
      }

      //
      // Semantic UI overrides
      //
      .ui.left.sidebar.navigation {
        width: 230px;
        box-shadow: none;
        padding: 4em 0 0;

        .menu {
          border: none;
          padding: 0;
          box-shadow: none;
          margin: auto;
          width: 100%;
        }

        i {
          font-size: 1.25em;
        }
      }

      .ui.right.sidebar.projects {
        box-shadow: none;
        background: ${color.white};
        padding: 5em 2em 0;
        border-left: 1px solid #ccc;
      }

      .ui.vertical.menu.basic {
        border: none;
        padding: 20px 0em;
      }

      .ui.right.close.rail {
        width: 42%;
      }

      .ui.table > tr > td.selectable,
      .ui.table > tbody > tr > td.selectable,
      .ui.selectable.table > tbody > tr,
      .ui.selectable.table > tr,
      .ui.table > thead > tr > th > label {
        cursor: pointer;
      }

      .ui.pointing.secondary.menu {
        align-items: center;
      }

      .ui.basic.button.close-sidebar {
        border: none;
        outline: none;
        box-shadow: none;
        margin-left: -4px;
        padding: 1em 1em 2em 0;
      }

      .ui.table.results-table {
        border: none;
        outline: 1px solid #eee;
      }

      .ui.sidebar .ui.divider {
        margin: 0.5em 0;
      }

      .category-item .ui.label {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      a.project-menu-link {
        padding: 0 10px;
      }

      .no-padding-bottom {
        padding-bottom: 0 !important;
      }

      .ui.label.deployment {
        min-width: 120px;
        padding-left: 1em;
      }

      .deployments i.icon.circle.deployment-status {
        padding: 6px 5px 0px 0px;

        &.running {
          animation: blinker 3s linear infinite;
        }

        @keyframes blinker {
          50% {
            opacity: 0;
          }
        }
      }

      .scroll-wrapper {
        position: fixed;
        display: inline-flex;
        flex-wrap: wrap;
        flex-direction: column;
        right: 8%;
        bottom: 2.33em;
        
        .scroll {
          margin-bottom: 1em;
        }
      }

      .sidebar-button {
        position: fixed;
        text-align: center;
        transition: none;
        will-change: right;
        height: 45px;
        bottom: 0;
        top: 50%;

        &.hidden {
          right: -20px;
          left: auto;
        }

        &.visible {
          right: 330px;
          left: auto;
          -webkit-transition: -webkit-transform 500ms ease;
          transition: -webkit-transform 500ms ease;
          transition: right 500ms ease;
          transition: right 500ms ease, -webkit-transform 500ms ease;
          will-change: right;
          transition-delay: 0s;
        }

        .sidebar-button-sticky .ui.button {
          background: ${color.lagoon2Grey};
          color: ${color.white};
          padding: 15px 15px 15px 10px;
          border-radius: 50%;
          margin: 0;

          i {
            margin : 0 !important;
            right: 3px;
            position: relative;
          }
        }
      }

      .box {
        visibility: hidden;
        animation: fadein 0.25s;
        animation-fill-mode: forwards;
        // animation-delay: 0.25s;
      }

      .fallback-fadein {
        visibility: hidden;
        animation: fadein 0.5s;
        animation-fill-mode: forwards;
        animation-delay: 0.25s;
      }

      @keyframes fadein {
        from {
          visibility: visible;
          opacity: 0;
        }
        to {
          visibility: visible;
          opacity: 1;
        }
      }

      a {
        color: ${color.black};
        text-decoration: none;

        &.hover-state {
          position: relative;
          transition: all 0.2s ease-in-out;

          &::before,
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 0;
            height: 1px;
            transition: all 0.2s ease-in-out;
            transition-duration: 0.75s;
            opacity: 0;
          }
          &::after {
            left: 0;
            background-color: ${color.linkBlue};
          }
          &:hover {
            &::before,
            &::after {
              width: 100%;
              opacity: 1;
            }
          }
        }
      }

      a.project-link {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      p {
        margin: 0 0 1.25rem;
      }

      p a {
        text-decoration: none;
        transition: background 0.3s ease-out;
      }

      strong {
        font-weight: normal;
      }

      em {
        font-style: normal;
      }

      h2 {
        font-size: ${fontSize(28)};
        line-height: ${lineHeight(32)};
        font-weight: normal;
        margin: 0 0 38px;
      }

      h3 {
        font-size: ${fontSize(24)};
        line-height: ${lineHeight(30)};
        font-weight: normal;
        margin: 0 0 36px;
      }

      h4 {
        font-size: ${fontSize(20)};
        line-height: ${lineHeight(24)};
        font-weight: normal;
        margin: 4px 0 0;
      }

      .project-menu-link {
        &.projects {
          font-size: ${fontSize(22)};
          line-height: ${lineHeight(24)};
          margin: 0;
        }
        &.environments {
          font-size: ${fontSize(18)};
          line-height: ${lineHeight(24)};
          margin: 0;
        }
      }

      ul {
        list-style: none;

        li {
          padding-left: 0;

          a {
            text-decoration: none;
          }
        }
      }

      ol {
        margin: 0 0 1.25rem;
        padding-left: 20px;

        li {
          margin-bottom: 1.25rem;

          a {
            text-decoration: none;
          }
        }
      }

      .field {
        line-height: 25px;

        a {
          color: ${color.linkBlue};
        }
      }

      button,
      input,
      optgroup,
      select,
      textarea {
        font-family: 'source-sans-pro', sans-serif;
        line-height: 1.25rem;
      }

      label {
        color: ${color.darkGrey};
        font-family: 'source-code-pro', sans-serif;
        font-size: ${fontSize(13)};
        text-transform: uppercase;
      }

      .ui.label.visit-icon {
        i {
          margin: 0;
        }
      }

    .ui.fluid.card.basic {
      border: 1px solid #f7f7f7;
      box-shadow: none;
    }
  }
  `}</style>
  </>
);

export default GlobalStyles;
