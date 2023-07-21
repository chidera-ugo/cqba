import { DefaultCategory } from 'hooks/api/categories/useGetDefaultCategories';
import { useGetColorByChar } from 'hooks/common/useGetColorByChar';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props {
  data: DefaultCategory[];
  setSelected: Dispatch<SetStateAction<string[]>>;
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

export const DefaultCategoriesPicker = ({ data, setSelected }: Props) => {
  const { getColor } = useGetColorByChar();

  const hoveredItem = useRef<string>('');
  const _selected = useRef<string[]>([]);

  useEffect(() => {
    const width = 400,
      height = 400;

    const nodes: Node[] = data.map(({ title, id }) => {
      const radius = Math.max(title.length * 5, 20);
      const color = getColor(data.findIndex((item) => item.title === title));

      return { radius, name: title, id, color, length: title.length };
    }) as any;

    d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(50))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collision',
        d3.forceCollide().radius((d: any) => {
          return d.radius + 3;
        })
      )
      .on('tick', update);

    function updateNodes() {
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

    function update() {
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
          return _selected.current.includes(id) ? '1px' : '';
        })
        .style('stroke', ({ color, id }) => {
          return _selected.current.includes(id) ? color : '';
        })
        .text(function (d) {
          return d.name;
        })
        .on('mouseover', function (_, d) {
          hoveredItem.current = d.id;
          update();
        })
        .on('mouseout', function () {
          hoveredItem.current = '';
          update();
        })
        .on('click', function (_, { id }) {
          let val;
          const prev = _selected.current;

          if (prev.includes(id)) {
            val = prev.filter((item) => item !== id);
            _selected.current = val;
          } else {
            val = [...prev, id];
            _selected.current = val;
          }

          setSelected(val);

          update();
        });

      updateNodes();
    }
  }, []);

  return (
    <div className={'thin-x-scrollbar overflow-x-auto'}>
      <svg
        width='400'
        height='400'
        className={'no-highlight mx-auto text-xs font-medium'}
        id={'d3_svg_body'}
      >
        <g className='circles cursor-pointer'></g>
        <g className='texts'></g>
      </svg>
    </div>
  );
};
