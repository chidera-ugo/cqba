import { PropsWithChildren } from 'react';

interface Props {
  url: string;
  onClick: (src: any) => void;
  className?: string;
}

export const ViewUploadedImage = ({
  url,
  onClick,
  children,
  className,
}: PropsWithChildren<Props>) => {
  if (!url) return <></>;

  return (
    <button
      type='button'
      onClick={() => {
        onClick(url);
      }}
      {...{ className }}
    >
      {children}
    </button>
  );
};
