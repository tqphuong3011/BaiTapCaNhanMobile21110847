import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

type Props = SvgProps & {
   width?: number;
   height?: number;
};

const SVGComponent = (props: Props) => (
   <Svg
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <Path
         d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
         stroke="#14142B"
      />
      <Path d="M22 21.9999L18.7823 18.7822" stroke="#14142B" />
   </Svg>
);
export default SVGComponent;
