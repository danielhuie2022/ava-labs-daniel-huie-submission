import React, { useState } from 'react';
import Sparkline from '../Sparkline/Sparkline';
import { CardDrawerContainer } from './styles';
import '../../App.css';

interface Props {
    children: any;
};

const CardDrawer: React.FC<Props> = ({
    children,
}) => (
    <CardDrawerContainer>
        {children}
    </CardDrawerContainer>
);

export default CardDrawer;