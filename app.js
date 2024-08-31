const StorageCtrl = (function () {
    return {
        storeItem: function (newItem) {

            let items;

            // Check if any items in array

            if (localStorage.getItem("items") === null) {
                items = [];

                items.push(newItem);

                localStorage.setItem("items", JSON.stringify(items));
            } else {
                // Get the existing data from ls
                items = JSON.parse(localStorage.getItem("items"));

                items.push(newItem);

                localStorage.setItem("items", JSON.stringify(items));
            }


        },
        getItems: function () {

            let items;

            // Check if any items in array
            if (localStorage.getItem("items") === null) {
                items = [];
            } else {
                // Get the existing data from ls

                items = JSON.parse(localStorage.getItem("items"));
            }

            return items;
        },
        deleteItemLs: function (id) {

            let items = JSON.parse(localStorage.getItem("items"));

            items.forEach(function (item, index) {

                if (id === item.id) {
                    items.splice(index, 1);
                }

            })

            localStorage.setItem("items", JSON.stringify(items));

        },
        updateItemLs: function (updatedItem) {
            let items = JSON.parse(localStorage.getItem("items"));
            items.forEach(function (item, index) {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem("items", JSON.stringify(items));
        },
        clearItemLs: function () {
            localStorage.removeItem("items");
        }
    }
})();
// ITEM CONTROLLER

const ItemCtrl = (function () {

    // ITEM CONSTRUCTOR

    const Item = function (id, name, money) {
        this.id = id;
        this.name = name;
        this.money = money;
    }


    // Data Structure

    const data = {
        // items:[
        //     {id:0, name:"Clothes", money:2000},
        //     {id:1, name:"Food", money:3000},
        //     {id:2, name:"Bike Service", money:4000},
        // ],
        items: StorageCtrl.getItems(),
        totalMoney: 0,
        currentItem: null
    };


    return {
        getItem: function () {
            return data.items; // Array
        },
        addItem: function (name, money) {

            let ID;

            // Create a ID
            if (data.items.length > 0) {

                ID = data.items[data.items.length - 1].id + 1;

            } else {

                ID = 0;

            }

            money = Number(money);

            // Create a new ITEM
            newItem = new Item(ID, name, money);

            // Add to item array
            data.items.push(newItem);

            return newItem;

        },
        getTotalMoney: function () {

            let total = 0;

            if (data.items.length > 0) {

                data.items.forEach(function (item) {
                    total += item.money;

                    data.totalMoney = total;
                })

            } else {
                return data.totalMoney = 0;
            }

            return total;
        },
        clearAllItems: function () {
            data.items = [];
        },
        getItemByID: function (id) {

            let found = null;

            // LOOP Through the items
            data.items.forEach(function (item) {
                if (item.id === id) {
                    found = item;
                }
            })

            return found;

        },
        setCurrentItem: function (item) {
            data.currentItem = item;
        },
        getCurrentItem: function () {
            return data.currentItem;
        },
        updateItem: function (name, money) {

            money = Number(money);

            let found = null;

            data.items.forEach(function (item) {

                if (item.id === data.currentItem.id) {
                    item.name = name,
                        item.money = money,
                        found = item;
                }

            })

            return found;

        },
        deleteItem: function (id) {

            // Get IDS
            const ids = data.items.map(function (item) {
                return item.id;
            })

            // Get Index
            const index = ids.indexOf(id);

            data.items.splice(index, 1);

        }

    }


})();


// UI CONTROLLER

const UICtrl = (function () {

    return {
        populateItemList: function (items) {

            let html = "";

            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}</strong> :
                <em>${item.money} RS</em>
                <a href="#!" class="secondary-content">
                    <i class="edit-item fa-solid fa-pencil"></i>
                </a>
             </li>`
            });

            // Insert into the ul

            document.querySelector("#item-list").innerHTML = html;

        },
        addListItem: function (newItem) {

            // Create a li element
            const li = document.createElement("li");

            // Add Class to li
            li.className = "collection-item";

            // Add ID to li
            li.id = `item-${newItem.id}`;

            // Insert HTML
            li.innerHTML = `<strong>${newItem.name}</strong> :
                <em>${newItem.money} RS</em>
                <a href="#!" class="secondary-content">
                    <i class="edit-item fa-solid fa-pencil"></i>
                </a>`;

            // Insert into the ul   
            document.querySelector("#item-list").appendChild(li);

        },
        clearEditState: function () {
            document.querySelector(".add-btn").style.display = "inline";
            document.querySelector(".update-btn").style.display = "none";
            document.querySelector(".delete-btn").style.display = "none";
            document.querySelector(".back-btn").style.display = "none";
        },
        showEditState: function () {
            document.querySelector(".add-btn").style.display = "none";
            document.querySelector(".update-btn").style.display = "inline";
            document.querySelector(".delete-btn").style.display = "inline";
            document.querySelector(".back-btn").style.display = "inline";
        },
        getItemInput: function () {
            return {
                name: document.querySelector("#item-name").value,
                money: document.querySelector("#item-money").value,
            }
        },
        showTotalMoney: function (totalMoney) {
            document.querySelector(".total-money").innerText = totalMoney;
        },
        clearInputState: function () {
            document.querySelector("#item-name").value = "";
            document.querySelector("#item-money").value = "";
        },
        clearItems: function () {

            // const collection = document.querySelector("#item-list");

            // collection.innerHTML = "";

            let listItems = document.querySelectorAll(".collection-item");

            listItems.forEach(function (li) {
                li.remove();
            })

        },
        addItemToForm: function () {
            document.querySelector("#item-name").value = ItemCtrl.getCurrentItem().name;
            document.querySelector("#item-money").value = ItemCtrl.getCurrentItem().money;
        },
        updateListItem: function (item) {



            let listItems = document.querySelectorAll(".collection-item");

            listItems.forEach(function (listItem) {

                const itemID = listItem.getAttribute("id");

                if (itemID === `item-${item.id}`) {

                    document.querySelector(`#${itemID}`).innerHTML = `
                        <strong>${item.name}</strong> :
                        <em>${item.money} RS</em>
                        <a href="#!" class="secondary-content">
                            <i class="fa-solid fa-pencil"></i>
                        </a>
                    `

                }

            })

        },
        deleteListItem: function (id) {
            const itemID = `#item-${id}`;

            const item = document.querySelector(itemID);

            item.remove();
        }
    }


})();

// APP CONTROLLER

const App = (function () {


    const loadEventListeners = function () {

        // Add Item Event
        document.querySelector(".add-btn").addEventListener("click", itemAddSubmit);

        // EDIT ICON CLICK
        document.querySelector("#item-list").addEventListener("click", itemEditClick);


        // Update Btn Click
        document.querySelector(".update-btn").addEventListener("click", itemUpdateSubmit);

        // Delete Btn Click
        document.querySelector(".delete-btn").addEventListener("click", itemDeleteSubmit);

        // Clear Item Event
        document.querySelector(".clear-btn").addEventListener("click", itemClearSubmit);

        //  Item to back
        document.querySelector(".back-btn").addEventListener("click", backClick);

    }


    const itemAddSubmit = function (e) {

        e.preventDefault();

        // Get the form input form
        const input = UICtrl.getItemInput();

        // validation
        if (input.name === "" || input.money === "") {
            alert("Please fill the fields")
        } else {

            // Add Item to Array
            const newItem = ItemCtrl.addItem(input.name, input.money);

            // Add Item to UI
            UICtrl.addListItem(newItem);

            StorageCtrl.storeItem(newItem);

            // Get the total Money
            const totalMoney = ItemCtrl.getTotalMoney();

            // Update the total monet in ui
            UICtrl.showTotalMoney(totalMoney);

            // Clear a UI Input
            UICtrl.clearInputState();

        }


    }


    const itemEditClick = function (e) {

        if (e.target.classList.contains("edit-item")) {

            const listID = e.target.parentElement.parentElement.id;

            // Break into array
            const listArr = listID.split("-");

            //    Get the actual ID
            const id = parseInt(listArr[1]);

            // Get ITEM
            const itemToEdit = ItemCtrl.getItemByID(id);

            // Set Current ITEM
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add Item to form
            UICtrl.addItemToForm();

            UICtrl.showEditState();

        }

    }


    const itemUpdateSubmit = function (e) {

        e.preventDefault();

        // Get input item
        const input = UICtrl.getItemInput();

        // Update Item
        const updatedItem = ItemCtrl.updateItem(input.name, input.money);

        // Update Local Storage
        StorageCtrl.updateItemLs(updatedItem);

        // Update UI
        UICtrl.updateListItem(updatedItem);

        // Get the total Money
        const totalMoney = ItemCtrl.getTotalMoney();

        // Update the total monet in ui
        UICtrl.showTotalMoney(totalMoney);

        // Clear a UI Input
        UICtrl.clearInputState();

        // Clear all the button
        UICtrl.clearEditState();


    }

    const itemDeleteSubmit = function (e) {

        e.preventDefault();


        // Get The Current Item

        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from the data Structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete form ui
        UICtrl.deleteListItem(currentItem.id);

        // Delete from LS
        StorageCtrl.deleteItemLs(currentItem.id);

        // Get the total Money
        const totalMoney = ItemCtrl.getTotalMoney();

        // Update the total monet in ui
        UICtrl.showTotalMoney(totalMoney);

        // Clear a UI Input
        UICtrl.clearInputState();

        // Clear all the button
        UICtrl.clearEditState();

    }

    const itemClearSubmit = function (e) {


        // Clear all from the data structure

        ItemCtrl.clearAllItems();

        // Clear All from ui
        UICtrl.clearItems();

        // Clear LS
        StorageCtrl.clearItemLs();

        // Get the total Money
        const totalMoney = ItemCtrl.getTotalMoney();

        // Update the total monet in ui
        UICtrl.showTotalMoney(totalMoney);


    }

    const backClick = function (e) {

        e.preventDefault();

        UICtrl.clearEditState();
        UICtrl.clearInputState();
    }


    return {
        init: function () {

            // Clear the three btn
            UICtrl.clearEditState();

            const items = ItemCtrl.getItem();

            if (items.length > 0) {

                UICtrl.populateItemList(items);

                const totalMoney = ItemCtrl.getTotalMoney();

                UICtrl.showTotalMoney(totalMoney);
                ;
            }

            loadEventListeners();
        }
    }

})();

App.init();