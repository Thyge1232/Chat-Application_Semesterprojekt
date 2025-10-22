import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export interface DropdownItem {
  itemlabel: string;
  onSubmit?: () => void;
  children?: DropdownItem[];
}

export type DropdownProps = {
  label: string;
  items: DropdownItem[];
  className?: string;
};

export const Dropdown = ({ label, items, className }: DropdownProps) => {
  return (
    <Menu
      as="div"
      className={`absolute right-0 inline-block ${className ?? ""}`}
    >
      {/* Label */}
      <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50 w-full">
        {label}
        <ChevronDownIcon
          className="-mr-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>

      {/* Parent MenuItems */}
      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-none">
        {items.map((item, idx) => (
          <div key={idx} className="relative group">
            <MenuItem>
              {({ close }) => (
                <button
                  onClick={() => item.onSubmit?.()}
                  className="flex justify-between w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                >
                  {item.itemlabel}
                  {item.children && (
                    <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              )}
            </MenuItem>

            {/* Children under parent, skjult indtil klik */}
            {item.children && (
              <div className="absolute top-0 right-full mt-0 ml-0 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.children.map((child, cidx) => (
                  <MenuItem key={cidx}>
                    {({ close }) => (
                      <button
                        onClick={() => {
                          child.onSubmit?.();
                          close();
                        }}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                      >
                        {child.itemlabel}
                      </button>
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
