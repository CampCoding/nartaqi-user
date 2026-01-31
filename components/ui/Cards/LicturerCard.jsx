import React, { useMemo, useState } from "react";
import { RatingStarIcon } from "../../../public/svgs";

const FALLBACK_AVATAR = "https://avatars.hsoubcdn.com/default";

export const LecturerCard = ({ lecturer }) => {
  const name = lecturer?.name || "—";
  const title = lecturer?.description || lecturer?.gender || "—";
  const initialSrc =
    lecturer?.image || lecturer?.image_url || "/images/Image-12422.png";

  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [imgLoading, setImgLoading] = useState(true);

  // لو الـ lecturer اتغير (كارت جديد) لازم نرجّع الصورة للحالة الطبيعية
  React.useEffect(() => {
    setImgSrc(initialSrc);
    setImgLoading(true);
  }, [initialSrc]);

  const socialLinks = useMemo(() => {
    const links = [];
    if (lecturer?.instagram)
      links.push({ name: "Instagram", url: lecturer.instagram, icon: <InstagramIcon /> });
    if (lecturer?.linkedin)
      links.push({ name: "LinkedIn", url: lecturer.linkedin, icon: <LinkedInIcon /> });
    if (lecturer?.facebook)
      links.push({ name: "Facebook", url: lecturer.facebook, icon: <FacebookIcon /> });
    if (lecturer?.youtube)
      links.push({ name: "YouTube", url: lecturer.youtube, icon: <YouTubeIcon /> });
    if (lecturer?.twitter)
      links.push({ name: "Twitter", url: lecturer.twitter, icon: <TwitterIcon /> });
    if (lecturer?.website)
      links.push({ name: "Website", url: lecturer.website, icon: <WebsiteIcon /> });
    return links;
  }, [lecturer]);

  const rating = lecturer?.rating ?? null;
  const reviews = lecturer?.reviews ?? null;

  return (
    <article className="inline-flex w-full md:max-w-sm flex-col items-center gap-6 rounded-[30px] border-2 border-solid border-neutral-300 bg-white p-4 md:p-8">
      {/* Avatar wrapper */}
      <div className="relative h-28 w-28 md:h-[124px] md:w-[124px]">
        {/* ✅ Skeleton أثناء التحميل */}
        {imgLoading ? (
          <div className="absolute inset-0 rounded-full bg-gray-200 animate-pulse" />
        ) : null}

        <img
          src={imgSrc}
          alt={`${name} profile picture`}
          className={`h-full w-full rounded-full object-cover border border-neutral-200 transition-opacity duration-300 ${
            imgLoading ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
          onLoad={() => setImgLoading(false)}
          onError={() => {
            // لو فشلنا مرة، بدّل للفولباك فقط (علشان ما تعملش loop)
            if (imgSrc !== FALLBACK_AVATAR) {
              setImgSrc(FALLBACK_AVATAR);
              setImgLoading(false);
            } else {
              setImgLoading(false);
            }
          }}
        />
      </div>

      <div className="inline-flex flex-col items-center gap-4">
        <header className="flex w-full flex-col items-center">
          <h1 className="text-center text-xl font-bold text-text [direction:rtl]">
            {name}
          </h1>

          <p className="text-center text-base font-medium text-text-alt [direction:rtl] line-clamp-2">
            {title}
          </p>
        </header>

        {/* Rating (اختياري) */}
        {rating !== null ? (
          <div className="inline-flex flex-col items-center gap-3">
            <div
              className="inline-flex items-center gap-2"
              role="group"
              aria-label="Rating information"
            >
              <RatingStarIcon className="h-5 w-5" />
              <div className="font-medium text-text-duplicate text-xl">
                {rating}
                {reviews !== null ? ` (${reviews})` : ""}
              </div>
            </div>
          </div>
        ) : null}

        {/* Social */}
        {socialLinks.length ? (
          <nav
            aria-label="Social media links"
            className="flex items-center gap-2 flex-wrap justify-center"
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${name}'s ${social.name} profile`}
                className="relative flex h-12 w-12 items-center justify-center rounded-full border border-solid border-blue-500 bg-white transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="absolute inset-1 rounded-full bg-[#d7e6ff]" />
                <div className="relative h-5 w-5">{social.icon}</div>
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </article>
  );
};


/** ✅ أضف أيقونات ناقصة (YouTube/Twitter/Website) */
const YouTubeIcon = (props) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.95C18.15 5.5 12 5.5 12 5.5s-6.15 0-7.86.551A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .2 3.999 2.75 2.75 0 0 0 1.94 1.95C5.85 18.5 12 18.5 12 18.5s6.15 0 7.86-.551a2.75 2.75 0 0 0 1.94-1.95A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.2-3.999Z" fill="#3B82F6"/>
    <path d="M10.5 14.75v-5.5L15.25 12l-4.75 2.75Z" fill="#fff"/>
  </svg>
);

