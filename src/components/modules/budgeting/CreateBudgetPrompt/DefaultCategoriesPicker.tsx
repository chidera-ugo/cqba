import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props {
  data: string[];
  setSelected?: Dispatch<SetStateAction<string[]>>;
  show?: boolean;
}

type Node = {
  radius: number;
  color: string;
  x: number;
  y: number;
  name: string;
  id: string;
  length: number;
};

export const DefaultCategoriesPicker = ({ data, setSelected, show }: Props) => {
  const SIZE = 450;

  const { getColor } = useGetColorByChar();

  const hoveredItem = useRef<string>('');
  const selectedItems = useRef<string[]>([]);
  const svgWidth = useRef(SIZE);
  const svgHeight = useRef(SIZE);

  useEffect(() => {
    if (!show) return;

    const width = SIZE,
      height = SIZE;

    const nodes: Node[] = data.map((title) => {
      const radius = Math.max(title.length * 5, 20);
      const color = getColor(data.findIndex((item) => item === title));

      return { radius, name: title, color, length: title.length };
    }) as any;

    const strength = data.length * -6.67 + 283;

    d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(strength))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collision',
        d3.forceCollide().radius((d: any) => {
          return d.radius + 3;
        })
      )
      .on('tick', updateShapes);

    function handleShapeZoom(e: any) {
      d3.select('#d3_svg_body .circles').attr('transform', e.transform);
    }

    function handleTextZoom(e: any) {
      d3.select('#d3_svg_body .texts').attr('transform', e.transform);
    }

    function initZoom() {
      const svg = d3.select('#d3_svg_body');
      const svgNode = svg.node() as any;

      if (!svg || !svgNode || !svgWidth || !svgHeight) return;

      const svgWidthWithPadding = svgWidth.current + 40;
      const svgHeightWithPadding = svgHeight.current + 40;

      const zoom = d3
        .zoom()
        .scaleExtent([1, 1]) // disable zoom
        .translateExtent([
          [
            -(svgWidthWithPadding - svgNode.clientWidth),
            -(svgHeightWithPadding - svgNode.clientHeight),
          ],
          [svgWidthWithPadding, svgHeightWithPadding],
        ])
        .on('zoom', (e) => {
          handleShapeZoom(e);
          handleTextZoom(e);
        });

      d3.select('#d3_svg_body').call(zoom as any);
    }

    function getTrueBounds() {
      const svg = d3.select('#d3_svg_body'); // Assuming you have an SVG container with the "svg" selector
      const svgNode = svg.node() as any;
      const boundingBox = svgNode?.getBBox();
      svgWidth.current = boundingBox?.width ? boundingBox.width : 12;
      svgHeight.current = boundingBox?.height ? boundingBox.height : 12;

      initZoom();
    }

    function updateTexts() {
      d3.select('#d3_svg_body .texts')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .text(function (d) {
          return d.name;
        })
        .style('fill', ({ color }) => {
          return color;
        })
        .style('pointer-events', 'none')
        .attr('x', function (d) {
          return d.x;
        })
        .attr('text-anchor', 'middle')
        .attr('y', function (d) {
          return d.y;
        })
        .attr('dy', function () {
          return 5;
        });
    }

    function updateShapes() {
      d3.select('#d3_svg_body .circles')
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', function ({ radius }) {
          return radius;
        })
        .attr('cx', function (d) {
          return d.x;
        })
        .attr('cy', function (d) {
          return d.y;
        })
        .style('fill', ({ color, id }) => {
          return `${color}${hoveredItem.current === id ? '30' : '20'}`;
        })
        .style('stroke-width', ({ id }) => {
          return selectedItems.current.includes(id) ? '1px' : '';
        })
        .style('stroke', ({ color, id }) => {
          return selectedItems.current.includes(id) ? color : '';
        })
        .text(function (d) {
          return d.name;
        })
        .on('mouseover', function (_, d) {
          hoveredItem.current = d.id;
          return; // Don't deepen color
          updateShapes();
        })
        .on('mouseout', function () {
          hoveredItem.current = '';
          updateShapes();
        })
        .on('click', function (_, { id }) {
          let val;
          const prev = selectedItems.current;

          if (prev.includes(id)) {
            val = prev.filter((item) => item !== id);
            selectedItems.current = val;
          } else {
            val = [...prev, id];
            selectedItems.current = val;
          }

          if (!setSelected) return;

          setSelected(val);

          updateShapes();
        });

      updateTexts();
      getTrueBounds();
    }
  }, [show]);

  return (
    <svg
      width='100%'
      height={SIZE}
      className={'no-highlight mx-auto text-xs font-medium'}
      id={'d3_svg_body'}
    >
      <g className='circles cursor-pointer'></g>
      <g className='texts'></g>
    </svg>
  );
};
