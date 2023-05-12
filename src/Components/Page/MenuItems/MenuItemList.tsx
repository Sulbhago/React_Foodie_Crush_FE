import React from "react";
import { useState, useEffect } from "react";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { RootState } from "../../../Storage/Redux/store";
import { SD_SortTypes } from "../../../Utility/SD";
import { MainLoader } from "../../Common";
function MenuItemList() {
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const dispatch = useDispatch();
  const [sortName, setSortName] = useState(SD_SortTypes.NAME_A_Z);
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.PRICE_LOW_HIGH,
    SD_SortTypes.PRICE_HIGH_LOW,
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ];
  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(
        searchValue
      );
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);
    }
  }, [isLoading]);

  const handleFilters = (
    search: string
  ) => {
      const tempArray2 = [...data.result];
      let tempArray = tempArray2.filter((item: menuItemModel) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );

    return tempArray;
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList;
