import React from 'react';
import css from 'styled-jsx/css';
import { bp, color, fontSize } from 'lib/variables';

const BillingGroup = ({ billingGroupCosts }) => {

  const { id, name, currency, availability, hitCost, hitCostFormula, storageCost, storageCostFormula, environmentCost, environmentCostFormula, total, modifiers, projects } = billingGroupCosts;
  return(
    <div className="billingGroup">
      <div className="data-table">

        <div className="data-row">
          <div>
            
            <h1>{name}</h1>
            <div>Availability: {availability}</div>
            <div>Currency: ({currency})</div>
            
          </div>
        </div>

        <div className="data-row">
          <div>
            Hits:<br/><span className="formula">{hitCostFormula}</span>
          </div><div className="value"> ${hitCost}</div>
        </div>

        <div className="data-row">
          <div>Storage:<br/><span className="formula">{storageCostFormula}</span></div><div className="value"> ${storageCost}</div>
        </div>

        <div className="data-row">
          <div>Dev:<br/><span className="formula">{environmentCostFormula.dev}</span></div><div className="value"> ${environmentCost.dev}</div>
        </div>

        <div className="data-row">
          <div>Prod:<br/><span className="formula">{environmentCostFormula.prod}</span></div><div className="value"> ${environmentCost.prod}</div><br/>
        </div>
        { 
          modifiers.map(
            ({ id, startDate, endDate, discountFixed, discountPercentage, extraFixed, extraPercentage, customerComments, adminComments, weight }, index) => (
              <div className="data-row">
              <div>{index === 0 ? "Modifiers:" : ''}</div>
                <div className="value">
                  {discountFixed !== 0 ? (`- $${discountFixed}`) : ''}
                  {discountPercentage !== 0 ? (`-  ${discountPercentage}%`) : ''}
                  {extraFixed !== 0 ? (`+ $${extraFixed}`) : ''}
                  {extraPercentage !== 0 ? (`+  ${extraPercentage}%`) : ''}
                </div>
              </div>
            ))
        }
        <div className="data-row total">
          <div className="">Total:</div> <div className="value"> ${total.toFixed(2)}</div>
        </div>

      </div>

      <style jsx>{`
        .formula {
          font-size: 0.85rem;
          font-style: italic;
          color: darkgrey;
        }
        .data-table {
          background-color: ${color.white};
          border: 1px solid ${color.lightestGrey};
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
            display: flex;
            border: 1px solid ${color.white};
            border-bottom: 1px solid ${color.lightestGrey};
            border-radius: 0;
            line-height: 1.5rem;
            padding: 8px 0 7px 0;
            @media ${bp.wideUp} {
              display: flex;
              justify-content: space-between;
              padding-right: 15px;
            }

            &.total {
              width: 100%;
              background-color: gray;
              color: white;
            }

            .value {
              width: 60%;
              text-align: right;
            }

            & > div {
              padding-left: 20px;
              @media ${bp.wideDown} {
                padding-right: 40px;
              }
              @media ${bp.wideUp} {

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
      `}</style>
    </div>
  )
};

export default BillingGroup;
