import React, { useEffect, useRef, useState } from "react";

import * as d3 from "d3";
import * as _ from "lodash";

import { TimeSeriesEntry } from "../../models";

import "./TimeSeries.scss";

export interface TimeSeriesProps {
  color: string;
  graphName: string;
  hideLabels?: boolean;
  invertColors?: boolean;
  orderedEntries: Array<TimeSeriesEntry>;
  /**
   * `findIndex` on `orderedEntries`, -1 when not found.
   */
  onHoverDataUpdated: (dataIndex: number) => void;
  /**
   * Buffer so the graph doesn't touch the edges, defaults to `0.01` (1%)
   */
  yScaleBuffer?: number;
}

// WIP

export default function TimeSeries({
  color,
  graphName,
  hideLabels = false,
  invertColors = false,
  orderedEntries,
  onHoverDataUpdated,
  yScaleBuffer = 0.01,
}: TimeSeriesProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const margin = {
    top: 8,
    right: 0,
    bottom: 0,
    left: 50,
  };
  const tickPadding = 16;

  let height: number;
  let heightWithMargins: number;

  let width: number;
  let widthWithMargins: number;

  let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  let chart: d3.Selection<SVGGElement, unknown, null, undefined>;
  let focus: d3.Selection<SVGGElement, unknown, null, undefined>;

  let line: d3.Selection<SVGPathElement, TimeSeriesEntry[], null, undefined>;
  let lineGenerator: d3.Line<TimeSeriesEntry>;

  let xAxis: d3.Axis<number | { valueOf(): number }>;
  let xScale: d3.ScaleLinear<number, number>;

  let yAxis: d3.Axis<number | { valueOf(): number }>;
  let yScale: d3.ScaleLinear<number, number>;

  const [mouseLineVisible, setMouseLineVisible] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(orderedEntries)) {
      console.log("building chart");
      // Remove existing chart if data changed (future case)
      d3.select(chartContainerRef.current).selectAll("*").remove();
      buildChart();
    }
  }, [orderedEntries]);

  const buildChart = (): void => {
    initScales();
    initAxes();
    initLineGenerator();
    initSvg();
    initFocus();
    renderChart();
  };

  const initScales = (): void => {
    // x-scale
    xScale = d3
      .scaleLinear()
      .domain([orderedEntries[0].day, _.last(orderedEntries)?.day || 100]);
    // y-scale
    let yMax = d3.max(orderedEntries, (entry) => entry.value) || 1000;
    yMax = yMax + yMax * yScaleBuffer;
    let yMin = d3.min(orderedEntries, (entry) => entry.value) || 0;
    yMin = yMin - yMin * yScaleBuffer;
    yScale = d3.scaleLinear().domain([yMin, yMax]).nice();
  };

  const initAxes = (): void => {
    xAxis = d3
      .axisBottom(xScale)
      .tickSizeInner(0)
      .tickSizeOuter(0)
      .tickPadding(tickPadding);
    yAxis = d3
      .axisLeft(yScale)
      .tickSizeInner(0)
      .tickSizeOuter(0)
      .tickPadding(tickPadding);
  };

  const initLineGenerator = (): void => {
    lineGenerator = d3
      .line<TimeSeriesEntry>()
      .x((entry) => xScale(entry.day))
      .y((entry) => yScale(entry.value));
  };

  const initSvg = (): void => {
    const element = chartContainerRef.current;
    if (element) {
      svg = d3
        .select(element)
        .append("svg")
        .attr("width", element.offsetWidth)
        .attr("height", element.offsetHeight);
      chart = svg.append("g");
      chart.append("g").attr("class", "grid");
      line = chart
        .append("path")
        .datum(orderedEntries)
        .attr("class", "time-series-line")
        .attr("stroke", color);
      chart.append("g").attr("class", "yAxis time-series-axis");
    } else {
      console.log("container ref not available to init svg.");
    }
  };

  const initFocus = (): void => {
    focus = svg.append("g").attr("class", "mouse-over-effects");
    focus
      .append("path")
      .attr("class", `mouse-line ${graphName}`)
      .style("opacity", "0");
  };

  const renderChart = (): void => {
    updateDimensions();
    if (width > 0 && height > 0) {
      updateAxes();
      updateSvg();
      updateLine();
      updateFocus();
    }
  };

  const updateDimensions = (): void => {
    const element = chartContainerRef.current;
    if (element) {
      widthWithMargins = element.offsetWidth;
      width = element.offsetWidth - margin.left - margin.right - tickPadding;
      heightWithMargins = element.offsetHeight;
      height = element.offsetHeight - margin.top - margin.bottom - tickPadding;
    } else {
      console.log("container ref not available to update dimensions.");
    }
  };

  const updateAxes = (): void => {
    xScale.range([0, width]);
    yScale.range([height, 0]);
    xAxis.scale(xScale);
    yAxis.scale(yScale);
    // @ts-ignore
    svg.select(".xAxis.time-series-axis").call(xAxis);
    // @ts-ignore
    svg.select(".yAxis.time-series-axis").call(yAxis);
    // @ts-ignore
    svg.select(".grid").call(yAxis.tickSize(-width));
  };

  const updateSvg = (): void => {
    svg.attr("width", widthWithMargins).attr("height", heightWithMargins);
    chart.attr("transform", `translate(${margin.left}, ${margin.top})`);
  };

  const updateLine = (): void => {
    line.attr("d", lineGenerator);
  };

  const updateFocus = (): void => {
    console.log("updating focus");
    const mousePerLine = focus
      .selectAll()
      .data(orderedEntries)
      .enter()
      .append("g")
      .attr("class", `mouse-per-line ${graphName}`)
      .attr("fill", color)
      .attr("stroke", color);
    mousePerLine.append("circle").attr("r", 2).style("opacity", "0");

    focus
      .append("svg:rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("mouseout", () => {
        d3.select(`.mouse-line.${graphName}`).style("opacity", "0");
        d3.selectAll(`.mouse-per-line.${graphName} circle`).style(
          "opacity",
          "0"
        );
        setMouseLineVisible(false);
        onHoverDataUpdated(-1);
      })
      .on("mouseover", () => {
        if (!mouseLineVisible) {
          setMouseLineVisible(true);
          d3.select(`.mouse-line.${graphName}`).style("opacity", "1");
          d3.selectAll(`.mouse-per-line.${graphName} circle`).style(
            "opacity",
            "1"
          );
        }
      })
      .on("mousemove", (event) => {
        const container = svg.node();
        if (container) {
          const mouse = d3.pointer(event, container);
          const desiredX = calculateDesiredX(mouse);
          fireOnValueUpdate(desiredX);

          d3.select(`.mouse-line.${graphName}`).attr("d", () => {
            const totalX = desiredX + margin.left;
            return `M${totalX},${height + margin.top} ${totalX},${margin.top}`;
          });

          d3.selectAll(`.mouse-per-line.${graphName}`).attr(
            "transform",
            (d, i) => {
              let beginning = 0;
              const lineNode = line.node();
              if (lineNode) {
                let end = lineNode.getTotalLength();
                let position;
                while (true) {
                  const target = Math.floor((beginning + end) / 2);
                  position = lineNode.getPointAtLength(target);
                  if (
                    (target === beginning || target === end) &&
                    position.x !== desiredX
                  ) {
                    break;
                  }
                  if (position.x > desiredX) {
                    end = target;
                  } else if (position.x < desiredX) {
                    beginning = target;
                  } else {
                    break; // position found
                  }
                }
                return `translate(${desiredX + margin.left},${
                  position.y + margin.top
                })`;
              }
              return "";
            }
          );
        }
      });
  };

  const calculateDesiredX = (mouse: [number, number]): number => {
    const xPositions = _.map(orderedEntries, (entry) => xScale(entry.day));
    const mouseX = mouse[0] - margin.left;
    const bisector = d3.bisector((value) => value).right;
    const mouseIndex = bisector(xPositions, mouseX);
    return mouseIndex > xPositions.length - 1
      ? xPositions[xPositions.length - 1]
      : xPositions[mouseIndex];
  };

  const fireOnValueUpdate = (xPosition: number): void => {
    const desiredEntryIndex = _.findIndex(
      orderedEntries,
      (entry) => xScale(entry.day) === xPosition
    );
    onHoverDataUpdated(desiredEntryIndex);
  };

  let classes = "time-series";
  if (hideLabels) classes += " hide-labels";
  if (invertColors) classes += " invert-colors";
  return (
    <div ref={chartContainerRef} className={classes}>
      {/* The d3 svg appends in this div */}
    </div>
  );
}
