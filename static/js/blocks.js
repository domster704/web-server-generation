const $constructor = $("#constructor");

/**
 * Тип абстрактного класса, но в js такого нет :(
 */
class Block {
    /**
     * @constructor
     * @this {Block}
     * @param {int} blockID Id нового блока
     * @param {String} bgColor Цвет карты блока
     * @param {Object} data Данные, которые будут использованы при отправке запроса серверу
     */
    constructor(blockID, bgColor, data) {
        /** @protected */
        this._blockID = blockID;

        /** @protected */
        this._bgColor = bgColor;

        /** @protected */
        this._data = data
    }

    /**
     * @abstract
     * Возвращает HTML код блока
     */
    get HTMLBlock() {
    }

    /**
     * @abstract
     * Получение данные со всех полей наследников/объектов класса Block
     */
    get data() {
    }
}


/**
 * Блок маршрута
 */
class Route extends Block {

    constructor(blockID) {
        super(blockID, 'bg-secondary', {});
    }

    /**
     * @override
     * @returns {string} HTML блок маршрута
     */
    get HTMLBlock() {
        return `
        <div id="block${this._blockID}" class="card ${this._bgColor} text-white block" style="margin: 16px 0;">
            <div class="card-body">
                <div class="card-header">
                    <h3>Route</h3>
                </div>
                <div class="container row mt-lg-2">
                    <div class="col-6">
                        <div class="btn-group dropright">
                            <button id="method${this._blockID}" type="button" class="btn btn-dark dropdown-toggle"
                                data-toggle="dropdown">Methods</button>
                            <div class="dropdown-menu">
                                <button class="dropdown-item" type="button"
                                    onclick="$('#method${this._blockID}').text('GET')">GET</button>
                                <button class="dropdown-item" type="button"
                                    onclick="$('#method${this._blockID}').text('POST')">POST</button>
                                <button class="dropdown-item" type="button"
                                    onclick="$('#method${this._blockID}').text('PUT')">PUT</button>
                                <button class="dropdown-item" type="button"
                                    onclick="$('#method${this._blockID}').text('DELETE')">DELETE</button>
                            </div>
                        </div>
                        <div class="group mt-lg-4">
                            <input class="materialInput" id="ip${this._blockID}" type="text" required
                                style="background-color: #6C757D;">
                            <span class="bar"></span>
                            <label class="materialLabel">IP</label>
                        </div>
                        <div class="mt-lg-4 tab-content">
                            <div id="normalType${this._blockID}" class="tab-pane active group" role="tabpanel">
                                <input class="materialInput" id="response${this._blockID}" type="text" required
                                style="background-color: #6C757D;">
                                <span class="bar"></span>
                                <label class="materialLabel">Response</label>
                            </div>
                            <div id="otherType${this._blockID}" class="tab-pane" role="tabpanel">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Var</span>
                                    </div>
                                    <input id="var${this._blockID}" type="text" class="form-control">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Value</span>
                                    </div>
                                    <input id="val${this._blockID}" type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <ul class="nav" role="tablist" style="display: inline-flex; flex-direction: column;">
                            <li class="form-check nav-item">
                                <input class="form-check-input" data-bs-target="#normalType${this._blockID}" data-bs-toggle="tab"
                                    type="radio" name="returnType${this._blockID}" id="htmlRender${this._blockID}" value="html" checked>
                                <label class="form-check-label" for="htmlRender">HTML render</label>
                            </li>
                            <li class="form-check nav-item">
                                <input class="form-check-input" data-bs-target="#normalType${this._blockID}" data-bs-toggle="tab"
                                    type="radio" name="returnType${this._blockID}" id="returnJson${this._blockID}" value="json">
                                <label class="form-check-label" for="returnJson">Return JSON</label>
                            </li>
                            <li class="form-check nav-item">
                                <input class="form-check-input" data-bs-target="#otherType${this._blockID}" data-bs-toggle="tab"
                                    type="radio" name="returnType${this._blockID}" id="other${this._blockID}" value="other">
                                <label class="form-check-label" for="other">Other</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <button type="button" class="close" aria-label="Close" onclick="$('#block${this._blockID}').remove()"
                            style="padding-left: 4px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>`;
    }


