const ItemCtrl = (function () {

    //item cunstructor

    const Item = function (id, name, money) {
        this.id = id;
        this.name = name;
        this.money = money
    }

    const data = {
        items: [
            { id: 0, name: "Clothes", money: 2000 },
            { id: 1, name: "Clothes", money: 3000 },
            { id: 2, name: "Bike Services", money: 4000 },
        ],
        totalMoney: 0,
        currentItem: null
    }


    return {
        getItem: function () {
            return data.items
        },
        //create id
        addItem: function (name, money) {
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
                console.log(ID)
            } else {
                ID = 0;
            }
            // console.log(name, money)
            //convert to type of
            // money = (typeof money)
            money = Number(money)
            // console.log(typeof money)
            newItem = new Item(ID, name, money)
            // console.log(newItem)

            data.items.push(newItem)
            // console.log(newItem)
            return newItem
        },
        getTotalmoney: function () {
            let total = 0;

            if (data.items.length > 0) {
                data.items.forEach((moneyitem) => {
                    total += moneyitem;
                    // console.log(total)
                    data.totalMoney = total;
                })
            } else {
                return data.totalMoney = 0;
            }
            return total;
        }

    }

})();

// console.log(ItemCtrl.getItem())

//Ui controler

const UICtrl = (function () {
    return {
        populateItemList: function (item) {
            // console.log(item)
            let final = "";
            item.forEach((items) => {
                final += ` <li class="collection-item" id="item-${items.id}">
            <strong>${items.name}</strong>
            <em>${items.money}</em>
            <a href="#!" class="secondary-content">
                <i class="edite-item  fa-sharp fa-solid fa-pen-to-square"></i>
            </a>
        </li>`
            })
            document.querySelector('#item-list').innerHTML = final
            // console.log(final)
        },

        addListItem: function (newItems) {
            // console.log(newItems)

            // create the li eliment
            const li = document.createElement("li")
            //add class to li
            li.className = 'collection-item'
            //add Id to li dynamic
            li.id = `item-${newItems.id}`
            li.innerHTML = ` <strong>${newItems.name}</strong>
            <em>${newItems.money}</em>
            <a href="#!" class="secondary-content">
                <i class="edite-item  fa-sharp fa-solid fa-pen-to-square"></i>
            </a>`
            //insert into the ul
            document.querySelector('#item-list').appendChild(li)
        },
        cleareditestate: function () {

            document.querySelector(".add-btn").style.display = 'inline'
            document.querySelector(".update-btn").style.display = 'none'
            document.querySelector(".delete-btn").style.display = 'none'
            document.querySelector(".Back-btn").style.display = 'none'
        },

        showeditestate: function () {
            document.querySelector(".add-btn").style.display = 'none'
            document.querySelector(".update-btn").style.display = 'inline'
            document.querySelector(".delete-btn").style.display = 'inline'
            document.querySelector(".Back-btn").style.display = 'inline'
        },
        getitemInput: function () {
            return {
                name: document.querySelector('#item-name').value,
                money: document.querySelector('#item-money').value
            }
        }

    }

})();
// console.log(UICtrl)


//App Ctrl
const app = (function () {

    // evenet controler

    const loadEvenetListeners = function () {
        //add item evenet
        document.querySelector(".add-btn").addEventListener("click", itemaddsubmit)

        // EDITE ICONE CLICK
        document.querySelector(".edite-item").addEventListener('click', itemediteClick)

    }

    function itemaddsubmit(e) {
        e.preventDefault()

        const input = UICtrl.getitemInput()
        //validation
        if (input.name === "" && input.money === "") {
            alert("please field the form ")
        } else {
            const newItems = ItemCtrl.addItem(input.name, input.money)
            // console.log(newItems)
            UICtrl.addListItem(newItems)
        }
    }

    function itemediteClick(e) {
        // console.log(e.target.classList)

        if (e.target.classList.contains("edite-item")) {
            UICtrl.showeditestate()
        }

    }
    return {

        init: function () {
            //clear the 3 buttons
            UICtrl.cleareditestate();

            const item = ItemCtrl.getItem()
            // console.log(item)

            if (item.length > 0) {
                UICtrl.populateItemList(item)

                const totalMoney = ItemCtrl.getTotalmoney()
            }
            loadEvenetListeners()
        }
    }
})()

app.init()
