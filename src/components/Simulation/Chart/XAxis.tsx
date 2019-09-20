import React, { Component } from 'react';
import { select, axisBottom } from 'd3';

interface Props {
  xScale: any;
  x: number;
  y: number;
}

export default class XAxis extends Component<Props> {
  private xAxis;

  constructor(props: Props) {
    super(props);
    this.xAxis = React.createRef();
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    select(this.xAxis.current).call(axisBottom(this.props.xScale));
  }

  render() {
    let { x, y } = this.props;
    return (
      <g
        className="x-axis"
        ref={this.xAxis}
        transform={`translate(${x}, ${y})`}
      ></g>
    );
  }
}
