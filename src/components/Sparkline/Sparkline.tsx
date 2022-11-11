import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import sparkline from "@fnando/sparkline";
import { SparklineContainer } from './styles';
import '../../App.css';

interface Props {
  sparklineData: number[];
  width: number;
  height: number;
  showTooltip: boolean;
}

interface DataPoint {
  value: number;
}

const Sparkline: React.FC<Props> = ({ 
    sparklineData,
    width,
    height,
    showTooltip,
 }) => {
    const sparklineRef = useRef<SVGSVGElement>(null);
    const [currentDatapoint, setCurrentDatapoint] = useState<DataPoint | null>(null);

    const findClosest = (target: any, tagName: string) => {
        if (target.tagName === tagName) {
            return target;
        }
      
        while (target = target.parentNode) {
            if (target.tagName === tagName) {
                break;
            }
        }
      
        return target;
    };
  
    const options = {
      onmousemove: (event: MouseEvent, datapoint: DataPoint) => {
        if (datapoint !== currentDatapoint) {
          setCurrentDatapoint(datapoint);
        }

        let date = (new Date()).toUTCString().replace(/^.*?, (.*?) \d{2}:\d{2}:\d{2}.*?$/, "$1");
        let svg = findClosest(event.target, "svg");
        let tooltip = svg.nextElementSibling;
        tooltip.hidden = false;
        tooltip.textContent = datapoint.value;
        tooltip.textContent = `${date}: $${datapoint.value.toFixed(2)}`;
        tooltip.style.top = `${event.offsetY}px`;
        tooltip.style.left = `${event.offsetX + 20}px`;
      },
      onmouseout: (event: MouseEvent) => {
        setCurrentDatapoint(null);

        let svg = findClosest(event.target, "svg");
        let tooltip = svg.nextElementSibling;
        tooltip.hidden = true;
      }
    };
  
    useEffect(() => {
        //@ts-ignore
        sparkline(sparklineRef.current, sparklineData, showTooltip && options);
    }, []);


    const priceTrendDirection = sparklineData[0] > sparklineData[sparklineData.length - 1]
        ? 'downwards'
        : 'upwards';
  
    return (
      <SparklineContainer>
        <svg
            className={`sparkline ${priceTrendDirection === 'downwards' ? 'trending-downwards' : 'trending-upwards'}`}
            ref={sparklineRef}
            width={width}
            height={height}
            strokeWidth="3"
            fill="rgba(0, 0, 255, .2)"
        ></svg>
        <span className="sparkline--tooltip" hidden={true}></span>
      </SparklineContainer>
    );
  };

  export default Sparkline;