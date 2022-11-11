import styled, { css } from 'styled-components';

interface CardContainerProps {
    showDrawer: boolean;
}

const commonFlexBoxProps = css`
    display: flex;
    flex-basis: 100%;
    flex: 1;
`;

const activeCard = css`
    background-color: #213341;
`;

export const CardContainer = styled.div<CardContainerProps>`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 800px;
    height: 60px;

    background-color: #04182A;
    color: white;
  
    margin-top: 4px;
    padding: 20px;

    ${props => props.showDrawer && activeCard}
`;

export const CardContentsContainer = styled.div``;

export const Subtitle = styled.div`
    font-weight: 400;
    color: slategray;
`;

export const BoldedTitle = styled.div`
  font-weight: 800;
  font-size: 16px;
  margin-bottom: 2px;
`;

export const CurrentPriceContainer = styled.div`
    font-weight: 600;
`;

interface PriceChangePercentageContainerProps {
    priceChangePercentage: number;
}

export const PriceChangePercentageContainer = styled.div<PriceChangePercentageContainerProps>`
    ${props => props.priceChangePercentage < 0 ? 'color: darkorange;' : 'color: green'};
`; 

export const CardColumnRight = styled.div`
    ${commonFlexBoxProps}

    flex-direction: column;
    align-items: flex-end;
    text-align: right;
`;

export const CardColumnCenter = styled.div`
    ${commonFlexBoxProps}

    flex-direction: column;
    align-items: center;
`;

export const CardContentsRow = styled.div`
    ${commonFlexBoxProps}

    flex-direction: row;
    flex-wrap: wrap;
`;

export const CardImage = styled.img`
    width: 32px;
    height: 32px;
    padding-right: 20px;
`;