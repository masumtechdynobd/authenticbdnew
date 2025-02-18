
import '@/app/ui/global.css';
import Footer from "@/app/ui/Footer/Footer";
import Header from "@/app/ui/Header/Header";
import Providers from '@/lib/Providers';
import { API_BASE_URL, BASE_URL } from './config/api';
import { Metadata } from 'next';
import { get_setting } from '@/lib/utils';
import { auth } from '@/auth';
import { cookies } from 'next/headers';

async function getDetails() {
  try {
    const response = await fetch(`${API_BASE_URL}/business-settings`, {
      next: { revalidate: 10 }
    });

    // console.log(response)
    if (!response.ok) {
      console.error('Failed to fetch:', response.status, await response.text());
      return [];
    }

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data: any = await response.json();
      return data.data;
    } else {
      // console.error('Unexpected content-type:', contentType);
      const errorText = await response.text();
      // console.error('Response text:', errorText);
      return [];
    }
  } catch (error) {
    // console.error('Error fetching details:', error);
    return [];
  }
}

// translate  
async function getTranslate(lang: string) {

  try {
    const response = await fetch(`${API_BASE_URL}/get_translation?lang=${lang}`);
    if (!response.ok) {
      return {};
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data: any = await response.json();
      return data.data;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const result = await getDetails();

  const meta_title = get_setting(result, 'meta_title')?.value || "";
  const meta_description = get_setting(result, 'meta_description')?.value || "";
  const meta_image = get_setting(result, 'meta_image')?.value || "";

  return {
    title: meta_title,
    description: meta_description,
    openGraph: {
      title: meta_title,
      description: meta_description,
      images: [
        {
          url: `${BASE_URL}/public/${meta_image}`,
          width: 300,
          height: 250,
          alt: `${meta_title} image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta_title,
      description: meta_description,
      images: [`${BASE_URL}/public/${result?.meta_image}`],
    },
  };
}
async function getLanguages(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/languages`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    ;
    return [];
  }
  const data: any = await response.json();
  return data.data as any;
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth() as any
  const lang = cookies().get('lang')?.value || 'en';

  const setting = await getDetails();
  const translate = await getTranslate(lang || 'en');
  const languages = await getLanguages();
  const site_icon = get_setting(setting, 'site_icon')?.value || ""

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`${BASE_URL}/public/${site_icon}`} />
      </head>
      <body id="filter_product">
        <Providers setting={setting} translate={translate}>
          <Header translate={translate} languages={languages} setting={setting} />
          {children}
          <Footer setting={setting} translate={translate} />
        </Providers>


      </body>
    </html>
  );
}
