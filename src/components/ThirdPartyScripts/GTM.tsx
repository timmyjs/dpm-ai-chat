import Script from "next/script";
import { env } from "~/env.mjs";

export function GTM() {
  const id = env.NEXT_PUBLIC_GTM_ID;

  return process.env.NODE_ENV === "production" && id ? (
    <Script
      defer
      id="google-tag-manager"
      dangerouslySetInnerHTML={{
        __html: `
          try {
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${id}');
          } catch (err) {
            window.newrelic && window.newrelic.noticeError(err);
          }
        `,
      }}
      strategy="afterInteractive"
    />
  ) : null;
}
