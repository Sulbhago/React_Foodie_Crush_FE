import React from "react";
import { MenuItemList } from "../../Page/MenuItems";
import { Banner } from "../../Common";

function Home() {
  return (
    <div>
      <Banner />
      <div className=" form-control text-center text-white h4" style={{ backgroundColor: '#466f74', border: '#466f74' }}>
           Good food never fails in bringing people together.
      </div>

      <div className="container p-2">
        <MenuItemList />
      </div>
    </div>
  );
}

export default Home;
