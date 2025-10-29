import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type { IColorThemeConversation } from "../types/iColorThemes";

export interface DropdownItem {
  id?: string | number;
  itemlabel: string;
  onClick?: () => void;
  subItems?: DropdownItem[];
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  className?: string;
  colorTheme: IColorThemeConversation;
}

const DropdownButton = ({
  label,
  colorTheme,
}: {
  label: string;
  colorTheme: IColorThemeConversation;
}) => (
  <MenuButton
    className={`inline-flex justify-center gap-x-1.5 rounded-md ${colorTheme.dropdownBg} ${colorTheme.dropdownText} px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 cursor-pointer w-auto`}
  >
    {label}
    <ChevronDownIcon
      className={`-mr-1 h-5 w-5 ${colorTheme.dropdownText}`}
      aria-hidden="true"
    />
  </MenuButton>
);

const DropdownItemButton = ({
  item,
  hasSubItems = false,
  closeMenu,
  colorTheme,
}: {
  item: DropdownItem;
  hasSubItems?: boolean;
  closeMenu: () => void;
  colorTheme: IColorThemeConversation;
}) => (
  <button
    onClick={() => {
      item.onClick?.();
      closeMenu();
    }}
    className={`flex justify-between px-4 py-2 text-sm text-left
            ${colorTheme.dropdownText} ${colorTheme.dropdownBg}
            curser-pointer w-auto min-w-full cursor-pointer `}
  >
    {item.itemlabel}
    {hasSubItems && <ChevronRightIcon className="h-4 w-4 text-gray-400" />}
  </button>
);

export const Dropdown = ({
  label,
  items,
  className,
  colorTheme,
}: DropdownProps) => {
  const [openItemId, setOpenItemId] = useState<string | number | null>(null);

  return (
    <Menu
      as="div"
      className={`absolute right-0 inline-block cursor-pointer ${
        className ?? ""
      }`}
    >
      {/* Dropdown label */}
      <DropdownButton label={label} colorTheme={colorTheme} />

      {/* Menu items */}
      <MenuItems
        className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md ${colorTheme.dropdownBg} ${colorTheme.dropdownText} shadow-lg outline-none ring-1 ring-black ring-opacity-5 cursor-pointer`}
      >
        {items.map((item) => {
          const id = item.id ?? item.itemlabel;
          const isOpen = openItemId === id;

          return (
            <div
              key={id}
              className="relative"
              onMouseEnter={() => setOpenItemId(id)}
              onMouseLeave={() => setOpenItemId(null)}
            >
              <MenuItem>
                {({ close }) => (
                  <DropdownItemButton
                    item={item}
                    hasSubItems={!!item.subItems?.length}
                    closeMenu={close}
                    colorTheme={colorTheme}
                  />
                )}
              </MenuItem>

              {/* Submenu */}
              {item.subItems && isOpen && (
                <div
                  className={`absolute top-0 right-full mr-1 z-30 w-48 origin-top-right rounded-md
        ${colorTheme.dropdownBg} ${colorTheme.dropdownText}
        shadow-lg ring-1 ring-black ring-opacity-5
        max-h-60 overflow-y-auto pointer-events-auto cursor-pointer`}
                >
                  {item.subItems.map((subItem) => (
                    <MenuItem key={subItem.id ?? subItem.itemlabel}>
                      {({ close }) => (
                        <DropdownItemButton
                          item={subItem}
                          closeMenu={close}
                          colorTheme={colorTheme}
                        />
                      )}
                    </MenuItem>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </MenuItems>
    </Menu>
  );
};
