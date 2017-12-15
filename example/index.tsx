import * as React from "react";
import * as ReactDOM from "react-dom";
import "babel-polyfill";
import JustifiedGrid, {JustifiedElement} from "../index";

const AspectRatios = [
  {w: 3,  h: 2},
  {w: 2,  h: 3},
  {w: 4,  h: 3},
  {w: 3,  h: 4},
  {w: 1,  h: 1},
  {w: 16, h: 9},
  {w: 9,  h: 16},
  {w: 6,  h: 7},
  {w: 7,  h: 6},
];

class RandomGrid extends React.Component<{}, RandomState> implements JustifiedElement {
  constructor() {
    super();
    const index = Math.floor(Math.random() * AspectRatios.length);
    this.state = AspectRatios[index];
  }
  get width() {
    return this.state.w * 100;
  }
  get height() {
    return this.state.h * 100;
  }
  widthInProportionToHeight(height: number) {
    return this.state.h * this.state.w / height;
  }
  render() {
    const {w, h} = this.state;
    return <div style={{background: "#efefef"}}>{w}x{h}</div>;
  }
}
type RandomState = {
  w: number;
  h: number;
}

class Example extends React.Component<{}, {w: number}> {
  constructor() {
    super();
    this.state = {
      w: window.innerWidth,
    };
    this.onResize = this.onResize.bind(this);
  }
  onResize() {
    const w = window.innerWidth;
    if (w !== this.state.w) {
      this.setState({w});
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }
  render() {
    const items = [];
    let index = 0;
    while (items.length < 100) {
      items.push(<RandomGrid key={String(index)}/>);
      index++;
    }
    const {w} = this.state;
    console.log(w);
    return <JustifiedGrid baseHeight={150} fullWidth={w - 20}>{items}</JustifiedGrid>;
  }
}

(() => {
  ReactDOM.render(
    <Example/>,
    document.getElementById("main")
  );
})();
