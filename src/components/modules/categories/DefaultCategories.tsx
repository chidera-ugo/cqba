import clsx from 'clsx';
import {
  ICategory,
  useGetAllCategories,
} from 'hooks/api/categories/useGetAllCategories';

interface Props {
  getColor: (char: string) => string;
}

export const DefaultCategories = ({
  onClick,
  getColor,
}: Props & {
  onClick: (category: ICategory) => void;
}) => {
  const { data } = useGetAllCategories(true);

  if (!data?.content) return <></>;

  return (
    <>
      {data.content?.map((category) => (
        <CategoryPill
          key={category.id}
          {...{ getColor }}
          onClick={() => onClick(category)}
          category={category.title}
        />
      ))}
    </>
  );
};

export const CategoryPill = ({
  onClick,
  category,
  getColor,
}: Partial<Props> & { category: string; onClick?: () => void }) => {
  const color = getColor!(!category ? 'Z' : category?.charAt(0));

  return (
    <div
      onClick={onClick}
      className={clsx(
        'cursor-pointer rounded-full px-2 py-0.5 font-medium',
        onClick ? 'text-sm hover:underline' : 'text-xs'
      )}
      style={{
        color,
        backgroundColor: `${color}10`,
      }}
    >
      {category ?? 'N/A'}
    </div>
  );
};
