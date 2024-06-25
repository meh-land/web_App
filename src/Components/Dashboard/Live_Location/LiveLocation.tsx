import { FC } from "react";
import Card from "../Card/Card";
import VideoComponent from "./vedio";

const LiveLocation: FC = () => {
  return <Card Title="Live Location" Content={
<><h1>Video Stream</h1> <a href="http://192.168.43.178:8080/stream.html" target="_blank">link</a>
<VideoComponent targetUrl="http://192.168.43.178:8080/stream.html"/></>
  } />;
};

export default LiveLocation;
