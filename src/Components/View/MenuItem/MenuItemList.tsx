import React from "react";
import {
  useDeleteMenuItemMutation,
  useGetMenuItemsQuery,
} from "../../../Apis/menuItemApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Common";
import { menuItemModel } from "../../../Interfaces";
import { useNavigate } from "react-router";

function MenuItemList() {
  const [deleteMenuItem] = useDeleteMenuItemMutation();
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const navigate = useNavigate();

  const handleMenuItemDelete = async (id: number) => {
    toast.promise(
      deleteMenuItem(id),
      {
        pending: "Processing your request...",
        success: "Menu Item Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-primary">MenuItem List</h1>

            <button
              className="btn"
              style={{ backgroundColor: '#0a58ca', color: '#ffffff' }}
              onClick={() => navigate("/menuitem/menuitemupsert")}
            >
              Add New Menu Item
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-1 fw-bold">Image</div>
              {/* <div className="col-1 fw-bold">ID</div> */}
              <div className="col-2 fw-bold">Name</div>
              <div className="col-2 fw-bold">Category</div>
              <div className="col-1 fw-bold">Price</div>
              <div className="col-2 fw-bold">Special Tag</div>
              {/* <div className="col-4 fw-bold text-end">Action</div> */}
            </div>

            {data.result.map((menuItem: menuItemModel) => {
              return (
                <div className="row border" key={menuItem.id}>
                  <div className="col-1">
                    <img
                    className="rounded"
                      src={menuItem.image}
                      alt="no content"
                      style={{ width: "100%", maxWidth: "100px" }}
                    />
                  </div>
                  {/* <div className="col-1">{menuItem.id}</div> */}
                  <div className="col-2">{menuItem.name}</div>
                  <div className="col-2">{menuItem.category}</div>
                  <div className="col-1">${menuItem.price}</div>
                  <div className="col-2">{menuItem.specialTag}</div>
                  <div className="col-4 text-end">
                    <button className="btn btn-primary">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/menuitem/menuitemupsert/" + menuItem.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleMenuItemDelete(menuItem.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default MenuItemList;
