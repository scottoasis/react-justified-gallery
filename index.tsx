import * as React from "react";

type Dimension = number;

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

export default class JustifiedGrid extends React.Component<GridProps, GridState> {
  constructor(props) {
    super(props);
    const {baseHeight, fullWidth} = props;
    const children = React.Children.toArray(props.children) as any[];
    const rows = this.generateRows(children, baseHeight, fullWidth);
    this.state = {
      rows,
    };
  }
  componentWillReceiveProps(nextProps) {
    const {baseHeight, fullWidth} = nextProps;
    const children = React.Children.toArray(nextProps.children) as any[];
    const rows = this.generateRows(children, baseHeight, fullWidth);
    this.setState({rows});
  }
  generateRows(children: JustifiedElement[], baseHeight, fullWidth): RowInfo[] {
    let index = 0;
    let rowIndex = 0;
    const maxHeight = 3 * baseHeight;
    const rows = [{
      height: this.props.baseHeight,
      width: 0,
      items: [],
    }];
    while (index < children.length) {
      const r = rows[rowIndex];
      const i = Math.floor(Math.random() * AspectRatios.length);
      const item = AspectRatios[i];
      const width = item.w * r.height / item.h;
      r.items.push(item);
      r.width += width;
      const justifiedHeight = r.height * fullWidth / r.width;
      if (justifiedHeight >= baseHeight && justifiedHeight <= maxHeight) {
        r.height = justifiedHeight;
        r.width = fullWidth;
        rows.push({
          height: this.props.baseHeight,
          width: 0,
          items: [],
        });
        rowIndex++;
      }
      index++;
    }
    return rows;
  }
  render() {
    const {children} = this.props;
    const {rows} = this.state;
    return (
      <div className="grid">
        {
          rows.map((r, index) => (
            <div style={{height: r.height}} key={String(index)}>
              {
                r.items.map((item, index) => (
                  <div style={{outline: "1px solid white", float: "left"}} key={index}>
                    <div style={{height: r.height, width: item.w * r.height / item.h, background: "#efefef", textAlign: "center"}}>
                      {item.w} x {item.h}
                    </div>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}
type GridProps = {
  baseHeight: Dimension;
  fullWidth: Dimension;
};
type GridState = {
  rows: RowInfo[];
};
type RowInfo = {
  height: Dimension;
  width: Dimension;
  items: {w: number, h: number}[];
};

export interface JustifiedElement {
  width: Dimension;
  height: Dimension;
  widthInProportionToHeight: (height: Dimension) => Dimension;
}
