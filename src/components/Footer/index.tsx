import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
import {PLANET_LINK} from "@/constant";

const Footer: React.FC = () => {
  const defaultMessage = '凉风辞叶出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'codeNav',
          title: '编程导航',
          href: 'https://www.code-nav.cn/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined />SeeLeaf</>,
          href: 'https://github.com/2403861767',
          blankTarget: true,
        },
        {
          key: 'beian',
          title: '赣ICP备2022005000号-1',
          href:'http://www.beian.gov.cn/',
          blankTarget: true,
        }
      ]}
    />
  );
};

export default Footer;