const TwitterIcon = (props) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.9 2H22l-6.8 7.8L23.4 22h-6.6l-5.2-6.7L5.8 22H2.6l7.3-8.4L.9 2h6.8l4.7 6.1L18.9 2Zm-1.2 18h1.7L8.2 3.9H6.3L17.7 20Z" fill="#3B82F6"/>
  </svg>
);

const WebsiteIcon = (props) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.8 9H16.9a16 16 0 0 0-1.2-6 8.03 8.03 0 0 1 4.1 6ZM12 4c1 1.4 1.8 3.6 2.2 7H9.8C10.2 7.6 11 5.4 12 4Zm-3.7 1a16 16 0 0 0-1.2 6H4.2a8.03 8.03 0 0 1 4.1-6ZM4.2 13h2.9a16 16 0 0 0 1.2 6 8.03 8.03 0 0 1-4.1-6Zm5.6 0h4.4c-.4 3.4-1.2 5.6-2.2 7-1-1.4-1.8-3.6-2.2-7Zm6 6a16 16 0 0 0 1.2-6h2.9a8.03 8.03 0 0 1-4.1 6Z" fill="#3B82F6"/>
  </svg>
);

export const FacebookIcon = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 0.0390625C4.5 0.0390625 0 4.52906 0 10.0591C0 15.0591 3.66 19.2091 8.44 19.9591V12.9591H5.9V10.0591H8.44V7.84906C8.44 5.33906 9.93 3.95906 12.22 3.95906C13.31 3.95906 14.45 4.14906 14.45 4.14906V6.61906H13.19C11.95 6.61906 11.56 7.38906 11.56 8.17906V10.0591H14.34L13.89 12.9591H11.56V19.9591C13.9164 19.5869 16.0622 18.3846 17.6099 16.5691C19.1576 14.7537 20.0054 12.4447 20 10.0591C20 4.52906 15.5 0.0390625 10 0.0390625Z"
      fill="#3B82F6"
    />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16 0C16.5304 0 17.0391 0.210714 17.4142 0.585786C17.7893 0.960859 18 1.46957 18 2V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H16ZM15.5 15.5V10.2C15.5 9.33539 15.1565 8.5062 14.5452 7.89483C13.9338 7.28346 13.1046 6.94 12.24 6.94C11.39 6.94 10.4 7.46 9.92 8.24V7.13H7.13V15.5H9.92V10.57C9.92 9.8 10.54 9.17 11.31 9.17C11.6813 9.17 12.0374 9.3175 12.2999 9.58005C12.5625 9.8426 12.71 10.1987 12.71 10.57V15.5H15.5ZM3.88 5.56C4.32556 5.56 4.75288 5.383 5.06794 5.06794C5.383 4.75288 5.56 4.32556 5.56 3.88C5.56 2.95 4.81 2.19 3.88 2.19C3.43178 2.19 3.00193 2.36805 2.68499 2.68499C2.36805 3.00193 2.19 3.43178 2.19 3.88C2.19 4.81 2.95 5.56 3.88 5.56ZM5.27 15.5V7.13H2.5V15.5H5.27Z"
      fill="#3B82F6"
    />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.001 7C9.20535 7 8.44229 7.31607 7.87968 7.87868C7.31707 8.44129 7.001 9.20435 7.001 10C7.001 10.7956 7.31707 11.5587 7.87968 12.1213C8.44229 12.6839 9.20535 13 10.001 13C10.7966 13 11.5597 12.6839 12.1223 12.1213C12.6849 11.5587 13.001 10.7956 13.001 10C13.001 9.20435 12.6849 8.44129 12.1223 7.87868C11.5597 7.31607 10.7966 7 10.001 7ZM10.001 5C11.3271 5 12.5989 5.52678 13.5365 6.46447C14.4742 7.40215 15.001 8.67392 15.001 10C15.001 11.3261 14.4742 12.5979 13.5365 13.5355C12.5989 14.4732 11.3271 15 10.001 15C8.67492 15 7.40315 14.4732 6.46547 13.5355C5.52778 12.5979 5.001 11.3261 5.001 10C5.001 8.67392 5.52778 7.40215 6.46547 6.46447C7.40315 5.52678 8.67492 5 10.001 5ZM16.501 4.75C16.501 5.08152 16.3693 5.39946 16.1349 5.63388C15.9005 5.8683 15.5825 6 15.251 6C14.9195 6 14.6015 5.8683 14.3671 5.63388C14.1327 5.39946 14.001 5.08152 14.001 4.75C14.001 4.41848 14.1327 4.10054 14.3671 3.86612C14.6015 3.6317 14.9195 3.5 15.251 3.5C15.5825 3.5 15.9005 3.6317 16.1349 3.86612C16.3693 4.10054 16.501 4.41848 16.501 4.75ZM10.001 2C7.527 2 7.123 2.007 5.972 2.058C5.188 2.095 4.662 2.2 4.174 2.39C3.76583 2.54037 3.39672 2.78063 3.094 3.093C2.78127 3.39562 2.54066 3.76474 2.39 4.173C2.2 4.663 2.095 5.188 2.059 5.971C2.007 7.075 2 7.461 2 10C2 12.475 2.007 12.878 2.058 14.029C2.095 14.812 2.2 15.339 2.389 15.826C2.559 16.261 2.759 16.574 3.091 16.906C3.428 17.242 3.741 17.443 4.171 17.609C4.665 17.8 5.191 17.906 5.971 17.942C7.075 17.994 7.461 18 10 18C12.475 18 12.878 17.993 14.029 17.942C14.811 17.905 15.337 17.8 15.826 17.611C16.2342 17.4606 16.6033 17.2204 16.906 16.908C17.243 16.572 17.444 16.259 17.61 15.828C17.8 15.336 17.906 14.81 17.942 14.028C17.994 12.925 18 12.538 18 10C18 7.526 17.993 7.122 17.942 5.971C17.905 5.189 17.799 4.661 17.61 4.173C17.4596 3.76483 17.2194 3.39572 16.907 3.093C16.6044 2.78027 16.2353 2.53966 15.827 2.389C15.337 2.199 14.811 2.094 14.029 2.058C12.926 2.006 12.54 2 10 2M10 0C12.717 0 13.056 0.00999994 14.123 0.0599999C15.187 0.11 15.913 0.277 16.55 0.525C17.21 0.779 17.766 1.123 18.322 1.678C18.8307 2.17773 19.2242 2.78247 19.475 3.45C19.722 4.087 19.89 4.813 19.94 5.878C19.987 6.944 20 7.283 20 10C20 12.717 19.99 13.056 19.94 14.122C19.89 15.188 19.722 15.912 19.475 16.55C19.2242 17.2175 18.8307 17.8223 18.322 18.322C17.8223 18.8307 17.2175 19.2242 16.55 19.475C15.913 19.722 15.187 19.89 14.123 19.94C13.056 19.987 12.717 20 10 20C7.283 20 6.944 19.99 5.877 19.94C4.813 19.89 4.088 19.722 3.45 19.475C2.78247 19.2242 2.17773 18.8307 1.678 18.322C1.16931 17.8223 0.775816 17.2175 0.525 16.55C0.277 15.913 0.11 15.187 0.0599999 14.122C0.0119999 13.056 0 12.717 0 10C0 7.283 0.00999994 6.944 0.0599999 5.878C0.11 4.812 0.277 4.088 0.525 3.45C0.775816 2.78247 1.16931 2.17773 1.678 1.678C2.17773 1.16931 2.78247 0.775816 3.45 0.525C4.087 0.277 4.812 0.11 5.877 0.0599999C6.945 0.0129999 7.284 0 10.001 0"
      fill="#3B82F6"
    />
  </svg>
);
