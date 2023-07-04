export const SolidCirclePlus = ({ className }: { className?: string }) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      className={className ?? 'h-6 w-6'}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.99961 14.3996C11.5342 14.3996 14.3996 11.5342 14.3996 7.99961C14.3996 4.46499 11.5342 1.59961 7.99961 1.59961C4.46499 1.59961 1.59961 4.46499 1.59961 7.99961C1.59961 11.5342 4.46499 14.3996 7.99961 14.3996ZM8.59961 5.39961C8.59961 5.06824 8.33098 4.79961 7.99961 4.79961C7.66824 4.79961 7.39961 5.06824 7.39961 5.39961V7.39961H5.39961C5.06824 7.39961 4.79961 7.66824 4.79961 7.99961C4.79961 8.33098 5.06824 8.59961 5.39961 8.59961H7.39961V10.5996C7.39961 10.931 7.66824 11.1996 7.99961 11.1996C8.33098 11.1996 8.59961 10.931 8.59961 10.5996V8.59961H10.5996C10.931 8.59961 11.1996 8.33098 11.1996 7.99961C11.1996 7.66824 10.931 7.39961 10.5996 7.39961H8.59961V5.39961Z'
        fill='currentColor'
      />
    </svg>
  );
};
