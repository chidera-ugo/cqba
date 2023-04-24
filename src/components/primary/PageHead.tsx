import Head from 'next/head';

interface Props {
  title?: string;
}

export const PageHead = ({ title }: Props) => {
  return (
    <Head>
      <title>
        {title
          ? `${title} - ChequeBase`
          : "ChequeBase - Manage Your Brand's Expenses"}
      </title>

      <meta
        name='description'
        content="Manage Your Brand's Expenses Anywhere In Real Time."
      />
      <link rel='shortcut icon' href='/logos/icon.svg' />

      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, minimum-scale=1, maximum-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
      />
      <meta name='apple-mobile-web-app-capable' content='yes'></meta>
      <link rel='manifest' href='/manifest.json' />
    </Head>
  );
};