    /**
     * @override
     * @returns {*|{method: *, response: string, ip: string, returnType: (*|Window.jQuery|string)}}
     */
    get data() {
        const returnType = $(`input[name="returnType${this._blockID}"]:checked`).val();

        this._data = {
            method: $(`#method${this._blockID}`).text(),
            ip: '/' + $(`#ip${this._blockID}`).val(),
            returnType: returnType
        };

        if (returnType !== 'other') {
            this._data.response = $(`#response${this._blockID}`).val()
        } else {
            this._data.response = `${$(`#var${this._blockID}`).val()}_%-%_${$(`#val${this._blockID}`).val()}`
        }

        return this._data
    }
}

/**
 * Блок базы данных
 */
class DB extends Block {
    constructor(_blockID) {
        super(_blockID, 'bg-success', {});
        this.fieldID = 0;
    }

    /**
     * @override
     * @returns {string} HTML блок базы данных
     */
    get HTMLBlock() {
        return `
            <div id="block${this._blockID}" class="card ${this._bgColor} text-white block" style="margin: 16px 0;">
                <div class="card-body">
                    <div class="card-header">
                        <h3>DB</h3>
                    </div>
                    <div class="container">
                        <div>
                            <div style="display: inline-flex; flex-direction: row;">
                                <div class="group mt-lg-4">      
                                    <input class="materialInput" id="dbName${this._blockID}" type="text" required >
                                    <span class="bar"></span>
                                    <label class="materialLabel">Table name</label>
                                </div>
                                <div>
                                    <button type="button" class="close" aria-label="Close" id='dbBut${this._blockID}'
                                    onclick="setDBSettings($('#dbName${this._blockID}').val(), ${this._blockID})" style="margin-left: 10px; margin-top: 36px">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div id="dbSettings${this._blockID}">
                                
                            </div>
                            <div id="addNewInput${this._blockID}" class="mt-lg-3 disBlock">
                                <button type="button" class="btn btn-primary" onclick="setDBSettings(0, ${this._blockID})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="button" class="close" aria-label="Close" onclick="$('#block${this._blockID}').remove()"
                            style="padding-left: 4px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @override
     * @returns {Object} Данные из полей блока
     */
    get data() {
        let fields = []
        for (let i = 0; i < this.fieldID; i++) {
            fields.push([$(`#fieldName${i}`).val(), $(`#setTypeBut${i}`).text().trim()])
        }

        this._data = {
            tableName: $(`#dbName${this._blockID}`).val(),
            fields: fields
        };

        return this._data;
    }
}

/**
 * Блок конфигурационных данных
 */
class Config extends Block {
    constructor(blockID) {
        super(blockID, 'bg-primary', {});
    }

    /**
     * @override
     * @returns {string}
     */
    get HTMLBlock() {
        return `
                <div id="block${this._blockID}" class="card ${this._bgColor} text-white block" style="margin: 16px 0;">
                    <div class="card-body">
                        <div class="card-header"><h3>Config</h3></div>
                        <div class=" container">
                            <div>
                                <div class="group mt-lg-4">      
                                    <input class="materialInput" type="text" required>
                                    <span class="bar"></span>
                                    <label class="materialLabel">IP</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="button" class="close" aria-label="Close" onclick="$('#block${this._blockID}').remove()"
                            style="padding-left: 4px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>`;
    }

    /**
     * @override
     * @returns {*|{}}
     */
    get data() {
        this._data = {}
        return this._data
    }
}


/**
 * Класс для обработки наследников класса Block
 */
class BlockManager {
    #blockID = 0;

    constructor() {
        this.blockList = []
    }

    get id() {
        return this.#blockID;
    }

    #afterCreating = () => {
        $(`#constructor`).scrollTop($('#constructor')[0].scrollHeight);
    };

    /**
     * происходит что-то типа upcast
     * @param {Block} block
     */
    makeBlock(block) {
        this.#blockID++;
        $constructor.append(block.HTMLBlock)
    }
}
