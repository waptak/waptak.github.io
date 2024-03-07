function displayData()
{
  let charactors = this.charactors;
  let shareBanks = this.shareBanks;

  // 詳細表示
  if (charactors.length !== 0)
  {
    // 現在ページの情報を保存
    localStorage.setItem("currentpage", JSON.stringify(0));
    displayCharactor(charactors[0]);
  } else if (shareBanks.length !== 0)
  {
    // 現在ページの情報を保存
    localStorage.setItem("currentpage", JSON.stringify("shareBanks"));
    displayShareBank(shareBanks[0]);
  }

}

function displayItemCodes()
{
  let itemCodes;
  (this.lang === "JA")
    ? itemCodes = ItemCodes_JA()
    : itemCodes = ItemCodes();

  let id = document.getElementById("data");
  id.innerHTML = '';

  if (typeof itemCodes === "undefined") return;

  let h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode("ITEM CODES"));
  id.appendChild(h2);

  let table = document.createElement("table");
  let tbody = document.createElement("tbody");

  if (Object.keys(itemCodes).lenght !== 0)
  {
    for (let key in itemCodes)
    {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      let text = document.createTextNode(key);
      td.appendChild(text);
      tr.appendChild(td);
      let td2 = document.createElement("td");
      let slot = document.createTextNode(itemCodes[key]);
      td2.appendChild(slot);
      tr.appendChild(td2);
      tbody.appendChild(tr);
    }
  }

  table.appendChild(tbody);
  id.appendChild(table);
}

function displayCharactor(charactor)
{
  let id = document.getElementById("data");
  id.innerHTML = '';

  let h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode("角色"));
  id.appendChild(h2);
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");
  tr(tbody, `SLOT : ${charactor.Slot}`);
  tr(tbody, `名字 : ${charactor.Name}`);
  tr(tbody, `GUILD CARD : ${charactor.GuildCardNumber}`);
  tr(tbody, `种族 : ${charactor.Class}`);
  tr(tbody, `SECTION ID : ${charactor.SectionID}`);
  tr(tbody, `等级 : ${charactor.Level}`);
  tr(tbody, `EP1 CHALLENGE : ${charactor.Ep1Progress}`);
  tr(tbody, `EP2 CHALLENGE : ${charactor.Ep2Progress}`);
  table.appendChild(tbody);
  id.appendChild(table);


  displayInventory(charactor.Inventory[this.lang], "随身携带")
  displayInventory(charactor.Bank[this.lang], "个人仓库")
}

function tr(tbody, text)
{
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let node = document.createTextNode(text);
  td.appendChild(node);
  tr.appendChild(td);
  tbody.appendChild(tr);
}

function displayShareBank(shareBank, title)
{
  let id = document.getElementById("data");
  id.innerHTML = '';
  displayInventory(shareBank.ShareBank[this.lang], "共享仓库")
}

function displayInventory(inventory, title, mode)
{
  let id = document.getElementById("data");

  let h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode(title));
  h2.appendChild(document.createTextNode(`　...${inventory.length}`));
  id.appendChild(h2);

  let table = document.createElement("table");
  let tbody = document.createElement("tbody");

  if (inventory.length == 0)
  {
    // イベントリがからの場合、NO ITEMと表示
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let text = document.createTextNode("NO ITEM");
    td.appendChild(text);
    tr.appendChild(td);
    tbody.appendChild(tr);
  } else {
    // インベントにアイテムがある場合
    for (let i in inventory)
    {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      let text = document.createTextNode(inventory[i][1]["display"]);
      td.appendChild(text);
      tr.appendChild(td);
      if (mode == "allItems")
      {
        let td2 = document.createElement("td");
        let slot = document.createTextNode(`Slot: ${inventory[i][2]}`);
        td2.appendChild(slot);
        tr.appendChild(td2);
      }
      tbody.appendChild(tr);
    }
  }

  table.appendChild(tbody);
  id.appendChild(table);
}

function displayPager()
{
  let charactors = this.charactors;
  let shareBanks = this.shareBanks;
  let allItems = this.allItems;

  let id = document.getElementById("pager");
  id.innerHTML = '';

  // キャラクターのページを表示する
  if (Object.keys(charactors).length !== 0)
  {
    for( let i in charactors)
    {
      let button = document.createElement("button");
      button.setAttribute('id', `pager${charactors[i].Slot}`);
      button.setAttribute('class', "pager");
      button.setAttribute('name', i);
      button.setAttribute('onclick', 'clickCharactor(name)');
      button.innerText = charactors[i].Slot;
      id.appendChild(button);
    }
  }

  // 共有倉庫のページを表示する
  if (Object.keys(shareBanks).length !== 0)
  {
    for( let i in shareBanks)
    {
      let button = document.createElement("button");
      button.setAttribute('id', `pagerShareBank${[i]}`);
      button.setAttribute('class', "pager");
      button.setAttribute('name', i);
      button.setAttribute('onclick', 'clickShareBank(name)');
      button.innerText = "共享仓库";
      id.appendChild(button);
    }
  }

  // 全アイテムのページを表示する
  if (Object.keys(allItems).length !== 0)
  {
    let button = document.createElement("button");
    button.setAttribute('id', "allItems");
    button.setAttribute('class', "pager");
    button.setAttribute('name', "allItems");
    button.setAttribute('onclick', 'clickAllItems(name)');
    button.innerText = "所有物品";
    id.appendChild(button);
  }
}

function displayNotification()
{
  console.log("====== notification ======");
  console.log(notification());
  let notifications = notification();
  let div = document.getElementById("notification");
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");
  for ( let notification of notifications ) {
    console.log(notification);
    let tr = document.createElement("tr");
    let date = document.createElement("td");
    date.textContent = notification["date"];
    let status = document.createElement("td");
    status.className = notification["status"];
    let text = document.createElement("td");
    for (let line of notification["text"])
    {
      if (line.match(/linker/))
      {
        let linker = line.split("||");
        let a = document.createElement("a");
        a.textContent = linker[1];;
        a.setAttribute('href', linker[2]);
        a.setAttribute('target', '_blank');
        text.appendChild(a);
      } else {
        let p = document.createElement("p");
        if (notification["status"] === "solved")
        {
          let del = document.createElement("del");
          del.textContent += line;
          p.appendChild(del);
        } else {
          p.textContent += line;
        }
        text.appendChild(p);
      }
    }
    tr.appendChild(date);
    tr.appendChild(status);
    tr.appendChild(text);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  div.appendChild(table);
}
