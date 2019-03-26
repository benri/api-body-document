import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {afterNextRender} from '../../@polymer/polymer/lib/utils/render-status.js';
import {AmfHelperMixin} from '../../@api-components/amf-helper-mixin/amf-helper-mixin.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import '../../@api-components/raml-aware/raml-aware.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@api-components/api-type-document/api-type-document.js';
import '../../@polymer/iron-collapse/iron-collapse.js';
import '../../@polymer/iron-icon/iron-icon.js';
import '../../@advanced-rest-client/arc-icons/arc-icons.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@api-components/api-schema-document/api-schema-document.js';
import '../../@advanced-rest-client/markdown-styles/markdown-styles.js';
import '../../@polymer/marked-element/marked-element.js';
import '../../@api-components/api-resource-example-document/api-resource-example-document.js';
/**
 * `api-body-document`
 *
 * A component to render HTTP method body documentation based on AMF model
 *
 * ## Styling
 *
 * `<api-body-document>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--api-body-document` | Mixin applied to this elment | `{}`
 * `--api-body-document-title-border-color` | Border color of the section title | `#e5e5e5`
 * `--api-body-document-title` | Mixni apploied to the title element | `{}`
 * `--api-body-document-toggle-view-color` | Color of the toggle view button | `--arc-toggle-view-icon-color` or `rgba(0, 0, 0, 0.74)`
 * `--api-body-document-toggle-view-hover-color` | Color of the toggle view button when hovered | `var(--arc-toggle-view-icon-hover-color` or `rgba(0, 0, 0, 0.88)`
 * `--api-body-document-description-color` | Color of the type description | `rgba(0, 0, 0, 0.74)`
 * `--arc-font-subhead` | Mixin applied to the resource title | `{}`
 * `--api-body-document-media-button-background-color` | Selection color of the media type selector | `#CDDC39`
 * `--api-body-document-examples-title-color` | Color of examples section title | ``
 * `--api-body-document-examples-border-color` | Example section border color | `transparent`
 * `--code-background-color` | Background color of the examples section | ``
 * `--api-body-document-media-type-label-font-weight` | Font weight of the media type label (when selection is not available) | `500`
 * `--api-body-document-title-narrow` | Mixin applied to the title when in narrow layout | `{}`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof ApiElements
 * @appliesMixin AmfHelperMixin
 */
