import React from 'react';
import { Links, LinkExtended, Whitepaper } from '@/@types/coinpaprika';
import { FiLink, FiFileText, FiGlobe, FiGithub, FiMessageSquare, FiYoutube, FiUsers } from 'react-icons/fi';

interface CoinLinksProps {
  links?: Links;
  linksExtended?: LinkExtended[];
  whitepaper?: Whitepaper;
}

const iconMap: { [key: string]: React.ReactNode } = {
  website: <FiGlobe />,
  explorer: <FiLink />,
  source_code: <FiGithub />,
  whitepaper: <FiFileText />,
  facebook: <FiMessageSquare />,
  reddit: <FiMessageSquare />, 
  twitter: <FiMessageSquare />,
  youtube: <FiYoutube />,
  announcement: <FiMessageSquare />,
  chat: <FiMessageSquare />,
  blog: <FiFileText />,
  medium: <FiFileText />,
  official_forum: <FiUsers />,
  telegram: <FiMessageSquare />, 
  discord: <FiMessageSquare />,
};

const getLinkName = (type: string): string => {
  const names: { [key: string]: string } = {
    website: 'Веб-сайт',
    explorer: 'Эксплорер',
    source_code: 'Исходный код',
    whitepaper: 'Whitepaper',
    facebook: 'Facebook',
    reddit: 'Reddit',
    twitter: 'Twitter',
    youtube: 'YouTube',
    announcement: 'Анонсы',
    chat: 'Чат',
    blog: 'Блог',
    medium: 'Medium',
    official_forum: 'Официальный форум',
    telegram: 'Telegram',
    discord: 'Discord',
  };
  return names[type] || type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, ' ');
};


const CoinLinks: React.FC<CoinLinksProps> = ({ links, linksExtended, whitepaper }) => {
  const allLinks: { name: string; url: string; type: string; icon?: React.ReactNode }[] = [];

  if (whitepaper?.link) {
    allLinks.push({ name: getLinkName('whitepaper'), url: whitepaper.link, type: 'whitepaper', icon: iconMap.whitepaper });
  }

  if (linksExtended) {
    linksExtended.forEach(link => {
      if (link.url) {
        allLinks.push({ name: getLinkName(link.type), url: link.url, type: link.type, icon: iconMap[link.type] || <FiLink /> });
      }
    });
  }
  else if (links && Object.keys(links).length > 0) {
    (Object.keys(links) as Array<keyof Links>).forEach(key => {
      const urls = links[key];
      if (urls && urls.length > 0) {
        urls.forEach((url, index) => {
          allLinks.push({
            name: `${getLinkName(key.toString())}${urls.length > 1 ? ` #${index + 1}` : ''}`,
            url: url,
            type: key.toString(),
            icon: iconMap[key.toString()] || <FiLink />
          });
        });
      }
    });
  }


  if (allLinks.length === 0) return null;

  return (
    <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg border border-slate-700/50">
      <h2 className="text-lg font-display font-semibold text-slate-100 mb-4 flex items-center">
        <FiLink className="mr-2 text-sky-400" /> Ссылки
      </h2>
      <ul className="space-y-2">
        {allLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-sky-400 hover:text-sky-300 hover:underline transition-colors break-all"
            >
              <span className="mr-2 opacity-80">{link.icon}</span>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinLinks;