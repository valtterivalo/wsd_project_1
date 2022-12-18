import { executeQuery } from "../database/database.js";

const createListItem = async (list_id, item_name) => {
    await executeQuery(
        "INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($list_id, $item_name);", {
            list_id: list_id,
            item_name: item_name
        },
    );
};

const findCurrentItems = async (list_id) => {
    console.log("Trying to display the items for list id " + list_id);
    let result = await executeQuery(
        "SELECT name, id, collected FROM shopping_list_items WHERE shopping_list_id = $list_id ORDER BY collected, name;", {
            list_id: list_id
        },
    );
    if (result.rows && result.rows.length > 0) {
        return result.rows;
    }
    return false;
};

const findAllItems = async () => {
    let result = await executeQuery("SELECT * FROM shopping_list_items")
    if (result.rows && result.rows.length > 0) {
        return result.rows;
    } else {
        return 0;
    }
};

const setCollected = async (list_id, item_id) => {
    await executeQuery(
        "UPDATE shopping_list_items " +
        "SET collected = true " +
        "WHERE shopping_list_id = $list_id AND id = $item_id;", {
            list_id: list_id,
            item_id: item_id,
        }
    );
    let result = await executeQuery(
        "SELECT * FROM shopping_list_items " +
        "WHERE shopping_list_id = $list_id;", {
            list_id: list_id,
        }
    )
    if (result.rows && result.rows.length > 0) {
        return result.rows;
    }
    return false;
};

export {
    createListItem,
    findCurrentItems,
    setCollected,
    findAllItems,
};