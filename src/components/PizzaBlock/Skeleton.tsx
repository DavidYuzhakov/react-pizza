import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = () => (
  <ContentLoader 
    speed={2}
    className="pizza-block"
    width={280}
    height={440}
    viewBox="0 0 280 440"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="139" cy="121" r="120" /> 
    <rect x="0" y="255" rx="5" ry="5" width="280" height="20" /> 
    <rect x="-2" y="294" rx="10" ry="10" width="280" height="85" /> 
    <rect x="177" y="381" rx="0" ry="0" width="2" height="0" /> 
    <rect x="-1" y="400" rx="5" ry="5" width="100" height="35" /> 
    <rect x="148" y="399" rx="20" ry="20" width="129" height="35" />
  </ContentLoader>
)