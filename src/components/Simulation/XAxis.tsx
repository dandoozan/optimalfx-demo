import React, { Component } from 'react';
import { select, axisBottom } from 'd3';
import styles from './XAxis.module.css';

interface Props {
  xScale: any;
  timeFormatter: any;
  width: number;
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
    select(this.xAxis.current).call(
      axisBottom(this.props.xScale).tickFormat(this.props.timeFormatter)
    );
  }

  render() {
    let { width } = this.props;
    return (
      <svg className={styles.xAxis} width={width} height="20">
        <g ref={this.xAxis}></g>
      </svg>
    );
  }
}
