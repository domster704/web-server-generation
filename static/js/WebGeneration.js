const manager = new BlockManager();

function createRoute() {
    manager.blockList.push(new Route(manager.id))
    manager.makeBlock(manager.blockList[manager.id])
}

function createDB() {
    manager.blockList.push(new DB(manager.id))
    manager.makeBlock(manager.blockList[manager.id])
}

function createConfig() {
    manager.blockList.push(new Config(manager.id))
    manager.makeBlock(manager.blockList[manager.id])
}


$('#sendBlocks').on('click', () => {
    let routes = [];
    let dbs = [];
    let configs = [];

    for (let i of manager.blockList) {
        if (i instanceof Route) {
            routes.push(i.data)
        } else if (i instanceof DB) {
            dbs.push(i.data)
        } else if (i instanceof Config){
            configs.push(i.data)
        }
    }

    if (routes.length !== 0) {
        $.ajax({
            type: "POST",
            url: '/api/sendBlocks/route',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data:  JSON.stringify(routes)
        })
    }
    if (dbs.length !== 0) {
        $.ajax({
            type: "POST",
            url: '/api/sendBlocks/db',
            contentType: "application/json; charset=utf-8",
            data:  JSON.stringify(dbs),
            success: (data) => {
                console.log(data)
                alert(1);
            },
            error: (error) => {
                console.error(error);
            }
        })
    }
    if (configs.length !== 0) {
        $.ajax({
            type: "POST",
            url: '/api/sendBlocks/config',
            contentType: "application/json; charset=utf-8",
            data:  JSON.stringify(configs),
            success: (data) => {
                console.log(data)
                alert(1);
            },
            error: (error) => {
                console.error(error);
            }
        })
    }
})

/**
 * Отображает новые настройки для базы данных
 * @param dbName Имя базы данных
 * @param blockID ID блока с базой данных
 */
function setDBSettings(dbName, blockID) {
    $(`#dbBut${blockID}`).addClass('disBlock');
    $(`#addNewInput${blockID}`).removeClass('disBlock');

    const fieldID = manager.blockList[blockID].fieldID++;

    $(`#dbSettings${blockID}`).append(`
    <div class="input-group col-6 mt-lg-3" style="margin: 0; padding: 0" id="field1">
        <input id="fieldName${fieldID}" type="text" class="form-control">
        <button id="setTypeBut${fieldID}" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
            Type
        </button>
        <ul id="type" class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" onclick="setType(${blockID}, ${fieldID}, 'Text')">Text</a></li>
            <li><a class="dropdown-item" onclick="setType(${blockID}, ${fieldID}, 'String')">String</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" onclick="setType(${blockID}, ${fieldID}, 'Integer')">Integer</a></li>
            <li><a class="dropdown-item" onclick="setType(${blockID}, ${fieldID}, 'Float')">Float</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" onclick="setType(${blockID}, ${fieldID}, 'Boolean')">Boolean</a></li>
        </ul>
    </div>
`)
}

function setType(blockID, buttonID, type) {
    $(`#dbSettings${blockID} > div > #setTypeBut${buttonID}`).text(type)
}
