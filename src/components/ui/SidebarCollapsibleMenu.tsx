import { ChevronRight } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './Collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './Sidebar';

interface SidebarCollapsibleMenuItemProps {
  label: string;
  items: SidebarSubItemProps[];
  closeOnClick?: boolean;
}

interface SidebarSubItemProps {
  key: string;
  title: string;
  isActive: boolean;
  onClick?: () => void;
  children?: SidebarSubItemProps[];
}

/**
 * SidebarLayout의 props로 사용되는 컴포넌트로, Collapsible한 메뉴 섹션을 구성할 때 사용.
 * 사이드바에서 대분류(섹션) + 하위 메뉴 목록을 묶어서 렌더링
 * @param label - 대분류(섹션) 이름
 * @param items - 하위 메뉴 목록
 * @param closeOnClick - 모바일에서 하위 메뉴 항목 클릭 시 자동으로 Sheet를 닫을지 여부. (기본값: true)
 */
export const SidebarCollapsibleMenu = ({
  label,
  items,
  closeOnClick = true,
}: SidebarCollapsibleMenuItemProps) => {
  return (
    <Collapsible defaultOpen={true} className="group/collapsible">
      <SidebarMenuItem>
        {/* Parent Item */}
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <span>{label.toUpperCase()}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        {/* Nested Item  */}
        <CollapsibleContent>
          <SidebarSubMenuList items={items} closeOnClick={closeOnClick} />
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const SidebarSubMenuList = ({ items }: { items: SidebarSubItemProps[]; closeOnClick: boolean }) => {
  return (
    <SidebarMenuSub className="mb-2">
      {items.map(({ key, title, isActive, onClick }) => {
        return (
          <SidebarMenuSubItem key={key} className="text-sm">
            <SidebarMenuSubButton isActive={isActive} className="cursor-pointer" onClick={onClick}>
              <span className="overflow-hidden truncate whitespace-nowrap">{title}</span>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        );
      })}
    </SidebarMenuSub>
  );
};
