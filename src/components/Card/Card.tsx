import React, { useState } from 'react';
import CardDrawer from '../CardDrawer/CardDrawer';
import Sparkline from '../Sparkline/Sparkline';
import {
    CardContainer,
    CardContentsContainer,
    CardContentsRow,
    CardColumnCenter,
    CardColumnRight,
    CardImage,
    Subtitle,
    BoldedTitle,
    CurrentPriceContainer,
    PriceChangePercentageContainer
} from './styles';
import '../../App.css';

interface SparkLine {
    price: number[];
}

interface Props {
    currentPrice: number;
    currency: string;
    image: string;
    name: string;
    priceChangePercentage: number;
    sparklineData: SparkLine;
    symbol: string;
    volume: number;
}

const Card: React.FC<Props> = ({
    currentPrice,
    currency,
    image,
    name,
    priceChangePercentage,
    sparklineData,
    symbol,
    volume,
}) => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    const handleDrawerState = () => {
        setShowDrawer(prevShowDrawer => !prevShowDrawer);
    };

    return (
        <React.Fragment>
            <CardContainer showDrawer={showDrawer} onClick={handleDrawerState}>
                <CardContentsRow>
                    <CardImage src={image} />
                    <CardContentsContainer>
                        <BoldedTitle>{symbol}-{currency}</BoldedTitle>
                        <Subtitle>{name}</Subtitle>
                    </CardContentsContainer>
                </CardContentsRow>

                <CardColumnCenter>
                    <Sparkline sparklineData={sparklineData.price} width={100} height={60} showTooltip={false} />
                </CardColumnCenter>
                <CardColumnRight>
                    <BoldedTitle>{volume} {symbol.toUpperCase()}</BoldedTitle>
                    <Subtitle>24h volume</Subtitle>
                </CardColumnRight>
                <CardColumnRight>
                    <CurrentPriceContainer>${currentPrice}</CurrentPriceContainer>
                    <PriceChangePercentageContainer priceChangePercentage={priceChangePercentage}>{priceChangePercentage}%</PriceChangePercentageContainer>
                </CardColumnRight>
            </CardContainer>
            {showDrawer && (
                <CardDrawer>
                    <Sparkline sparklineData={sparklineData.price} width={500} height={50} showTooltip={true} />
                </CardDrawer>
            )}
        </React.Fragment>
    );
};

export default Card;
