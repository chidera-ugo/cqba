import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <div className='y-center container h-screen text-center'>
        <h3 className='text-2xl'>404 - Page Not Found</h3>

        <div className='x-center'>
          <Link href='/' className='primary-button y-center mt-10'>
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}