class ApiBodyDocument extends AmfHelperMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="markdown-styles"></style>
    <style>
    :host {
      display: block;
      @apply --arc-font-body1;
      @apply --api-body-document;
    }

    [hidden] {
      display: none !important;
    }

    .section-title-area {
      @apply --layout-horizontal;
      @apply --layout-center;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border-bottom: 1px var(--api-body-document-title-border-color, #e5e5e5) solid;
    }

    .section-title-area h3 {
      @apply --layout-flex;
      @apply --api-body-document-title;
    }

    .toggle-button {
      outline: none;
      color: var(--api-body-document-toggle-view-color, var(--arc-toggle-view-icon-color, rgba(0, 0, 0, 0.74)));
      transition: color 0.25s ease-in-out;
      @apply --toggle-button;
    }

    .toggle-button:hover {
      color: var(--api-body-document-toggle-view-hover-color, var(--arc-toggle-view-icon-hover-color, rgba(0, 0, 0, 0.88)));
      @apply --toggle-button-hover;
    }

    .toggle-icon {
      margin-left: 8px;
      transform: rotateZ(0deg);
      transition: transform 0.3s ease-in-out;
    }

    .toggle-icon.opened {
      transform: rotateZ(-180deg);
    }

    .table-title {
      @apply --arc-font-title;
      @apply --api-body-document-title;
    }

    :host([narrow]) .table-title {
      @apply --api-body-document-title-narrow;
    }

    h4 {
      @apply --arc-font-subhead;
    }

    paper-button[active] {
      background-color: var(--api-body-document-media-button-background-color, #CDDC39);
    }

    .media-type-selector {
      margin: 20px 0;
    }

    .markdown-body {
      margin-bottom: 28px;
      margin-top: 28px;
      color: var(--api-body-document-description-color, rgba(0, 0, 0, 0.74));
      @apply --arc-font-body1;
    }

    .markdown-body[data-with-title] {
      margin-top: 0;
    }

    .examples {
      margin-top: 12px;
      border: 1px var(--api-body-document-examples-border-color, transparent) solid;
    }

    .examples,
    api-schema-document {
      background-color: var(--code-background-color);
    }

    .examples-section-title {
      @apply --arc-font-body1;
      font-size: 16px;
      padding: 16px 12px;
      margin: 0;
      color: var(--api-body-document-examples-title-color);
    }

    api-resource-example-document,
    api-schema-document {
      padding: 8px;
      color: var(--api-body-document-code-color);
    }

    .media-type-label {
      font-weight: var(--api-body-document-media-type-label-font-weight, 500);
      margin-left: 8px;
    }

    .media-toggle {
      outline: none;
    }

    .any-info,
    .any-info-description {
      @apply --arc-font-body1;
      color: var(--api-body-document-description-color, rgba(0, 0, 0, 0.74));
    }

    .any-info {
      font-size: 16px;
    }

    .body-name {
      font-weight: 500;
    }
    </style>
    <template is="dom-if" if="[[aware]]">
      <raml-aware raml="{{amfModel}}" scope="[[aware]]"></raml-aware>
    </template>
    <div class="section-title-area" on-click="toggle" title="Toogle body details">
      <h3 class="table-title">Body</h3>
      <div class="title-area-actions">
        <paper-button class="toggle-button">
          [[_computeToggleActionLabel(opened)]]
          <iron-icon icon="arc:expand-more" class\$="[[_computeToggleIconClass(opened)]]"></iron-icon>
        </paper-button>
      </div>
    </div>
    <iron-collapse opened="[[opened]]">
      <template is="dom-if" if="[[isAnyType]]" restamp="">
        <template is="dom-if" if="[[hasBodyName]]">
          <h4 class="body-name">[[bodyName]]</h4>
        </template>
        <template is="dom-if" if="[[hasDescription]]">
          <marked-element markdown="[[description]]">
            <div slot="markdown-html" class="markdown-body" data-with-title\$="[[hasTypeName]]"></div>
          </marked-element>
        </template>
        <p class="any-info">Any instance of data is allowed.</p>
        <p class="any-info-description">The API file specifies body for this request but it does not specify the data model.</p>
        <section class="examples" hidden\$="[[!_hasAnyExamples]]">
          <h5 class="examples-section-title">Examples</h5>
          <api-resource-example-document amf-model="[[amfModel]]" examples="[[selectedBody]]" media-type="[[selectedMediaType]]" type-name="[[typeName]]" has-examples="{{_hasAnyExamples}}"></api-resource-example-document>
        </section>
      </template>
      <template is="dom-if" if="[[!isAnyType]]">
        <div class="media-type-selector">
          <span>Media type:</span>
          <template is="dom-if" if="[[renderMediaSelector]]">
            <template is="dom-repeat" items="[[mediaTypes]]">
              <paper-button class="media-toggle" active="[[_mediaTypeActive(selected, index)]]" on-click="_selectMediaType" title\$="Select [[item.label]] media type">[[item.label]]</paper-button>
            </template>
          </template>
          <template is="dom-if" if="[[!renderMediaSelector]]">
            <span class="media-type-label">[[selectedMediaType]]</span>
          </template>
        </div>
        <template is="dom-if" if="[[hasBodyName]]">
          <h4 class="body-name">[[bodyName]]</h4>
        </template>
        <template is="dom-if" if="[[hasTypeName]]">
          <h4>[[typeName]]</h4>
        </template>
        <template is="dom-if" if="[[hasDescription]]">
          <marked-element markdown="[[description]]">
            <div slot="markdown-html" class="markdown-body" data-with-title\$="[[hasTypeName]]"></div>
          </marked-element>
        </template>
        <template is="dom-if" if="[[isObject]]" restamp="">
          <api-type-document amf-model="[[amfModel]]" type="[[selectedSchema]]" narrow="[[narrow]]" media-type="[[selectedMediaType]]"></api-type-document>
        </template>
        <template is="dom-if" if="[[isSchema]]">
          <api-schema-document amf-model="[[amfModel]]" shape="[[selectedSchema]]"></api-schema-document>
        </template>
      </template>
    </iron-collapse>
`;
  }

  static get is() {
    return 'api-body-document';
  }
  static get properties() {
    return {
      /**
       * `raml-aware` scope property to use.
       */
      aware: String,
      /**
       * Set to true to open the body view.
       * Autormatically updated when the view is toggled from the UI.
       */
      opened: Boolean,
      /**
       * AMF model for body as a `http://raml.org/vocabularies/http#payload`
       * type.
       * @type {Array<Object>}
       */
      body: Array,
      /**
       * List of discovered media types in the `body`.
       * @type {Array<Object>}
       */
      mediaTypes: {
        type: Array,
        readOnly: true
      },
      /**
       * Computed value. True when mediaTypes has more than one item.
       */
      renderMediaSelector: {
        type: Boolean,
        readOnly: true,
        value: false,
        computed: '_computeRenderMediaSelector(mediaTypes.*)'
      },
      /**
       * Currently selected media type.
       * It is an index of a media type in `mediaTypes` array.
       * It is set to `0` each time the body changes.
       */
      selected: Number,
      /**
       * A body model for selected media type.
       * Computed automatically when selection change.
       */
      selectedBody: {
        type: Object,
        computed: '_computeSelectedBody(selected, body)',
        observer: '_selectedBodyChanged'
      },
      /**
       * Computed AMF schema object for the body.
       */
      selectedSchema: {
        type: Object,
        computed: '_computeSelectedSchema(selectedBody)',
        observer: '_selectedSchemaChanged'
      },
      /**
       * Name of the selected media type.
       */
      selectedMediaType: {
        type: String,
        readOnly: true,
        computed: '_computeSelectedMediaName(selected, body)'
      },
      /**
       * True if selected body is a structured object
       */
      isObject: {
        type: Boolean,
        readOnly: true
      },
      /**
       * True if selected body is a schema (JSON, XML, ...) data
       */
      isSchema: {
        type: Boolean,
        readOnly: true
      },
      /**
       * Computed value, true if the body is of "any" type.
       */
      isAnyType: {
        type: Boolean,
        value: false,
        readOnly: true
      },
      /**
       * Name of the resource type if any.
       */
      typeName: {
        type: String,
        computed: '_computeTypeName(selectedSchema)'
      },
      /**
       * Computed value, true if `typeName` is set.
       */
      hasTypeName: {
        type: Boolean,
        computed: '_computeHasStringValue(typeName)'
      },
      /**
       * Body name, if defined
       */
      bodyName: {
        type: String,
        computed: '_computeBodyName(selectedSchema)'
      },
      /**
       * Computed value, true if `bodyName` is set.
       */
      hasBodyName: {
        type: Boolean,
        computed: '_computeHasStringValue(bodyName)'
      },
      /**
       * Name of the resource type if any.
       */
      description: {
        type: String,
        computed: '_computeDescription(selectedSchema)'
      },
      /**
       * Computed value, true if `typeName` is set.
       */
      hasDescription: {
        type: Boolean,
        computed: '_computeHasStringValue(description)'
      },
      /**
       * Set to render a mobile friendly view.
       */
       narrow: {
         type: Boolean,
         reflectToAttribute: true
       },
       _hasObjectExamples: {type: Boolean, value: false},
       _hasAnyExamples: {type: Boolean, value: false}
    };
  }

  static get observers() {
    return [
      '_bodyChanged(body, amfModel)'
    ];
  }

  _bodyChanged() {
    if (this.__bodyChangedDebounce) {
      return;
    }
    this.__bodyChangedDebounce = true;
    afterNextRender(this, () => {
      this.__bodyChangedDebounce = false;
      this.__bodyChanged(this.body);
    });
  }

  /**
   * Computes basic view values when body change.
   *
   * @param {Object} body
   */
  __bodyChanged(body) {
    if (!body) {
      return;
    }
    this.selected = -1;
    const media = this._computeMediaTypes(this.body);
    this._setMediaTypes(media);
    this.selected = 0;
  }

  _selectedBodyChanged() {
    this._hasObjectExamples = false;
    this._hasAnyExamples = false;
  }
  /**
   * Computes list of media types in the `body`
   * @param {Array} body Current value of the body.
   * @return {Array<Object>}
   */
  _computeMediaTypes(body) {
    const result = [];
    body.forEach((item) => {
      const label = this._getValue(item, this.ns.raml.vocabularies.http + 'mediaType');
      if (label) {
        result.push({label});
      }
    });
    return result.length ? result : undefined;
  }
  /**
   * Computes value for `renderMediaSelector` properety.
   * @param {Object} record `mediaTypes` change record.
   * @return {Boolean} True if there's more than one item in mediaType
   */
  _computeRenderMediaSelector(record) {
    const body = record && record.base;
    return !!(body && body.length && body.length > 1);
  }
  /**
   * Computes if `selected` equals current item index.
   *
   * @param {Number} selected
   * @param {Number} index
   * @return {Boolean}
   */
  _mediaTypeActive(selected, index) {
    return selected === index;
  }
  /**
   * Handler for media type type button click.
   * Sets `selected` property.
   *
   * @param {ClickEvent} e
   */
  _selectMediaType(e) {
    const index = e.model.get('index');
    if (index !== this.selected) {
      this.selected = index;
    } else {
      e.target.active = true;
    }
  }
  /**
   * Computes value of `http://raml.org/vocabularies/http#schema` for body.
   * @param {Number} selected Index of currently selected media type in
   * `mediaTypes` array
   * @param {Array<Object>} body List of body in request.
   * @return {Object|undefined}
   */
  _computeSelectedBody(selected, body) {
    if (!body || (!selected && selected !== 0)) {
      return;
    }
    return body[selected];
  }

  _computeSelectedSchema(selectedBody) {
    if (!selectedBody) {
      return;
    }
    const key = this._getAmfKey(this.ns.raml.vocabularies.http + 'schema');
    let schema = selectedBody[key];
    if (!schema) {
      return;
    }
    if (schema instanceof Array) {
      schema = schema[0];
    }
    return this._resolve(schema);
  }
  /**
   * Computes value for `selectedMediaType` property.
   * @param {Number} selected Currently selected media type index in the selector.
   * @param {Array<Object>} body List of bodies.
   * @return {String} Content type value.
   */
  _computeSelectedMediaName(selected, body) {
    if (!body || (!selected && selected !== 0)) {
      return;
    }
    const data = body[selected];
    return this._getValue(data, this.ns.raml.vocabularies.http + 'mediaType');
  }
  /**
   * Handler for body value change. Computes basic view control properties.
   * @param {Object} body Currently computed body.
   */
  _selectedSchemaChanged(body) {
    if (!body) {
      return;
    }
    let isObject = false;
    let isSchema = false;
    let isAnyType = false;
    if (this._hasType(body, this.ns.w3.shacl.name + 'NodeShape') ||
      this._hasType(body, this.ns.raml.vocabularies.shapes + 'UnionShape')) {
      isObject = true;
    } else if (this._hasType(body, this.ns.w3.shacl.name + 'SchemaShape') ||
      this._hasType(body, this.ns.raml.vocabularies.shapes + 'ScalarShape')) {
      isSchema = true;
    } else if (this._hasType(body, this.ns.raml.vocabularies.shapes + 'ArrayShape')) {
      isObject = true;
    } else if (this._hasType(body, this.ns.raml.vocabularies.shapes + 'AnyShape')) {
      isAnyType = true;
    }
    this._setIsObject(isObject);
    this._setIsSchema(isSchema);
    this._setIsAnyType(isAnyType);
  }
  // Computes a label for the section toggle buttons.
  _computeToggleActionLabel(opened) {
    return opened ? 'Hide' : 'Show';
  }
  // Computes class for the toggle's button icon.
  _computeToggleIconClass(opened) {
    let clazz = 'toggle-icon';
    if (opened) {
      clazz += ' opened';
    }
    return clazz;
  }
  /**
   * Toggles URI parameters view.
   * Use `pathOpened` property instead.
   */
  toggle() {
    this.opened = !this.opened;
  }
  /**
   * Computes `typeName` as a name of body in the AMF model.
   *
   * @param {Object} body Currently selected body.
   * @return {String|undefined}
   */
  _computeTypeName(body) {
    let value = this._getValue(body, this.ns.w3.shacl.name + 'name');
    if (value && (value === 'schema' || value.indexOf('amf_inline_type') === 0)) {
      value = undefined;
    }
    return value;
  }
  /**
   * Computes value for `bodyName`.
   * @param {Object} schema Computed body schema
   * @return {String|undefined} Computed body name
   */
  _computeBodyName(schema) {
    return this._getValue(schema, this.ns.schema.schemaName);
  }
}
window.customElements.define(ApiBodyDocument.is, ApiBodyDocument);
