import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: 'AI Product Marketplace',
    description: 'Discover and purchase AI-generated content from creators worldwide',
  };
}

const IndexPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);
  
  // 自动重定向到AI产品市场
  redirect('/marketplace');
};

export default IndexPage;
