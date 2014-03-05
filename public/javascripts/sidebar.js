var onAdd = function () {
	this._initLayout();
	this._update();

	return this._container;
};

var addBaseLayer = function (layer, name) {
	this._addLayer(layer, name);
	return this._update();
};

var addOverlay = function (layer, name) {
	this._addLayer(layer, name, true);
	return this._update();
};

var removeLayer = function (layer) {
	layer.off('add remove', this._onLayerChange, this);

	delete this._layers[L.stamp(layer)];
	return this._update();
};

var _addLayer = function (layer, name, overlay) {
	layer.on('add remove', this._onLayerChange, this);

	var id = L.stamp(layer);

	this._layers[id] = {
		layer: layer,
		name: name,
		overlay: overlay
	};

	if (this.options.autoZIndex && layer.setZIndex) {
		this._lastZIndex++;
		layer.setZIndex(this._lastZIndex);
	}
};

var _update = function () {
	if (!this._container) { return; }

	this._baseLayersList.innerHTML = '';
	this._overlaysList.innerHTML = '';

	var baseLayersPresent, overlaysPresent, i, obj;

	for (i in this._layers) {
		obj = this._layers[i];
		this._addItem(obj);
		overlaysPresent = overlaysPresent || obj.overlay;
		baseLayersPresent = baseLayersPresent || !obj.overlay;
	}

	this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';

	return this;
};

var _onLayerChange = function (e) {
	if (!this._handlingClick) {
		this._update();
	}

	var overlay = this._layers[L.stamp(e.target)].overlay;

	var type = overlay ?
		(e.type === 'add' ? 'overlayadd' : 'overlayremove') :
		(e.type === 'add' ? 'baselayerchange' : null);

	if (type) {
		this._map.fire(type, e.target);
	}
};

// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
var _createRadioElement = function (name, checked) {

	var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' +
			name + '"' + (checked ? ' checked="checked"' : '') + '/>';

	var radioFragment = document.createElement('div');
	radioFragment.innerHTML = radioHtml;

	return radioFragment.firstChild;
};

var _addItem = function (obj) {
	var label = document.createElement('label'),
	    checked = this._map.hasLayer(obj.layer),
	    input;

	if (obj.overlay) {
		input = document.createElement('input');
		input.type = 'checkbox';
		input.className = 'leaflet-control-layers-selector';
		input.defaultChecked = checked;
	} else {
		input = this._createRadioElement('leaflet-base-layers', checked);
	}

	input.layerId = L.stamp(obj.layer);

	L.DomEvent.on(input, 'click', this._onInputClick, this);

	var name = document.createElement('span');
	name.innerHTML = ' ' + obj.name;

	label.appendChild(input);
	label.appendChild(name);

	var container = obj.overlay ? this._overlaysList : this._baseLayersList;
	container.appendChild(label);

	return label;
};

var _onInputClick = function () {
	var inputs = this._form.getElementsByTagName('input'),
	    input, layer, hasLayer;

	this._handlingClick = true;

	for (var i = 0, len = inputs.length; i < len; i++) {
		input = inputs[i];
		layer = this._layers[input.layerId].layer;
		hasLayer = this._map.hasLayer(layer);

		if (input.checked && !hasLayer) {
			this._map.addLayer(layer);

		} else if (!input.checked && hasLayer) {
			this._map.removeLayer(layer);
		}
	}

	this._handlingClick = false;

	this._refocusOnMap();
};