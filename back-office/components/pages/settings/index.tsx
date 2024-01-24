import FormatSizeIcon from '@mui/icons-material/FormatSize';
import PostAddIcon from '@mui/icons-material/PostAdd';

import { Message } from '@mui/icons-material';
import classNames from 'classnames';
import SidebarItem from 'components/pages/email/SideBarItem';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import NewLetterForm from './newletter';
import BlogPost from './poste';
import UnitySizeForm from './unitySize/UnitySizeForm';

export default function SettingsComponent() {
  const [activeView, setActiveView] = React.useState<
    'unity-size' | 'news-letter' | 'blog' | 'bank'
  >('unity-size');

  return (
    <div className="w-full h-full p-2.5 bg-white gap-2.5 flex lg:flex-row md:flex-row sm:flex-col">
      <div
        className={classNames(
          'bg-[#376F70]',
          'lg:py-2.5 md:py-2.5 sm:py-0',
          'lg:h-full md:h-full sm:h-auto',
          'lg:w-[230px] md:w-[230px] sm:w-full lg:min-w-[230px] md:min-w-[230px] sm:min-w-[230px]',
          'lg:block md:block sm:flex',
          'sm:overflow-auto'
        )}
      >
        <SidebarItem
          icon={<FormatSizeIcon />}
          title="Unité de mesure"
          onClick={() => setActiveView('unity-size')}
          isActive={activeView === 'unity-size'}
        />
        <SidebarItem
          icon={<Message />}
          title="Abonnées aux news letter"
          onClick={() => setActiveView('news-letter')}
          isActive={activeView === 'news-letter'}
        />
        <SidebarItem
          icon={<PostAddIcon />}
          title="Blogue"
          onClick={() => setActiveView('blog')}
          isActive={activeView === 'blog'}
        />
      </div>

      <Scrollbars>
        <div className=" w-full flex flex-col  h-full">
          {activeView === 'unity-size' && <UnitySizeForm />}
          {activeView === 'news-letter' && <NewLetterForm />}
          {activeView === 'blog' && <BlogPost />}
        </div>
      </Scrollbars>
    </div>
  );
}
