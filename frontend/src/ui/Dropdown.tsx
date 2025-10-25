import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type { IColorThemeConversation } from "../types/iColorThemes";

export interface DropdownItem {
  id?: string;
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
    className={`inline-flex justify-center gap-x-1.5 rounded-md ${colorTheme.dropdownBg} ${colorTheme.dropdownText} px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 hover:opacity-90 w-full`}
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
    className={`flex justify-between w-full px-4 py-2 text-sm text-left ${colorTheme.dropdownText} ${colorTheme.dropdownBg} hover:opacity-80`}
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
  return (
    <Menu
      as="div"
      className={`absolute right-0 inline-block ${className ?? ""}`}
    >
      {/* Dropdown label */}
      <DropdownButton label={label} colorTheme={colorTheme} />

      {/* Menu items */}
      <MenuItems
        className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md ${colorTheme.dropdownBg} ${colorTheme.dropdownText} shadow-lg outline-none ring-1 ring-black ring-opacity-5`}
      >
        {items.map((item) => (
          <div key={item.id ?? item.itemlabel} className="relative group">
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
            {item.subItems && (
              <div
                className={`absolute top-0 right-full mt-0 ml-0 w-48 origin-top-left rounded-md ${colorTheme.dropdownBg} ${colorTheme.dropdownText} shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity`}
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
        ))}
      </MenuItems>
    </Menu>
  );
};
